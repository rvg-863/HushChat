<div align="center">
<h1>
  HushChat Frontend
  
  [![Stars](https://img.shields.io/github/stars/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/stargazers)
  [![Forks](https://img.shields.io/github/forks/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/network/members)
  [![Pull Requests](https://img.shields.io/github/issues-pr/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/pulls)
  [![Issues](https://img.shields.io/github/issues/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/issues)
  [![Contributors](https://img.shields.io/github/contributors/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/graphs/contributors)
  [![License](https://img.shields.io/github/license/hushchat/for-web?style=flat-square&logoColor=white)](https://github.com/hushchat/for-web/blob/main/LICENSE)
</h1>
The official web client powering https://hushchat.chat/app, built with <a href="https://www.solidjs.com/">Solid.js</a> 💖. <br/>
Track the project roadmap on <a href="https://op.hushchatinternal.com/projects/revolt-for-web/roadmap">OpenProject</a>.
</div>
<br/>

## Development Guide

Before contributing, make yourself familiar with [our contribution guidelines](https://developers.hushchat.chat/developing/contrib/), the [code style guidelines](./GUIDELINES.md), and the [technical documentation for this project](https://hushchat.github.io/for-web/).

Before getting started, you'll want to install:

- [Git](https://git-scm.com/install/)
- [mise-en-place](https://mise.jdx.dev/getting-started.html)

Then proceed to setup:

```bash
# clone the repository
git clone --recursive https://github.com/hushchat/for-web client
cd client

# update submodules if you pull new changes
# git submodule init && git submodule update

# install all packages
mise install:frozen

# build deps:
mise build:deps

# or build a specific dep (e.g. hushchat.js updates):
# pnpm --filter hushchat.js run build

# customise the .env
cp packages/client/.env.example packages/client/.env

# run dev server
mise dev

# run all CI checks locally
mise check
```

Finally, navigate to http://local.revolt.chat:5173.

### Pulling in HushChat's brand assets

If you want to pull in HushChat brand assets after pulling, run the following:

```bash
# update the assets
git -c submodule."packages/client/assets".update=checkout submodule update --init packages/client/assets
```

You can switch back to the fallback assets by running deinit and continuing as normal:

```bash
# deinit submodule which clears directory
git submodule deinit packages/client/assets
```

## Deployment Guide

### Build the app

```bash
# install packages
mise install:frozen

# build dependencies
mise build:deps

# build for web
mise build

# ... when building for HushChat production
mise build:prod
```

You can now deploy the directory `packages/client/dist`.

### Routing Information

The app currently needs the following routes:

- `/login`
- `/pwa`
- `/dev`
- `/discover`
- `/settings`
- `/invite`
- `/bot`
- `/friends`
- `/server`
- `/channel`

This corresponds to [Content.tsx#L33](packages/client/src/index.tsx).