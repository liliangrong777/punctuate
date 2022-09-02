type Replacer = Record<string, string>

const generateReplaceReg = (replacer: Replacer) => {
  let pattern = '';
  for (const key in replacer) {
    if (Object.hasOwnProperty.call(replacer, key)) {
      let value = key;
      const isMetaCharacters = '$()*+.?[\\^{|'.includes(value);
      if (isMetaCharacters) value = '\\' + value;
      pattern += pattern === '' ? value : '|' + value;
    }
  }
  return new RegExp(pattern, 'g');
};

export {
  generateReplaceReg,
  Replacer
};

