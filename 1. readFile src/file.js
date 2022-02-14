const fs = require('fs')
const path = require('path')

console.log(path.resolve(__dirname,'../..','abc.txt'))
console.log(path.join(__dirname,'../..','abc.txt'))
console.log(path.basename(__dirname))
console.log(path.basename('a/b/c.txt'))

fs.readFile(path.resolve(__dirname,'./abc.txt'),'utf-8',(error,dataStr) => {

    if (error) return console.log('readfile error')
    const arr = dataStr.split(' ');
    const newarr = [];
    arr.forEach((item) => {
        newarr.push(item.replace('=',':'))
    })
    const newcxt = newarr.join('\r\n')
    fs.writeFile(path.resolve(__dirname,'./newabc.txt'),newcxt,(error) => { 
        if (error) return console.log('writefile error')
    })
})