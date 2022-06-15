# Same Story React Figma Plugin

## Environment

Create a `.env` file:

AWS_DEFAULT_REGION=
SAME_STORY_BUCKET_NAME=
TOPIC_ARN=
IDENTITY_POOL_ID=
SENTRY_DNS=
GA_MEASUREMENT_ID=
SOCKET_URL=


## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
  - error Command "build:watch" not found.
  - `yarn build:dev` instead?
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

## Hot Reloading (macOS only)

Not the smoothest experience, but way better than needing to press a hotkey. In case you use the Figma Beta change App name in `applescript.sh`.

```sh
  $ brew install modd
  $ yarn modd
```
