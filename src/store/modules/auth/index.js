import axios from 'axios'

const state = {
    isLoggedIn: false,
    user: null,
    credential: null
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
        localStorage.clear();
        window.location.reload();
    }
}

const actions = {
    login: ({ commit }, payload) => {
        return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', payload)
            .then(res => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('idToken', res.data.idToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('expiresIn', res.data.expiresIn);
                commit('SET_CREDENTIAL', res.data);
            })
    },
    setUser: ({ commit }) => {
        if (!localStorage.getItem('idToken')) {
            return;
        }
        const payload = {
            idToken: localStorage.getItem('idToken')
        }
        return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', payload)
            .then(res => {
                const user = res.data.users[0]
                commit('SET_USER', user);
            })
    },
    logout: ({ commit }) => {
        commit('CLEAR_CREDENTIAL')
    }
}

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn && localStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn');
    },
    getAuthUser: (state) => {
        return state.user
    }
}

export default { state, mutations, actions, getters }