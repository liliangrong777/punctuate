# Punctuate

Punctuate is a robust library that can be used to replace punctuation. It has no dependencies, only 2kb, easy to use and supports custom symbols.

## Usage

You will need `Node.js` installed on your system.

```shell
npm i punctuate -S  
```

```javascript
const { replacePunctuateByMap } = require('punctuate')

const text = 'mom said "Knowledge makes humble， ignorance makes proud。"'
const replaceMap = {
  '，': ',',
  '。': '.'
}
const newText = replacePunctuateByMap(text, replaceMap)
console.log(newText); // mom said "Knowledge makes humble, ignorance makes proud."

```

Or manually download and link **punctuate.js** in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/punctuate/dist/):

```html
<script src="https://unpkg.com/punctuate/dist/punctuate.js"></script>
<script>
  const { replacePunctuateByMap } = PunctuateReplace
  const text = 'mom said "Knowledge makes humble， ignorance makes proud。"'
  const replaceMap = {
    '，': ',',
    '。': '.'
  }
  const newText = replacePunctuateByMap(text, replaceMap)
  console.log(newText); // mom said "Knowledge makes humble, ignorance makes proud."
</script>
```

**Predefine**

If you feel that it is too cumbersome to fill in the mapping, punctuate has built-in mapping table for Chinese and English exchange. You just need to use replacePunctuate to pass the replacement keyword in the second parameter.for example:

```javascript
const { replacePunctuate, DEFAULT_CHARACTER } = require('punctuate');
const text = 'mom said "Knowledge makes humble， ignorance makes proud。"'
const newText = replacePunctuate(text, 'ZH2EN')
console.log(newText); // mom said "Knowledge makes humble, ignorance makes proud."
console.log(DEFAULT_CHARACTER) // log predefined map

```

If you want to know which replacement punctuation is predefined, try printing `DEFAULT_CHARACTER`.
