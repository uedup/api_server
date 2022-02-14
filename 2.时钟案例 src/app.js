const fs = require('fs')
const path = require('path')
const html = ''
fs.readFile(path.join(__dirname,'./index.html'),'utf-8',(error,str) => {
    if(error) return console.log('读取文件错误，请确认文件路径')
    const style = changeStyle(str)
    const script = changeScript(str)
    const html = str
    .replace(regStyle,'<link rel="stylesheet" type="text/css" href="./css.css">')
    .replace(regScript,'<script src="./js.js" type="text/javascript"></script>')

    fs.writeFile(path.resolve(__dirname,'./dist/css.css'),style,(error) => {
        if(error) return console.log('写css文件错误')
    })
    fs.writeFile(path.resolve(__dirname,'./dist/js.js'),script,(error) => {
        if(error) return console.log('写js文件错误')
    })
    fs.writeFile(path.resolve(__dirname,'./dist/home.html'),html,(error) => {
        if(error) return console.log('写css文件错误')
    })
})


const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/
const changeStyle = (str) => {
    const r1 = regStyle.exec(str)
    return r1[0].replace('<style>','').replace('</style>','')
}
const changeScript = (str) => {
    const r1 = regScript.exec(str)
    return r1[0].replace('<script>','').replace('</script>','')
}