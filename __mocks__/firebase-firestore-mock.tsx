const deletefn = () => Promise.resolve('');

const getfn = () => Promise.resolve('');

const set = () => Promise.resolve('');

const add = () => Promise.resolve('');

const doc = (name: string) => {
    return {
        get: getfn,
        set,
        delete: deletefn
    }
}

const collection = (name: string) => {
    return {
        get: getfn,
        add,
        doc
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