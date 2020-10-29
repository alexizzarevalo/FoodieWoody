import { useEffect, useState } from "react"
import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase as firebaseStore } from "@react-native-firebase/firestore";
import { User } from "../models/user";

export default function useUser() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | undefined | null>(undefined);
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            if (user != null)
                firebaseStore.firestore().collection('users')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        setUserData({
                            ...doc.data() as User,
                            id: doc.id,
                        })
                    })
        })
        return unsubscribe
    }, [firebase.auth])

    return {
        user,
        userData,
        isLogged: !!user
    }
}
