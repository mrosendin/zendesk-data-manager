# Data Manager

> A Zendesk app for managing account data

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | -------------- | -------------- | --------------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions |

![](./demo.png)

## Table of Contents
- [Development](#development)
  - [Install Dependencies](#install-dependencies)
  - [Run the Development Server](#run-the-development-server)
  - [Build](#build)

## Development

Data Exporter is a Vue.js 2 app built on the Zendesk Apps Framework v2.0.

### Install Dependencies

```
$ npm install
```

### Run the Development Server

Run ZAT (Zendesk App Tools) server. Navigate to `https://subdomain.zendesk.com/agent/apps/data-manager?zat=true`

```
$ cd app && zat server
```

### Build

``` bash
$ npm run build
```

### Publish

Update `version` in `app/manifest.json`

Zip the app:

```
zip -r app.zip app
```

Upload zip on the [Zendesk Developer Portal](https://apps.zendesk.com)