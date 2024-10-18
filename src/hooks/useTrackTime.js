import {useEffect} from "react";
import {useAppState} from "react-native-hookbox";

const UseTrackTime = (callback) => {
    const appState = useAppState();

    useEffect(() => {
        let start = Date.now();

        function getTimeDiff() {
            const end = Date.now();
            const timeDiff = (end - start) / 1000 / 60;
            callback?.(timeDiff);
        }

        if (appState === "active") {
            start = Date.now();
        }

        if (appState === "background") {
            getTimeDiff();
        }

        return getTimeDiff;
    }, [appState]);
};

export default UseTrackTime;