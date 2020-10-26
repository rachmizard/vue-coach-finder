import { v4 as uuidv4 } from 'uuid';
import commonApi from '../../../service/commonApi'

const state = {
    coaches: [],
    coach: null,
    lastFetch: null
}

const mutations = {
    'SET_COACHES'(state, payload) {
        state.coaches = payload
    },
    'REGIST_COACH'(state, payload) {
        state.coaches.push(payload);
    },
    'SET_COACH'(state, payload) {
        state.coach = payload
    },
    'SET_FETCH_TIMESTAMP' (state) {
        state.lastFetch = new Date().getTime();
    }
}

const actions = {
    registerCoach: ({ commit, rootState }, payload) => {
        const mapping = {
            id: rootState.auth.credential.localId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            areas: payload.areas,
            description: "",
            hourlyRate: 0,
            photoUrl: 'https://picsum.photos/seed/' + uuidv4() + '/200/300',
        }

        return commonApi.put(`/coaches/${mapping.id}.json`, mapping, { params: { auth: rootState.auth.credential.idToken } }).then(() => {
            commit('REGIST_COACH', mapping)
        });
    },
    getDetailCoach: ({ commit, rootState }, id) => {
        return commonApi.get(`/coaches/${id}.json`, { params: { auth: rootState.auth.credential.idToken } }).then((res) => {
            commit('SET_COACH', res.data)
        });
    },
    setCoaches: ({ commit, getters, rootState }, payload) => {
        if(!payload.forceRefresh && !getters.shouldUpdate) {
            return;
        }

        return commonApi.get('/coaches.json', { params: { auth: rootState.auth.credential.idToken } })
            .then(res => {
                const response = res.data
                const coaches = [];
                for (const key in response) {
                    const coach = {
                        id: response[key].id,
                        firstName: response[key].firstName,
                        lastName: response[key].lastName,
                        email: response[key].email,
                        phone: response[key].phone,
                        areas: response[key].areas,
                        description: response[key].description,
                        hourlyRate: response[key].hourlyRate,
                        photoUrl: response[key].photoUrl
                    };
                    coaches.push(coach);
                }
                commit('SET_COACHES', coaches)
                commit('SET_FETCH_TIMESTAMP')
            }).catch(err => {
                throw err;
            });
    }
}

const getters = {
    getCoaches: (state) => {
        return state.coaches;
    },
    getCoach: (state) => {
        return state.coach;
    },
    shouldUpdate: (state) => {
        const lastFetch = state.lastFetch
        if(!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime()
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
}

export default { state, mutations, actions, getters }