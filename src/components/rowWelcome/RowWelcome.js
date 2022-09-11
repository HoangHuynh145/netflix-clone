import './rowWelcome.scss'
import { BsChevronRight } from 'react-icons/bs'

const RowWelcome = ({ position, title, subtitle, pic, video, boxshot, boxshotTitle, btnTitle }) => {

    return (
        <div className="story-card animation-card">
            <div className={`animation-card-container ${position}`}>
                <div className="animation-card-text">
                    <h1 className='card-title'>{title}</h1>
                    <h2 className='card-subtitle'>{subtitle}</h2>
                    {btnTitle && (
                        <div className="download-route">
                            {btnTitle}
                            <BsChevronRight />
                        </div>
                    )}
                </div>
                {pic && (
                    <div className={`animation-card-img-container ${boxshot ? 'margin-minus' : ''}`}>
                        <img className="card-img" src={pic} alt="card-img" />
                        <div className="animation-card-video">
                            <div className={`story-card-wrapper ${boxshot ? 'boxshot' : ''}`}>
                                <div className="story-card-image">
                                    {boxshot && <img src={boxshot} alt="boxshot" />}
                                    <div className="animation-card-video">
                                        <video className="card-video" autoPlay loop muted >
                                            <source src={video} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                                {boxshot && (
                                    <>
                                        <div className="story-card-text-wrapper">
                                            <p className="boxshot-name">{boxshotTitle}</p>
                                            <span className="downloading">Đang tải xuống...</span>
                                        </div>
                                        <div className="story-card-custom">
                                            <img src={video} alt="video" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default RowWelcome