import { globalMutations, globalActions } from '../global';
const fs = require('fs')
const path = require('path');
const { ipcRenderer } = require('electron');
require('dotenv').config()

const state =
{
    template: {
        item: {
        },
        items: {
        },
        result: {

        }
    }
};

const getters = {
    getTemplates: state => state.template.items,
    getTemplate: state => state.template.item,
    getResult: state => state.template.result
};

const actions = {
    get({ commit }, {resource}) {
        return new Promise((resolve, reject) => 
        {
            try {
                let getPath = process.cwd() + "/src/templates/";
                let getTemplates = fs.readdirSync(getPath);
                commit('setItems', 
                {
                    resource: resource,
                    result: getTemplates
                })
                resolve("test")
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    },
    set({ commit }, {resource, data}){
        return new Promise((resolve, reject) => 
        {
            try {
                let getPath = process.cwd() + "/src/templates/";
                let getTemplatePath = getPath + data;
                let rawdata = fs.readFileSync(path.resolve(getTemplatePath + "/config.json"));
                let getTemplate = JSON.parse(rawdata);
                commit("setItem", 
                {
                    resource: resource,
                    result: getTemplate
                })
                resolve(getTemplate)
            }catch(err){
                console.log(err)
                reject(err)
            }
        })
    },
    create({ commit }, {resource, data, selectedTemplate}){
        return new Promise((resolve, reject) => 
        {
            try {
                let getPath = process.cwd() + "/src/templates/";
                let getTemplatePath = getPath + selectedTemplate;
                let rawdata = fs.readFileSync(path.resolve(getTemplatePath + "/config.json"));
                let getProperties = JSON.parse(rawdata);
                let template = null;
                fs.readFile(getTemplatePath + "/template.txt", 'utf8', async function(err, templateData) {
                    if (err) throw err;
                    template = templateData
                    for (var key of Object.keys(getProperties)) {
                        if (getProperties[key].variables){
                            for(var x = 0; x < getProperties[key].variables.length; x++){
                                console.log(getProperties[key].variables[x]);
                                template = template.replace("${" + getProperties[key].variables[x] + "}", data[getProperties[key]["name"]])
                            }
                        }
                    }
                    // let filePath = process.env.TEMPLATE_PATH;
                    await fs.writeFile("E:/Programma's/Documents/A-factuur/template2.html", template, (error) => {
                        console.log(error)
                    });
                    commit('setResult', 
                    {
                        resource: resource,
                        result: template
                    })
                    console.log("done")
                    ipcRenderer.send("renderPDF")
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
    ...globalMutations,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};