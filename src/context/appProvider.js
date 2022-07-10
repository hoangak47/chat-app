/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo } from 'react';
import useFirestore from '~/hooks/useFirestore';
import Context from './context';

export const AppContext = React.createContext();

function AppProvider({ children }) {
    const context = useContext(Context);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: context.user?.uid,
        };
    }, [context.user?.uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: context.listRoom[context.indexRoom]?.members,
        };
    }, [context.listRoom[context.indexRoom]?.members]);

    const users = useFirestore('users', userCondition);

    const infoUserCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: context.user?.uid,
        };
    }, [context.user?.uid]);

    const infoUsers = useFirestore('users', infoUserCondition);

    // ------------------test------------------

    const userRef = useFirestore('users');

    useEffect(() => {
        context.setListRoom(rooms);
    }, [rooms]);

    const data = {
        rooms,
        users,
        infoUsers,
        userRef,
    };

    return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default AppProvider;
