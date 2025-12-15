# Deployment Instructions

Your project is located in the `Downloads/3d` folder of your git repository (`C:\Users\pc`).
Because of this, Netlify needs to be told where to look for your code.

## Required Action

1.  Go to your **Netlify Dashboard**.
2.  Select this site.
3.  Go to **Site configuration** > **Build & deploy** > **Continuous deployment**.
4.  Find **Build settings**.
5.  Click **Edit settings**.
6.  Set **Base directory** to: `Downloads/3d`
7.  Save.
8.  Trigger a new deploy (or push a commit).

This will allow Netlify to find the `netlify.toml` and `package.json` files and build your site correctly.
