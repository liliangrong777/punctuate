import { DEFAULT_CHARACTER } from './constants';
import { PunctuateReplacer } from './punctuate';
import { replaceByMap, replaceByPredefined } from './utils';
export {
  PunctuateReplacer,
  replaceByMap as replacePunctuateByMap,
  replaceByPredefined as replacePunctuate,
  DEFAULT_CHARACTER
}

import type { Replacer } from './utils';
export type { Replacer }
