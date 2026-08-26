import { execFileSync, spawn } from 'node:child_process'

const environment = { ...process.env }

if (!environment.NUXT_CLOUDFLARE_API_TOKEN) {
  try {
    const auth = JSON.parse(execFileSync('npx', ['wrangler', 'auth', 'token', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }))
    if (auth.token) {
      environment.NUXT_CLOUDFLARE_API_TOKEN = auth.token
      console.log('Cloudflare D1: memakai sesi Wrangler lokal (development only).')
    }
  }
  catch {
    console.warn('Cloudflare D1: token tidak ditemukan. Login dengan `npx wrangler login`.')
  }
}

const child = spawn(process.execPath, ['node_modules/nuxt/bin/nuxt.mjs', 'dev', ...process.argv.slice(2)], {
  env: environment,
  stdio: 'inherit',
})

for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal))
child.on('exit', code => process.exit(code ?? 0))
