import './register.scss'
import logo from '../../access/img/logo.png';
import Footer from '../../components/footer/Footer';
import contactLoginData from '../../data/contactLoginData'
import { useState, useEffect, useContext } from 'react'
import { InputContext } from '../../context/InputContext'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser, findUser } from '../../features/apiRequest'

const Register = () => {
    const values = useContext(InputContext)
    const { setInputValue } = values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isFocusUsername, setIsFocusUsername] = useState(false)
    const [isFocusEmail, setIsFocusEmail] = useState(false)
    const [isFocusPassword, setIsFocusPassword] = useState(false)
    const [isFocusPasswordConfirm, setIsFocusPasswordConfirm] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [typeError, setTypeError] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        emptyPasswordError: false,
    })


    useEffect(() => {
        const labelUserName = document.querySelector('#input-name-label')
        const labelEmail = document.querySelector('#input-email-label')
        const labelPassword = document.querySelector('#input-password-label')
        const labelPasswordConfirm = document.querySelector('#input-password-confirm-label')

        if (isFocusEmail || isFocusPassword || isFocusUsername || isFocusPasswordConfirm) {
            isFocusUsername && labelUserName.classList.add('focus')
            isFocusEmail && labelEmail.classList.add('focus')
            isFocusPassword && labelPassword.classList.add('focus')
            isFocusPasswordConfirm && labelPasswordConfirm.classList.add('focus')
        } else {
            !username && labelUserName.classList.remove('focus')
            !email && labelEmail.classList.remove('focus')
            !password && labelPassword.classList.remove('focus')
            !passwordConfirm && labelPasswordConfirm.classList.remove('focus')
        }

    }, [isFocusEmail, isFocusPassword, isFocusUsername, isFocusPasswordConfirm])

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
        setInputValue(e.target.value)
        setTypeError({
            ...typeError,
            emailError: false,
        })
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        if (!typeError.emailError && !typeError.emptyPasswordError && !typeError.nameError && !typeError.passwordError) {
            const newUser = {
                username,
                email,
                password
            }
            registerUser(newUser, dispatch, navigate)
        }
    }

    const handleBlurInput = (type) => {
        const user = {
            username,
            email,
        }
        // user name
        if (type === 'username') {
            if (!username) {
                setTypeError({
                    ...typeError,
                    nameError: true,
                })
            } else {
                findUser(typeError, setTypeError, user)
            }
            setIsFocusUsername(false)
            // Email
        } else if (type === 'email') {
            const lableEmail = document.querySelector('#email-error')
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email) {
                setTypeError({
                    ...typeError,
                    emailError: true,
                })
            } else if (!regex.test(email)) {
                setTypeError({
                    ...typeError,
                    emailError: true,
                })
                lableEmail.innerHTML = "Email không hợp lệ"
            } else {
                findUser(typeError, setTypeError, user)
                lableEmail.innerHTML = "Email đã tồn tại"
            }
            setIsFocusEmail(false)
            // Password
        } else if (type === 'password') {
            if (!password) {
                setTypeError({
                    ...typeError,
                    emptyPasswordError: true,
                })
            }
            setIsFocusPassword(false)
            // Password confirm
        } else if (type === 'passwordConfirm') {
            if (!passwordConfirm || passwordConfirm !== password) {
                setTypeError({
                    ...typeError,
                    passwordError: true,
                })
            }
            setIsFocusPasswordConfirm(false)
        }
    }

    return (
        <div className="register">
            <div className="register-header">
                <div className="register-header__wrapper">
                    <Link to="/">
                        <div className="header-logo">
                            <img src={logo} />
                        </div>
                    </Link>
                    <Link to='/login'>
                        <span className="login-btn">Đăng nhập</span>
                    </Link>
                </div>
            </div>
            <div className="register-body">
                <div className="register-body__wrapper">
                    <div className="body-form">
                        <span className="form-title">Chào mừng bạn! <br />Tham gia Netflix thật đơn giản.</span>
                        <p className="form-subtitle">Chỉ còn vài bước nữa bạn sẽ được xem ngay lập tức.</p>
                        <form className="body-form__wrapper" onSubmit={handleSubmitRegister}>
                            {/* User name  */}
                            <div className={`form-input-wrapper ${typeError.nameError ? 'active' : ''}`}>
                                <input
                                    value={username}
                                    className='form-input'
                                    id='input-name'
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        setTypeError({
                                            ...typeError,
                                            nameError: false,
                                        })
                                    }}
                                    onFocus={() => setIsFocusUsername(true)}
                                    onBlur={() => handleBlurInput('username')}
                                />
                                <label htmlFor="input-name" id='input-name-label' className='input-label'>Tên đăng nhập</label>
                                <label htmlFor="input-name" id='name-error' className='input-error'>
                                    {username ? 'Tên đăng nhập đã tồn tại' : 'Vui không để trống trường này'}
                                </label>
                            </div>
                            {/* Email  */}
                            <div className={`form-input-wrapper ${typeError.emailError ? 'active' : ''}`}>
                                <input
                                    value={email}
                                    className='form-input'
                                    id='input-email'
                                    type="email"
                                    required
                                    onChange={handleSetEmail}
                                    onFocus={() => setIsFocusEmail(true)}
                                    onBlur={() => handleBlurInput('email')}
                                />
                                <label htmlFor="input-email" id="input-email-label" className='input-label'>Email</label>
                                <label htmlFor="input-name" id='email-error' className='input-error'>
                                    {email ? 'Email đã tồn tại' : 'Vui không để trống trường này'}
                                </label>
                            </div>
                            {/* Password  */}
                            <div className={`form-input-wrapper ${typeError.emptyPasswordError ? 'active' : ''}`}>
                                <input
                                    value={password}
                                    className='form-input'
                                    id='input-password'
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setTypeError({
                                            ...typeError,
                                            emptyPasswordError: false,

                                        })
                                    }}
                                    onFocus={() => setIsFocusPassword(true)}
                                    onBlur={() => handleBlurInput('password')}
                                />
                                <label htmlFor="input-password" id="input-password-label" className='input-label'>Mật khẩu</label>
                                <label
                                    htmlFor="input-password"
                                    id="input-password-error"
                                    className='input-error'
                                >
                                    Vui không để trống trường này
                                </label>
                            </div>
                            {/* Password confirm  */}
                            <div className={`form-input-wrapper ${typeError.passwordError ? 'active' : ''}`}>
                                <input
                                    value={passwordConfirm}
                                    className='form-input'
                                    id='input-password-confirm'
                                    type="password"
                                    onChange={(e) => {
                                        setPasswordConfirm(e.target.value)
                                        setTypeError({
                                            ...typeError,
                                            passwordError: false,
                                        })
                                    }}
                                    onFocus={() => setIsFocusPasswordConfirm(true)}
                                    onBlur={() => handleBlurInput('passwordConfirm')}
                                />
                                <label
                                    htmlFor="input-password-confirm"
                                    id="input-password-confirm-label"
                                    className='input-label'
                                >
                                    Nhập lại mật khẩu
                                </label>
                                <label htmlFor="input-name" id='password-error' className='input-error'>
                                    {passwordConfirm ? 'Mật khẩu không trùng khớp' : 'Vui không để trống trường này'}
                                </label>
                            </div>
                            <button
                                className="red-btn register-btn"
                            >
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="register__footer">
                <Footer datas={contactLoginData} type='register-footer' />
            </div>
        </div>
    )
}

export default Register
