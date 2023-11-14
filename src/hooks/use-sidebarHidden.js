import { useState } from 'react'

export default function useSidebarHidden() {
    const [sidebarHidden, setSidebarHidden] = useState(true)

    return { sidebarHidden, setSidebarHidden }
}