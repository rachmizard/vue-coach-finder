import { v4 as uuidv4 } from 'uuid';

const state = {
    requests: []
}

const actions = {
    contactCoach: ({ commit }, payload) => {
        const newRequest = {
            id: uuidv4(),
            coach: payload.coach,
            userEmail: payload.email,
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