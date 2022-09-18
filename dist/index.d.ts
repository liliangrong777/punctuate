declare const DEFAULT_CHARACTER: {
    EN2ZH: {
        '.': string;
        '?': string;
        '!': string;
        ',': string;
        '\\': string;
        ';': string;
        ':': string;
        '~': string;
        '[': string;
        ']': string;
        '{': string;
        '}': string;
        '<': string;
        '>': string;
        '(': string;
        ')': string;
        '|': string;
        '\'': string[];
        '"': string[];
    };
    ZH2EN: {
        '\u3002': string;
        '\uFF1F': string;
        '\uFF01': string;
        '\uFF0C': string;
        '\u3001': string;
        '\uFF1B': string;
        '\uFF1A': string;
        '\uFF5E': string;
        '\u3010': string;
        '\u3011': string;
        '\u300A': string;
        '\u300B': string;
        '\uFF08': string;
        '\uFF09': string;
        '\uFF5C': string;
        '\u300C': string;
        '\u300D': string;
        '\u201C': string;
        '\u201D': string;
        '\u2018': string;
        '\u2019': string;
    };
};

declare type Replacer = Record<string, string | string[]>;
declare function replaceByMap(str: string, replacer: Replacer): string;
declare const predefinedReg: {
    readonly EN2ZH: RegExp;
    readonly ZH2EN: RegExp;
};
declare function replaceByPredefined(str: string, key: keyof typeof predefinedReg): string;

declare class PunctuateReplacer {
    private replaceReg;
    private map;
    static replaceByMap: typeof replaceByMap;
    static replaceByPredefined: typeof replaceByPredefined;
    constructor(replacer: Replacer);
    replace: (str: string) => string;
}

export { DEFAULT_CHARACTER, PunctuateReplacer, Replacer, replaceByPredefined as replacePunctuate, replaceByMap as replacePunctuateByMap };
