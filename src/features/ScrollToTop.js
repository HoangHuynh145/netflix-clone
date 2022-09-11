import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ModelContext } from '../context/ModelContext'
import { GenresContext } from '../context/GenresContext'

const ScrollToTop = ({ children }) => {
    const location = useLocation()
    const model = useContext(ModelContext)
    const genres = useContext(GenresContext)

    useEffect(() => {
        window.scrollTo({top: 0})
        model.setShowModal(false)
        // Movies
        genres.setSelectedMovieGenres()
        genres.setCateBannerMovieChange(false)
        genres.setCateMovieName()
        // Tv Shows
        genres.setSelectedTvGenres()
        genres.setCateBannerTvChange(false)
        genres.setCateTvName()

    }, [location])

    return (
        <div>
            {children}
        </div>
    )
}

export default ScrollToTop
