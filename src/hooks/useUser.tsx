import { useEffect, useState } from "react"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function useUser() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | undefined | null>(undefined);
    
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(setUser)
        return unsubscribe
    }, [auth])

    return {
        user,
        isLogged: !!user
    }
}