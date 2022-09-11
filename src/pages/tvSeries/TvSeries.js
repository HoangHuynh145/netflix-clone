import { useEffect, memo } from 'react'
import Category from '../../components/category/Category'
import { motion } from 'framer-motion'
import Navbar from '../../layouts/navbar/Navbar'
import request from '../../services/request'
import Banner from '../../layouts/banner/Banner'
import Row from '../../components/row/Row'
import Footer from '../../components/footer/Footer'
import datas from '../../data/contactMainViewData'

const TvSeries = ({ title }) => {

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
                location={'tvShow'}
            />
            <Category
                fecthGenresUrl={request.fetchTvGenres}
                type='tvShows'
            />
            <Banner
                fetchBannerData={request.fetchTvDefault}
                type='tvShows'
            />
            <div
                className='row-container'
            >
                <Row
                    id={1}
                    title='Tv Mystery'
                    location='tvShows'
                    fecthUrl={request.fetchTvMysteryMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={2}
                    title='Tv Action & Adventure'
                    location='tvShows'
                    fecthUrl={request.fetchTvActionMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={3}
                    title='Tv Comedy'
                    location='tvShows'
                    fecthUrl={request.fetchTvComedyMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={4}
                    title='Tv Animation'
                    location='tvShows'
                    fecthUrl={request.fetchTvAnimationMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={5}
                    title='Tv Kids'
                    location='tvShows'
                    fecthUrl={request.fetchTvKidsMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={6}
                    title='Tv Family'
                    location='tvShows'
                    fecthUrl={request.fetchTvFamilyMovies}
                    fectchGenres={request.fetchTvGenres}
                />

                <Row
                    id={7}
                    title='Tv Drama'
                    location='tvShows'
                    fecthUrl={request.fetchTvDramaMovies}
                    fectchGenres={request.fetchTvGenres}
                />
            </div>
            <Footer datas={datas} type="main-view" />
        </motion.div>
    )
}

export default memo(TvSeries)