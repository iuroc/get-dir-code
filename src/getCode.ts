import { readFileSync, readdirSync, statSync } from 'fs'
import { extname, join, resolve } from 'path'
import ignore from 'ignore'

/** 从指定目录中提取代码并合并为一个字符串 */
export const getCode = (
    /** 需要提取的根目录 */
    rootDir: string,
    config?: {
        /** 需要筛选的文件后缀，默认值 `['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']` */
        exts?: string[]
        /** 排除项，使用 `.gitignore` 规则，默认值 `['package-lock.json', 'package.json', 'LICENSE', '.gitignore', '.git/', 'node_modules/', 'tsconfig.json', 'vite.config.*']` */
        exclude?: string[]
        /** 是否打印日志 */
        log?: boolean
    },
): { code: string, line: number } => {
    if (!config) config = {}
    if (!config.exts || config.exts.length == 0) config.exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']
    if (!config.exclude || config.exclude.length == 0) config.exclude = ['package-lock.json', 'package.json', 'LICENSE', '.gitignore', '.git/', 'node_modules/', 'tsconfig.json', 'vite.config.*']
    const files = getFiles(rootDir, config.exts, config.exclude)
    let code = ''
    let line = 0
    files.forEach(file => {
        const content = readFileSync(file).toString().trim()
        const thisLine = content.split('\n').length
        code += content + '\n'
        line += thisLine
        if (config?.log) console.log(thisLine, '\t', file)
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
    rootDir = resolve(rootDir)
    const stack: string[] = [rootDir]
    const files: string[] = []
    const ig = ignore().add(exclude)
    while (stack.length > 0) {
        const thisDir = stack.pop() as string
        for (const name of readdirSync(thisDir)) {
            const subPath = join(thisDir, name)
            if (ig.ignores(subPath.slice(rootDir.length + 1))) continue
            else if (statSync(subPath).isDirectory()) stack.push(subPath)
            else if (exts.length > 0 && !exts.includes(extname(subPath))) continue
            else files.push(subPath)
        }
    }
    return files
}