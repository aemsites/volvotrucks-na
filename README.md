# Volvo Trucks
Helix for Volvo Trucks North America
www.volvotrucks.us

## Environments
### www.volvotrucks.us
- Preview: https://main--volvotrucks-us--volvogroup.aem.page/
- Live: https://main--volvotrucks-us--volvogroup.aem.live/


### www.volvotrucks.ca
- Preview: https://main--volvotrucks-ca--volvogroup.aem.page/
- Live: https://main--volvotrucks-ca--volvogroup.aem.live/


### www.volvotrucks.mx
- Preview: https://main--volvotrucks-mx--volvogroup.aem.page/
- Live: https://main--volvotrucks-mx--volvogroup.aem.live/


## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```

## Local development

1. Configure your local environment to be able to install the Volvo Design System packages.
Follow the guide [here](https://developer.designsystem.volvogroup.com/?path=/docs/web-getting-started-installation--docs)
2. Set the PAT token and accessible email in user level `.npmrc` not project `.npmrc` to avoid authentication issues. Please check [here](https://developer.designsystem.volvogroup.com/?path=/docs/web-discover-more-authentication-azure-devops--docs) for more details

*NOTE:* If on Mac, when requested to install the package `vsts-npm-auth`, please install instead the [better-vsts-npm-auth](https://www.npmjs.com/package/better-vsts-npm-auth)


1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
4. Start AEM Proxy: `aem up` (opens your browser at http://localhost:3000)
5. Open the `{repo}` directory in your favorite IDE and start coding :)

## Best practices using fonts

* We are using [fallback fonts](https://github.com/pixel-point/fontpie) that avoid CLS.
* The fallback fonts are specific to the font family and style (bold, italic etc)
* For this reason, please don't use the font-style properties in css. Instead, use the font family variables defined in `styles/styles.css`
* Eg. instead of using `font-weight: 500`, use `font-family: var(--ff-volvo-novum-medium);`
