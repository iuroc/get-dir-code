"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCode_1 = require("./getCode");
var targetDir = 'C:/Users/ponco/Downloads/tag-collect-master/tag-collect-master';
var data = (0, getCode_1.getCode)(targetDir);
console.log(data.line, data.code.split('\n').length);
