import '../__mocks__/firebase-auth-mock';

import React from 'react';
import renderer from 'react-test-renderer'
import LoginScreen from '../src/components/loginScreen'

describe('Login screen component', () => {
    const navigation:any = null
    const route:any=null
    test('renders', () => {
        renderer.create(<LoginScreen navigation={navigation} route={route}/>)
    })
})
