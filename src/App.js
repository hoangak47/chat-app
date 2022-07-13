import './App.scss';
import './responsive.scss';
import { auth } from './firebase/config';
import Main from './page';

function App() {
    // const [width, setWidth] = useState(window.innerWidth);
    // window.addEventListener('resize', function (event) {
    //     setWidth(window.innerWidth);
    // });

    window.addEventListener('unload', function (event) {
        auth.signOut();
    });

    // return <>{width >= 500 ? <Main /> : <h1 className="mobile-view">Application does not support</h1>}</>;
    return <Main />;
}

export default App;
