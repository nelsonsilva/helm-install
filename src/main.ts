import {getInput, getState, saveState, setFailed} from '@actions/core'
import {exec} from '@actions/exec'
import {writeFileSync} from 'fs'

const RELEASE_KEY = 'RELEASE'

const GHREPO = process.env['GITHUB_REPOSITORY']?.split('/')[1]

async function run(): Promise<void> {
  try {
    let release = getState(RELEASE_KEY)
    if (release) {
      await exec('helm', ['del', release])
      return
    }
    const repo: string = getInput('repo', {required: true})
    const chart: string = getInput('chart', {required: true})
    const args: string[] = getInput('args', {required: false}).split(' ')
    const values: string = getInput('values', {required: false})

    if (values) {
      writeFileSync('values.yaml', values)
      args.push('-f', 'values.yaml')
    }

    release = `${GHREPO}-${chart}`
    saveState(RELEASE_KEY, release)

    await exec('helm', ['install', '--repo', repo, release, chart, ...args])
  } catch (error) {
    setFailed(error.message)
  }
}

run()
