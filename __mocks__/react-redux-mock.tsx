export default jest.mock('react-redux', () => {
    return {
        useDispatch: jest.fn()
    }
});