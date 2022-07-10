import { useState } from 'react';
import './App.scss';
import Main from './page';

function App() {
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', function (event) {
        setWidth(window.innerWidth);
    });
    return <>{width >= 500 ? <Main /> : <h1 className="mobile-view">Application does not support</h1>}</>;
}

export default App;
