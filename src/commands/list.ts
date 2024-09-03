import { getContext, updateContext } from '../context.js'
import { program } from '../initializers/commander.js'
import { logger } from '../initializers/logger.js'
import * as himama from '../services/himama/index.js'
import loginCommand from './login.js'

const listCommand = program.command('list')
  .argument('<object>', '')
  .action(async (objectName) => {
    const context = getContext()
    if (context.sessionId == null) {
      await loginCommand.parseAsync(process.argv)
    }

    if (objectName === 'children') {
      const children = await himama.getChildren(context.sessionId)

      logger.info(`Found ${children.length} associated with your account:`)

      for (const child of children) {
        logger.info(` * ${child.name} (ID: ${child.id})`)
      }

      updateContext({ children })
    }
  })

export { listCommand }
export default listCommand
