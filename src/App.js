import './App.scss';
import './responsive.scss';
import Main from './page';
import { auth } from './firebase/config';

function App() {
    window.addEventListener('unload', function (event) {
        auth.signOut();
    });
    return <Main />;
}

export default App;
