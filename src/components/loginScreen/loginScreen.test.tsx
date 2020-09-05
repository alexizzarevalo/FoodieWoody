import '../../../__mocks__/firebase-auth-mock';
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from '.';

jest.spyOn(Alert, 'alert');
const navigation: any = null;
const route: any = null;

describe('Login Screen Component', () => {
    test('Debe renderizar correctamente', () => {
        renderer.create(<LoginScreen navigation={navigation} route={route} />)
    })

    test('Los campos deben estar vacios al iniciar', () => {
        const { getByTestId } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        //@ts-ignore
        expect(emailInput).toHaveProp('value', '');
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', '');
    });

    test('El campo de password debe ser de entrada segura', () => {
        const { getByTestId } = render(
            <LoginScreen navigation={navigation} route={route} />
        );
        const passwordInput = getByTestId('passwordInput');
        //@ts-ignore
        expect(passwordInput).toHaveProp('secureTextEntry', true);
    })

    test('Los campos deben cambiar su valor a lo que se escribe', () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        const email = 'dalexis.da@gmail.com';
        const password = 'password';

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);

        //@ts-ignore
        expect(emailInput).toHaveProp('value', email);
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', password);
    });

    test('Debe mostrar una alerta cuando quiere iniciar sesion sin escribir sus datos', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');

        fireEvent.press(loginButton);

        expect(Alert.alert).toHaveBeenCalledWith('Datos faltantes', 'Debes agregar un correo y una contraseña');
    })

    test('El boton de login debe tener un texto "Iniciar sesión"', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');
        const loginButtonText = getByTestId('loginButtonText');

        //@ts-ignore
        expect(loginButtonText).toHaveTextContent('Iniciar sesión');
        //@ts-ignore
        expect(loginButton).toContainElement(loginButtonText);
    })

    test('Debe ejecutar la funcion de auth de firebase', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        const email = 'dalexis.da@gmail.com';
        const password = 'password';

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);

        fireEvent.press(loginButton);
        // act(() => {
        // })
        // const activityIndicator = await waitFor(() => getByTestId('activityIndicator'));
        // // @ts-ignore
        // expect(loginButton).toContainElement(activityIndicator);
    })
});

