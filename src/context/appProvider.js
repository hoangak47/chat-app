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

    useEffect(() => {
        context.setListRoom(rooms);
    }, [rooms]);

    return <AppContext.Provider value={rooms}>{children}</AppContext.Provider>;
}

export default AppProvider;
