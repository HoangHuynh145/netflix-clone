import MainBackdrop from '../../layouts/backdrop/MainBackdrop'
import { useEffect } from 'react'

const Model = ({ showModal }) => {

    useEffect(() => {
        const body = document.body
        body.classList.toggle('banner-open', showModal)
    }, [showModal])

    return (
        <>
            {showModal && (
                <div className="modal-container">
                    <MainBackdrop />
                </div>
            )}
        </>
    )
}

export default Model
