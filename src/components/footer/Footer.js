import './footer.scss';
import { FaFacebookF } from 'react-icons/fa'
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { useState } from 'react';

const Footer = ({ datas, type }) => {
    const [servicesCode, setServicesCode] = useState('Mã dịch vụ')

    return (
        <div className={`story-card story-card-footer ${type}`}>
            <div className="footer-container">
                {type === 'main-view' && (
                    <ul className="socials-container">
                        <li className="social-item facebook">
                            <FaFacebookF />
                        </li>
                        <li className="social-item instagram">
                            <BsInstagram />
                        </li>
                        <li className="social-item twitter">
                            <BsTwitter />
                        </li>
                        <li className="social-item youtube">
                            <BsYoutube />
                        </li>
                    </ul>
                )}
                <p className="footer-top">Bạn có câu hỏi? Liên hệ với chúng tôi.</p>
                <ul className="footer-contact-wrapper">
                    {datas.map(data => (
                        <li className="contact-item" key={data.id}>{data.title}</li>
                    ))}
                </ul>
                {type !== 'main-view' && (
                    <div className={`footer-language ${type === 'register-footer' ? 'register' : ''}`}>
                        <select className="footer-select">
                            <option value="vni">Tiếng việt</option>
                            <option value="eng">English</option>
                        </select>
                    </div>
                )}
                {type === 'welcome-footer' && <span className="country">Netflix Việt Nam</span>}
                {type === 'main-view' && (
                    <div className="footer-info">
                        <span 
                            className="services-code"
                            onClick={() => setServicesCode('665-461')}
                        >
                            {servicesCode}
                        </span>
                        <div className="copyright">
                            © 1997-2022 Netflix, Inc. &#160;
                            <span className="member-code">{`{e402df68-7df3-4c49-a5d9-7353d54c4cde}`}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Footer