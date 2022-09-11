import video404 from '../../access/img/404Mp4.mp4';
import "./notFound.scss"

const NotFound = () => {
    return (
        <div className="not-found-container">
            <video className="video" autoPlay muted loop >
                <source src={video404}></source>
            </video>
        </div>
    )
}

export default NotFound