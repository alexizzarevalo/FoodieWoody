import firebase, { firestore } from 'firebase'
import firebaseConfig  from '../src/database/Firebase'

export default firebase.initializeApp(firebaseConfig); 

firebase.firestore().settings({
        host:'localost:4000',
        ssl: false
    });
