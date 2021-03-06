import authApi from '../../../service/authApi'
import commonApi from '../../../service/commonApi'
import router from './../../../router.js'

const initialState = () => ({
    isLoggedIn: false,
    user: {},
    credential: {},
    idToken: null,
    lastFetch: null
})

const state = {
    isLoggedIn: false,
    user: {},
    credential: {},
    idToken: null,
    lastFetch: null
}

const mutations = {
    'SET_CREDENTIAL'(state, payload) {
        state.credential = payload
        state.isLoggedIn = true;
        state.idToken = payload.idToken
    },
    'SET_USER'(state, payload) {
        state.user = payload
    },
    'CLEAR_CREDENTIAL'(state) {
        const initial = initialState()
        Object.keys(initial).forEach(key => { state[key] = initial[key] })
        router.push('/login');
    },
    'SET_FETCH_USER'(state) {
        state.lastFetch = new Date().getTime();
    }
}

const actions = {
    login: ({ commit }, payload) => {
        return authApi.post('/v1/accounts:signInWithPassword?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', payload, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                commonApi.defaults.headers.common['Authorization'] = res.data.idToken;
                commit('SET_CREDENTIAL', res.data);
            })
    },
    signUp: ({ commit }, payload) => {
        const formData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        return authApi.post('/v1/accounts:signUp?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', formData)
            .then(res => {
                commit('SET_CREDENTIAL', res.data);
            })
    },
    setUser: ({ commit, state }) => {
        const request = {
            idToken: state.credential.idToken
        }
        return authApi.post('/v1/accounts:lookup?key=AIzaSyBaZnFV9YtmzM4rXrhsMKF34guNgD0das0', request)
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