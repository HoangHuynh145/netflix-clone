import { useEffect, memo } from 'react'
import Navbar from '../../layouts/navbar/Navbar'
import { motion } from 'framer-motion'
import Banner from '../../layouts/banner/Banner'
import request from '../../services/request'
import Row from '../../components/row/Row'
import Footer from '../../components/footer/Footer'
import datas from '../../data/contactMainViewData'

const Home = ({ title }) => {
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
                location={'home'}
            />
            <Banner
                fetchBannerData={request.fetchTrending}
                type='home'
            />
            <div
                className='row-container'
            >
                <Row
                    id={1}
                    title='Netflix Original'
                    location='home'
                    fecthUrl={request.fetchNetflixOriginals}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={2}
                    title='Trending Now'
                    location='home'
                    fecthUrl={request.fetchTrending}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={3}
                    title='Popular on Netflix'
                    location='home'
                    fecthUrl={request.fecthPopular}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={4}
                    title='Anime'
                    location='home'
                    fecthUrl={request.fetchTvAnimationMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={5}
                    title='Action Movies'
                    location='home'
                    fecthUrl={request.fetchActionMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={6}
                    title='Comedy'
                    location='home'
                    fecthUrl={request.fetchComedyMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={7}
                    title='Drama Movies'
                    location='home'
                    fecthUrl={request.fetchDramaMovies}
                    fectchGenres={request.fetchMoviesGenres}
                />
            </div>
            <Footer datas={datas} type="main-view" />
        </motion.div>
    )
}

export default memo(Home)
