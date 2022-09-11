//icons
import { BsChevronRight, BsPlusLg } from 'react-icons/bs'
// images
import logo from '../../access/img/logo.png'
import bg from '../../access/img/bg.jpg'
import tv from '../../access/img/tv.png'
import videoTv from '../../access/img/video-tv-0819.m4v'
import mobilePic from '../../access/img/mobile-0819.jpg'
import subPic from '../../access/img/boxshot.png'
import gif from '../../access/img/download-icon.gif'
import kid from '../../access/img/kid__zone.png'
import vn from '../../access/img/vn.jpg'
// others
import './welcome.scss';
import { Link } from 'react-router-dom'
import RowWelcome from '../../components/rowWelcome/RowWelcome'
import Footer from '../../components/footer/Footer'
import faqData from '../../data/faqData'
import datas from '../../data/contactWelcomeData'
import { useContext } from 'react'
import { InputContext } from '../../context/InputContext'

const Wellcome = () => {

    const inputText = useContext(InputContext)
    const { setInputValue } = inputText

    const handleToggleFaq = (id) => {
        const allBtns = document.querySelectorAll('.faq-question')
        const allFaqs = document.querySelectorAll('.faq-answer')
        const btnRotate = document.querySelector('.faq-question.rotate')
        const faqOpen = document.querySelector('.faq-answer.open')
        if (btnRotate !== allBtns[id]) {
            btnRotate?.classList.remove('rotate')
            faqOpen?.classList.remove('open')
        }
        allBtns[id].classList.toggle('rotate')
        allFaqs[id].classList.toggle('open')
    }


    return (
        <div className="story-container">
            <div className="story-header-wrapper">
                <div className="story-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="story-options">
                    <div className="select-language-wrapper">
                        <select className="language-select">
                            <option value="vni">Tiếng Việt</option>
                            <option value="end">English</option>
                        </select>
                    </div>
                    <button className="selector-login red-btn">
                        <Link to='login'>Đăng nhập</Link>
                    </button>
                </div>
            </div>
            <div className="story-cards">
                <div className="story-card hero-card">
                    <div className="story-card-background">
                        <img src={bg} alt="bg" />
                        <div className="background-gradient"></div>
                    </div>
                    <div className="story-card-text">
                        <h1 className="card-title hero-card">Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.</h1>
                        <h2 className="story-card-subtitle">Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h2>
                        <h3 className="email-form-title">Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</h3>
                        <div className="story-card-input">
                            <input
                                required
                                type="email"
                                className="card-input"
                                placeholder='Địa chỉ email'
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Link to='login'>
                                <button className="btn red-btn btn-card-input">
                                    Bắt đầu
                                    <BsChevronRight />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <RowWelcome
                    position="right"
                    pic={tv}
                    video={videoTv}
                    title="Thưởng thức trên TV của bạn."
                    subtitle="Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV, đầu phát Blu-ray và nhiều thiết bị khác."
                />
                <RowWelcome
                    position="left"
                    pic={mobilePic}
                    video={gif}
                    boxshot={subPic}
                    title="Tải xuống nội dung để xem ngoại tuyến."
                    subtitle="Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để xem."
                    boxshotTitle="Cậu bé mất tích"
                />
                <RowWelcome
                    position="right"
                    title="Xem ở mọi nơi."
                    subtitle="Phát trực tuyến không giới hạn phim và chương trình truyền hình trên điện thoại, máy tính bảng, máy tính xách tay và TV."
                />
                <RowWelcome
                    position="left"
                    pic={kid}
                    title="Tạo hồ sơ cho trẻ em."
                    subtitle="Đưa các em vào những cuộc phiêu lưu với nhân vật được yêu thích trong một không gian riêng. Tính năng này đi kèm miễn phí với tư cách thành viên của bạn."
                />
                <RowWelcome
                    position="right"
                    pic={vn}
                    title="Bạn có điện thoại Android? Hãy thử gói dịch vụ miễn phí mới của chúng tôi!"
                    subtitle="Xem các bộ phim và chương trình truyền hình mới được tuyển chọn mà không cần cung cấp thông tin thanh toán!"
                    btnTitle="Tải ứng dụng"
                />
                <div className="story-card faq-card">
                    <div className="faq-card-container">
                        <h1 className='card-title'>Câu hỏi thường gặp</h1>
                        <ul className="faq-list">
                            {faqData.map(faq => (
                                <li className='faq-list-item' key={faq.id}>
                                    <button className='faq-question' onClick={() => handleToggleFaq(faq.id)}>
                                        {faq.question}
                                        <BsPlusLg />
                                    </button>
                                    <div className='faq-answer'>
                                        <span>
                                            {faq.answer1}
                                            {faq.answer2 && (
                                                <>
                                                    <br />
                                                    <br />
                                                    {faq.answer2}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="story-card-input">
                            <input
                                type="text"
                                className="card-input"
                                placeholder='Địa chỉ email'
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Link to='login'>
                                <button className="btn red-btn btn-card-input">
                                    Bắt đầu
                                    <BsChevronRight />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer datas={datas} type='welcome-footer' />
            </div>
        </div>
    )
}

export default Wellcome
