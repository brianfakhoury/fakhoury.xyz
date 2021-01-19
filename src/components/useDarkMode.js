import { useState } from 'react';
export const useDarkMode = () => {

    const [theme, setTheme] = useState((typeof window != 'undefined') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    };

    return [theme, toggleTheme]
};