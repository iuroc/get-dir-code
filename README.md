# 目录代码提取与合并工具

## 安装

```bash
npm i get-dir-code
```

## 合并代码

```typescript
import { getCode } from 'get-dir-code'

// 需要提取代码的根目录
const targetDir = 'D:/MyCode/Project01'
// 获取合并结果
const codeData = getCode(targetDir)
// 合并后的代码字符串
const codeStr = codeData.code
// 合并后的代码总行数
const codeLine = codeData.line
```

### 筛选文件后缀

```typescript
const exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']
const codeData = getCode(targetDir, exts)
```

### 排除项

```typescript
const exclude = ['package-lock.json', 'package.json', 'LICENSE', '.gitignore']
const codeData = getCode(targetDir, [], exclude)
```

## 递归获取文件列表

```typescript
import { getFiles } from 'get-dir-code'

const rootDir = 'D:/MyCode/Project01'
const files = getFiles(rootDir)

// 和 getCode 方法一致，支持筛选文件后缀和设置排除项
// getFiles(rootDir, ['.ts', '.js', '.html'])
// getFiles(rootDir, ['.ts', '.js', '.html'], ['package.json'])
```

## 项目信息

- 作者：爱优鹏科技
- 公众号：爱优鹏网络科技
- 开发日期：2024 年 2 月 28 日