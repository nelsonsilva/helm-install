<p align="center">
  <a href="https://github.com/nelsonsilva/helm-install/actions"><img src="https://github.com/nelsonsilva/helm-install/workflows/build-test/badge.svg"></a>
</p>

# Helm install GitHub action

This action installs a Helm chart.

## Example usage

```yaml
uses: nelsonsilva/helm-install
with:
  repo: https://chartmuseum.platform.dev.nuxeo.com
  chart: nuxeo
  args: --atomic --timeout 15m
  values: |
    nuxeo:
      image:
        tag: 11.x
```

## Developing

Install the dependencies  
```bash
$ npm install
```

Build and package it for distribution
```bash
$ npm run build
```

If you want to run the action locally you can also use:
```bash
$ npx ts-node src/main.ts
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ git switch -c tmp
$ npm run build
$ git add -f dist
$ npm version minor -f
$ git push origin $(git tag --points-at HEAD)
$ git checkout master
$ git branch -D tmp
```

The action is now published! :rocket:
