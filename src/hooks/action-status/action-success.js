import { useState, useEffect } from 'react'

export default function useActionSuccess() {

    const [successAction, setSuccessAction] = useState(false);

    const handleActiveActión = () => {
        setSuccessAction(true);
    }
    const handleInactiveActión = () => {
        setSuccessAction(false);
    }

    useEffect(() => {

        if (successAction) {
            setTimeout(() => {
                handleInactiveActión()
            }, 1500);
        }

    }, [successAction])


    return {
        successAction,
        handleActiveActión,
        setSuccessAction,
    }
}