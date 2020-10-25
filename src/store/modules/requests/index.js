const state = {
    requests: []
}

const actions = {
    contachCoach: ({ commit }, payload) => {
        const newRequest = {
            id: Math.random(),
            coachId: payload.coachId,
            userEmail: payload.userEmail,
            message: payload.message
        }
        commit('SAVE_REQUEST', newRequest)
    }
}

const mutations = {
    'SAVE_REQUEST'(state, payload) {
        state.requests.push(payload)
    }
}

const getters = {
    getRequests: (state) => {
        return state.requests;
    }
}

export default { state, actions, mutations, getters }