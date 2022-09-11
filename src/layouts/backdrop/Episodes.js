import { FaPlay } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { getEpisodesForRecommend } from '../../features/apiRequest'
import bg404 from '../../access/img/img404.png'

const Episodes = ({ apiKey, tvId, name, movie }) => {
    const BASE_URL_IMG = process.env.REACT_APP_API_IMAGE_SMALL
    const [tvSeason, setTvSeason] = useState(1)
    const [episodes, setEpisodes] = useState([])
    const [posterUrl, setPosterUrl] = useState()
    const [epiLeght, setEpiLeght] = useState()
    const [movieName, setMovieName] = useState()
    const [isHide, setIsHide] = useState(true)


    useEffect(() => {
        const fectTvSeason = `tv/${tvId}/season/${tvSeason}?api_key=${apiKey}&language=en-US`
        getEpisodesForRecommend(setEpisodes, fectTvSeason, setPosterUrl, setEpiLeght)

    }, [tvId, tvSeason])

    useEffect(() => {
        setMovieName(name)
    }, [name])

    const handleChangeSeason = ({
        target: {
            selectedOptions: [{
                dataset: { value }
            }]
        }
    }) => {
        setTvSeason(value)
        setIsHide(true)
    }

    const getTime = (n) => {
        if (!n) {
            return 'Đang cập nhập...'
        }

        if (n >= 60) {
            return `${Math.round(n / 60)}h ${n % 60}m`
        } else {
            return `${n}m`
        }
    }

    return (
        <div className="tv-episodes">
            <div className="tv-episodes__header">
                <span className="header-title">Tập</span>
                {movie.details.number_of_seasons > 1 ? (
                    <span className="trailer-dropdown">
                        <select name='seasons' id='trailer-seasons' onChange={handleChangeSeason} >
                            {movie.details.seasons?.map(epi => (
                                <option
                                    key={epi.id}
                                    data-value={epi.season_number}
                                    data-name={epi.name}
                                    className='selected-season'
                                >
                                    Season {epi.season_number + 1} {'\u00A0'} ({epi.episode_count} Episodes)
                                </option>
                            ))}
                        </select>
                    </span>
                ) : (
                    <span className="trailer-info">{movieName}</span>
                )}
            </div>
            <div className={`tv-episodes__body ${isHide && 'hide'}`}>
                {episodes.episodes?.map((epi, index) => (
                    <div className="episodes-wrapper" key={index}>
                        <div className="episodes-index">{epi.episode_number}</div>
                        <div className="episodes-bg">
                            <img src={
                                epi.still_path || posterUrl
                                    ?
                                    `${BASE_URL_IMG}${epi.still_path || posterUrl}`
                                    :
                                    bg404
                            } alt="episodes_img" />
                            <div className="episodes-bg-play-btn">
                                <FaPlay />
                            </div>
                        </div>
                        <div className="episodes-preview">
                            <div className="episodes-preview-header">
                                <span className="preview-header__title">{epi.name || 'Đang cập nhập...'}</span>
                                <span className="preview-header__time">{getTime(epi.runtime)}</span>
                            </div>
                            <p className="episodes-preview__desc">{epi.overview || 'Đang cập nhập...'}</p>
                        </div>
                    </div>
                ))}
            </div>
            {epiLeght > 10 && (
                <div className={`endpoint-line episode ${!isHide && 'active'}`} onClick={() => setIsHide(!isHide)}>
                    <div className="endpoint-icon"></div>
                </div>
            )}
        </div>
    )
}

export default Episodes
