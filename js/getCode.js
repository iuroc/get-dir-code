"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.removeSpace = exports.getCode = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ignore_1 = require("ignore");
/** 从指定目录中提取代码并合并为一个字符串 */
var getCode = function (
/** 需要提取的根目录 */
rootDir, config) {
    if (!config)
        config = {};
    if (!config.exts || config.exts.length == 0)
        config.exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json'];
    if (!config.exclude || config.exclude.length == 0)
        config.exclude = ['package-lock.json', 'package.json', 'LICENSE', '.gitignore', '.git/', 'node_modules/', 'tsconfig.json', 'vite.config.*'];
    var files = (0, exports.getFiles)(rootDir, config.exts, config.exclude);
    var code = '';
    var line = 0;
    files.forEach(function (file) {
        var content = (0, fs_1.readFileSync)(file).toString().trim();
        var thisLine = content.split('\n').length;
        code += content + '\n';
        line += thisLine;
        if (config === null || config === void 0 ? void 0 : config.log)
            console.log(thisLine, '\t', file);
    });
    code = code.trim();
    return { code: code, line: line };
};
exports.getCode = getCode;
var removeSpace = function (code) {
    return code.replace(/[\n\s*]+/g, '\n').trim();
};
exports.removeSpace = removeSpace;
/**
 * 遍历获取文件列表
 * @param rootDir 需要提取的根目录
 * @param exts 需要筛选的文件后缀，以 `.` 开头
 * @param exclude 排除项，使用 `.gitignore` 规则
 * @returns
 */
var getFiles = function (rootDir, exts, exclude) {
    if (exts === void 0) { exts = []; }
    if (exclude === void 0) { exclude = []; }
    rootDir = (0, path_1.resolve)(rootDir);
    var stack = [rootDir];
    var files = [];
    var ig = (0, ignore_1.default)().add(exclude);
    while (stack.length > 0) {
        var thisDir = stack.pop();
        for (var _i = 0, _a = (0, fs_1.readdirSync)(thisDir); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var subPath = (0, path_1.join)(thisDir, name_1);
            if (ig.ignores(subPath.slice(rootDir.length + 1)))
                continue;
            else if ((0, fs_1.statSync)(subPath).isDirectory())
                stack.push(subPath);
            else if (exts.length > 0 && !exts.includes((0, path_1.extname)(subPath)))
                continue;
            else
                files.push(subPath);
        }
    }
    return files;
};
exports.getFiles = getFiles;
