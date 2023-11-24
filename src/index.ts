import {CloudFormation} from '@aws-sdk/client-cloudformation';
import {S3} from '@aws-sdk/client-s3';
import chalk from 'chalk';
import {program} from 'commander';
import FS from 'fs';
import {scrape} from './scrape';
import {syncStack} from './syncStack';
import {StackOutputs} from './syncStack/getStackTemplate';
import {uploadOutput} from './uploadOutput';
import {writeSchemas} from './writeSchemas';
import {writeTippecanoe} from './writeTippecanoe';

program.option('--skipAWS', 'Skip updating the AWS stack and uploading files to S3', false);

async function main() {
  program.parse();
  const options = program.opts<{skipAWS: boolean}>();

  try {
    await FS.promises.rmdir('./output', {recursive: true});
  } catch (error) {
    console.error(error);
  }

  const region = 'us-west-1';
  const s3 = new S3({region});
  const cloudFormation = new CloudFormation({region});

  let outputs: StackOutputs | undefined;
  if (!options.skipAWS) {
    outputs = await syncStack(cloudFormation);
  }

  await scrape();
  await writeTippecanoe();
  await writeSchemas();

  if (!options.skipAWS && outputs) {
    await uploadOutput(s3, outputs);
  }

  console.log(chalk.green(chalk.bold('Done')));
}

main();
