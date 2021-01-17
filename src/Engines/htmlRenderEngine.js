const env = require('dotenv').config().parsed
const fs = require('fs')
var path = require('path')

let setupTable = async (getTemplatePath, data, config) => {
    let getTableConfig = fs.readFileSync(getTemplatePath + "/table.txt", 'utf8')
    let tableData = "";
    let cache = getTableConfig;
    for(var key of Object.keys(data.tableData)){
        cache = getTableConfig
        for(var itemKey of Object.keys(data.tableData[key])){
           cache = cache.replace("${row_" + config[itemKey] + "}", data.tableData[key][itemKey])
        }
        tableData = tableData + cache;
    }
    console.log(tableData);
    return tableData
}

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
                        template = template.replace("${" + getProperties[key].variables[x] + "}", data[getProperties[key]["name"]])
                    }
                }
                if (getProperties[key].type === "table"){
                    let getTableData = await setupTable(getTemplatePath, data, getProperties[key].variables)
                    template = template.replace("${" + getProperties[key].title + "}", getTableData)
                }
            }
            fs.writeFileSync(templatePath, template);

        }catch(err){

            throw err
            
        }

        return templatePath;
    }
}