import bg404 from '../../access/img/img404.png';
import './poster.scss';
import { useEffect, useState, useRef, useContext } from 'react'
import { getMovieForPoster } from '../../features/apiRequest'
import YouTube from 'react-youtube';
import { FaPlay, FaAngleDown } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { ModelContext } from '../../context/ModelContext'

const Poster = ({ movie, index, id, firstIndex, lastIndex, location, itemsPerScreen }) => {
    const API_KEY = process.env.REACT_APP_API_MOVIE_KEY
    const baseUrl = process.env.REACT_APP_API_IMAGE_SMALL
    const [movieDetail, setMovieDetail] = useState([])
    const [movieTrailer, setMovieTrailer] = useState()
    const [movieTrailerDelay, setMovieTrailerDelay] = useState()
    const [isHover, setIsHover] = useState(false)
    const [genres, setGenres] = useState([])
    const [delayBg, setDelayBg] = useState(false)

    const previewRef = useRef()
    const trailerRef = useRef()
    const trailerId = useRef()


    const bannerMain = useContext(ModelContext)

    useEffect(() => {
        const bgId = setTimeout(() => {
            setDelayBg(true)
        }, 1000)

        return () => {
            clearTimeout(bgId)
        }
    }, [movie])


    useEffect(() => {
        const movieDetailApi = `/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
        const tvDetailApi = `/tv/${movie.id}?api_key=${API_KEY}&append_to_response=videos`

        let movieApi
        movie.title ? movieApi = movieDetailApi : movieApi = tvDetailApi

        getMovieForPoster(movieApi, setMovieDetail, setMovieTrailer, setGenres)
    }, [movie])

    const handlePlay = (e) => {
        trailerId.current = setTimeout(() => {
            setMovieTrailerDelay()
        }, ((e.target.getDuration() * 1000) * 0.5));
    }
    
    const canculateLimitAge = (type) => {
        let adLimit = 0;
        let chLimit = 0;
        movieDetail.genres.forEach(item => {
            if (item.id === 80 || item.id === 53) {
                adLimit++;
                return
            } else if (item.id === 16) {
                chLimit++
                return
            }
        })

        if (adLimit) {
            return "18"
        } else if (chLimit) {
            return "13"
        } else {
            return "16"
        }
    }

    const handleMouseMove = () => {
        previewRef.current = setTimeout(() => {
            const row = document.querySelector(`[data-id='${location}-${id}']`)
            setIsHover(true)
            row.style.zIndex = 99
        }, 400)
        trailerRef.current = setTimeout(() => {
            setMovieTrailerDelay(movieTrailer)
        }, 1000)
    }

    const handleMouseLeave = () => {
        const row = document.querySelector(`[data-id='${location}-${id}']`)
        clearTimeout(previewRef.current)
        setMovieTrailerDelay('')
        clearTimeout(trailerRef.current)
        setIsHover(false)
        row.style.zIndex = 0
    }

    const options = {
        playerVars: {
            controls: 0,
            autoplay: 1,
            mute: 1,
            modestbranding: 1,
            cc_load_policy: 0,
            fs: 0
        }
    }

    const canculateRunTime = () => {
        if (movieDetail.number_of_seasons) {
            if (movieDetail.number_of_seasons > 1) {
                return `${movieDetail.number_of_seasons} seasons`
            } else {
                return `${movieDetail.number_of_episodes} episodes`
            }
        } else if (movieDetail.title) {
            const runTime = movieDetail.runtime
            return `${Math.round(runTime / 60)}h ${runTime % 60}m`
        }
    }

    const handleOpenBackdrop = () => {
        const type = movieDetail.number_of_seasons ? 'tv' : 'movie'
        bannerMain.setShowModal(true)
        bannerMain.setType(type)
        bannerMain.setBannerMovieId(movieDetail.id)
    }

    return (
        <div
            className="movie-poster"
            onMouseEnter={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={itemsPerScreen <= 4 ? handleOpenBackdrop : null}
        >
            {delayBg && <img src={
                movieDetail.backdrop_path || movieDetail.poster_path
                    ?
                    `${baseUrl}${movieDetail.backdrop_path || movieDetail.poster_path}`
                    :
                    bg404
            } alt="movie_poster"/>}
            {isHover && (
                <div
                    className={`movie-preview-modal ${index === firstIndex ? 'first-item' : index === lastIndex ? 'last-item' : ''}`}
                >
                    <div className="preview-modal__above" >
                        <img className="preview-poster" src={
                            movieDetail.backdrop_path || movieDetail.poster_path
                                ?
                                `${baseUrl}${movieDetail.backdrop_path || movieDetail.poster_path}`
                                :
                                bg404
                        } alt="movie_poster" />
                        {(movieTrailerDelay && isHover) && (
                            <div className="preview-ytb">
                                <YouTube
                                    videoId={`${movieTrailer?.key}`}
                                    className="emmbed-youtube"
                                    iframeClassName="ytb-video"
                                    opts={options}
                                    onPlay={handlePlay}
                                />
                            </div>
                        )}
                    </div>
                    <div className="preview-modal__desc" >
                        <div className="desc-above">
                            <button className="btn-play btn-controll">
                                <FaPlay />
                            </button>
                            <button className="btn-add btn-controll">
                                <AiOutlinePlus />
                            </button>
                            <div className="trailer__emotions">
                                <div className="emotion emotion-like btn-controll trailer_btn"></div>
                                <div className="show-all-emotions">
                                    <div className="emotion emotion-dislike btn-controll" title='Không thích'></div>
                                    <div className="emotion emotion-like btn-controll" title='Thích'></div>
                                    <div className="emotion emotion-manylike btn-controll" title='Tuyệt vời!'></div>
                                </div>
                            </div>
                            <button
                                className="backdrop-btn btn-controll"
                                onClick={handleOpenBackdrop}
                            >
                                <FaAngleDown />
                            </button>
                        </div>
                        <div className="desc-under">
                            <div className='above-movie'>
                                <span className="movie-score">{Math.round(movieDetail.vote_average * 10) / 10} votes</span>
                                <div className='limit-age'>{canculateLimitAge("def")}+</div>
                                <div className='run-time'>{movieDetail && canculateRunTime()}</div>
                            </div>
                            <ul className='genres-wrapper'>
                                {genres?.map(item => (
                                    <li className="genres" key={item.id}>
                                        <span className="fake-dot"></span>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Poster
