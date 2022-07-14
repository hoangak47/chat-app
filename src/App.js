import './App.scss';
import './responsive.scss';
import { auth } from './firebase/config';
import Main from './page';

function App() {
    window.addEventListener('unload', function (event) {
        auth.signOut();
    });
    return <Main />;
}

export default App;
