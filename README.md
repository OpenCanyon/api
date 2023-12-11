This is an API for canyoneering routes from RopeWiki.

# Using the API

You can make HTTP requests to the API at `http://canyoneer--main.s3.us-west-1.amazonaws.com`.

The following endpoints are available:

- `/v2/index.json` - all routes as a JSON array using the lightweight `IndexRouteV2` type
- `/v2/index.geojson` - all route geometries as a JSON array from the KML files using the `GeoJSONRouteV2` type
- `/v2/details/{id}.json` - detailed data for a single route using the `RouteV2` type which includes the HTML description and all geometries from the KML file
- `/v2/tiles/{z}/{x}/{y}.pbf` - all route geometries from the KML files as the `GeoJSONRouteV2` type formatted as [Vector Tiles](https://github.com/mapbox/vector-tile-spec/)
- `/v2/tiles/metadata.json` - a standard Tippecanoe metadata file that describes what's in the vector tiles and how they were generated
- `/v2/schemas/{type}.json` - JSON schemas for `IndexRouteV2`, `RouteV2`, and `GeoJSONRouteV2`

- `/v1/index.json` - all routes as a JSON array using the `RouteV1` type
- `/v1/schemas/{type}.json` - JSON schemas for `RouteV1`

# Developing the API

## Getting Started

Install native dependencies

- [git](https://git-scm.com)
- [Node.js](https://nodejs.org/en) (>= v19)
- [yarn](https://yarnpkg.com/) (>= v1.22)
- pandoc (>= 3.x.x)
- [tippecanoe](https://github.com/mapbox/tippecanoe) (>= v1.36)

Clone this git repository

```
git clone git@github.com:lucaswoj/canyoneer.git
cd canyoneer
```

Install yarn dependencies

```
yarn
```

Install the git pre-commit hook

```
yarn install-precommit
```

[Ask existing user to create an AWS account for you](https://us-east-1.console.aws.amazon.com/singlesignon/home?region=us-east-1&userCreationOrigin=IAM#!/instances/72232ee7076fe391/users)

[Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

[Create an AWS access key](https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials) ([docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey))

Authenticate the AWS CLI

```
$ aws configure --profile canyoneer

AWS Access Key ID [None]: {COPY FROM PREVIOUS STEP}
AWS Secret Access Key [None]: {COPY FROM PREVIOUS STEP}
Default region name [None]:
Default output format [None]:
```

Run the scraper

```
yarn start
```

The scraper supports some command line flags. You can see all of them by running

```
yarn start --help
```

## Developing the Mapbox Style and Web Frontend

Start the web interface in development mode, with hot code reloading, by running

```
yarn web
```

## Directory Layout

- `.github` contains configuration files for GitHub workflows which we use for continuous integration (CI).
- `.vscode` contains configuration files for VSCode which automatically configures code validation and formatting tools for this project.
- `build` contains the final output product that gets uploaded to S3 after the CLI finishes running. This folder does not exist until after running the CLI.
- `cache` contains cached HTTP responses from RopeWiki. This folder does not exist until after running the CLI.
- `coverage` contains a unit test code coverage report. This folder does not exist until after running the unit tests.
- `public` contains static files served from our S3 bucket
- `src/cli` contains the scraper itself and a command-line interface (CLI) for running it with different options.
- `src/types` contains TypeScript type definitions used throughout the codebase.
- `src/utils` contains utility functions and helper modules used across the codebase.
- `src/web` contains a web frontend code a small app that allows viewing the data and developing the Mapbox style.
