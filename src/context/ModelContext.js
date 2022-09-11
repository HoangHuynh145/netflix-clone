import { createContext, useState } from 'react'

const ModelContext = createContext()

const ModelProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false) // Quyết định backdrop có được bật lên hay không
    const [bannerMovieId, setBannerMovieId] = useState() // Id của phim sau này lấy ra thông tin backdrop
    const [type, setType] = useState('') // Lấy ra thể loại phim
    const [ismute, setIsmute] = useState(true) // Check xem icon âm lượng có được click không
    const [isPlayedVideo, setIsPlayedVideo] = useState(false) // Check xem video youtube có đang được chơi hay không
    const [numberOfPlayed, setNumberOfPlayed] = useState(0)


    const values = {
        type, setType, 
        showModal, setShowModal,
        ismute, setIsmute,
        bannerMovieId, setBannerMovieId,
        isPlayedVideo, setIsPlayedVideo,
        numberOfPlayed, setNumberOfPlayed,
    }

    return (
        <ModelContext.Provider value={values} >
            {children}
        </ModelContext.Provider>
    )
}

export { ModelContext, ModelProvider }
