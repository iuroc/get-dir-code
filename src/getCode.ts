import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { extname, join, resolve } from 'path'

/** 从指定目录中提取代码并合并为一个字符串 */
export const getCode = (
    /** 待提取的目录 */
    dir: string,
    /** 过滤拓展名，需要以 `.` 开头，如 `.js`、`.ts` */
    exts: string[] = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json'],
    /** 排除的文件名，如 `package.json` */
    exclude: string[] = ['package-lock.json', 'package.json']
): { code: string, line: number } => {
    dir = resolve(dir)
    const files = readdirSync(dir)
    let code = ''
    let line = 0
    files.forEach(filename => {
        const thisPath = join(dir, filename)
        if (statSync(thisPath).isDirectory()) {
            const subData = getCode(thisPath, exts, exclude)
            if (subData.line > 0) {
                code += subData.code + '\n'
                line += subData.line
            }
        } else if (
            exts.includes(extname(filename))
            && !exclude.includes(filename)
        ) {
            const content = readFileSync(thisPath).toString().trim()
            code += content + '\n'
            const thisLine = content.split('\n').length
            line += thisLine
            console.log(thisLine, '\t', thisPath)
        }
    })
    return { code: code.trim(), line }
}

export const removeSpace = (code: string) => {
    return code.replace(/[\n\s*]+/g, '\n').trim()
}