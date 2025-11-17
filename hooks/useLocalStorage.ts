// FIX: Import React to bring the React namespace into scope for types like React.Dispatch.
import React, { useState, useEffect } from 'react';

export function useLocalStorage<T,>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue instanceof Function ? initialValue() : initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore =
                typeof storedValue === 'function'
                    ? storedValue(storedValue)
                    : storedValue;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
