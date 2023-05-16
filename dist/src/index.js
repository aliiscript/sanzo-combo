#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("./utils.js");
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs/yargs"));
let args = (0, yargs_1.default)(process.argv.slice(2))
    .usage("Usage: sanzo-combo <color> \n Usage: sanzo-combo [options]")
    .options({
    all: {
        alias: "a",
        type: "boolean",
        default: false,
        describe: "outputs all swatches",
    },
    random: {
        alias: "r",
        type: "boolean",
        default: false,
        describe: "outputs random color combination",
    },
})
    .parseSync();
const col = args._.slice(0, 2).join(" ");
if (args.all) {
    let swatches = (0, utils_js_1.allSwatches)();
    for (let i = 0; i < swatches.length; i++) {
        console.log(swatches[i].name.padEnd(25, " ") +
            " " +
            swatches[i].hex +
            " " +
            chalk_1.default.bgHex(swatches[i].hex)("    "));
    }
}
else if (args.random) {
    let random = (0, utils_js_1.randomCombo)();
    (0, utils_js_1.formatCombo)(random);
}
else {
    if (col != "") {
        let colURL = args._.slice(0, 2).join("-");
        colURL = "https://sanzowada.app/swatch/" + colURL;
        (0, utils_js_1.formatCombo)((0, utils_js_1.findCombo)(col.toLowerCase()));
    }
    else {
        console.log("error: missing color to search");
        console.log("Enter a color or use " +
            chalk_1.default.bold("--help") +
            " " +
            "for a list of options");
    }
}
