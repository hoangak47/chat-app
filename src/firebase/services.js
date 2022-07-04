import firebase, { db } from './config';

export const addDoc = (collection, data) => {
    const query = db.collection(collection);
    console.log(query);

    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
