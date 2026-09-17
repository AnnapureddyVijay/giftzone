# 🚀 GiftZone Deployment Guide

Deploy from your laptop to live website in 5 minutes.

---

## Step 1: Prepare Your Code

### 1.1 Create GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Repo name: `giftzone`
3. Description: "Discount gift card marketplace"
4. Choose **Public**
5. Click **Create repository**

### 1.2 Push Code to GitHub

```bash
# Clone this starter repo
git clone <this-repo>
cd giftzone

# Or if you already have it
git init
git add .
git commit -m "Initial GiftZone commit"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/giftzone.git
git branch -M main
git push -u origin main
```

**Your code is now on GitHub!** ✅

---

## Step 2: Update WhatsApp Number

**IMPORTANT:** Before deploying, update your WhatsApp number in the code.

1. Open `pages/index.js`
2. Find line ~35: `const whatsappNumber = '919876543210';`
3. Replace with YOUR WhatsApp number (format: country code + number, no +)
4. Save file
5. Commit and push:
   ```bash
   git add pages/index.js
   git commit -m "Update WhatsApp number"
   git push
   ```

---

## Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub
4. You'll be redirected to Vercel dashboard

### 3.2 Import Your Repository

1. Click **New Project**
2. Click **Import Git Repository**
3. Paste: `https://github.com/YOUR_USERNAME/giftzone`
4. Click **Continue**

### 3.3 Configure & Deploy

1. **Framework Preset**: Next.js (auto-detected ✓)
2. **Root Directory**: `.` (default ✓)
3. **Environment Variables**: Leave empty
4. Click **Deploy** 🚀

**Vercel will build and deploy in ~2 minutes**

---

## Step 4: Your Site is Live! 🎉

Once deployment completes:
- You get a URL like: `https://giftzone-abc123.vercel.app`
- Copy this URL
- Share with friends!
- Test the calculator & WhatsApp integration

---

## Step 5: Auto-Deployments (Magic!)

Now every time you push to GitHub, Vercel auto-deploys:

```bash
# Make changes locally
# Edit pages/index.js (add brand, change discount, etc.)

# Commit and push
git add .
git commit -m "Add new brand"
git push

# Vercel automatically rebuilds & deploys (~2 min)
```

No manual deploy needed anymore! 🎯

---

## Step 6: Custom Domain (Optional, Later)

Once you have traffic:

1. Vercel Dashboard → Select **giftzone** project
2. Go to **Settings** → **Domains**
3. Add your domain (e.g., `giftzone.in`)
4. Update DNS records (Vercel provides instructions)
5. Done!

Cost: ~₹300-500/year

---

## Troubleshooting

### Build Failed?
- Check **Deployments** tab → click failed build
- See error logs
- Most common: typo in code

### Site shows old version?
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or clear browser cache

### WhatsApp button not working?
- Check number format: `919876543210` (no +)
- Test by clicking button on live site

### Need to rollback to old version?
- Vercel Dashboard → **Deployments** tab
- Find the good deployment
- Click **Promote to Production**

---

## Quick Commands Reference

```bash
# Local development
npm run dev              # Start localhost:3000

# Before pushing to GitHub
git add .               # Stage all changes
git commit -m "msg"     # Commit
git push               # Push to GitHub
                       # ↓ Vercel auto-deploys in ~2 min

# Check deployment status
# Go to Vercel Dashboard → Deployments tab
```

---

## Cost Breakdown

| Item | Cost |
|------|------|
| Vercel Hosting | FREE (up to 100 GB bandwidth) |
| GitHub Repo | FREE |
| Custom Domain | ~₹300-500/year (optional) |
| **Total** | **₹0 for V1** |

---

## Next: Add Features (Later)

Once you have customers:

1. **Add Razorpay** — Automatic payment processing
2. **Google Sheets** — Order tracking via webhook
3. **Email** — Automated order confirmations
4. **Inventory DB** — Track stock per denomination

For now: **Keep it simple, validate demand first!**

---

## You're Done! 🚀

Your site is live. Start getting orders!

Questions?
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
