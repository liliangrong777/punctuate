import { DEFAULT_CHARACTER } from './constants';

type Replacer = Record<string, string | string[]>

const generateReplaceReg = (replacer: Replacer) => {
  if (!validateReplacer(replacer)) throw 'replacer must be an object that value type is string or plain array'
  let pattern = '';
  for (const key in replacer) {
    if (Object.hasOwnProperty.call(replacer, key)) {
      let value = key;
      const isMetaCharacters = '$()*+.?[\\^{|'.includes(value);
      if (isMetaCharacters) value = `\\${value}`;
      pattern += pattern === '' ? value : `|${value}`;
    }
  }
  return new RegExp(pattern, 'g');
};

function validateReplacer(replacer: Replacer): boolean {
  if (typeof replacer !== 'object') return false
  for (const key in replacer) {
    if (Object.prototype.hasOwnProperty.call(replacer, key)) {
      const matcher = replacer[key]
      if (!Array.isArray(matcher) && typeof matcher !== 'string') return false
    }
  }
  return true
}

function replaceByRegAndMap(str: string, replaceReg: RegExp, replaceMap: Replacer) {
  let matchIndex: Record<string, number> = {}
  const result = str.replace(replaceReg, (match) => {
    const matcher = replaceMap[match]
    if (typeof matcher === 'string') return matcher
    if (!matchIndex[match]) matchIndex[match] = 0
    const character = matcher[matchIndex[match]]
    matchIndex[match] = matchIndex[match] < matcher.length - 1 ? matchIndex[match] + 1 : 0
    return character
  });
  matchIndex = null
  return result
}

function replaceByMap(str: string, replacer: Replacer) {
  const reg = generateReplaceReg(replacer)
  return replaceByRegAndMap(str, reg, replacer)
}

export const predefinedReg = {
  EN2ZH: generateReplaceReg(DEFAULT_CHARACTER.EN2ZH),
  ZH2EN: generateReplaceReg(DEFAULT_CHARACTER.ZH2EN),
} as const

function replaceByPredefined(str: string, key: keyof typeof predefinedReg) {
  if (!predefinedReg[key]) throw `Failed to verify key , it must be within [${Object.keys(predefinedReg).join(',')}]`
  return replaceByRegAndMap(str, predefinedReg[key], DEFAULT_CHARACTER[key])
}

export {
  generateReplaceReg,
  replaceByMap,
  replaceByRegAndMap,
  replaceByPredefined,
  Replacer
};

