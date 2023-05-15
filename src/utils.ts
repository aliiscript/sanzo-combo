import colorData from "../data/colors.json";
import chalk from "chalk";

export interface combo {
    comboNumber: number;
    colorNames: string[];
    rgbs: number[];
    hexes: string[];
}

interface color {
    name: string;
    rgb: number[];
    hex: string;
    combinantions: number[];
    combos: combo[];
    uses: number;
}

interface swatch {
    name: string;
    hex: string;
}

const findCombo = (colorToFind: string) => {
    const colors: any = colorData.colors;
    const colorsLength = colorData.colors.length;

    const currentColor: color = {
        name: "",
        rgb: [],
        hex: "",
        combinantions: [],
        combos: [],
        uses: 0,
    };
    let combo: combo = {
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
                let currentCombo: number | undefined =
                    currentColor.combinantions[j];
                // third loop to find all colors
                // for specific combo
                for (let k = 0; k < colorsLength; k++) {
                    let potentialColor: string = colors[k].name;
                    let potentialColorCombo = colors[k].combinations;
                    if (colors[i]?.name != potentialColor) {
                        let color = potentialColorCombo.find(
                            (col: number) => col == currentCombo
                        );
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

const allSwatches = () => {
    const colors: any = colorData.colors;
    // const colorsLength = colorData.colors.length;
    let swatches: swatch[] = [];
    let swatch: swatch = {
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

const randomCombo = () => {
    const colors: any = colorData.colors;
    let randomCol =
        colors[Math.floor(Math.random() * colors.length)].name.toLowerCase();

    return findCombo(randomCol);
};

const formatCombo = (color: any) => {
    const colorRGB = color.rgb;
    let r = colorRGB[0];
    let g = colorRGB[1];
    let b = colorRGB[2];
    if (color.name == "") {
        console.log("Color does not exist, was misspelled or left a space out");
    } else {
        console.log("✨ " + chalk.rgb(r, g, b).bold(color.name) + " ✨");
    }
    let currentCombo: any;
    for (let i = 0; i < color.combos.length; i++) {
        currentCombo = color.combos[i];
        currentCombo.colorNames.unshift(color.name);
        currentCombo.hexes.unshift(color.hex);
        currentCombo.rgbs.unshift(color.rgb);
        for (let j = 0; j < currentCombo.rgbs.length; j++) {
            let names = currentCombo.colorNames;
            let name = names[j];

            let longestName = names.reduce(function (a: string, b: string) {
                return a.length > b.length ? a : b;
            });

            const hexString = currentCombo.hexes[j];
            const paddedHexString = hexString.padStart(0, " ");

            if (j == 0) {
                console.log(
                    chalk.dim("Combo: ") +
                        chalk.italic(currentCombo.comboNumber)
                );
            }
            console.log(
                "   -" +
                    name.padEnd(longestName.length + 1, " ") +
                    " " +
                    paddedHexString +
                    " " +
                    chalk.bgHex(hexString)("    ")
            );
        }
        console.log(" ");
    }
};

export { findCombo, allSwatches, randomCombo, formatCombo };
