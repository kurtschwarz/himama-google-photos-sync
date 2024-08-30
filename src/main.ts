import { logger } from './initializers/logger.js'
import * as config from './services/config/index.js'
import * as himama from './services/himama/index.js'

async function main(): Promise<void> {
  logger.info('running')

  himama.login(
    config.require('HIMAMA_EMAIL'),
    config.require('HIMAMA_PASSWORD'),
  )
}

export default main()
  .catch((error) => {
    process.stderr.write(`${error.message ?? 'unknown error, exiting'}\n\n`)
    process.stderr.write(`${error.stack?.toString()}\n`)
    process.exit(1)
  })
