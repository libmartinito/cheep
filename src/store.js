import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            isSignedIn: false,

            username: "",
            handle: "",
            icon: "",
            bio: "",
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId
            state.token = payload.token
            state.tokenExpiration = payload.tokenExpiration

            state.username = payload.username
            state.handle = payload.handle
            state.icon = payload.icon
            state.bio = payload.bio
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
                    tokenExpiration: response.expires_at,

                    username: response.username,
                    handle: response.handle,
                    icon: response.icon,
                    bio: response.bio
                })
                context.commit('setSignInStatus', {
                    status: true,
                })
    
                localStorage.setItem('userid', response.user_id)
                localStorage.setItem('token', response.token)
                localStorage.setItem('tokenExpiration', response.expires_at)
                localStorage.setItem('isSignedIn', true)
                localStorage.setItem('username', response.username)
                localStorage.setItem('handle', response.handle)
                localStorage.setItem('icon', response.icon)
                localStorage.setItem('bio', response.bio)
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
                    tokenExpiration: response.expires_at,

                    username: response.username,
                    handle: response.handle,
                    icon: response.icon,
                    bio: response.bio,
                })
                context.commit('setSignInStatus', {
                    status: true,
                })
                
                localStorage.setItem('userid', response.user_id)
                localStorage.setItem('token', response.token)
                localStorage.setItem('tokenExpiration', response.expires_at)
                localStorage.setItem('isSignedIn', true)
                localStorage.setItem('username', response.username)
                localStorage.setItem('handle', response.handle)
                localStorage.setItem('icon', response.icon)
                localStorage.setItem('bio', response.bio)
            } catch(error) {
                console.log(error)
            }
        },
        loadFromLocalStorage(context) {
            console.log('what')
            const userId = localStorage.getItem('userid')
            const token = localStorage.getItem('token')
            const tokenExpiration = localStorage.getItem('tokenExpiration')
            const isSignedIn = localStorage.getItem('isSignedIn')

            const username = localStorage.getItem('username')
            const handle = localStorage.getItem('handle')
            const icon = localStorage.getItem('icon')
            const bio = localStorage.getItem('bio')
            
            if(userId && token && tokenExpiration) {
                context.commit('setUser', {
                    userId: userId,
                    token: token,
                    tokenExpiration: tokenExpiration,

                    username: username,
                    handle: handle,
                    icon: icon,
                    bio: bio
                })
                context.commit('setSignInStatus', {
                    status: isSignedIn
                })
            }            
        },
        signout(context) {
            localStorage.clear()
            context.commit('setUser', {
                userId: null,
                token: null,
                tokenExpiration: null,
                isSignedIn: false,
                username: "",
                handle: "",
                icon: "",
                bio: ""
                
            })
            context.commit('setSignInStatus', {
                status: false
            })
        }
    },
    getters: {
        userId(state) {
            return state.userId
        },
        token(state) {
            return state.token
        },
        tokenExpiration(state) {
            return state.tokenExpiration
        },
        isSignedIn(state) {
            return state.isSignedIn
        },
        username(state) {
            return state.username
        },
        handle(state) {
            return state.handle
        },
        icon(state) {
            return state.icon
        },
        bio(state) {
            return state.bio
        },
    }
})

export default store