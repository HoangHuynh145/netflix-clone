import { useContext, useEffect, useState, useRef } from 'react'
import { ModelContext } from '../../context/ModelContext'
import './backdrop.scss'
import { getMovieForModal } from '../../features/apiRequest'
import { GrClose } from 'react-icons/gr'
import { FaPlay } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs'
import YouTube from 'react-youtube';
import Recommend from './Recommend'
import Episodes from './Episodes'


const MainBackdrop = () => {
    const baseUrlImg = process.env.REACT_APP_API_IMAGE_LARGE
    const API_KEY = process.env.REACT_APP_API_MOVIE_KEY
    const bannerMain = useContext(ModelContext)
    const [backDropPlay, setbackDropPlay] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState()
    const [isMute, setIsMute] = useState(true)
    const [delayBg, setdelayBg] = useState(false)
    const videoModelRef = useRef()
    let trailerId = useRef()


    const [movie, setMovie] = useState({
        details: [],
        trailerUrlDelay: {},
        allCast: [],
        mainCast: [],
        time: '',
        movieYear: '',
        director: [],
        genres: [],
    })

    useEffect(() => {
        const movieDetail = `/movie/${bannerMain.bannerMovieId}?api_key=${API_KEY}&append_to_response=videos%2Ccredits`
        const TvDetail = `/tv/${bannerMain.bannerMovieId}?api_key=${API_KEY}&append_to_response=videos%2Ccredits`

        let movieDetailApi
        (bannerMain.type === 'movie' ? movieDetailApi = movieDetail : movieDetailApi = TvDetail)
        getMovieForModal(movieDetailApi, setMovie, bannerMain.type)
    }, [bannerMain.bannerMovieId, bannerMain.type])

    useEffect(() => {
        const urlId = setTimeout(() => {
            setdelayBg(true);
            setTrailerUrl(movie.trailerUrlDelay)
        }, 1000);

        return () => {
            clearTimeout(urlId)
        }
    }, [movie.trailerUrlDelay])


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

    const toggleMute = () => {
        setIsMute(!isMute)
        if (!isMute) {
            videoModelRef.current?.internalPlayer.mute()
        } else {
            videoModelRef.current?.internalPlayer.unMute()
        }
    }

    const handleCloseBackdrop = (e) => {
        e.stopPropagation()
        bannerMain.setShowModal(false)
        setIsMute(true)
        videoModelRef.current?.internalPlayer.mute()
        clearTimeout(trailerId.current)
    }

    const handlePlay = (e) => {
        setbackDropPlay(true)
        trailerId.current = setTimeout(() => {
            setTrailerUrl('')
            setIsMute(true)
            setbackDropPlay(false)
        }, ((e.target.getDuration() * 1000) * 0.6));
    }

    const countSeasons = (n) => {
        if (n <= 1) {
            return `1 season`
        } else {
            return `${n} seasons`
        }
    }

    const countTime = (n) => {
        return `${Math.floor(n / 60)}h ${n % 60}m`
    }

    const canculateLimitAge = (type) => {
        let adLimit = 0;
        let chLimit = 0;
        movie.genres.forEach(item => {
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

    const renderYear = () => {
        const date = new Date()
        const currYear = date.getFullYear()
        if((currYear - movie.movieYear) <= 1) {
            return "New"
        } else {
            return "Suggested"
        }
    }

    return (
        <div className="backdrop" onClick={handleCloseBackdrop}>
            <div className="modal-trailer-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-trailer-wrapper">
                    {delayBg && (
                        <div
                            className="trailer__bg"
                            style={{
                                background:
                                    `url('${baseUrlImg}${movie.details.backdrop_path || movie.details.poster_path}') center/cover no-repeat`
                            }}
                        ></div>
                    )}
                    {trailerUrl && (
                        <div className="model-youtube">
                            <YouTube
                                ref={videoModelRef}
                                videoId={`${trailerUrl.key}`}
                                className='embed-model-youtube'
                                iframeClassName='model-ytb-video'
                                opts={options}
                                onPlay={handlePlay}
                                onStateChange={e => e.target.playVideo()}
                                onReady={(e) => e.target.playVideo()}
                            />
                        </div>
                    )}
                    <div className="modal-header">
                        <div
                            className="modal-header__close-icon "
                            onClick={handleCloseBackdrop}
                        >
                            <GrClose />
                        </div>
                    </div>
                    <div className="trailer__info-container">
                        <h2 className="trailer__name">{movie.details.title || movie.details.name}</h2>
                        <div className="trailer__options">
                            <div className="trailer__options-left">
                                <button className="trailer__play btn-option trailer_btn">
                                    <FaPlay />
                                    Play
                                </button>
                                <div className="trailer__add-to-list btn-controll trailer_btn">
                                    <AiOutlinePlus />
                                </div>
                                <div className="trailer__emotions">
                                    <div className="emotion emotion-like btn-controll trailer_btn"></div>
                                    <div className="show-all-emotions">
                                        <div className="emotion emotion-dislike btn-controll" title='Không thích'></div>
                                        <div className="emotion emotion-like btn-controll" title='Thích'></div>
                                        <div className="emotion emotion-manylike btn-controll" title='Tuyệt vời!'></div>
                                    </div>
                                </div>
                            </div>
                            <div className="trailer__options-right">
                                {backDropPlay && (
                                    <div className="trailer__volume-settings btn-controll" onClick={toggleMute}>
                                        {isMute ? (
                                            <BsVolumeMute />
                                        ) : (
                                            <BsVolumeUp />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-trailer-desc">
                    <div className="trailer__info-left">
                        <div className="info-left__above">
                            <div className="trailer-left-item movie-score">{renderYear()}</div>
                            <div className="trailer-left-item trailer-date">{movie.movieYear}</div>
                            <div className="trailer-left-item limit-age">{canculateLimitAge("def")}+</div>
                            <div className="trailer-left-item trailer-time">
                                {bannerMain.type === 'movie' ? (
                                    countTime(movie.time)
                                ) : (
                                    countSeasons(movie.time)
                                )}
                            </div>
                        </div>
                        <p className="info-left__title">{movie.details.overview}</p>
                    </div>
                    <div className="trailer__info-right">
                        <div className="trailer-tag">
                            <ul className="tag_info">
                                <li className="tag_title">Actors: </li>
                                {movie.mainCast.map(actor => (
                                    <li className="tag-item" key={actor.id}>{actor.name}</li>
                                ))}
                                <li className="tag-item endPoint">more </li>
                            </ul>
                        </div>
                        <div className="trailer-tag">
                            <ul className="tag_info">
                                <li className="tag_title">Genres: </li>
                                {movie.genres.map(genres => (
                                    <li className="tag-item" key={genres.id}>{genres.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {bannerMain.type === 'tv' && (
                    <Episodes
                        apiKey={API_KEY}
                        tvId={bannerMain.bannerMovieId}
                        name={movie.details.name}
                        movie={movie}
                    />
                )}
                <Recommend
                    apiKey={API_KEY}
                    id={bannerMain.bannerMovieId}
                    type={bannerMain.type}
                    genres={movie.genres}
                />
                <div className='modal-trailer-footer'>
                    <p className='movie-name'>
                        About <strong>{movie.details.name || movie.details.title}</strong>
                    </p>
                    <ul className='footer-items actors'>
                        <li className='title'>Actors:</li>
                        {movie.allCast?.map(actor => (
                            <li key={actor.id} className='item'>{actor.name}</li>
                        ))}
                    </ul>
                    <ul className='footer-items genres'>
                        <li className='title'>Genres:</li>
                        {movie.genres?.map(item => (
                            <li key={item.id} className='item'>{item.name}</li>
                        ))}
                    </ul>
                    <ul className='footer-items age'>
                        <li className='title'>Certificate:</li>
                        <li className='limit-age'>{canculateLimitAge("def")}+</li>
                        <li className='genres-type'>{movie.genres[0]?.name}</li>
                        <li className='genres-desc'>Suitable for ages {canculateLimitAge("para")} and up</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainBackdrop
