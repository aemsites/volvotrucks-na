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


## Local Development

1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
2. Start the AEM proxy: `aem up` (opens your browser at http://localhost:3000)
3. Run `npm run watch` to start the local development build with automatic rebuilding and sourcemaps enabled.
4. Open the `{repo}` directory in your favorite IDE and start coding :)


## Volvo Design System Setup

1. Configure your local environment to be able to install the Volvo Design System packages. Follow the guide [here](https://developer.designsystem.volvogroup.com/?path=/docs/web-getting-started-installation--docs).
2. Configure your PAT token and email in your user-level `.npmrc` (e.g., `~/.npmrc`), not in the project directory, to avoid authentication issues.
Refer to the [official documentation](https://developer.designsystem.volvogroup.com/?path=/docs/web-discover-more-authentication-azure-devops--docs) for details (2.1 Authentication).

To follow the “Copy the token and base64 encode the string” step from the instructions, you can generate the base64-encoded PAT like this:
```sh
echo -n YOUR_PAT_HERE | base64
```
Use the resulting string as the value for the `_password` field in your `.npmrc`.


## Debugging Production Code Using Local Sourcemaps

Production builds do not include sourcemaps.

To debug a production issue:
1. Check out the exact commit currently deployed to production (usually the latest commit on main, or a specific commit SHA if needed).
2. Build locally (sourcemaps enabled):
```sh
npm run build:dev
```
3. Open the production page in your browser and access its developer tools, then navigate to the panel where source files are displayed (e.g. Sources).
4. Add your local `dist/` folder to the workspace / file system mapping (name varies by browser).

You can then use your local sourcemaps to inspect and debug the original source code behind the minified production files. Depending on the browser, the mapping may happen automatically or may require a manual file-to-file association within the developer tools.
