const env = require('dotenv').config().parsed
const fs = require('fs')
var path = require('path')

module.exports = {
    async renderHTML(selectedTemplate, data) {
        let templatePath = env.PATH + "/template2.html"
        try {
            let getPath = process.cwd() + "/src/templates/";
            let getTemplatePath = getPath + selectedTemplate;
            let rawdata = fs.readFileSync(path.resolve(getTemplatePath + "/config.json"));
            let getProperties = JSON.parse(rawdata);
            let template = fs.readFileSync(getTemplatePath + "/template.txt", 'utf8')
            for (var key of Object.keys(getProperties)) {
                if (getProperties[key].variables){
                    for(var x = 0; x < getProperties[key].variables.length; x++){
                        console.log(getProperties[key].variables[x]);
                        template = template.replace("${" + getProperties[key].variables[x] + "}", data[getProperties[key]["name"]])
                    }
                }
            }
            fs.writeFileSync(templatePath, template);
        }catch(err){
            throw err
        }
        return templatePath;
    }
}