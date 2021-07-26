import '@/sass/index.sass'
async function start() {
  return await Promise.resolve('Server working !')
}

start().then(console.log)
