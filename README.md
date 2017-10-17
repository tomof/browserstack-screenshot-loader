# browserstack-screenshot-loader

This CLI tool is loader for BrowserStack's Screenshot by selenium.

Selenium e2e testing tools have feature that takes screenshot.

Those URLs can be obtained by analyzing the logs that can be acquired by the BrowseStack API. 

This tool gets those URLs and downloads the screenshot image locally.

## Setup

You need to assign BrwoseStack's account information to the environment variable.

```bash
$ export BROWSERSTACK_USERNAME=username
$ export BROWSERSTACK_ACCESS_KEY=access_key
```

## Usage

```bash
node dist/bin/cli.js --help
```
