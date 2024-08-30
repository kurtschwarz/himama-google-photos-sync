import { Command } from 'commander'

const program = new Command()
  .option('-s, --session-id <id>', 'HiMama session id')

export { program }
export default program
