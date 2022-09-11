import { useEffect, useState, useRef, useContext } from 'react'
import { getMovieForRow } from '../../features/apiRequest'
import './row.scss'
import Poster from '../poster/Poster';
import { GenresContext } from '../../context/GenresContext'

const Row = ({ id, title, location, fecthUrl, fectchGenres }) => {
    const startPointRef = useRef()
    const [reload, setReload] = useState(false)
    const [movie, setMovie] = useState([])
    const [itemsPerScreen, setItemsPerScreen] = useState(() => {
        if (window.innerWidth <= 450) {
            return 2
        } else if (window.innerWidth <= 991) {
            return 4
        } else {
            return 5
        }
    })
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(4)
    const genresIds = useContext(GenresContext)

    useEffect(() => {
        const handleResize = (e) => {
            if (e.target.innerWidth <= 450) {
                setItemsPerScreen(2)
            } else if (e.target.innerWidth <= 991) {
                setItemsPerScreen(4)
            } else {
                setItemsPerScreen(5)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setReload(false)
    }, [genresIds.selectedTvGenres, genresIds.selectedMovieGenres])

    // fecth movies
    useEffect(() => {
        const urlDelay = setTimeout(() => {
            let url;
            if (location === 'home' || location === 'latest') {
                url = fecthUrl
            } else if (location === 'tvShows') {
                url = genresIds.selectedTvGenres ? `${fecthUrl},${genresIds.selectedTvGenres}` : fecthUrl
            } else if (location === 'movies') {
                url = genresIds.selectedMovieGenres ? `${fecthUrl},${genresIds.selectedMovieGenres}` : fecthUrl
            }
            setReload(true)
            getMovieForRow(url, setMovie)
        }, (id * 2000))
        return () => {
            clearTimeout(urlDelay)
        }
    }, [fecthUrl, genresIds.selectedTvGenres, genresIds.selectedMovieGenres])

    const hanldeMoveSlide = (direction) => {
        const row = document.querySelector(`[data-id='${location}-${id}']`)
        const slider = row.querySelector('.slider-wrapper')
        const sliderIndex = +slider.style.getPropertyValue('--slider-index')
        const progressBar = row.querySelector('.progress-bar')
        const progressBarItemCount = progressBar.children.length
        progressBar.children[sliderIndex].classList.remove('active')
        if (direction === 'next') {
            if (sliderIndex + 1 >= progressBarItemCount) {
                slider.style.setProperty('--slider-index', 0)
                progressBar.children[0].classList.add('active')
                slider.style.transition = 'transform .2s ease-in-out'
                setFirstIndex(0)
                setLastIndex(itemsPerScreen - 1)
            } else {
                slider.style.setProperty('--slider-index', sliderIndex + 1)
                progressBar.children[sliderIndex + 1].classList.add('active')
                slider.style.transition = 'transform .7s ease-in-out'
                setFirstIndex(prev => prev + itemsPerScreen)
                setLastIndex(prev => prev + itemsPerScreen)
            }
        } else {
            if (sliderIndex - 1 < 0) {
                slider.style.setProperty('--slider-index', progressBarItemCount - 1)
                progressBar.children[progressBarItemCount - 1].classList.add('active')
                slider.style.transition = 'transform .2s ease-in-out'
                setFirstIndex(slider.children.length - itemsPerScreen)
                setLastIndex(slider.children.length - 1)
            } else {
                slider.style.setProperty('--slider-index', sliderIndex - 1)
                progressBar.children[sliderIndex - 1].classList.add('active')
                slider.style.transition = 'transform .7s ease-in-out'
                setFirstIndex(prev => prev - itemsPerScreen)
                setLastIndex(prev => prev - itemsPerScreen)
            }
        }
    }

    useEffect(() => {
        const row = document.querySelector(`[data-id='${location}-${id}']`)
        const progressBar = row.querySelector('.progress-bar')
        progressBar.innerHTML = '';
        const slider = row.querySelector('.slider-wrapper')
        const sliderIndex = +slider.style.getPropertyValue('--slider-index')
        const itemsCount = slider.children.length
        const perScreenItems = itemsPerScreen
        const progressItemsBar = Math.ceil(itemsCount / perScreenItems)
        if (sliderIndex >= progressItemsBar && itemsCount !== 0) {
            slider.style.setProperty('--slider-index', progressItemsBar - 1)
        }

        for (let i = 0; i < progressItemsBar; i++) {
            const barItem = document.createElement('div')
            barItem.classList.add('progress-item')
            sliderIndex === i && barItem.classList.add('active')
            progressBar.appendChild(barItem)
        }

    }, [itemsPerScreen, movie])

    const hanldeTouchStart = (e) => {
        startPointRef.current = Math.ceil(e.touches[0].clientX)
    }

    const hanldeTouchEnd = (e) => {
        const endPoint = Math.ceil(e.changedTouches[0].clientX)
        if (startPointRef.current - endPoint !== 0) {
            if (startPointRef.current - endPoint > 30) {
                hanldeMoveSlide('next')
            } else if (startPointRef.current - endPoint < -5) {
                hanldeMoveSlide('prev')
            }
        }
    }

    return (
        <div
            className={`row`}
            data-id={`${location}-${id}`}
        >
            <div className="directional">
                <div className='header'>
                    <div className='title-wrapper'>
                        <h3 className="title">{title}</h3>
                        <span className='sub-title'>Xem tất cả</span>
                        <span className='see-all-title'>&#8250;</span>
                    </div>
                    <div className="progress-bar"></div>
                </div>
            </div>
            <div className="slider-container">
                <button
                    className='handle handle-left'
                    onClick={() => hanldeMoveSlide('prev')}
                ></button>
                <div className="slider-wrapper"
                    onTouchStart={hanldeTouchStart}
                    onTouchEnd={hanldeTouchEnd}
                >
                    {reload && movie?.map((item, index) => (
                        <Poster
                            key={item.id}
                            movie={item}
                            index={index}
                            id={id}
                            firstIndex={firstIndex}
                            lastIndex={lastIndex}
                            location={location}
                            itemsPerScreen={itemsPerScreen}
                        />
                    ))}
                </div>
                <button
                    className='handle handle-right'
                    onClick={() => hanldeMoveSlide('next')}
                ></button>
            </div>
        </div>
    )
}

export default Row

