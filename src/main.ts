import { getCode } from './getCode'

const targetDir = '../2.27.2'
const data = getCode(targetDir, {
    log: true,
    exts: [],
    exclude: ['main.ts', 'node_modules']
})

console.log(data.line, data.code.split('\n').length)