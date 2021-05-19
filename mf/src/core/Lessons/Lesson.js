import React, { useState, useEffect } from 'react'
import ResponsivePlayer from './VideoPlayer'

const Lesson = ({ url, }) => {
    const [watchComplete, setWatchComplete] = useState(false)
    const [certificateStatus, setCertificateStatus] = useState("Please watch the video to get certificate")
    const [styling, setStyling] = useState("markerNot")

    const handleWatchComplete = ({ played }) => {
        if (played >= 0.9 && !watchComplete) {
            setWatchComplete(true);
            setCertificateStatus("Course Completed Get Certificate")
            setStyling("markerIs")

        }
    }

    return (
        <div>
            <ResponsivePlayer
                url={url}
                onProgress={handleWatchComplete}
            />
            <div>
                <button className={styling} >
                    {certificateStatus}
                </button>
            </div>
        </div>

    )
}

export default Lesson
