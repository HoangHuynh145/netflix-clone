import './navbar.scss'
import logo from '../../access/img/logo.png'
import { IoSearchSharp } from 'react-icons/io5'
import { MdOutlineClose } from 'react-icons/md'
import { FaBell, FaUsers } from 'react-icons/fa'
import { AiFillCaretDown } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { TbPencil } from 'react-icons/tb'
import { RiQuestionLine } from 'react-icons/ri'
import kidAvt from '../../access/img/kid_zone_avt.png'
import userAvt from '../../access/img/user_avt.png'
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../features/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../features/createInstances'
import { logoutSuccess } from '../../redux/authSlice'

const Navbar = ({ location }) => {
    const user = useSelector(state => state.auth.login?.currentUser)
    const userId = user?._id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJwt = createAxios(user, dispatch, logoutSuccess)
    const inputRef = useRef()
    const [searchValue, setSearchValue] = useState('')
    const [scrollToTop, setScrollToTop] = useState(false)


    const hanldeLogout = () => {
        logoutUser(dispatch, userId, navigate, user?.accessToken, axiosJwt)
    }

    const handleToggleBoxSearch = () => {
        const boxSearch = document.querySelector('.pinning-navbar__container-right .nav-element')
        const boxSearchActive = document.querySelector('.pinning-navbar__container-right .nav-element.active')
        if (boxSearchActive) {
            !searchValue && boxSearch.classList.remove('active')
            inputRef.current.blur()
        } else {
            boxSearch.classList.add('active')
            inputRef.current.focus()
        }
    }

    const handleClearInput = (e) => {
        e.stopPropagation()
        setSearchValue('')
        inputRef.current.focus()
    }

    const handleCloseDropMenu = (e) => {
        e.stopPropagation()
        const dropdownMenuActive = document.querySelector('.dropdown-menu.active')
        const arrowActive = document.querySelector('.dropdown-caret.active')
        dropdownMenuActive?.classList.remove('active')
        arrowActive?.classList.remove('active')
    }

    const handleOpenDropMenu = (e) => {
        e.stopPropagation()
        const dropdownMenu = document.querySelector('.dropdown-menu')
        const arrow = document.querySelector('.dropdown-caret')
        dropdownMenu.classList.add('active')
        arrow.classList.add('active')
    }

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

    useEffect(() => {
        const navItems = document.querySelectorAll('.filter-items-wrapper .filter-item')
        const dropDown = document.querySelector('.filter-body')
        navItems.forEach(item => {
            item.onclick = () => {
                dropDown.classList.remove('active')
            }
        })
    }, [])

    const handleOpenDropDown = () => {
        const dropDown = document.querySelector('.filter-body')
        dropDown.classList.toggle('active')
    }

    return (
        <div className={`
            pinning-navbar 
            ${location === 'tvShow' || location === 'movies' ? 'hidden' : ''} 
            ${scrollToTop ? 'active' : ''}`}
        >
            <div className="pinning-navbar__container" >
                <div className="pinning-navbar__container-left" >
                    <div className="navbar-left__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="navbar-left__navigation">
                        <li className={`navigation-tab ${location === 'home' ? 'active' : ''}`}>
                            <Link className="navigation-tab__title" to="/home" >Home</Link>
                        </li>
                        <li className={`navigation-tab ${location === 'tvShow' ? 'active' : ''}`}>
                            <Link className="navigation-tab__title" to="/tvShow">TV Show</Link>
                        </li>
                        <li className={`navigation-tab ${location === 'movies' ? 'active' : ''}`}>
                            <Link className="navigation-tab__title" to="/movies" >Movies</Link>
                        </li>
                        <li className={`navigation-tab ${location === 'latest' ? 'active' : ''}`}>
                            <Link className="navigation-tab__title" to="/latest" >Original</Link>
                        </li>
                        <li className="navigation-tab">
                            <span className="navigation-tab__title">My List</span>
                        </li>
                    </ul>
                    <div className='dropdown-filter-container' >
                        <div
                            className='filter-btn'
                            onClick={handleOpenDropDown}
                        >
                            Duyệt tìm
                            <AiFillCaretDown />
                        </div>
                        <div className="filter-body">
                            <ul className="filter-items-wrapper">
                                <li className="filter-item">
                                    <Link className="navigation-tab__title" to="/home" >Home</Link>
                                </li>
                                <li className="filter-item">
                                    <Link className="navigation-tab__title" to="/tvShow">TV Show</Link>
                                </li>
                                <li className="filter-item">
                                    <Link className="navigation-tab__title" to="/movies" >Movies</Link>
                                </li>
                                <li className="filter-item">
                                    <Link className="navigation-tab__title" to="/latest" >Original</Link>
                                </li>
                                <li className="filter-item">My List</li>
                                <li className="filter-item">Browse by language</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pinning-navbar__container-right" onMouseLeave={handleCloseDropMenu}>
                    <div className="search-box nav-element" onClick={handleToggleBoxSearch}>
                        <div className="search-box__input">
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                className="input-search"
                                onClick={e => e.stopPropagation()}
                                onBlur={handleToggleBoxSearch}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder='name, actor, genres...'
                            />
                        </div>
                        <div className="search-box__btn search">
                            <IoSearchSharp />
                        </div>
                        <div
                            className="search-box__btn close"
                            onClick={handleClearInput}
                            style={{ visibility: searchValue ? 'visible' : 'hidden' }}
                        >
                            <MdOutlineClose />
                        </div>
                    </div>
                    <div className="kids-zone nav-element">Children</div>
                    <div className="notifications nav-element">
                        <FaBell />
                    </div>
                    <div
                        className="account-menu nav-element"
                        onClick={handleOpenDropMenu}
                    >
                        <div
                            className="account-menu__dropdown-btn"
                            onMouseEnter={handleOpenDropMenu}
                        >
                            <div className="account-avatar">
                                <img src={userAvt} alt="user_avatar" />
                            </div>
                            <div className="dropdown-caret">
                                <AiFillCaretDown />
                            </div>
                        </div>
                        <div className="dropdown-menu"
                            onMouseLeave={handleCloseDropMenu}
                        >
                            <div className="dropdown-menu-list profile">
                                <div className="profile__kids-zone sub-menu-list">
                                    <div className="pic-kid-zone">
                                        <img src={kidAvt} alt="kid_avatar" />
                                    </div>
                                    <div className="dropdown-menu-list__title">Children</div>
                                </div>
                                <div className="profile__user-container sub-menu-list">
                                    <div className="dropdown-menu-list__icon">
                                        <TbPencil />
                                    </div>
                                    <div className="dropdown-menu-list__title">Manage Proflies</div>
                                </div>
                                {user?.isAdmin && (
                                    <div className="profile__user-container sub-menu-list">
                                        <div className="dropdown-menu-list__icon">
                                            <FaUsers />
                                        </div>
                                        <Link to="/admin/allUser">
                                            <div className="dropdown-menu-list__title">User Management</div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="dropdown-menu-list submenu">
                                <div className="submenu-container sub-menu-list">
                                    <div className="dropdown-menu-list__icon">
                                        <BiUser />
                                    </div>
                                    <div className="dropdown-menu-list__title">Account</div>
                                </div>
                                <div className="submenu-container sub-menu-list">
                                    <div className="dropdown-menu-list__icon">
                                        <RiQuestionLine />
                                    </div>
                                    <div className="dropdown-menu-list__title">Help Center</div>
                                </div>
                            </div>
                            <div className="dropdown-menu-list logout">
                                <div className="logout-container sub-menu-list">
                                    <div
                                        className="dropdown-menu-list__title"
                                        onClick={hanldeLogout}
                                    >Log out of Netflix</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
