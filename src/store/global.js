const globalActions = {
    // get({ commit }, {resource, id}) {
    //     return new Promise((resolve, reject) =>
    //     {

    //     });
    // },
}

const globalMutations = {
    addItem(state,payload) {
        state[payload.resource].item = payload.result.data
    },
    updateItems(state, payload) {
        state[payload.resource].items = payload.result.data;
    },
    updateItem(state, payload) {
        state[payload.resource].item = payload.result.data;
    }
}

export { globalActions, globalMutations }