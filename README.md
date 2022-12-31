# Backup Scheduler

Automated and scheduled backup of a folder on macOS to AWS S3 using `launchctl`. I am using this to backup my Calibre library.

# Setup

1. `cp env.mjs.sample env.mjs` and add values for AWS account ID (defensive check, so global profile changes don't accidently upload to another bucket), local folder, s3 bucket
2. Edit `LaunchAgent-Examples/dev.zoid.calibre-backup-zx.plist` and set correct path for node, index.mjs from your machine. By default, it runs on 30th minute of each hour, please feel free to change that behavior as well, [relevant docs](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/ScheduledJobs.html#//apple_ref/doc/uid/10000172i-CH1-SW2)
3. `cp ./LaunchAgent-Examples/dev.zoid.calibre-backup-zx.plist ~/Library/LaunchAgents` or use symlink
4. `launchctl load ~/Library/LaunchAgents/dev.zoid.calibre-backup-zx.plist` (If `load` fails, try `unload` and then `load`)

# Monitoring

- `stdout` - `tail -f /tmp/dev.zoid.calibre-backup-zx.out`
- `stderr` - `tail -f /tmp/dev.zoid.calibre-backup-zx.err`

# Restore

To restore, you can use one the following commands

- `aws s3 sync s3://<bucket> <local-folder>`, [docs](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html#examples)
- `aws s3 cp s3://<bucket> <local-folder> --recursive` [docs](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)

# Notes

- `aws s3 sync` doesn't remove files from the S3 bucket. It is add only.
