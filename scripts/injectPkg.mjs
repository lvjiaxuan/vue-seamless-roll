import fs from 'node:fs'
import { URL, fileURLToPath } from 'node:url'


const root = fileURLToPath(new URL('./../', import.meta.url))

const pkgJson = {
  name: 'vue-seamless-roll',
  exports: {
    '.': {
      types: './index.d.ts',
      require: './index.cjs',
      import: './index.mjs',
    },
  },
  main: './index.cjs',
  module: './index.mjs',
  types: './index.d.ts',
}

fs.writeFileSync(`${ root }/dist/package.json`, JSON.stringify(pkgJson, null, 2), { encoding: 'utf-8' })
