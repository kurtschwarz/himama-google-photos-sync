import pino from 'pino'

export const logger = pino.default({
  level: 'info',
  formatters: {
    bindings: () => {
      return {}
    },
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})
