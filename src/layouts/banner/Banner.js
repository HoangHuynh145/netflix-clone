import { useEffect, useState, useContext, useRef } from 'react'
import { getMovie, getMovieDetail } from '../../features/apiRequest'
import './banner.scss'
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { GrCircleInformation } from 'react-icons/gr'
import { MdReplay } from 'react-icons/md'
import YouTube from 'react-youtube';
import { ModelContext } from '../../context/ModelContext'
import { GenresContext } from '../../context/GenresContext'

const Banner = ({ fetchBannerData, type }) => {
    const baseUrlImg = process.env.REACT_APP_API_IMAGE_LARGE
    const API_KEY = process.env.REACT_APP_API_MOVIE_KEY
    const [movie, setMovie] = useState([])
    const [trailerUrlDelay, setTrailerUrlDelay] = useState()
    const [trailerUrl, setTrailerUrl] = useState()
    const [limitAge, setLimitAge] = useState()
    const videoRef = useRef()
    const timerRef = useRef()
    const bannerMid = useContext(ModelContext)
    const genresIds = useContext(GenresContext)


    // Get movie
    useEffect(() => {
        let url;
        if (type === 'home') {
            url = fetchBannerData
        } else if (type === 'tvShows') {
            url = genresIds.selectedTvGenres ? `${fetchBannerData}${genresIds.selectedTvGenres}` : `${fetchBannerData}10759`
        } else if (type === 'movies') {
            url = genresIds.selectedMovieGenres ? `${fetchBannerData}${genresIds.selectedMovieGenres}` : `${fetchBannerData}28`
        }

        // getMovie(setMovie, fetchBannerData)
        getMovie(setMovie, url)
    }, [fetchBannerData, genresIds.selectedMovieGenres, genresIds.selectedTvGenres])

    // get movie detail
    useEffect(() => {
        const movieDetail = `/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        const tvDetail = `/tv/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`

        // title thuộc về phim, name thuộc về tv

        let movieDetailApi
        (movie.name ? movieDetailApi = tvDetail : movieDetailApi = movieDetail)

        bannerMid.setType(movie.name ? 'tv' : 'movie')

        if (movie.id) {
            getMovieDetail(movieDetailApi, setTrailerUrlDelay)
            
            if (movie.genre_ids.includes(80) || movie.genre_ids.includes(53)) {
                setLimitAge(18)
            } else {
                movie.genre_ids.includes(16) ? setLimitAge(13) : setLimitAge(16)
            }
        }
    }, [movie])

    // delay trailer play
    useEffect(() => {
        const trailerId = setTimeout(() => {
            setTrailerUrl(trailerUrlDelay)
        }, 1500)

        return () => {
            clearTimeout(trailerId)
        }
    }, [trailerUrlDelay])

    useEffect(() => {
        if (bannerMid.showModal) {
            clearTimeout(timerRef.current)
            setTrailerUrl('')
            bannerMid.setNumberOfPlayed(0)
            bannerMid.setIsPlayedVideo(false)
            videoRef.current?.internalPlayer.pauseVideo()
        } else {
            setTrailerUrl(trailerUrlDelay)
            videoRef.current?.internalPlayer.playVideo()
        }
    }, [bannerMid.showModal])

    // option for banner video
    const options = {
        playerVars: {
            controls: 0,
            // autoplay: 1,
            mute: 1,
            playsinline: 1,
            modestbranding: 1,
            cc_load_policy: 0,
            fs: 0
        }
    }

    const hanldeToggleMute = () => {
        bannerMid.setIsmute(!bannerMid.ismute)
        if (!bannerMid.ismute) {
            videoRef.current.internalPlayer.mute()
        } else {
            videoRef.current.internalPlayer.unMute()
            // console.log(videoRef.current.internalPlayer.unMute())
        }
    }

    const handleOpenModel = (id) => {
        bannerMid.setShowModal(true)
        bannerMid.setBannerMovieId(id)
        bannerMid.setIsmute(true)
        videoRef.current?.internalPlayer.mute()
    }

    const handlePlay = (e) => {
        timerRef.current = setTimeout(() => {
            setTrailerUrl('')
            bannerMid.setIsPlayedVideo(false)
            bannerMid.setNumberOfPlayed(prev => prev + 1)
            bannerMid.setIsmute(true)
        }, ((e.target.getDuration() * 1000) * 0.6))
    }

    const handleReady = (e) => {
        bannerMid.setIsPlayedVideo(true)
        e.target.playVideo();
    }

    return (
        <div
            className={`hero-card-trailer`}
            style={{ background: `url("${baseUrlImg}${movie.backdrop_path || movie.poster_path}") center/cover no-repeat` }}
        >
            {trailerUrl && (
                <div className="banner-youtube">
                    <YouTube
                        ref={videoRef}
                        videoId={`${trailerUrl.key}`}
                        className="emmbed-youtube"
                        iframeClassName="ytb-video"
                        opts={options}
                        onReady={handleReady}
                        onPlay={handlePlay}
                        onStateChange={e => e.target.playVideo()}
                    />
                </div>
            )}
            <div className="trailer-container">
                <div className="trailer-left_wrapper">
                    <h3 className="movie_name">{movie.title ? movie.title : movie.name}</h3>
                    <p className="movie_desc">{movie.overview}</p>
                    <div className="trailer-left_btn">
                        <div className="main-trailer-btn">
                            <button className="btn-option banner-btn play-btn">
                                <FaPlay />
                                Play
                            </button>
                        </div>
                        <div className="main-trailer-btn">
                            <button className="btn-option banner-btn info-btn" onClick={() => handleOpenModel(movie.id)}>
                                <GrCircleInformation />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
                <div className="trailer_right_wrapper">
                    <div className="trailer-right-btn">
                        {bannerMid.isPlayedVideo && bannerMid.ismute && (
                            <div
                                className="btn-controll muted-btn"
                                onClick={hanldeToggleMute}
                            >
                                <BsVolumeMute />
                            </div>
                        )}
                        {bannerMid.isPlayedVideo && !bannerMid.ismute && (
                            <div
                                className="btn-controll unmuted-btn"
                                onClick={hanldeToggleMute}
                            >
                                <BsVolumeUp />
                            </div>
                        )}
                        {!bannerMid.isPlayedVideo && bannerMid.numberOfPlayed > 0 && (
                            <div
                                className="btn-controll replay-btn"
                                onClick={() => setTrailerUrl(trailerUrlDelay)}
                            >
                                <MdReplay />
                            </div>
                        )}
                    </div>
                    <div className="age-limit">{limitAge}+</div>
                </div>
            </div>
        </div >
    )
}

export default Banner
