# Repository Cleanup Checklist

## Files to Remove (Old/Unnecessary):
- [ ] `Data Science CV Aug 2024.txt` - Old CV text file
- [ ] `backup_text.txt` - Backup file no longer needed
- [ ] `styles.css` - Old CSS file (replaced by Tailwind)
- [ ] `main.js` - Old JavaScript file (functionality moved to Jekyll)
- [ ] `NEXT_STEPS.md` - Temporary file, no longer needed
- [ ] `terminal-execution-rule.md` - Move to documentation folder

## Files to Keep:
- ✅ `index.md` - New Jekyll homepage
- ✅ `_config.yml` - Jekyll configuration
- ✅ `Gemfile` - Ruby dependencies
- ✅ `package.json` - Node.js dependencies
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `SETUP_TROUBLESHOOTING.md` - Important documentation
- ✅ All `_layouts`, `_includes`, `assets` folders

## Commands to Run:
```bash
# Remove old files
rm "Data Science CV Aug 2024.txt"
rm backup_text.txt
rm styles.css
rm main.js
rm NEXT_STEPS.md

# Move documentation
mkdir -p docs
mv terminal-execution-rule.md docs/

# Add all changes
git add .

# Commit changes
git commit -m "Phase 1A complete: Jekyll 4.4 + Tailwind CSS setup

- Remove old static files (styles.css, main.js)
- Add Jekyll layouts and configuration
- Add Tailwind CSS build system
- Add GitHub Actions deployment workflow
- Update .gitignore for Jekyll project
- Add comprehensive troubleshooting documentation"

# Push to development branch
git push origin website-enhancement
```
