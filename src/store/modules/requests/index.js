import { v4 as uuidv4 } from 'uuid';
import commonApi from '../../../service/commonApi'


const state = {
    requests: []
}

const actions = {
    contactCoach: ({ commit, rootState }, payload) => {
        const newRequest = {
            id: uuidv4(),
            coach: payload.coach,
            userEmail: payload.email,
            userId: rootState.auth.credential.localId,
            message: payload.message,
            isAccepted: false,
            isPaid: false
        }
        return commonApi.post(`/requests.json`, newRequest, { params: { auth: rootState.auth.idToken} }).then(() => {
            commit('SAVE_REQUEST', newRequest)
        })
    },
    setRequests: ({ commit, rootState }) => {
        return commonApi.get('/requests.json', { params: { auth: rootState.auth.idToken } }).then((res) => {
            const response = res.data
            const requests = [];
            for (const key in response) {
                const coach = {
                    id: response[key].id,
                    coach: response[key].coach,
                    userEmail: response[key].userEmail,
                    userId: response[key].userId,
                    message: response[key].message,
                    isAccepted: response[key].isAccepted,
                    isPaid: response[key].isPaid
                };
                requests.push(coach);
            }

            commit('SET_REQUESTS', requests)
        })
    }
}

const mutations = {
    'SAVE_REQUEST'(state, payload) {
        state.requests.push(payload)
    },
    'SET_REQUESTS'(state, payload) {
        state.requests = payload;
    }
}

const getters = {
    getRequests: (state) => {
        return state.requests;
    }
}

export default { state, actions, mutations, getters }