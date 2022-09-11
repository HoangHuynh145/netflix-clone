import { createSlice } from '@reduxjs/toolkit'

const autSlice = createSlice({
    name: 'auth',
    initialState: {
        register: {
            isFeching: false,
            error: false,
            success: false,
        },
        login: {
            currentUser: null,
            isFeching: false,
            error: false,
            success: false,
        }
    },
    reducers: {
        // Regiser
        registerStart: (state) => {
            state.register.isFeching = true
        },
        registerSuccess: (state) => {
            state.register.isFeching = false
            state.register.error = false
            state.register.success = true
        },
        registerFailed: (state) => {
            state.register.isFeching = false
            state.register.error = true
            state.register.success = false

        },

        // Login
        loginStart: (state) => {
            state.login.isFeching = true
        },
        loginSuccess: (state, actions) => {
            state.login.isFeching = false
            state.login.error = false
            state.login.currentUser = actions.payload
            state.login.success = true
        },
        loginFailed: (state) => {
            state.register.isFeching = false
            state.login.error = true
            state.login.success = false
        },

        // logout
        logoutStart: (state) => {
            state.login.isFeching = true
        },
        logoutSuccess: (state) => {
            state.login.isFeching = false
            state.login.error = false
            state.login.currentUser = null
            state.login.success = true
        },
        logoutFailed: (state) => {
            state.login.isFeching = false
            state.login.success = false
            state.login.error = true
        }
    }
})

export const {
    registerStart,
    registerSuccess,
    registerFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = autSlice.actions

export default autSlice.reducer
