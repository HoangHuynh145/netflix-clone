import { useState, useEffect } from 'react'
import { getMovieForRecommendation } from '../../features/apiRequest'
import logo from '../../access/img/doc_logo.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'

const Recommend = ({ apiKey, id, type, genres }) => {
    const BASE_URL_IMG = process.env.REACT_APP_API_IMAGE_SMALL
    const [recommend, setRecommend] = useState([])
    const [urlImgDelay, seturlImgDelay] = useState(false)
    const [genresBackdrop, setGenresBackdrop] = useState([])


    useEffect(() => {
        const movieDetail = `/movie/${id}/similar?api_key=${apiKey}&language=en-US&append_to_response=videos`
        const tvDetail = `/tv/${id}/similar?api_key=${apiKey}&language=en-US&append_to_response=videos`

        let fetchTypeMovie
        type === 'movie' ? fetchTypeMovie = movieDetail : fetchTypeMovie = tvDetail

        getMovieForRecommendation(setRecommend, fetchTypeMovie)
    }, [id, type])

    const handleShowAllTrailer = () => {
        const recommendedWrapper = document.querySelector('.backdrop-recommend__wrapper')
        const lineEndpoint = document.querySelector('.backdrop-recommend-conrainer .endpoint-line.recommend')
        console.log(lineEndpoint)
        recommendedWrapper.classList.toggle('active')
        lineEndpoint.classList.toggle('active')
    }

    useEffect(() => {
        const delayImgId = setTimeout(() => {
            seturlImgDelay(true)
        }, 3000);

        return () => {
            clearTimeout(delayImgId)
        }
    }, [id, type])

    useEffect(() => {
        let genresIds = []
        if (genres) {
            genres.forEach(item => {
                genresIds.push(item.id)
            })
            setGenresBackdrop(genresIds)
        }
        genresIds = []
    }, [genres])

    const getVotes = (n) => {
        return `${Math.round(n * 10) / 10} votes`
    }

    const handleCanculateSimilar = (genres) => {
        const genresLength = genresBackdrop.length
        const itemsGenresLeght = genres.length
        let count = 0

        for (let i = 0; i <= itemsGenresLeght; i++) {
            if (genresBackdrop.some(numb => numb === genres[i])) {
                count++;
            }
        }

        const percent = (count / genresLength) * 100

        return Math.round(percent)
    }

    const getYear = (numb) => {
        if(numb){
            return `${numb.slice(0, 4)}`
        }else {
            return 'Đang cập nhận...'
        }
    }

    return (
        <div className="backdrop-recommend-conrainer">
            <div className="backdrop-recommend__title">Recommend</div>
            <div className="backdrop-recommend__wrapper">
                {recommend.map((rec, index) => (
                    <div className="recommend-preview" key={index}>
                        <div className="recommend-preview__above">
                            <div className="recommend-bg">
                                {urlImgDelay && <img src={`${BASE_URL_IMG}${rec.backdrop_path || rec.poster_path}`} alt="bg" />}
                            </div>
                            <div className="recommend-logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="recommend-vote">{getVotes(rec.vote_average)}</div>
                            <div className="recommend-name">{rec.name || rec.title}</div>
                            <div className="recommend-play-btn">
                                <FaPlay />
                            </div>
                        </div>
                        <div className="recommend-preview__desc">
                            <div className="preview__desc-above">
                                <div className="desc-above_left">
                                    <div className="movie-score">
                                        {handleCanculateSimilar(rec.genre_ids) >= 50 && (
                                            `Similarities: ${handleCanculateSimilar(rec.genre_ids)}%`
                                        )}
                                    </div>
                                    <div className="movie-info">
                                        <span className="limit-age">13+</span>
                                        <span className="released-time">
                                            {rec.first_air_date ? getYear(rec.first_air_date) : getYear(rec.release_date)}
                                        </span>
                                    </div>
                                </div>
                                <div className="desc-above_right">
                                    <AiOutlinePlus />
                                </div>
                            </div>
                            <p className="preview__desc-text">{rec.overview || 'Đang cập nhập...'}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="endpoint-line recommend">
                <div className="endpoint-icon" onClick={handleShowAllTrailer}></div>
            </div>
        </div>
    )
}

export default Recommend
