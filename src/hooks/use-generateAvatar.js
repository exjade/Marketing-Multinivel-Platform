import React, { useEffect } from 'react'

export default function useGenerateAvatar() {
    const [url, setUrl] = React.useState()

    useEffect(() => {
        const picture = `https://xsgames.co/randomusers/avatar.php?g=pixel`;
        setUrl(picture)
    }, [])


    return { url }

}