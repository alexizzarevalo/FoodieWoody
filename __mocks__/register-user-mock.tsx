 

export const updateProfile = (displayName:String)=> {
    
}

export const user = ()=>  {
    return {
        updateProfile
    }
}

export const email = () => {
    return Promise.resolve('correo@generico.com')
}

export default jest.mock('react-redux', () => {
    return {
        user,
        email
    }
});