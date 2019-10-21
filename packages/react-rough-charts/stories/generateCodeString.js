const fs = require('fs')
const path = require('path')

const getContent = fileName => fs.readFileSync(path.join(__dirname, 'example', fileName), 'utf8')

const examples = fs.readdirSync(path.join(__dirname, 'example'))

const result = {

}

examples.forEach((name) => {
  const content = getContent(name)
  result[name.split('.tsx')[0]] = content
})

fs.writeFileSync(path.join(__dirname, './code.json'), JSON.stringify(result))
