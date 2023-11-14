import { useEffect, useState } from 'react'
import '../styles/dashboard/header/header.css'

export default function useTheme() {
    // color theme functionality 
    const [theme, setTheme] = useState(null)

    const changeTheme = () => {
        if (theme === null) {
            return
        }
        const themeBtn = document.getElementById('theme_btn_dark')
        themeBtn.addEventListener('click', () => {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        })

        const themeBtnLight = document.getElementById('theme_btn_light')
        themeBtnLight.addEventListener('click', () => {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        })

    }

    useEffect(() => {
        changeTheme()
    }, [theme])

    return { theme, setTheme }
}