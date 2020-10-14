import { useEffect, useState } from "react"
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function useUser() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | undefined | null>(undefined);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(setUser)
        return unsubscribe
    }, [firebase.auth])

    return {
        user,
        isLogged: !!user
    }
}
