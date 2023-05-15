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
declare const findCombo: (colorToFind: string) => color;
declare const allSwatches: () => swatch[];
declare const randomCombo: () => color;
declare const formatCombo: (color: any) => void;
export { findCombo, allSwatches, randomCombo, formatCombo };
