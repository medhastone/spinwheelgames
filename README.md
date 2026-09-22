# SpinWheelGames 🎯

A high-performance web application for custom spinning wheel games, random pickers, and decision tools with certified cryptographic randomness, custom themes, and preset libraries.

## 🚀 Exporting & Deploying to GitHub from AI Studio

To sync and automatically push this application from **Google AI Studio** to your **GitHub repository**:

1. **Export to GitHub**:
   - In **Google AI Studio Build**, click on the **Settings / Export** menu (top right).
   - Select **Export to GitHub**.
   - Authenticate with your GitHub account and choose or create your destination repository (e.g. `your-username/spin-wheel-games`).

2. **Automated Continuous Integration & Builds**:
   - The included `.github/workflows/deploy.yml` workflow automatically runs on every `git push` to your repository.
   - It installs dependencies, verifies ESLint code quality, and builds the Next.js production bundle.

3. **Deploying Options**:
   - **Vercel / Cloudflare Pages / Cloud Run**: Connect your GitHub repository directly to Vercel or Cloudflare Pages for instant automatic deployments on every commit.
   - **Environment Variables**: Add `GEMINI_API_KEY` to your host's Environment Variables settings if server-side AI functionality is used.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
