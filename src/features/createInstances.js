import axios from 'axios'
import jwt_decode from 'jwt-decode'
import apiUrl from '../context/constance'

const refreshToken = async () => {
    try {
        const res = await axios.post(apiUrl + "/auth/refresh", {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log('Error in 8 line, createInstances', error)
    }
}

const createAxios = (user, dispatch, stateSuccess) => {
    axios.defaults.withCredentials = true
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date()
            const decodedToken = jwt_decode(user?.accessToken)
            if(decodedToken.exp < date.getTime() / 1000) {
                const data = await(refreshToken())
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken
                }
                dispatch(stateSuccess(refreshUser))
                config.headers['token'] = `Beare ${data.accessToken}`
            }
            return config
        }
    )
    return newInstance
}

// base url for request
const BaseMovieUrl = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export { BaseMovieUrl, createAxios }
