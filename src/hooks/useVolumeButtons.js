import {useEffect, useRef} from "react";
import {VolumeManager} from "react-native-volume-manager";
import {useAppState} from "react-native-hookbox";
import {useSelector} from "react-redux";
import {selectAllAppSettings} from "../store/reducers/settings";
import {useDebounceCallback} from "usehooks-ts";


const UseVolumeButtons = (onVolumeUpPress, onVolumeDownPress) => {
    const appState = useAppState();
    const initialVolume = useRef(null);
    const {volumeButtons} = useSelector(selectAllAppSettings);

    const cb = useDebounceCallback(async (result) => {
        const currentVolume = result.volume;

        if (currentVolume > 0.5) {
            onVolumeUpPress?.();
        } else if (currentVolume < 0.5) {
            onVolumeDownPress?.();
        }

        await VolumeManager.setVolume(0.5);
    }, 50);

    useEffect(() => {
        VolumeManager.getVolume().then((res) => {
            initialVolume.current = res.volume;
        });

        const volumeListener = VolumeManager.addVolumeListener(cb);

        return () => {
            volumeListener.remove();
            VolumeManager.setVolume(initialVolume.current);
        };
    }, [volumeButtons]);

    useEffect(() => {
        if (appState === "background") {
            VolumeManager.setVolume(initialVolume.current);
        }
        if (appState === "active") {
            VolumeManager.setVolume(0.5);
            VolumeManager.showNativeVolumeUI({enabled: false});
        }

        return () => {
            VolumeManager.setVolume(initialVolume.current);
            VolumeManager.showNativeVolumeUI({enabled: true});
        }
    }, [appState, volumeButtons]);
}

export default UseVolumeButtons;