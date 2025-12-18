# Creating a Standalone Executable App (No Python Required)

## 🎯 Goal
Create a double-clickable executable (.exe for Windows, .apk for Android) with embedded web server and 3D models.

## 📱 SOLUTION 1: Electron App (Windows/Mac/Linux)

### What is Electron?
Electron packages your web app into a native desktop application with a built-in web server. Used by VS Code, Slack, Discord, etc.

### Setup Steps:

#### 1. Initialize Electron Project
```bash
cd standalone-app
npm init -y
npm install electron electron-builder --save-dev
```

#### 2. Create main.js
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'logo.svg')
  });

  mainWindow.loadURL('http://localhost:3000');
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer() {
  const expressApp = express();
  expressApp.use(express.static(__dirname));
  server = expressApp.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

app.on('ready', () => {
  startServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

#### 3. Install Express
```bash
npm install express --save
```

#### 4. Update package.json
```json
{
  "name": "musee-national",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build-win": "electron-builder --win --x64",
    "build-mac": "electron-builder --mac",
    "build-linux": "electron-builder --linux"
  },
  "build": {
    "appId": "com.musee.national",
    "productName": "Musée National 3D",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!node_modules/**/*",
      "node_modules/express/**/*"
    ],
    "win": {
      "target": "nsis",
      "icon": "logo.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

#### 5. Build the Executable
```bash
npm run build-win
```

This creates: `dist/Musée National 3D Setup.exe` (~150MB)

### ✅ Result:
- Single .exe file that users can double-click
- No Python needed
- No browser needed (uses Electron's Chromium)
- Works offline
- Professional installer

---

## 📱 SOLUTION 2: Android APK (WebView App)

### Option A: Using Capacitor (Recommended)

#### 1. Install Capacitor
```bash
cd standalone-app
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Musée National" "com.musee.national"
```

#### 2. Configure capacitor.config.json
```json
{
  "appId": "com.musee.national",
  "appName": "Musée National 3D",
  "webDir": ".",
  "bundledWebRuntime": false
}
```

#### 3. Add Android Platform
```bash
npx cap add android
```

#### 4. Build APK
```bash
npx cap open android
# Then in Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### Option B: Using Cordova
```bash
npm install -g cordova
cordova create MuseeApp com.musee.national "Musée National"
cd MuseeApp
# Copy your files to www/ folder
cordova platform add android
cordova build android --release
```

---

## 🚀 SOLUTION 3: Progressive Web App (PWA) - Easiest!

This is the **BEST** solution for your use case!

### Create service-worker.js
```javascript
const CACHE_NAME = 'musee-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.svg',
  '/artifacts/matou.glb',
  '/artifacts/knife.glb',
  '/artifacts/Louche.glb'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### Create manifest.json
```json
{
  "name": "Musée National 3D",
  "short_name": "Musée 3D",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fdfbf7",
  "theme_color": "#b8860b",
  "orientation": "any",
  "icons": [
    {
      "src": "logo.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ],
  "offline_enabled": true
}
```

### Update index.html (add to <head>)
```html
<link rel="manifest" href="manifest.json">
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
</script>
```

### ✅ Result:
- Works on Android, iOS, Windows, Mac, Linux
- User visits website once → "Install App" button appears
- After install, works 100% offline
- No app store needed
- ~15MB total

---

## 📊 Comparison

| Solution | Windows | Android | Size | Complexity | Offline |
|----------|---------|---------|------|------------|---------|
| **Electron** | ✅ | ❌ | ~150MB | Medium | ✅ |
| **Capacitor/Cordova** | ❌ | ✅ | ~20MB | Medium | ✅ |
| **PWA** | ✅ | ✅ | ~15MB | **Easy** | ✅ |
| **Python Server** | ✅ | ❌ | ~15MB | Easy | ✅ |

---

## 🎖️ MY RECOMMENDATION

### For Your Use Case: **PWA (Progressive Web App)**

**Why?**
1. ✅ Works on Windows AND Android
2. ✅ No compilation needed
3. ✅ Smallest size (~15MB)
4. ✅ Works completely offline
5. ✅ Easy to update
6. ✅ No app store approval needed
7. ✅ One solution for all platforms

**How to share:**
1. Host once on any server (even temporarily)
2. User visits URL
3. Browser shows "Install App" button
4. After install, works forever offline
5. OR: Use the Python server once, install, then delete server

**Alternative for truly zero-dependency:**
Use **Electron** for Windows (creates .exe) and **Capacitor** for Android (creates .apk). This requires Node.js for building, but end users need nothing.

---

## 💡 Next Steps

Would you like me to:
1. ✅ Create a complete PWA version (works everywhere)?
2. ✅ Set up an Electron build configuration?
3. ✅ Create an Android APK using Capacitor?
4. ✅ All of the above?

Let me know which solution you prefer!
