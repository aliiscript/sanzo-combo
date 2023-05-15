"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCombo = exports.randomCombo = exports.allSwatches = exports.findCombo = void 0;
const colors_json_1 = __importDefault(require("../data/colors.json"));
const chalk_1 = __importDefault(require("chalk"));
const findCombo = (colorToFind) => {
    const colors = colors_json_1.default.colors;
    const colorsLength = colors_json_1.default.colors.length;
    const currentColor = {
        name: "",
        rgb: [],
        hex: "",
        combinantions: [],
        combos: [],
        uses: 0,
    };
    let combo = {
        comboNumber: 0,
        colorNames: [],
        rgbs: [],
        hexes: [],
    };
    // first find color wanting to use
    for (let i = 0; i < colorsLength; i++) {
        if (colors[i].name.toLowerCase() == colorToFind) {
            currentColor.name = colors[i].name;
            currentColor.rgb = colors[i].rgb_array;
            currentColor.hex = colors[i].hex;
            currentColor.combinantions = colors[i].combinations;
            currentColor.uses = colors[i].use_count;
            // second loop through its combos
            for (let j = 0; j < currentColor.combinantions.length; j++) {
                let currentCombo = currentColor.combinantions[j];
                // third loop to find all colors
                // for specific combo
                for (let k = 0; k < colorsLength; k++) {
                    let potentialColor = colors[k].name;
                    let potentialColorCombo = colors[k].combinations;
                    if (colors[i]?.name != potentialColor) {
                        let color = potentialColorCombo.find((col) => col == currentCombo);
                        if (color == currentCombo) {
                            combo.comboNumber = color;
                            combo.colorNames.push(potentialColor);
                            combo.rgbs.push(colors[k].rgb_array);
                            combo.hexes.push(colors[k].hex);
                        }
                    }
                }
                currentColor.combos.push(combo);
                combo = {
                    comboNumber: 0,
                    colorNames: [],
                    rgbs: [],
                    hexes: [],
                };
            }
        }
    }
    return currentColor;
};
exports.findCombo = findCombo;
const allSwatches = () => {
    const colors = colors_json_1.default.colors;
    // const colorsLength = colorData.colors.length;
    let swatches = [];
    let swatch = {
        name: "",
        hex: "",
    };
    for (let i = 0; i < colors.length; i++) {
        swatch.name = colors[i].name;
        swatch.hex = colors[i].hex;
        swatches.push(swatch);
        swatch = {
            name: "",
            hex: "",
        };
    }
    return swatches;
};
exports.allSwatches = allSwatches;
const randomCombo = () => {
    const colors = colors_json_1.default.colors;
    let randomCol = colors[Math.floor(Math.random() * colors.length)].name.toLowerCase();
    return findCombo(randomCol);
};
exports.randomCombo = randomCombo;
const formatCombo = (color) => {
    const colorRGB = color.rgb;
    let r = colorRGB[0];
    let g = colorRGB[1];
    let b = colorRGB[2];
    if (color.name == "") {
        console.log("Color does not exist, was misspelled or left a space out");
    }
    else {
        console.log("✨ " + chalk_1.default.rgb(r, g, b).bold(color.name) + " ✨");
    }
    let currentCombo;
    for (let i = 0; i < color.combos.length; i++) {
        currentCombo = color.combos[i];
        currentCombo.colorNames.unshift(color.name);
        currentCombo.hexes.unshift(color.hex);
        currentCombo.rgbs.unshift(color.rgb);
        for (let j = 0; j < currentCombo.rgbs.length; j++) {
            let names = currentCombo.colorNames;
            let name = names[j];
            let longestName = names.reduce(function (a, b) {
                return a.length > b.length ? a : b;
            });
            const hexString = currentCombo.hexes[j];
            const paddedHexString = hexString.padStart(0, " ");
            if (j == 0) {
                console.log(chalk_1.default.dim("Combo: ") +
                    chalk_1.default.italic(currentCombo.comboNumber));
            }
            console.log("   -" +
                name.padEnd(longestName.length + 1, " ") +
                " " +
                paddedHexString +
                " " +
                chalk_1.default.bgHex(hexString)("    "));
        }
        console.log(" ");
    }
};
exports.formatCombo = formatCombo;
