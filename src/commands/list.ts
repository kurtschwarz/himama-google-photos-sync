import { program } from '../initializers/commander.js'
import { logger } from '../initializers/logger.js'
import * as himama from '../services/himama/index.js'
import loginCommand from './login.js'

const listCommand = program.command('list')
  .argument('<object>', '')
  .action(async (objectName) => {
    const { sessionId } = program.optsWithGlobals()
    if (sessionId == null) {
      await loginCommand.parseAsync(process.argv)
    }

    if (objectName === 'children') {
      const children = await himama.getChildren(sessionId)

      logger.info(`Found ${children.length} associated with your account:`)

      for (const child of children) {
        logger.info(` * ${child.name} (ID: ${child.id})`)
      }
    }
  })

export { listCommand }
export default listCommand
