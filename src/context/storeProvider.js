/* eslint-disable react-hooks/exhaustive-deps */
import Context from './context';
import { useEffect, useState } from 'react';

function StoreProvider({ children }) {
    const [user, setUser] = useState(null);

    const [listRoom, setListRoom] = useState([]);

    const [indexRoom, setRoom] = useState(0);

    const [nameRoom, setNameRoom] = useState(listRoom[indexRoom]?.name);

    const [avatarRoom, setAvatarRoom] = useState(listRoom[indexRoom]?.avatarRoom);

    const [members, setMembers] = useState(listRoom[indexRoom]?.members);

    const [modal, setModal] = useState(false);

    useEffect(() => {
        setMembers(listRoom[indexRoom]?.members);
    }, [indexRoom]);

    useEffect(() => {
        setNameRoom(listRoom[indexRoom]?.name);
        setAvatarRoom(listRoom[indexRoom]?.avatarRoom);
        setMembers(listRoom[indexRoom]?.members);
    }, [listRoom]);

    const [menu, setMenu] = useState(false);

    const data = {
        user,
        setUser,
        listRoom,
        setListRoom,
        indexRoom,
        setRoom,
        nameRoom,
        setNameRoom,
        avatarRoom,
        setAvatarRoom,
        members,
        setMembers,
        modal,
        setModal,
        menu,
        setMenu,
    };
    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export default StoreProvider;
