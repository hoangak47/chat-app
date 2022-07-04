import { Routes, Route } from 'react-router-dom';
import config from '~/config';
import ChatRoom from './ChatRoom';
import Login from './Login';

const Main = () => {
    return (
        <>
            <Routes>
                <Route path={config.routes.chatroom} element={<ChatRoom />} />
                <Route path={config.routes.login} exact element={<Login />} />
            </Routes>
        </>
    );
};

export default Main;
