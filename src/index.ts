#! /usr/bin/env node
import { findCombo, allSwatches, randomCombo, formatCombo } from "./utils.js";
import chalk from "chalk";
import yargs from "yargs/yargs";

let args = yargs(process.argv.slice(2))
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
    let swatches: any = allSwatches();

    for (let i = 0; i < swatches.length; i++) {
        console.log(
            swatches[i].name.padEnd(25, " ") +
                " " +
                swatches[i].hex +
                " " +
                chalk.bgHex(swatches[i].hex)("    ")
        );
    }
}
if (args.random) {
    let random = randomCombo();
    formatCombo(random);
} else {
    if (col != "") {
        let colURL = args._.slice(0, 2).join("-");
        colURL = "https://sanzowada.app/swatch/" + colURL;

        formatCombo(findCombo(col.toLowerCase()));
    } else {
        console.log("error: missing color to search");
        console.log(
            "Enter a color or use " +
                chalk.bold("--help") +
                " " +
                "for a list of options"
        );
    }
}
