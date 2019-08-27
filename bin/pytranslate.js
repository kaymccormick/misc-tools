const fs = require('fs');
const axios = require('axios');

function pyTranslate(code) {
const data = { code }
    return axios.post('http://45.79.91.117:7700/ast/pytranslate', { data }).then((response) => {
return response.data.tsCode;
}).catch((error) => {
console.log(error.message);
});
}

let code = '';
if(process.argv.length === 2) {
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
let chunk;
 while ((chunk = process.stdin.read()) !== null) {
 code += chunk;
 }
 });
 process.stdin.on('end', () => {
 pyTranslate(code).then(result => {
 console.log(result);
 });
 });
 } else {
 code = fs.readFileSync(process.argv[2], { 'encoding': 'utf-8' })
 pyTranslate(code).then(result => {
 console.log(result);
 });
}
