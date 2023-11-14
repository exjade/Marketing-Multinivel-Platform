import { useEffect, useState, useRef } from 'react'

export default function useIsVisible() {

    const [isContentVisible, setIsContentVisible] = useState(true);
    const prevScrollYRef = useRef(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsContentVisible(currentScrollY <= prevScrollYRef.current);
        prevScrollYRef.current = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { isContentVisible }
}

