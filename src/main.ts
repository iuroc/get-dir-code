import { getCode } from './getCode'

const targetDir = 'C:/Users/ponco/Downloads/tag-collect-master/tag-collect-master'
const data = getCode(targetDir)

console.log(data.line, data.code.split('\n').length)