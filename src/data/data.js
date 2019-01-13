const fs = require('fs');
const path = require(`path`);
const util = require(`util`);
const readFileAsync = util.promisify(fs.readFile);

const filePath = path.join(process.cwd(), `src/data/products.json`);

module.exports = readFileAsync(filePath, { encoding: 'utf8' })
    .then((data) => {
        console.log(`SUCCSEC READ FILE`);
        const dataToParse = JSON.parse(data);
        return dataToParse;
    })
    .catch((err) => {
        console.log(`ERROR:`, err);
    });
