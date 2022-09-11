import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getAllUser } from '../../features/apiRequest'
import { useEffect } from 'react'
import './getAllUser.scss'
import logo from '../../access/img/logo.png'
import userAvt from '../../access/img/user_avt.png'
import { BsTrash, BsDot } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'
import moment from 'moment';

const GetAllUser = () => {
    const user = useSelector(state => state.auth.login.currentUser)
    const userData = useSelector(state => state.user.users.allUsers)
    const userId = user?._id
    const accessToken = user?.accessToken
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userPerPage, setUserPerPage] = useState()
    const [limitShow, setLimitShow] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)


    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        if (!user?.isAdmin) {
            navigate("/home")
        }
        if (user?.accessToken) {
            getAllUser(dispatch, accessToken, userId, currentPage, limitShow)
        }
    }, [currentPage, limitShow])

    useEffect(() => {
        const count = []
        const numberPage = Math.ceil(userData?.total_results / limitShow)
        for (let i = 1; i <= numberPage; i++) {
            count.push(i)
        }
        setUserPerPage(count)
    }, [limitShow, userData])

    const renderPageNumber = userPerPage?.map(number => {
        if (number > minPageNumberLimit && number < maxPageNumberLimit + 1) {
            return (
                <li
                    className={`page-item ${userData.page === number ? 'active' : ''}`}
                    key={number}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </li>
            )
        }
        return null
    })

    const formatDate = (date) => {
        return moment(date).format('D/MM/YYYY')
    }

    const hanldeIncreasePage = () => {
        setCurrentPage(prev => prev + 1)
        if (currentPage >= maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + limitShow)
            setMinPageNumberLimit(minPageNumberLimit + limitShow)
        }
    }

    const hanldeDecreasePage = () => {
        setCurrentPage(prev => prev - 1)
        if ((currentPage - 1) % limitShow === 0 && maxPageNumberLimit !== 3) {
            setMaxPageNumberLimit(maxPageNumberLimit - limitShow)
            setMinPageNumberLimit(minPageNumberLimit - limitShow)
        }
    }

    const hanldeChangeLimit = ({
        target: {
            selectedOptions: [{
                dataset: { value }
            }]
        }
    }) => {
        setLimitShow(+value)
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page_navbar">
                <Link to="/home">
                    <div className='navbar-left'>
                        <img
                            className='logo'
                            src={logo}
                            alt="logo"
                        />
                    </div>
                </Link>
                <div className='navbar-right'>
                    <img
                        className='avt'
                        src={userAvt}
                        alt="avt"
                    />
                </div>
            </div>
            <div className="admin-page-body">
                <div className='body-header__container'>
                    <h2 className='title'>User</h2>
                    <span className="subtitle">{userData?.total_results} users</span>
                </div>
                <div className='body-content__container'>
                    <ul className='user-info'>
                        <li className='user-item check-all'>
                            <input type='checkbox' />
                        </li>
                        <li className='user-item name'>Name</li>
                        <li className='user-item permission'>Perrmission</li>
                        <li className='user-item email-address'>Email address</li>
                        <li className='user-item dated-create'>Created At</li>
                        <li className='user-item actions'></li>
                    </ul>
                    {/* loop */}
                    {userData?.results.map(user => (
                        <ul className='user-row' key={user._id}>
                            <li className='user-item check-all'>
                                <input type='checkbox' />
                            </li>
                            <li className='user-item name'>
                                <img className='avt' src={userAvt} alt="avt" />
                                <div className='user-detail'>
                                    {user.username}
                                    <span className={`user-res-permission ${user.isAdmin ? 'admin' : 'user'}`}>
                                        <BsDot />
                                        {user.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                </div>
                            </li>
                            <li className={`user-item permission ${user.isAdmin ? 'admin' : 'user'}`}>
                                <span>
                                    <BsDot />
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                            </li>
                            <li className='user-item email-address'>{user.email}</li>
                            <li className='user-item dated-create'>{formatDate(user.createdAt)}</li>
                            <li className='user-item actions'>
                                <BsTrash /> &#160; <HiPencil />
                            </li>
                        </ul>
                    ))}
                </div>
                <div className='body-pagination__container'>
                    <select
                        className='limit-data'
                        onChange={hanldeChangeLimit}
                    >
                        <option data-value={2}>2</option>
                        <option data-value={3}>3</option>
                        <option data-value={4}>4</option>
                    </select>
                    <div className='pagination'>
                        <button
                            className={`prev-btn btn-control ${userData?.previous ? 'active' : ''}`}
                            disabled = {!userData?.previous}
                            onClick={hanldeDecreasePage}
                        >
                            <span>&#8249;</span>
                            Prev
                        </button>
                        <ul className='pages-container'>
                            {renderPageNumber}
                        </ul>
                        <button
                            className={`next-btn btn-control ${userData?.next ? 'active' : ''}`}
                            disabled = {!userData?.next}
                            onClick={hanldeIncreasePage}
                        >
                            Next
                            <span>&#8250;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetAllUser