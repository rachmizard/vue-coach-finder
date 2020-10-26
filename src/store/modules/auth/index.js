import axios from 'axios'

const state = {
    isLoggedIn: false,
    user: null,
    credential: null,
    lastFetch: null
}

const mutations = {
    'SET_CREDENTIAL'(state, payload) {
        state.credential = payload
        state.isLoggedIn = true;
    },
    'SET_USER'(state, payload) {
        state.user = payload
    },
    'CLEAR_CREDENTIAL'(state) {
        state.user = null;
        state.isLoggedIn = false;
        state.credential = false;
        window.location.href = '/'
    },
    'SET_FETCH_USER'(state) {
        state.lastFetch = new Date().getTime();
    }
}

const actions = {
    login: ({ commit }, payload) => {
        return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', payload)
            .then(res => {
                commit('SET_CREDENTIAL', res.data);
            })
    },
    signUp: ({ commit }, payload) => {
        const formData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', formData)
            .then(res => {
                commit('SET_CREDENTIAL', res.data);
            })
    },
    setUser: ({ commit, state }) => {
        const request = {
            idToken: state.credential.idToken
        }
        return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', request)
            .then(res => {
                const user = res.data.users[0]
                commit('SET_USER', user);
                commit('SET_FETCH_USER')
            })
    },
    logout: ({ commit }) => {
        commit('CLEAR_CREDENTIAL')
    }
}

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    getAuthUser: (state) => {
        return state.user
    },
    fetchShouldUpdate: (state) => {
        const lastFetch = state.lastFetch
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime()
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
}

export default { state, mutations, actions, getters }