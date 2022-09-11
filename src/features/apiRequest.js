import axios from 'axios'
import { BaseMovieUrl } from '../features/createInstances'
import {
    registerStart,
    registerSuccess,
    registerFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} from '../redux/authSlice'
import {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailed,
} from '../redux/userSlice'
import apiUrl from '../context/constance'

const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post(`${apiUrl}/auth/register`, user)
        dispatch(registerSuccess())
        navigate('/login')
    } catch (error) {
        console.log('Lỗi register', error)
        dispatch(registerFailed())
    }
}

const loginUser = async (user, dispatch, navigate, setErorrMessage) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${apiUrl}/auth/login`, user, {
            withCredentials: true,
            credentials: 'include'
        })
        dispatch(loginSuccess(res.data))
        navigate('/home')
    } catch (error) {
        console.log('Lỗi login', error)
        dispatch(loginFailed())
        setErorrMessage({
            state: true,
            message: error.response.data.message, 
            type: error.response.data.type, 
        })
    }
}

const logoutUser = async(dispatch, userId, navigate, accessToken, axiosJwt) => {
    dispatch(logoutStart())
    try {
        await axiosJwt.post(`${apiUrl}/auth/logout`, userId, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logoutSuccess())
        navigate("/")
    } catch (error) {
        console.log('Lỗi logout')
        dispatch(logoutFailed())
    }
}

const getAllUser = async(dispatch, accessToken, id, page, limit) => {
    dispatch(getAllUserStart())
    try {
        const res = await axios.get(`${apiUrl}/user/${id}?page=${page}&limit=${limit}`, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(getAllUserSuccess(res.data))
    } catch (error) {
        console.log('lỗi get user')
        dispatch(getAllUserFailed())
    }
}

const findUser = async(typeError, setTypeError, user) => {
    try {
        const res = await axios.post(`${apiUrl}/user/find-user`, user)
        console.log(res)
    } catch (error) {
        console.log('lỗi find user', error)
        if(error.response.data.user){
            setTypeError({
                ...typeError,
                nameError: true,
            })
        }

        if(error.response.data.email){
            setTypeError({
                ...typeError,
                emailError: true,
            })
        }
    }
}

// API Movie

// Get all movie
const getMovie = async (setMovie, url) => {
    try {
        const page = Math.ceil(Math.random() * 10)
        const res = await BaseMovieUrl.get(`${url}&page=${page}`)
        setMovie(res.data.results[
            Math.floor(Math.random() * (res.data.results.length - 1))
        ])
    } catch (error) {
        console.log('Error in line 53 apiRequest', error)
    }
}

// Get movie detail
const getMovieDetail = async (movieDetailApi, setTrailerUrlDelay) => {
    try {
        const res = await BaseMovieUrl.get(movieDetailApi)
        const trailerindex = res.data.videos.results.findIndex(video => video.type === 'Trailer')
        console.log("API: ", movieDetailApi)
        console.log(res.data.videos.results)
        console.log(trailerindex)
        setTrailerUrlDelay(res.data.videos.results[trailerindex])
    } catch (error) {
        console.log('Error in line 63 apiRequest', error)
    }
}

// get movie for modal
const getMovieForModal = async (movieDetailApi, setMovie, type) => {
    try {
        const res = await BaseMovieUrl.get(movieDetailApi)
        const trailerindex = res.data.videos.results.findIndex(video => video.type === 'Trailer')
        setMovie({
            details: res.data,
            trailerUrlDelay: res.data.videos.results[trailerindex],
            allCast: res.data.credits.cast,
            mainCast: res.data.credits.cast.slice(0, 3),
            time: type === 'movie' ? res.data.runtime : res.data.number_of_seasons,
            movieYear: type === 'movie' ? res.data.release_date.slice(0, 4) : res.data.first_air_date.slice(0, 4),
            director: type === 'movie' ? res.data.credits.crew : res.data.created_by,
            genres: res.data.genres
        })
    } catch (error) {
        console.log('Error in line 84 apiRequest', error)
    }
}

// get movies for recommned
const getMovieForRecommendation = async (setRecommend, movieApi) => {
    try {
        const page = Math.ceil(Math.random() * 10)
        const res = await BaseMovieUrl.get(`${movieApi}&page=${page}`)
        setRecommend(res.data.results)
    } catch (error) {
        console.log('Error in line 93 apiRequest', error)
    }
}

// get episodes for recommned
const getEpisodesForRecommend = async (setEpisodes, episodesApi, setPosterUrl, setEpiLeght) => {
    try {
        const res = await BaseMovieUrl.get(episodesApi)
        setEpisodes(res.data)
        setPosterUrl(res.data.poster_path)
        setEpiLeght(res.data.episodes.length)
    } catch (error) {
        console.log('Error in line 105 apiRequest', error)
    }
}

// get movies for row
const getMovieForRow = async (movieApi, setMovie) => {
    try {
        let page = Math.ceil(Math.random() * 10)
        let res = await BaseMovieUrl.get(`${movieApi}&page=${page}`)
        if(res.data.total_pages < page){
            page = Math.ceil(Math.random() * res.data.total_pages)
            res = await BaseMovieUrl.get(`${movieApi}&page=${page}`)
        }
        setMovie(res.data.results)
    } catch (error) {
        console.log('Error in line 116 apiRequest', error)
    }
}

//get movies for poster
const getMovieForPoster = async (movieApi, setMovieDetail, setMovieTrailer, setGenres) => {
    try {
        const res = await BaseMovieUrl.get(movieApi)
        setMovieDetail(res.data)
        const trailerindex = res.data.videos.results.findIndex(video => video.type === 'Trailer')
        setMovieTrailer(res.data.videos.results[trailerindex])
        setGenres(res.data.genres.slice(0, 3))
    } catch (error) {
        console.log('Error in line 126 apiRequest', error)
    }
}

//get all genres;
const GetAllGenres = async(setCategories, fecthGenresUrl) => {
    try {
        const res = await BaseMovieUrl.get(fecthGenresUrl)
        setCategories(res.data.genres)
    } catch (error) {
        console.log("Error in line 140 apiRequest", error)
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    findUser,
    getAllUser,
    getMovie,
    getMovieDetail,
    getMovieForModal,
    getMovieForRecommendation,
    getEpisodesForRecommend,
    getMovieForRow,
    getMovieForPoster,
    GetAllGenres
}
