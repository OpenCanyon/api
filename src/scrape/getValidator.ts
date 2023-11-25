import Ajv, {ErrorObject} from 'ajv';
import FS from 'fs';
import {memoize} from 'lodash';
import {schemas} from '../writeSchemas';

type SchemaName = keyof typeof schemas;

const validateInner = memoize((schema: SchemaName) => {
  const ajv = new Ajv({allowUnionTypes: true, allErrors: true});
  return ajv.compile(JSON.parse(FS.readFileSync(`./output/schemas/${schema}.json`, 'utf-8')));
});

export const validate = async (schema: SchemaName, value: unknown) => {
  const validator = validateInner(schema);
  validator(value);
  if (validator.errors) {
    throw new SchemaValidationError(value, validator.errors);
  }
};

class SchemaValidationError extends Error {
  constructor(value: unknown, errors: ErrorObject[]) {
    super(`Failed to validate ${JSON.stringify(value)}\n${JSON.stringify(errors, null, 2)}`);
  }
}
