const get = () => {
    return Promise.resolve('')
}

const doc = (name: string) => {
    return {
        get
    }
}

const collection = (name: string) => {
    return {
        get
    }
}

export const firestore = () => {
    return {
        collection,
        doc
    }
}

export const firebase = {
    firestore
}

// export default firestore;
export default jest.mock('@react-native-firebase/firestore', () => {
    return {
        __esModule: true, // this property makes it work
        default: firestore,
        firebase
    }
});
