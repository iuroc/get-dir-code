"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.removeSpace = exports.getCode = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ignore_1 = require("ignore");
/** 从指定目录中提取代码并合并为一个字符串
 * @param dir 需要提取的根目录
 * @param exts 需要筛选的文件后缀，默认值 `['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']`
 * @param exclude 排除项，使用 `.gitignore` 规则，默认值 `['package-lock.json', 'package.json', 'LICENSE', '.gitignore']`
 */
var getCode = function (rootDir, exts, exclude) {
    if (exts === void 0) { exts = []; }
    if (exclude === void 0) { exclude = []; }
    if (exts.length == 0)
        exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json'];
    if (exclude.length == 0)
        exclude = ['package-lock.json', 'package.json', 'LICENSE', '.gitignore'];
    var files = (0, exports.getFiles)(rootDir, exts, exclude);
    var code = '';
    var line = 0;
    files.forEach(function (file) {
        var content = (0, fs_1.readFileSync)(file).toString().trim();
        var thisLine = content.split('\n').length;
        code += content + '\n';
        line += thisLine;
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
    var stack = [rootDir];
    var files = [];
    var ig = (0, ignore_1.default)().add(exclude);
    while (stack.length > 0) {
        var thisDir = stack.pop();
        for (var _i = 0, _a = (0, fs_1.readdirSync)(thisDir); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var subPath = (0, path_1.join)(thisDir, name_1);
            if (ig.ignores(subPath.slice(4)))
                continue;
            else if ((0, fs_1.statSync)(subPath).isDirectory())
                stack.push(subPath);
            else if (!exts.includes((0, path_1.extname)(subPath)))
                continue;
            else
                files.push(subPath);
        }
    }
    return files;
};
exports.getFiles = getFiles;
