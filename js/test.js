"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var ignore_1 = require("ignore");
var getFiles = function (rootDir, exts, exclude) {
    if (exts === void 0) { exts = []; }
    if (exclude === void 0) { exclude = []; }
    var stack = [rootDir];
    var files = [];
    var ig = (0, ignore_1.default)().add(exclude);
    while (stack.length > 0) {
        /** 取出一个等待遍历的目录 */
        var thisDir = stack.pop();
        for (var _i = 0, _a = (0, fs_1.readdirSync)(thisDir); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            /** 子目录或文件的绝对路径 */
            var subPath = (0, path_1.join)(thisDir, name_1);
            if (ig.ignores(subPath.slice(4)))
                continue;
            else if ((0, fs_1.statSync)(subPath).isDirectory())
                stack.push(subPath);
            else if ((0, path_1.extname)(subPath) && !exts.includes((0, path_1.extname)(subPath)))
                continue;
            else
                files.push(subPath);
        }
    }
    return files;
};
