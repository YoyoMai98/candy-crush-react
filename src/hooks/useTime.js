import { useCallback, useState } from "react"

const defaultTime = 100

const useTime = () => {
    const [refreshTime, setRefreshTime] = useState(defaultTime)
    const [preRefreshTime, setPreRefreshTime] = useState()

    const resumeTime = useCallback(() => {
        if(!preRefreshTime) return
        console.log("resumeTime");
        setRefreshTime(preRefreshTime)
        setPreRefreshTime(null)
    }, [preRefreshTime])

    const pauseTime = useCallback(() => {
        if(refreshTime){
            setPreRefreshTime(refreshTime)
        }
        console.log("pauseTime");
        setRefreshTime(null)
    }, [refreshTime])

    return [refreshTime, resumeTime, pauseTime]
}

export default useTime