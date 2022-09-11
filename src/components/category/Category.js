import './category.scss';
import { useEffect, useState, useContext } from 'react'
import { GetAllGenres } from '../../features/apiRequest'
import { GenresContext } from '../../context/GenresContext'

const Category = ({ fecthGenresUrl, type }) => {
    const [categories, setCategories] = useState([])
    const genresSelect = useContext(GenresContext)
    const [scrollToTop, setScrollToTop] = useState(false)

    useEffect(() => {
        GetAllGenres(setCategories, fecthGenresUrl)
    }, [fecthGenresUrl])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrollToTop(true)
            } else {
                setScrollToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleTvChange = ({
        target: {
            selectedOptions: [{
                dataset: { name, value }
            }]
        }
    }) => {
        genresSelect.setCateTvName(name)
        genresSelect.setCateBannerTvChange(true)
        genresSelect.setSelectedTvGenres(value)
    }

    const handleMoviesChange = ({
        target: {
            selectedOptions: [{
                dataset: { name, value }
            }]
        }
    }) => {
        genresSelect.setCateMovieName(name)
        genresSelect.setCateBannerMovieChange(true)
        genresSelect.setSelectedMovieGenres(value)
    }

    const handleResetGenres = (field) => {
        if (field === 'tvShows') {
            genresSelect.setCateTvName()
            genresSelect.setCateBannerTvChange(false)
            genresSelect.setSelectedTvGenres()
        } else {
            genresSelect.setCateMovieName()
            genresSelect.setCateBannerMovieChange(false)
            genresSelect.setSelectedMovieGenres()
        }

    }

    return (
        <div className={`category-banner ${scrollToTop ? 'active' : ''}`}>

            {/* Tv Shows */}
            {type === 'tvShows' && !genresSelect.cateBannerTvChange ? (
                <div className="genres-select-wrapper">
                    <h2 className="genres-select-title">Tv Shows</h2>
                    <div className="genres-select-box">
                        <select
                            className="genres-select"
                            name="genres"
                            id="genres"
                            value={genresSelect.selectedTvGenres}
                            onChange={handleTvChange}
                        >
                            <option className="genres-option" style={{ display: 'none' }} >Genres</option>
                            {categories?.map(genres => (
                                <option
                                    className="genres-option"
                                    key={genres.id}
                                    data-name={genres.name}
                                    data-value={genres.id}
                                >
                                    {genres.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : type === 'tvShows' && (
                <div className="genres-select-info">
                    <span
                        className="location"
                        onClick={() => handleResetGenres('tvShows')}
                    >
                        Tv Shows
                    </span>
                    <h2 className="genres-name">{genresSelect.cateTvName}</h2>
                </div>
            )}

            {/* Movies */}
            {type === 'movies' && !genresSelect.cateBannerMovieChange ? (
                <div className="genres-select-wrapper">
                    <h2 className="genres-select-title">Movies</h2>
                    <div className="genres-select-box">
                        <select
                            className="genres-select"
                            name="genres"
                            id="genres"
                            value={genresSelect.selectedMovieGenres}
                            onChange={handleMoviesChange}
                        >
                            <option className="genres-option" style={{ display: 'none' }} >Genres</option>
                            {categories?.map(genres => (
                                <option
                                    className="genres-option"
                                    key={genres.id}
                                    data-name={genres.name}
                                    data-value={genres.id}
                                >
                                    {genres.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : type === 'movies' && (
                <div className="genres-select-info">
                    <span
                        className="location"
                        onClick={() => handleResetGenres('movies')}
                    >
                        Movies
                    </span>
                    <h2 className="genres-name">{genresSelect.cateMovieName}</h2>
                </div>
            )}
            <div className="view-select">
                <div className="view-option active list-view">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-rows">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 6H0V4H24V6ZM24 18V20H0V18H24ZM0 13H12V11H0V13Z" fill="#FFFFFF"></path>
                    </svg>
                </div>
                <div className="view-option grid-view">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon-grid">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 3C0.447715 3 0 3.44772 0 4V10C0 10.5523 0.447715 11 1 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3H1ZM1 13C0.447715 13 0 13.4477 0 14V20C0 20.5523 0.447715 21 1 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13H1ZM13 4C13 3.44772 13.4477 3 14 3H23C23.5523 3 24 3.44772 24 4V10C24 10.5523 23.5523 11 23 11H14C13.4477 11 13 10.5523 13 10V4ZM14 13C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H23C23.5523 21 24 20.5523 24 20V14C24 13.4477 23.5523 13 23 13H14Z" fill="#FFFFFF"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Category
