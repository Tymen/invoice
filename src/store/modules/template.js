import { globalMutations, globalActions } from '../global';
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