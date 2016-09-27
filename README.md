# react-apig-lambda

> Render React.js on-demand with CDN caching.

> Minimal example on how to render React & React Router v4 with Amazon API Gateway, AWS Lambda and CloudFront.

## Online demo
[https://test.es6.fi](https://test.es6.fi)

Basic example app from [React Router documentation](https://react-router.now.sh/basic). Initial server-side render and acts as SPA from there.

## Dependencies

* [AWS CLI](https://aws.amazon.com/cli/) for S3 deployment
* [Apex](https://github.com/apex/apex) for Lambda deployment

## Deploying to AWS

1) Edit `project.json` and set proper lamdba execution `role`.

2) Replace `s3://test.es6.fi/assets/` in `package.json` with your S3 bucket, e.g. `s3://your-bucket/assets/`.

3) `npm run build` to build front-end code

4) `npm run deploy` to deploy lambda and upload front build to S3

## Setting up API Gateway

1) In API Gateway home, click `Create API`

2) Choose `New API` and enter some `API name`, click `Create API`.

2) Choose `Actions -> Create resource`

3) Check `Configure as proxy resource` and click `Create resource`

4) In `/{proxy+} - ANY - Setup`, choose `Integration type` as `Lambda Function Proxy`, select your lambda's AWS region and enter name of your uploaded lambda function (`react-apig-lambda_render-react` if you didn't change name in `project.json`). Click `Save`.

5) Choose `Actions -> Deploy API`, set `Deployment stage` as `[New Stage]`, enter stage name and click `Deploy`

6) Now you should be able to invoke the lambda renderer by navigating to `https://your-invoke-url/your-stage-name/index`

## Setting up CloudFront

1) Create distribution, paste your API Gateway url as `Origin domain name`, e.g. `https://your-invoke-url/your-stage-name/index`. Make sure to include `/index`.

2) Set your custom domain in `Alternate Domain Names
(CNAMEs)`

3) You can leave other settings as they are if you don't want to customize anything, click `Create distribution`.

4) Go to your distribution, navigate to `Origins`, click `Create origin`

5) Choose your S3 bucket (you should create it now if you haven't already. Make sure there's `assets` directory). Click `Create`.

6) Go to your distribution, navigate to `Behaviors`, click `Create Behavior`.

7) Set `Path Pattern` as `assets/*`, choose your S3 origin and click `Create`.

8) In your domain's DNS management interface, point your domain's `CNAME` to your CloudFront distribution.
