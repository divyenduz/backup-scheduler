#!/usr/bin/env ./node_modules/.bin/zx
import "zx/globals";
import task from "tasuku";
import arg from "arg";
import './env.mjs'

const args = arg({
  "--debug": Boolean,
  "--profile": String,
});
const debug = args["--debug"] || false;
const profile = args["--profile"] || "default";

$.verbose = debug
const date = new Date().toLocaleDateString('de')

const groupedTasks = await task.group(task => [
  task(`Check AWS user (${date})`, async () => {
    const callerCmd = await $`/usr/local/bin/aws --profile ${profile} sts get-caller-identity`;
    const caller = JSON.parse(callerCmd.stdout);
    if (caller.Account !== process.env.AWS_ACCOUNT_ID) {
      throw new Error(
        `AWS user is not correct(current: ${caller.Account}, expected: ${process.env.AWS_ACCOUNT_ID}).Please run \`aws configure\` to set the correct user or use --profile to specify a profile`
      );
    }

    return true
  }),

  task(`Run backup (${date})`, async () => {
    const callerCmd = await $`/usr/local/bin/aws --profile ${profile} s3 sync ${process.env.LOCAL_FOLDER} ${process.env.S3_BUCKET}`;
    console.log(callerCmd.stdout);
    return true
  })
])

