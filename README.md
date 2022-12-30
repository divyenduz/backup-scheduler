# Backup Scheduler

Automated and scheduled backup of a folder on macOS to AWS S3 using `launchctl`.

# Setup

1. `cp env.mjs.sample env.mjs` and add values for AWS account ID (defensive check, so global profile changes don't accidently upload to another bucket), local folder, s3 bucket
2. Edit `LaunchAgent-Examples/dev.zoid.calibre-backup-zx.plist` and set correct path for node, index.mjs from your machine
3. `cp ./LaunchAgent-Examples/dev.zoid.calibre-backup-zx.plist ~/Library/LaunchAgents` or use symlink
4. `launchctl load ~/Library/LaunchAgents/dev.zoid.calibre-backup-zx.plist` (If `load` fails, try `unload` and then `load`)

# Monitoring

- `stdout` - `tail -f /tmp/dev.zoid.calibre-backup-zx.out`
- `stderr` - `tail -f /tmp/dev.zoid.calibre-backup-zx.err`

# Notes

I am using this to backup my Calibre library
