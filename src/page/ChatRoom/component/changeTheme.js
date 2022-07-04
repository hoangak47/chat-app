import { useEffect } from 'react';

function ChangeTheme(theme) {
    useEffect(() => {
        if (theme) {
            document.documentElement.style.setProperty('--bg-main', '#242526');
            document.documentElement.style.setProperty('--color', '#e1e1e1');
            document.documentElement.style.setProperty('--hover', '#3A3B3C');
            document.documentElement.style.setProperty('--border', '#e6e6e67d');
            document.documentElement.style.setProperty('--hover-secondary', '#626262');
        } else {
            document.documentElement.style.setProperty('--bg-main', '#f5f5f5');
            document.documentElement.style.setProperty('--color', '#242526');
            document.documentElement.style.setProperty('--hover', '#dbdbdb');
            document.documentElement.style.setProperty('--border', '#e6e6e6');
            document.documentElement.style.setProperty('--hover-secondary', '#c5c5c5');
        }
    }, [theme]);
}

export default ChangeTheme;
