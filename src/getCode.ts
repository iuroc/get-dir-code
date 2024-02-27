import { readFileSync, readdirSync, statSync } from 'fs'
import { extname, join } from 'path'
import ignore from 'ignore'

/** 从指定目录中提取代码并合并为一个字符串
 * @param dir 需要提取的根目录
 * @param exts 需要筛选的文件后缀，默认值 `['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']`
 * @param exclude 排除项，使用 `.gitignore` 规则，默认值 `['package-lock.json', 'package.json', 'LICENSE', '.gitignore']`
 */
export const getCode = (
    dir: string,
    exts: string[] = [],
    exclude: string[] = []
): { code: string, line: number } => {
    if (exts.length == 0) exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']
    if (exclude.length == 0) exclude = ['package-lock.json', 'package.json', 'LICENSE', '.gitignore']
    const files = getFiles(dir, exts, exclude)
    let code = ''
    let line = 0
    files.forEach(file => {
        const content = readFileSync(file).toString().trim()
        const thisLine = content.split('\n').length
        code += content + '\n'
        line += thisLine
        console.log(thisLine, '\t', file)
    })
    code = code.trim()
    return { code, line }
}

export const removeSpace = (code: string) => {
    return code.replace(/[\n\s*]+/g, '\n').trim()
}

/**
 * 遍历获取文件列表
 * @param rootDir 需要提取的根目录
 * @param exts 需要筛选的文件后缀，以 `.` 开头
 * @param exclude 排除项，使用 `.gitignore` 规则
 * @returns 
 */
export const getFiles = (
    rootDir: string,
    exts: string[] = [],
    exclude: string[] = [],
): string[] => {
    const stack: string[] = [rootDir]
    const files: string[] = []
    const ig = ignore().add(exclude)
    while (stack.length > 0) {
        const thisDir = stack.pop() as string
        for (const name of readdirSync(thisDir)) {
            const subPath = join(thisDir, name)
            if (ig.ignores(subPath.slice(4))) continue
            else if (statSync(subPath).isDirectory()) stack.push(subPath)
            else if (!exts.includes(extname(subPath))) continue
            else files.push(subPath)
        }
    }
    return files
}