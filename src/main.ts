import { logger } from './initializers/logger.js'
import * as himama from './services/himama/index.js'

async function main(): Promise<void> {
  logger.info('running')
}

export default main()
  .catch((error) => {
    process.stderr.write(error.message ?? 'unknown error, exiting')
    process.stderr.write(error.stack?.toString())
    process.exit(1)
  })
