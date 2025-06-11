
# 🎭 My CV E2E Tests

This repository contains end-to-end (E2E) tests for the [My Smart CV](https://my-smart-cv.vercel.app) web application using [Playwright](https://playwright.dev/).

These tests are automatically triggered after a successful deployment to [Vercel](https://vercel.com), ensuring the site works as expected before changes are merged to production.

---

## 🧪 Tech Stack

- 🧱 [Playwright](https://playwright.dev/)
- 💻 Node.js 20+
- 🧰 GitHub Actions (CI/CD)
- 🌐 Vercel (Preview and Production deployments)

---

## 📂 Project Structure

```
my_cv_tests/
├── e2e_tests/             # All Playwright spec files
│   ├── resume.spec.ts     # Example test file
│   └── ...
├── playwright.config.ts   # Playwright test configuration
├── package.json
└── .github/
    └── workflows/
        └── on-vercel-webhook.yml
```

---

## ⚙️ Installation

```bash
# Clone the test repo
git clone https://github.com/usertbera/my_cv_tests.git
cd my_cv_tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## 🚀 Running Tests

### Local (Dev Server)

Make sure your CV app is running locally:

```bash
npm run dev  # in my_cv repo
```

Then in this test repo:

```bash
npx playwright test
```

### Against a Live Deployment (Vercel Preview)

Set the `BASE_URL`:

```bash
BASE_URL=https://your-vercel-preview-url.vercel.app npx playwright test
```

---

## 🔄 CI/CD Workflow

The workflow is triggered when:
- Code is pushed to `dev` or `main` in the `my_smart_cv` repo.
- A Vercel preview deploy is triggered.
- GitHub Action polls for deploy status and triggers tests via `repository_dispatch`.

---

## 🔐 Secrets Required

Set the following **GitHub Secrets** in the test repo:

| Secret Name              | Description                             |
|--------------------------|-----------------------------------------|
| `VERCEL_BYPASS_SECRET`   | Secret to bypass preview auth in Vercel |
| `TEST_REPO_PAT`          | GitHub PAT with repo dispatch access    |

---

## 🛠️ Configuration Tips

- `playwright.config.ts` dynamically uses `BASE_URL` from env.
- CI injects the deploy URL using `client_payload`.

---

## 📸 Screenshots and Reports

View test reports:

```bash
npx playwright show-report
```

---

## 👥 Contributors

- [@usertbera](https://github.com/usertbera) – Maintainer & QA Engineer

---

## 📝 License

MIT License © 2025 User T. Bera
