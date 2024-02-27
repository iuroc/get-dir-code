"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSpace = exports.getCode = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
/** 从指定目录中提取代码并合并为一个字符串 */
var getCode = function (
/** 待提取的目录 */
dir, 
/** 过滤拓展名，需要以 `.` 开头，如 `.js`、`.ts` */
exts, 
/** 排除的文件名，如 `package.json` */
exclude) {
    if (exts === void 0) { exts = ['.js', '.ts', '.css', '.sass', '.scss', '.html', '.sql', '.json']; }
    if (exclude === void 0) { exclude = ['package-lock.json', 'package.json']; }
    dir = (0, path_1.resolve)(dir);
    var files = (0, fs_1.readdirSync)(dir);
    var code = '';
    var line = 0;
    files.forEach(function (filename) {
        var thisPath = (0, path_1.join)(dir, filename);
        if ((0, fs_1.statSync)(thisPath).isDirectory()) {
            var subData = (0, exports.getCode)(thisPath, exts, exclude);
            if (subData.line > 0) {
                code += subData.code + '\n';
                line += subData.line;
            }
        }
        else if (exts.includes((0, path_1.extname)(filename))
            && !exclude.includes(filename)) {
            var content = (0, fs_1.readFileSync)(thisPath).toString().trim();
            code += content + '\n';
            var thisLine = content.split('\n').length;
            line += thisLine;
            console.log(thisLine, '\t', thisPath);
        }
    });
    return { code: code.trim(), line: line };
};
exports.getCode = getCode;
var removeSpace = function (code) {
    return code.replace(/[\n\s*]+/g, '\n').trim();
};
exports.removeSpace = removeSpace;
