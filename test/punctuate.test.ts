import { PunctuateReplacer, replacePunctuateByMap } from '../src'
import { DEFAULT_CHARACTER } from '../src/constants'
import type { Replacer } from '../src/utils';
import { replaceByPredefined } from '../src/utils'

const testedZhSentence = '人生不如意事十之八九,凡事不必太过认真,不要太过强求."得知坦然,失之淡然,争之必然,顺其自然."一切随缘,顺其自然就好.命里有时终须有,命里无时莫强求.的确,这是一个尔虞我诈,充满竞争的社会,适者生存,不适者淘汰.'
const expectZhSentence = '人生不如意事十之八九，凡事不必太过认真，不要太过强求。“得知坦然，失之淡然，争之必然，顺其自然。”一切随缘，顺其自然就好。命里有时终须有，命里无时莫强求。的确，这是一个尔虞我诈，充满竞争的社会，适者生存，不适者淘汰。'
const testedEnSentence = 'mom said "Knowledge makes humble， ignorance makes proud。"'
const expectEnSentence = 'mom said "Knowledge makes humble, ignorance makes proud."'
describe('测试PunctuateReplace', () => {
  let enText = ''
  let zhText = ''
  beforeEach(() => {
    enText = testedEnSentence
    zhText = testedZhSentence
  })
  afterEach(() => {
    enText = ''
    zhText = ''
  })
  describe('使用构造函数，生成一个替换器实例', () => {
    it('传递map生成一个替换器', () => {
      const punctuate = new PunctuateReplacer(DEFAULT_CHARACTER.EN2ZH)
      const newText = punctuate.replace(testedZhSentence)
      expect(newText).toBe(expectZhSentence)
    })
    it('如果传入的replacer类型错误，则抛出异常', () => {
      const errorReplacer = '.-。'
      const errorMap = { '.': 1 }
      expect(() => new PunctuateReplacer(errorReplacer as unknown as Replacer)).toThrow()
      expect(() => new PunctuateReplacer(errorMap as unknown as Replacer)).toThrow()
    })
  })
  describe('测试使用replacePunctuateByMap传入map对象', () => {
    it('传入预设的DEFAULT_CHARACTER.EN2ZH，DEFAULT_CHARACTER.ZH2EN', () => {
      const newText = replacePunctuateByMap(zhText, DEFAULT_CHARACTER.EN2ZH)
      expect(newText).toBe(expectZhSentence)
      const newText2 = replacePunctuateByMap(enText, DEFAULT_CHARACTER.ZH2EN)
      expect(newText2).toBe(expectEnSentence)
    })
    it('传入自定义map,替换英文逗号和英文句号', () => {
      const customMap = {
        '.': '。',
        ',': '，'
      }
      zhText = '生于忧患,死于安乐.'
      const newText = replacePunctuateByMap(zhText, customMap)
      expect(newText).toBe('生于忧患，死于安乐。')
    })
    it('对于引号这种成对的，map的值使用数组', () => {
      const customMap = {
        '"': ['“', '”']
      }
      zhText = '然则何时而乐耶？其必曰"先天下之忧而忧，后天下之乐而乐"乎！'
      const newText = replacePunctuateByMap(zhText, customMap)
      expect(newText).toBe('然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎！')
    })
  })
  describe('使用replaceByPredefined传入预定义关键字', () => {
    it('预定义关键字包含 EN2ZH、ZH2EN', () => {
      const newText = replaceByPredefined(zhText, 'EN2ZH')
      expect(newText).toBe(expectZhSentence)
      const newText2 = replaceByPredefined(enText, 'ZH2EN')
      expect(newText2).toBe(expectEnSentence)
    })
    it('预定义的关键字目前只有[EN2ZH,ZH2EN]，其他关键字将报错', () => {
      expect(() => replaceByPredefined(zhText, 'WRONG_KEY' as unknown as 'EN2ZH')).toThrow()
    })
  })
})

