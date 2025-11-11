# Deployment Guide

## Quick Deploy to Production

```bash
npm run deploy:prod
```

That's it! The script will:
1. ✅ Build your plugin
2. ✅ Create plugin zip with assets
3. ✅ Backup existing plugin on server
4. ✅ Upload new version via SCP
5. ✅ Extract and replace automatically
6. ✅ Set correct permissions

---

## Configuration

The deployment script is configured in `deploy-to-production.sh`:

```bash
# Current Configuration
SSH_KEY="$HOME/.ssh/github_rsa"
REMOTE_USER="root"
REMOTE_HOST="170.64.232.219"
REMOTE_PATH="/home/sellmycell/htdocs/sellmycell.co.nz/wp-content/plugins/"
```

### To Change Settings:

1. Open `deploy-to-production.sh`
2. Edit the configuration variables at the top
3. Save and run `npm run deploy:prod`

---

## Requirements

### SSH Key Setup

Your SSH key should be at: `~/.ssh/github_rsa`

**To check if it exists:**
```bash
ls -la ~/.ssh/github_rsa
```

**If it doesn't exist, you'll need to:**
1. Get the SSH private key from your server admin
2. Save it to `~/.ssh/github_rsa`
3. Set permissions:
   ```bash
   chmod 600 ~/.ssh/github_rsa
   ```

### Test SSH Connection

```bash
ssh -i ~/.ssh/github_rsa root@170.64.232.219
```

If this works, deployment will work!

---

## Troubleshooting

### Error: SSH key not found
```bash
# Check your SSH key location
ls -la ~/.ssh/

# If key is named differently, edit deploy-to-production.sh:
SSH_KEY="$HOME/.ssh/your-actual-key-name"
```

### Error: Permission denied (publickey)
```bash
# Fix key permissions
chmod 600 ~/.ssh/github_rsa

# Or use a different key
ssh -i ~/.ssh/another-key root@170.64.232.219
```

### Error: Build failed
```bash
# Clear node_modules and rebuild
rm -rf node_modules build
npm install
npm run deploy:prod
```

### Deployment succeeds but changes don't appear
1. Go to: https://sellmycell.co.nz/wp-admin/plugins.php
2. Deactivate "Webdune Blocks"
3. Reactivate it
4. Clear browser cache
5. Clear WordPress cache (if using caching plugin)

---

## Manual Deployment (Fallback)

If automated deployment fails:

### Option 1: Create Zip Locally, Upload Manually
```bash
npm run plugin-zip
```
Then upload `webdune-blocks.zip` via WordPress admin.

### Option 2: SCP Only
```bash
npm run plugin-zip
scp -i ~/.ssh/github_rsa webdune-blocks.zip root@170.64.232.219:/home/sellmycell/htdocs/sellmycell.co.nz/wp-content/plugins/
```

Then SSH in and extract manually:
```bash
ssh -i ~/.ssh/github_rsa root@170.64.232.219
cd /home/sellmycell/htdocs/sellmycell.co.nz/wp-content/plugins/
rm -rf webdune-blocks
unzip webdune-blocks.zip
chown -R sellmycell:sellmycell webdune-blocks/
```

---

## Deployment Checklist

Before deploying:
- [ ] All changes committed to git
- [ ] Version number bumped (if needed)
- [ ] Tested locally
- [ ] `npm start` stopped (no build conflicts)

After deploying:
- [ ] Check https://sellmycell.co.nz/wp-admin/plugins.php
- [ ] Deactivate/reactivate plugin (if needed)
- [ ] Test a few blocks on the site
- [ ] Check browser console for errors
- [ ] Clear caches

---

## Backups

Every deployment automatically creates a backup:

**Location**: `/home/sellmycell/backups/webdune-blocks-backup-YYYYMMDD-HHMMSS.zip`

**To restore from backup:**
```bash
ssh -i ~/.ssh/github_rsa root@170.64.232.219
cd /home/sellmycell/htdocs/sellmycell.co.nz/wp-content/plugins/
rm -rf webdune-blocks
unzip /home/sellmycell/backups/webdune-blocks-backup-YYYYMMDD-HHMMSS.zip
```

---

## Security Notes

- SSH key is stored locally (`~/.ssh/github_rsa`)
- Never commit SSH keys to git
- `.gitignore` already excludes `*.pem`, `*.key`, and SSH keys
- Production server should use key-based auth only (no passwords)

---

## Advanced: Deploy to Staging

To create a staging deployment:

1. Copy `deploy-to-production.sh` to `deploy-to-staging.sh`
2. Change the configuration:
   ```bash
   REMOTE_HOST="your-staging-ip"
   REMOTE_PATH="/path/to/staging/plugins/"
   ```
3. Add to `package.json`:
   ```json
   "deploy:staging": "bash deploy-to-staging.sh"
   ```
4. Run: `npm run deploy:staging`

---

## Questions?

Check `START_HERE.md` for more deployment options and troubleshooting tips.

