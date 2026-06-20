import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';

export const useWakeWordSensitivity = () => {
    const [sensitivity, setSensitivity] = useState(50);

    useEffect(() => {
        invoke<number>('get_wake_word_sensitivity')
            .then(setSensitivity)
            .catch((err) => console.error('Failed to load wake word sensitivity:', err));
    }, []);

    const updateSensitivity = async (value: number) => {
        try {
            await invoke('set_wake_word_sensitivity', { value });
            setSensitivity(value);
        } catch (err) {
            console.error('Failed to set wake word sensitivity:', err);
        }
    };

    return { sensitivity, setSensitivity: updateSensitivity };
};
