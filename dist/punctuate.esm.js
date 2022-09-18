var EN2ZH = {
    '.': '。',
    '?': '？',
    '!': '！',
    ',': '，',
    '\\': '、',
    ';': '；',
    ':': '：',
    '~': '～',
    '[': '【',
    ']': '】',
    '{': '「',
    '}': '」',
    '<': '《',
    '>': '》',
    '(': '（',
    ')': '）',
    '|': '｜',
    '\'': ['‘', '’'],
    '"': ['“', '”']
};
var ZH2EN = {
    '。': '.',
    '？': '?',
    '！': '!',
    '，': ',',
    '、': '\\',
    '；': ';',
    '：': ':',
    '～': '~',
    '【': '[',
    '】': ']',
    '《': '<',
    '》': '>',
    '（': '(',
    '）': ')',
    '｜': '|',
    '「': '{',
    '」': '}',
    '“': '"',
    '”': '"',
    '‘': '\'',
    '’': '\''
};
var DEFAULT_CHARACTER = {
    EN2ZH: EN2ZH,
    ZH2EN: ZH2EN
};

var generateReplaceReg = function (replacer) {
    if (!validateReplacer(replacer))
        throw 'replacer must be an object that value type is string or plain array';
    var pattern = '';
    for (var key in replacer) {
        if (Object.hasOwnProperty.call(replacer, key)) {
            var value = key;
            var isMetaCharacters = '$()*+.?[\\^{|'.includes(value);
            if (isMetaCharacters)
                value = "\\".concat(value);
            pattern += pattern === '' ? value : "|".concat(value);
        }
    }
    return new RegExp(pattern, 'g');
};
function validateReplacer(replacer) {
    if (typeof replacer !== 'object')
        return false;
    for (var key in replacer) {
        if (Object.prototype.hasOwnProperty.call(replacer, key)) {
            var matcher = replacer[key];
            if (!Array.isArray(matcher) && typeof matcher !== 'string')
                return false;
        }
    }
    return true;
}
function replaceByRegAndMap(str, replaceReg, replaceMap) {
    var matchIndex = {};
    var result = str.replace(replaceReg, function (match) {
        var matcher = replaceMap[match];
        if (typeof matcher === 'string')
            return matcher;
        if (!matchIndex[match])
            matchIndex[match] = 0;
        var character = matcher[matchIndex[match]];
        matchIndex[match] = matchIndex[match] < matcher.length - 1 ? matchIndex[match] + 1 : 0;
        return character;
    });
    matchIndex = null;
    return result;
}
function replaceByMap(str, replacer) {
    var reg = generateReplaceReg(replacer);
    return replaceByRegAndMap(str, reg, replacer);
}
var predefinedReg = {
    EN2ZH: generateReplaceReg(DEFAULT_CHARACTER.EN2ZH),
    ZH2EN: generateReplaceReg(DEFAULT_CHARACTER.ZH2EN)
};
function replaceByPredefined(str, key) {
    if (!predefinedReg[key])
        throw "Failed to verify key , it must be within [".concat(Object.keys(predefinedReg).join(','), "]");
    return replaceByRegAndMap(str, predefinedReg[key], DEFAULT_CHARACTER[key]);
}

var PunctuateReplacer = /** @class */ (function () {
    function PunctuateReplacer(replacer) {
        var _this = this;
        this.replace = function (str) {
            return replaceByRegAndMap(str, _this.replaceReg, _this.map);
        };
        this.map = replacer;
        this.replaceReg = generateReplaceReg(replacer);
    }
    PunctuateReplacer.replaceByMap = replaceByMap;
    PunctuateReplacer.replaceByPredefined = replaceByPredefined;
    return PunctuateReplacer;
}());

export { DEFAULT_CHARACTER, PunctuateReplacer, replaceByPredefined as replacePunctuate, replaceByMap as replacePunctuateByMap };
