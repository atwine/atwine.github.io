# Setup Troubleshooting Guide

## 🚨 Issues Encountered & Solutions

### **Issue 1: Jekyll Version Conflict with github-pages Gem**

**Error:**
```
Could not find compatible versions
Because github-pages >= 117, < 178 depends on jekyll-sass-converter = 1.5.0
and github-pages >= 44, < 147 depends on liquid = 3.0.6,
version solving has failed.
```

**Root Cause:** The `github-pages` gem locks Jekyll to older versions (2.x-3.x) incompatible with Jekyll 4.4.0.

**Solution Applied:**
- Removed `gem "github-pages"` from Gemfile
- Kept `gem "jekyll", "~> 4.4.0"` for modern Jekyll features
- Maintained GitHub Pages compatibility through individual plugins

**Prevention:** Use Jekyll 4.x directly instead of the restrictive `github-pages` gem bundle.

---

### **Issue 2: Deprecated Windows Platform Specifications**

**Error:**
```
[DEPRECATED] Platform :mingw, :x64_mingw, :mswin is deprecated. 
Please use platform :windows instead.
```

**Root Cause:** Gemfile used old platform specifications for Windows gems.

**Solution Applied:**
```ruby
# Before (deprecated)
platforms :mingw, :x64_mingw, :mswin, :jruby do

# After (current)
platforms :windows, :jruby do
```

**Prevention:** Always use `:windows` platform specification for Windows-specific gems.

---

### **Issue 3: WDM Gem Version Mismatch**

**Error:**
```
Could not find gem 'wdm (~> 0.1.1) windows' in locally installed gems.
The source contains the following gems matching 'wdm':
  * wdm-0.2.0
```

**Root Cause:** Gemfile specified outdated WDM version.

**Solution Applied:**
```ruby
# Before
gem "wdm", "~> 0.1.1", :platforms => [:windows]

# After  
gem "wdm", "~> 0.2.0", :platforms => [:windows]
```

**Prevention:** Check available gem versions before specifying constraints.

---

### **Issue 4: File Conflict Warning**

**Warning:**
```
Conflict: The following destination is shared by multiple files.
- index.md
- index.html
```

**Root Cause:** Both `index.md` and `index.html` exist, causing Jekyll confusion.

**Solution Applied:**
- Keep `index.md` for Jekyll processing
- Remove or rename old `index.html`

**Prevention:** Use consistent file naming (prefer `.md` for Jekyll content).

---

## ✅ **Working Configuration**

### **Final Gemfile Structure:**
```ruby
source "https://rubygems.org"

# Jekyll for GitHub Pages compatibility
gem "jekyll", "~> 4.4.0"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
  gem "jekyll-gist"
  gem "jekyll-github-metadata"
end

# Windows dependencies
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
gem "webrick", "~> 1.7"
```

### **Successful Test Results:**
- ✅ Bundle install: SUCCESS
- ✅ Jekyll 4.4.0: WORKING
- ✅ Tailwind CSS build: SUCCESS (453ms)
- ✅ Development server: RUNNING (http://127.0.0.1:4000)
- ✅ LiveReload: CONNECTED

---

## 🛡️ **Prevention Checklist for Future Setups**

1. **Use Jekyll 4.x directly** - Avoid `github-pages` gem for modern features
2. **Update platform specifications** - Use `:windows` instead of deprecated variants
3. **Check gem versions** - Verify available versions before constraining
4. **Clean file conflicts** - Remove duplicate index files
5. **Test incrementally** - Verify each step before proceeding
6. **Document issues** - Keep troubleshooting log for future reference

---

## 📝 **Commands for Clean Setup**

```bash
# 1. Install dependencies
bundle install

# 2. Build CSS
npm run build

# 3. Test server
bundle exec jekyll serve --livereload --port 4000

# 4. Visit: http://localhost:4000
```
