// images
import logo from '../../access/img/logo.png';
import Footer from '../../components/footer/Footer';
import './login.scss'
import contactLoginData from '../../data/contactLoginData'
import { useState, useEffect, useContext } from 'react'
import { InputContext } from '../../context/InputContext';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../features/apiRequest'

const Login = () => {
    const values = useContext(InputContext)
    const { inputValue } = values
    const [isFocusEmail, setIsFocusEmail] = useState(false)
    const [isFocusPassword, setIsFocusPassword] = useState(false)
    const [email, setEmail] = useState(inputValue ? inputValue : '')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({
        state: false,
        message: '',
        type: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const labelEmail = document.querySelector('.form-title.email')
        const labelPassword = document.querySelector('.form-title.password')

        if (email) {
            // console.log('vo day')
            labelEmail.classList.add('focus')
        }

        if (isFocusEmail || isFocusPassword) {
            isFocusEmail && labelEmail.classList.add('focus')
            isFocusPassword && labelPassword.classList.add('focus')
        } else {
            !email && labelEmail.classList.remove('focus')
            !password && labelPassword.classList.remove('focus')
        }

    }, [isFocusEmail, isFocusPassword])

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        loginUser(user, dispatch, navigate, setError)
    }

    const handleChangeInput = (e, type) => {
        setError({
            state: false,
            message: '',
            type: ''
        })

        if (type === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    return (
        <div className="login">
            <div className="login__background"></div>
            <div className="login__gradient"></div>
            <div className="login-header">
                <div className="login-header__logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="form-body">
                <div className="form-body__wrapper">
                    <div className="form-body__wrapper-main">
                        <h1 className='wrapper-main__title'>Đăng nhập</h1>
                        {error.state && (
                            <div className="wrapper-main__error">
                                <strong>{error.message} </strong>
                                <span>Vui lòng thử lại hoặc bạn có thể </span>
                                <a>đặt lại mật khẩu.</a>
                            </div>
                        )}
                        <form className='wrapper-main__form' onSubmit={handleSubmitLogin}>
                            <input
                                value={email}
                                required
                                type='email'
                                className={`form-input ${error.type === 'email' ? 'error' : ''}`}
                                id='id_email'
                                onChange={(e) => handleChangeInput(e, 'email')}
                                onFocus={() => setIsFocusEmail(true)}
                                onBlur={() => setIsFocusEmail(false)}
                            />
                            <label htmlFor='id_email' className='form-title email' >Email</label>
                            <input
                                value={password}
                                type='password'
                                className={`form-input ${error.type === 'password' ? 'error' : ''}`}
                                id='id_password'
                                onChange={(e) => handleChangeInput(e, 'password')}
                                onFocus={() => setIsFocusPassword(true)}
                                onBlur={() => setIsFocusPassword(false)}
                            />
                            <label htmlFor='id_password' className='form-title password' >Mật khẩu</label>
                            <button type='submit' className='form-submit red-btn'>Đăng nhập</button>
                            <div className='form-help'>
                                <input type='checkbox' id='form-help__remember' />
                                <label htmlFor='form-help__remember' className='form-help__remember-title'>Ghi nhớ tôi</label>
                                <span className='form-help__link'>Bạn cần trợ giúp?</span>
                            </div>
                        </form>
                    </div>
                    <div className="login-body__wrapper-other">
                        <div className='login__body-signup'>
                            <span className='signup-title'>Bạn mới tham gia Netflix? </span>
                            <Link to='/register'>
                                <span className='signup-link' >Đăng ký ngay</span>
                            </Link>
                        </div>
                        <div className='login__body-reCapcha'>
                            <p className='reCapcha-title'>Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot.</p>
                            <a href='/' className='reCapcha-link'>Tìm hiểu thêm</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login__footer">
                <Footer datas={contactLoginData} type='login-footer' />
            </div>
        </div>
    )
}

export default Login