const globalActions = {
    // get({ commit }, {resource, id}) {
    //     return new Promise((resolve, reject) =>
    //     {

    //     });
    // },
}

const globalMutations = {
    setItem(state,payload) {
        state[payload.resource].item = payload.result
    },
    setItems(state,payload) {
        state[payload.resource].items = payload.result
    },
    setResult(state,payload) {
        state[payload.resource].result = payload.result
    },
    updateItems(state, payload) {
        state[payload.resource].items = payload.result.data;
    },
    updateItem(state, payload) {
        state[payload.resource].item = payload.result.data;
    }
}

export { globalActions, globalMutations }