import { globalMutations, globalActions } from '../global';
const fs = require('fs')
const path = require('path');
require('dotenv').config()
const state =
{
    template: {
        item: {
            data:{

            }
        }
    }
};

const getters = {
    getTemplate: state => state.template.item.data,
};

const actions = {
    create({ commit }, {resource, data}){
        return new Promise((resolve, reject) => 
        {
            try {
                let getPath = process.cwd() + "/src/templates/";
                let getTemplates = fs.readdirSync(getPath);
                let getTemplatePath = getPath + getTemplates[0];
                let rawdata = fs.readFileSync(path.resolve(getTemplatePath + "/config.json"));
                let getProperties = JSON.parse(rawdata);
                let template = null;
                let array = [];
                fs.readFile(getTemplatePath + "/template.txt", 'utf8', function(err, data) {
                    if (err) throw err;
                    template = data
                    for (var key of Object.keys(getProperties)) {
                        array.push(getProperties[key].variables)
                    }
                    for(var i = 0; i < array.length; i++){
                        console.log(array[i])
                        if(array[i]){
                            for(var x = 0; x < array[i].length; x++){
                                template = template.replace("${" + array[i][x] + "}", "Offerte")
                            }
                        }
                    }
                    // let filePath = process.env.TEMPLATE_PATH;
                    fs.writeFile("E:/Programma's/Documents/A-factuur/template2.html", template, (error) => {
                        console.log(error)
                    });
                    commit('addItem', 
                    {
                        resource: resource,
                        result: template
                    })
                    console.log("done")
                    console.log(template)
                });
                console.log(data)
                // ipcRenderer.send('test')
                // console.log(body)
                // let filePath = process.env.TEMPLATE_PATH;
                // fs.writeFile(filePath, body, (error) => {
                //     console.log(error)
                // });
                // console.log("done")
                resolve("yeey")
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    },
    ...globalActions
}

const mutations = {
    ...globalMutations
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};