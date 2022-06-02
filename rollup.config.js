import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  plugins: [resolve(), typescript()],
  input: 'src/index.ts',
  output: {
    dir: 'public/dist',
  },
}
