# Kammari Mahesh - Software Engineer Portfolio

A modern, high-performance, responsive portfolio website crafted for **Kammari Mahesh** (Full Stack Java & Spring Boot Software Engineer, B.Tech CSE 2026).

---

## 📁 Project Directory Structure

```text
kammari-mahesh-portfolio/
│
├── index.html          # Semantic HTML5 single-page application with SEO meta tags
├── css/
│   └── style.css       # Clean, modern CSS3 with Dark/Light themes, Grid & Glassmorphism
├── js/
│   └── script.js       # Pure vanilla JavaScript (O(1) LRU Cache Simulator, Typewriter, Filters)
├── assets/             # Optional location for your photo (profile.jpg) or resume PDF
└── README.md           # Complete documentation & GitHub Pages deployment guide
```

---

## 🚀 How to Deploy 100% Freely on GitHub Pages

GitHub Pages provides **free static web hosting** with an SSL certificate (`https://`). Since this portfolio is built with pure HTML5, CSS3, and Vanilla JavaScript, **no build steps, npm, or servers are needed**. It works instantly.

### 🌟 Method 1: Web Browser (Drag & Drop — No Git Commands Required)
*Ideal if you want to deploy in under 2 minutes directly from your browser.*

1. **Log into GitHub**: Go to [github.com](https://github.com) and log into your account.
2. **Create a New Repository**:
   - Click the **`+`** icon in the top-right corner and select **New repository**.
   - **Repository name**:
     - *Option 1 (Recommended for primary personal site):* Name it `username.github.io` (replace `username` with your exact GitHub username, e.g., `Mahesh-k.github.io`).
     - *Option 2:* Name it `portfolio` (your URL will be `username.github.io/portfolio`).
   - Select **Public** (required for free GitHub Pages).
   - Check **"Add a README file"** (or leave unchecked).
   - Click **Create repository**.
3. **Upload the Files**:
   - In your newly created repository page, click **Add file** -> **Upload files**.
   - Drag and drop:
     - `index.html`
     - The `css` folder (containing `style.css`)
     - The `js` folder (containing `script.js`)
     - The `assets` folder
   - In the "Commit changes" message box, type: `Initial portfolio commit`.
   - Click the green **Commit changes** button.
4. **Enable GitHub Pages**:
   - Go to your repository's **Settings** tab.
   - On the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment > Source**, ensure **Deploy from a branch** is selected.
   - Under **Branch**, select `main` (or `master`) and folder `/(root)`.
   - Click **Save**.
5. **View Your Live Website!**:
   - Wait 30 to 60 seconds. Refresh the Settings > Pages tab.
   - You will see a banner: **"Your site is live at https://<username>.github.io/"**.
   - Click the link to open your live portfolio!

---

### 💻 Method 2: Git Command Line (For Terminal Users)
*If you have `git` installed on your machine:*

```bash
# 1. Navigate to the project folder
cd "C:\Users\K MAHESH\.gemini\antigravity\scratch\kammari-mahesh-portfolio"

# 2. Initialize git repository
git init -b main

# 3. Add all files
git add .

# 4. Commit changes
git commit -m "Deploy Kammari Mahesh professional developer portfolio"

# 5. Link your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/Mahesh-k/Mahesh-k.github.io.git

# 6. Push to GitHub
git push -u origin main
```

Then go to **Repository Settings -> Pages -> Deploy from branch: `main` / `root` -> Save**.

---

## 🛠️ Included Professional Features

- **Flagship Projects**:
  - **High-Performance LRU Cache (Java)**: Strict O(1) constant-time search, insertion, and eviction with custom Doubly Linked List, HashMap, and TTL expiry module. Features a **Live Interactive LRU Simulator** (Capacity 4) on the card!
  - **Indian Sign Language Recognition (Python, OpenCV, LSTM)**: Real-time dynamic video gesture detection using 21 spatial landmarks and recurrent temporal modeling. Features an **Interactive Vision Telemetry & Gesture Simulator**!
  - **Expense Tracker Web App (React.js)**: Single Page Application with centralized state management, responsive Bootstrap & CSS3 styling, and instant financial analytics.
- **Internships Featured**:
  - **Summer Internship 2025 (Six Phrase Education Institutions)**: Java Backend Intern architecting multithreaded bulk ingestion pipelines and JDBC connection pooling.
  - **Hexart.In**: Machine Learning Intern pioneering real-time gesture recognition.
- **Theme Switcher**:
  - Sleek Slate Dark Mode (default) & Crisp Light Mode, saved automatically in localStorage.
- **Interactive Developer Terminal**:
  - Displays instant developer profile, ready-to-test commands, and quick copy button.
- **Contact & Communication**:
  - One-click copy for email (`mahe3759@gmail.com`) and phone (`+91 9703847338`) with toast feedback.
  - Quick contact form with pre-filled `mailto:` email generation.
  - Print/Save as PDF clean stylesheet for immediate offline resume export.
