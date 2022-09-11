import ScrollToTop from "./ScrollToTop"
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/login/Login'
import HomePage from '../pages/home/Home'
import RegisterPage from '../pages/register/Register'
import TvSeries from '../pages/tvSeries/TvSeries'
import Movies from "../pages/movies/Movies"
import Latest from "../pages/latest/Latest"
import NotFound from "../pages/notFound/NotFound"
import GetAllUser from '../pages/getAllUser/GetAllUser'
import App from '../App'
import Model from '../components/model/Model'
import { ModelContext } from '../context/ModelContext'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

const MainRoute = () => {
    const model = useContext(ModelContext)
    const user = useSelector(state => state.auth.login?.currentUser)

    return (
        <ScrollToTop>
            <Model showModal={model.showModal} />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/home' element={
                    user ? <HomePage title="Home - Netflix" /> : <NotFound />
                } />
                <Route path='tvShow' element={
                    user ? <TvSeries title="TV Show - Netflix" /> : <NotFound />
                } />
                <Route path='movies' element={
                    user ? <Movies title="Movies - Netflix" /> : <NotFound />
                } />
                <Route path='latest' element={
                    user ? <Latest title="Netflix" /> : NotFound
                } />
                <Route path='admin/allUser' element={user ? <GetAllUser /> : <NotFound />} />
            </Routes>
        </ScrollToTop>
    )
}

export default MainRoute
