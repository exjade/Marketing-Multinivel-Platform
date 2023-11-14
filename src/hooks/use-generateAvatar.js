import React, { useEffect } from 'react'
import shortid from 'shortid';

export default function useGenerateAvatar() {
    const [url, setUrl] = React.useState()

    useEffect(() => {
        const id = shortid.generate().trim();
        const picture = `https://robohash.org/${id}?gravatar=hashed`;
        setUrl(picture)
    }, [])


    return { url }

}