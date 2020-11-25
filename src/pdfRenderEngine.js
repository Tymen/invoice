var path = require('path')
const fs = require('fs')
const utils = require('util')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const puppeteer = require("puppeteer");
const env = require('dotenv').config().parsed

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

    async renderPDF (templatePath) {
        try {
            let data = {};
            getTemplateHtml(templatePath).then(async (res) => {
            console.log("Compiling the template")
            const template = hb.compile(res, { strict: true });
            const result = template(data);
            const html = result;
            const browser = await puppeteer.launch({ executablePath: env.CHROME_PATH });
            const page = await browser.newPage();
            
            await page.setContent(html)
            await page.pdf({ path: env.PATH + "/invoice.pdf", format: 'A4' })
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