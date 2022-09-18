import type { Replacer } from './utils';
import { generateReplaceReg, replaceByMap, replaceByPredefined, replaceByRegAndMap } from './utils';

export class PunctuateReplacer {
  private replaceReg: RegExp;
  private map: Replacer;
  static replaceByMap = replaceByMap
  static replaceByPredefined = replaceByPredefined
  constructor(replacer: Replacer) {
    this.map = replacer
    this.replaceReg = generateReplaceReg(replacer);
  }
  public replace = (str: string) => {
    return replaceByRegAndMap(str, this.replaceReg, this.map)
  }
}
