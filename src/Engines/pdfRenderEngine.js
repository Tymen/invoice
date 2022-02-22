var path = require('path')
const fs = require('fs')
const utils = require('util')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const puppeteer = require("puppeteer");
const env = require('dotenv').config().parsed
let rawdata = fs.readFileSync("./appSettings.json");
let PATH = JSON.parse(rawdata);
async function getTemplateHtml(templatePath) {

    console.log("Loading template file in memory")
  
    try {
    const invoicePath = path.resolve(templatePath);
        return await readFile(invoicePath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
  
}

module.exports = {

    async renderPDF (templateData) {
        try {
            let data = {};
            getTemplateHtml(templateData[0]).then(async (res) => {
                let files = fs.readdirSync(PATH.path);
                let id = 1;
                let stringId = "";
                if (files.length > 0){
                    for (let p = 0; p < files.length; p++) {
                        id = (files[p].substring(0, 5) - 0) + 1;
                    }
                }
                for (let i = 0; i < (5 - (id.toString()).length); i++) {
                    stringId = stringId + "0";
                }
                console.log("Generating the template")
                const template = hb.compile(res, { strict: true });
                const result = template(data);
                const html = result;
                const browser = await puppeteer.launch({ executablePath: PATH.chrome });
                const page = await browser.newPage();
                
                await page.setContent(html)
                await page.pdf({ path: PATH.path + `/${stringId + id}-${templateData[1]}.pdf`, format: 'A4' })
                await browser.close();
                    console.log("PDF Generated")
                }).catch(err => {
                    console.error(err)
                });

                return "test"

        }catch(err){
            return err
        }
    }
    
}