import pino from 'pino'

export const logger = pino.default({
  level: 'info',
  formatters: {
    bindings: () => {
      return {}
    },
  },

  ...process.env.SERVICE_ENV === 'development' ? {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  } : {},
})
