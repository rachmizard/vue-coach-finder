import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const state = {
    coaches: [],
    coach: null,
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
    }
}

const actions = {
    registerCoach: ({ commit }, payload) => {
        const mapping = {
            id: uuidv4(),
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            areas: payload.areas,
            description: "",
            hourlyRate: 0,
            photoUrl: 'https://picsum.photos/seed/' + uuidv4() + '/200/300',
        }

        return axios.put(`https://vue-coach-956f1.firebaseio.com/coaches/${mapping.id}.json`, mapping).then(() => {
            commit('REGIST_COACH', mapping)
        });
    },
    getDetailCoach: ({ commit }, id) => {
        return axios.get(`https://vue-coach-956f1.firebaseio.com/coaches/${id}.json`).then((res) => {
            commit('SET_COACH', res.data)
        });
    },
    setCoaches: ({ commit }) => {
        return axios.get('https://vue-coach-956f1.firebaseio.com/coaches.json')
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
            });
    }
}

const getters = {
    getCoaches: (state) => {
        return state.coaches;
    },
    getCoach: (state) => {
        return state.coach;
    }
}

export default { state, mutations, actions, getters }