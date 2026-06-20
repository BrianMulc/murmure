import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';

export const useWakeWordMatchTolerance = () => {
    const [matchTolerance, setMatchTolerance] = useState(2);

    useEffect(() => {
        invoke<number>('get_wake_word_match_tolerance')
            .then(setMatchTolerance)
            .catch((err) => console.error('Failed to load match tolerance:', err));
    }, []);

    const updateMatchTolerance = async (value: number) => {
        try {
            await invoke('set_wake_word_match_tolerance', { value });
            setMatchTolerance(value);
        } catch (err) {
            console.error('Failed to set match tolerance:', err);
        }
    };

    return { matchTolerance, setMatchTolerance: updateMatchTolerance };
};
