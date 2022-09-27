```
👑 ~/haotian/github/chrome-cookie-ext $ pnpm create @eslint/config
.../Library/pnpm/store/v3/tmp/dlx-11901  |  +40 ++++
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/haotian/Library/pnpm/store/v3
  Virtual store is at:             ../../../Library/pnpm/store/v3/tmp/dlx-11901/node_modules/.pnpm
.../Library/pnpm/store/v3/tmp/dlx-11901  | Progress: resolved 40, reused 39, downloaded 1, added 40, done
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
Packages: +63
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 403, reused 379, downloaded 4, added 63, done

devDependencies:
+ @typescript-eslint/eslint-plugin 5.38.0
+ @typescript-eslint/parser 5.38.0
+ eslint-plugin-react 7.31.8
A config file was generated, but the config file itself may not follow your linting rules.
Successfully created .eslintrc.js file in /Users/haotian/haotian/github/chrome-cookie-ext
👑 ~/haotian/github/chrome-cookie-ext $ 

```


git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:841660202/vite-react-chrome-extension.git
git push -u origin main