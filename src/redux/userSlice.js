import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFeching: false,
            errors: false,
        },
        messages: ''
    },
    reducers: {

        //get all user
        getAllUserStart: (state) => {
            state.users.isFeching = true
        },
        getAllUserSuccess: (state, actions) => {
            state.users.isFeching = false
            state.users.errors = false
            state.users.allUsers = actions.payload
        },
        getAllUserFailed: (state) => {
            state.users.isFeching = false
            state.users.errors = true
        },

        // Delete user
        deleteUserStart: (state) => {
            state.users.isFeching = true
        },
        deleteUserSuccess: (state, actions) => {
            state.users.isFeching = false
            state.users.errors = false
            state.messages = actions.payload
        },
        deleteUserFailed: (state, actions) => {
            state.users.errors = false
            state.users.isFeching = false
            state.messages = actions.payload
        }
    }
})

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
} = userSlice.actions
export default userSlice.reducer
