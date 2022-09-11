import { useState, createContext } from 'react';

const GenresContext = createContext();

const GenresProvider = ({ children }) => {
    // Movies
    const [selectedMovieGenres, setSelectedMovieGenres] = useState() // Thể loại phim được chọn
    const [cateBannerMovieChange, setCateBannerMovieChange] = useState(false) // Trailer ở banner có được thay đổi không
    const [cateMovieName, setCateMovieName] = useState() // Tên thể loại

    // Tv show
    const [selectedTvGenres, setSelectedTvGenres] = useState() //value (id)
    const [cateBannerTvChange, setCateBannerTvChange] = useState(false)
    const [cateTvName, setCateTvName] = useState() // name

    const values = {
        // movie
        selectedMovieGenres, setSelectedMovieGenres,
        cateBannerMovieChange, setCateBannerMovieChange,
        cateMovieName, setCateMovieName,
        //tv
        selectedTvGenres, setSelectedTvGenres,
        cateBannerTvChange, setCateBannerTvChange,
        cateTvName, setCateTvName
    }

    return (
        <GenresContext.Provider value={values}>
            {children}
        </GenresContext.Provider>
    )
}

export {GenresContext, GenresProvider}
