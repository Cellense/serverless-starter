# Lambda functions

## Commands
(note that if you're using npm, u have to `npm run` instead of `yarn`
* `yarn dev`
To run local development server with hot-reload (using serverless offline plugin):
* `yarn deploy <<function_name>>`
To deploy a single function to AWS lambda:
use `--stage` flag to deploy to different stage (e.g. `yarn deploy my-function --stage prod` to deploy to production stage)
* `yarn deploy:service`
To deploy whole service to AWS (this will automatically generate cloudformation, create/update stack with all dependencies like api-gateway, cloudwatch, etc. and deploy all function for service):
use `--stage` flag to deploy to different stage (e.g. `yarn deploy --stage prod` to deploy to production stage)

## Serverless config
In order to deploy to aws, you need to configure serverless
`yarn sls config --key <<key>> --secret <<secret_key>`
(AWS console -> IAM -> Users -> << You >> -> Security credentials -> Create access key -> copy keys)

### Contributors
<p><img src="https://cdn.pbrd.co/images/GBXxXB1.png" height="105" width="78"></p>
<p>Matúš Čongrády</p>
