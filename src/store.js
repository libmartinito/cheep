import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            isSignedIn: false
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId
            state.token = payload.token
            state.tokenExpiration = payload.tokenExpiration
        },
        setSignInStatus(state, payload) {
            state.isSignedIn = payload.status
        }
    },
    actions: {
        async signin(context, payload) {
            try {
                let response = await fetch("http://localhost:3333/api/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password
                    })
                })
                response = await response.json()
                context.commit('setUser', {
                    userId: response.user_id,
                    token: response.token,
                    tokenExpiration: response.tokenExpiration
                })
            } catch(error) {
                console.log(error)
            }
        },
        async signup(context, payload) {
            try {
                let response = await fetch("http://localhost:3333/api/auth/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        username: payload.username,
                        handle: payload.handle,
                        bio: payload.bio
                    })
                })
                response = await response.json()
                context.commit('setUser', {
                    userId: response.user_id,
                    token: response.token,
                    tokenExpiration: response.expires_at
                })
            } catch(error) {
                console.log(error)
            }
        },
        loadFromLocalStorage(context) {
            const userId = localStorage.getItem('userid')
            const token = localStorage.getItem('token')
            const tokenExpiration = localStorage.getItem('tokenExpiration')
            const isSignedIn = localStorage.getItem('isSignedIn')

            if(userId && token && tokenExpiration) {
                context.commit('setUser', {
                    userId: userId,
                    token: token,
                    tokenExpiration: tokenExpiration
                })
                context.commit('setSignInStatus', {
                    status: isSignedIn
                })
            }            
        },
        signOut(context) {
            localStorage.clear()
            context.commit('setUser', {
                userId: null,
                token: null,
                tokenExpiration: null
            })
            context.commit('setSignInStatus', {
                status: false
            })
        }
    },
    getters: {
        userid(state) {
            return state.userid
        },
        token(state) {
            return state.token
        },
        tokenExpiration(state) {
            return state.tokenExpiration
        },
        isSignedIn(state) {
            return state.isSignedIn
        }
    }
})

export default store