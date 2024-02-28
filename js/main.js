"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCode_1 = require("./getCode");
var targetDir = '../2.27.2';
var data = (0, getCode_1.getCode)(targetDir, {
    log: true,
    exts: [],
    exclude: ['main.ts', 'node_modules']
});
console.log(data.line, data.code.split('\n').length);
