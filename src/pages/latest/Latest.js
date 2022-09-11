import { useEffect, memo } from 'react'
import Navbar from '../../layouts/navbar/Navbar'
import { motion } from 'framer-motion'
import request from '../../services/request'
import Row from '../../components/row/Row'
import Footer from '../../components/footer/Footer'
import datas from '../../data/contactMainViewData'

const Latest = ({ title }) => {

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
                location={'latest'}
            />
            <div
                className='row-container latest'
            >
                <Row
                    id={1}
                    title='Now playing'
                    location='latest'
                    fecthUrl={request.fecthNowPlaying}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={2}
                    title='Popular on Netflix'
                    location='latest'
                    fecthUrl={request.fecthPopular}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={3}
                    title='Upcoming'
                    location='latest'
                    fecthUrl={request.fetchUpcoming}
                    fectchGenres={request.fetchMoviesGenres}
                />

                <Row
                    id={4}
                    title='Top rated'
                    location='latest'
                    fecthUrl={request.fetchTopRate}
                    fectchGenres={request.fetchMoviesGenres}
                />
            </div>
            <Footer datas={datas} type="main-view" />
        </motion.div>
    )
}

export default memo(Latest)