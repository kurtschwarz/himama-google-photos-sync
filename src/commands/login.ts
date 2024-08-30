import prompts from 'prompts'

import { program } from '../initializers/commander.js'
import { logger } from '../initializers/logger.js'
import * as himama from '../services/himama/index.js'

const loginCommand = program.command('login')
  .option('-e, --email <email>', 'HiMama account email or username')
  .option('-p, --password <password>', 'HiMama account password')
  .action(async (args) => {
    let { email, password } = program.opts()

    if (!email) {
      email = (await prompts({ name: 'email', type: 'text', message: 'Please enter your HiMama account email or username', })).email
    }

    if (!password) {
      password = (await prompts({ name: 'password', type: 'password', message: 'Please enter your HiMama account password', })).password
    }

    const sessionId = await himama.login(
      email,
      password,
    )

    logger.info(`Your session ID is: ${sessionId}`)
  })

export { loginCommand }
export default loginCommand
