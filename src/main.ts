async function main(): Promise<void> {}

export default main()
  .catch((error) => {
    process.stderr.write(error.message ?? 'unknown error, exiting')
    process.stderr.write(error.stack?.toString())
    process.exit(1)
  })
