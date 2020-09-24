import firebase from '../../../__mocks__/firebase-register-mock';
import firestore from '../../../__mocks__/firebase-firestore-mock'
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegistroNegocio from './index';

describe('RegistroNegocio Component', () => {
    
    test('Debe renderizar correctamente', () => {
        act(() => {
            renderer.create(<RegistroNegocio navigation={navigation} route={route} />)
        })
    })
});

