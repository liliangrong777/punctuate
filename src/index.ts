import { generateReplaceReg } from './utils';
type Replacer = Record<string, string>
export class Punctuate {
  replaceReg: RegExp;
  map: Replacer;

  static generateReplaceReg = generateReplaceReg;

  constructor(replacer: Replacer) {
    this.map = replacer
    this.replaceReg = Punctuate.generateReplaceReg(replacer);
  }

  public replace = (str: string) => str.replace(this.replaceReg, (match) => {
    return this.map[match];
  });
}
