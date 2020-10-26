import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const state = {
    requests: []
}

const actions = {
    contactCoach: ({ commit }, payload) => {
        const newRequest = {
            id: uuidv4(),
            coach: payload.coach,
            userEmail: payload.email,
            message: payload.message,
            isAccepted: false,
            isPaid: false
        }
        return axios.put(`https://vue-coach-956f1.firebaseio.com/requests/${newRequest.coach.id}.json`, newRequest).then(() => {
            commit('SAVE_REQUEST', newRequest)
        })
    },
    setRequests: ({ commit }) => {
        return axios.get('https://vue-coach-956f1.firebaseio.com/requests.json').then((res) => {
            const response = res.data
            const requests = [];
            for (const key in response) {
                const coach = {
                    id: response[key].id,
                    coach: response[key].coach,
                    userEmail: response[key].userEmail,
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