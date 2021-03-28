const env = require('dotenv').config().parsed
const fs = require('fs')
var path = require('path')

let setupTable = async (getTemplatePath, data, config) => {
    let getTableConfig = fs.readFileSync(getTemplatePath + "/table.txt", 'utf8')
    let tableData = [];
    let cache = getTableConfig;
    let total = 0;
    for(var key of Object.keys(data.tableData)){
        cache = getTableConfig
        for(var itemKey of Object.keys(data.tableData[key])){
           cache = cache.replace("${row_" + config[itemKey] + "}", data.tableData[key][itemKey])
           if (itemKey == "price"){
                total = total + parseFloat(data.tableData[key][itemKey].replace(/,/g, '.'))
           }
        }
        tableData[0] = tableData[0] + cache;
    }
    tableData[1] = total;
    return tableData
}

module.exports = {
    async renderHTML(selectedTemplate, data) {
        let files = fs.readdirSync(env.PATH + "/factuur");
        let templatePath = env.PATH + "/template.html"
        let id = 1;
        if (files.length > 0){
            for (let p = 0; p < files.length; p++) {
                id = (files[p].substring(0, 5) - 0) + 1;
                console.log(files[p].substring(0, 5))
            }
        }
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
            if (getProperties[key].type === "identifier"){
                template = template.replace("${" + getProperties[key].title + "}", id)
            }
            if(getProperties[key].type === "date"){
                var today = new Date();
                var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                template = template.replace("${date}", date)
            }
            if (getProperties[key].type === "table"){
                let getTableData = await setupTable(getTemplatePath, data, getProperties[key].variables)
                template = template.replace("${" + getProperties[key].title + "}", getTableData[0])
                template = template.replace("${subtotal}", `&euro; ${getTableData[1].toFixed(2)}`)
                let getbtw = (getTableData[1] * 0.21).toFixed(2);
                template = template.replace("${btw}", `&euro; ${getbtw}`)
                template = template.replace("${total}", `&euro; ${(parseFloat(getTableData[1]) + parseFloat(getbtw)).toFixed(2)}`)
            }
        }
        fs.writeFileSync(templatePath, template);

        return templatePath;
    }
}