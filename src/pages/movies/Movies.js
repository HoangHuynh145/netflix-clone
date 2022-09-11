import { useEffect, memo } from 'react'
import Category from '../../components/category/Category'
import { motion } from 'framer-motion'
import Navbar from '../../layouts/navbar/Navbar'
import request from '../../services/request'
import Banner from '../../layouts/banner/Banner'
import Row from '../../components/row/Row'
import Footer from '../../components/footer/Footer'
import datas from '../../data/contactMainViewData'

const Movies = ({ title }) => {

    useEffect(() => {
        document.title = title
    }, [])

    const defineVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            paddingBottom: '2rem'
        }
    }

    return (
        <motion.div
            variants={defineVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
        >
            <Navbar
                location={'movies'}
            />
            <Category
                fecthGenresUrl={request.fetchMoviesGenres}
                type='movies'
            />
            <Banner
                fetchBannerData={request.fetchMovieDefault}
                type='movies'
            />
            <div
                className='row-container'
            >
                <Row
                    id={1}
                    title='Action Movies'
                    location='movies'
                    fecthUrl={request.fetchActionMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={2}
                    title='Animation Movies'
                    location='movies'
                    fecthUrl={request.fetchAnimationMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={3}
                    title='Thriller Movies'
                    location='movies'
                    fecthUrl={request.fetchThrillerMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={4}
                    title='Romance Movies'
                    location='movies'
                    fecthUrl={request.fetchRomanceMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={5}
                    title='Comedy Movies'
                    location='movies'
                    fecthUrl={request.fetchComedyMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={6}
                    title='Family Movies'
                    location='movies'
                    fecthUrl={request.fetchFamilyMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={7}
                    title='Drama Movies'
                    location='movies'
                    fecthUrl={request.fetchDramaMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />
            </div>
            <Footer datas={datas} type="main-view" />
        </motion.div>
    )
}

export default memo(Movies)