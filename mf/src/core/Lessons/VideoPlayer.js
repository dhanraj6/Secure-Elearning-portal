import React from "react"
import ReactPlayer from "react-player"
import "./resposive.css"

const ResponsivePlayer = ({url,onProgress}) => {

    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='react-player'
                url={url}
                width='100%'
                height='100%'
                controls={true}
                onProgress={onProgress}
                // loop={true}
            />
        </div>
    )

}

export default ResponsivePlayer;