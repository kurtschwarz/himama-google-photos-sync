import { program } from './initializers/commander.js'

import './commands/list.js'
import './commands/login.js'

async function main(): Promise<void> {
  await program.parseAsync()
}

export default main()
  .catch((error) => {
    process.stderr.write(`${error.message ?? 'unknown error, exiting'}\n\n`)
    process.stderr.write(`${error.stack?.toString()}\n`)
    process.exit(1)
  })
