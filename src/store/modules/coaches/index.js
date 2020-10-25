import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const state = {
    coaches: []
}

const mutations = {
    'SET_COACHES'(state, payload) {
        state.coaches = payload
    },
    'REGIST_COACH'(state, payload) {
        state.coaches.push(payload);
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

        axios.post(`https://vue-coach-956f1.firebaseio.com/coaches.json`, mapping);

        commit('REGIST_COACH', mapping)
    },
    setCoaches: ({ commit }) => {
        axios.get('https://vue-coach-956f1.firebaseio.com/coaches.json')
        .then(res => {
            const response = res.data
            const coaches = [];
            for(const key in response) {
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
    }
}

export default { state, mutations, actions, getters }