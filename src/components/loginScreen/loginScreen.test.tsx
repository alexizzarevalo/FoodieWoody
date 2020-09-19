import firebaseAuthMock, { firebase } from '../../../__mocks__/firebase-auth-mock';
import React from 'react';
import { Alert, ToastAndroid, View } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen, { passwordRecovery, sendEmail, useElements } from '.';
import * as g from "react-native-prompt-android";
import { shallow } from "enzyme";

jest.spyOn(Alert, 'alert');
ToastAndroid.show = jest.fn();

const navigation: any = {
    navigate: (path: string) => {}
};
const route: any = null;

describe('Login Screen Component', () => {
    test('Debe renderizar correctamente', () => {
        act(() => {
            renderer.create(<LoginScreen navigation={navigation} route={route} />)
        })
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

        act(() => { fireEvent.changeText(emailInput, email) })
        //@ts-ignore
        expect(emailInput).toHaveProp('value', email);

        act(() => { fireEvent.changeText(passwordInput, password) })
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', password);
    });

    test('Debe mostrar una alerta cuando quiere iniciar sesion sin escribir sus datos', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');

        act(() => fireEvent.press(loginButton))

        expect(Alert.alert).toHaveBeenCalledWith('Datos faltantes', 'Debes agregar un correo y una contraseña');
    })

    test('Debe navegar hacia la pantalla de registro', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const registerButton = getByTestId('goToRegisterButton');

        act(() => fireEvent.press(registerButton))
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

    describe('Ejecucion de auth firebase', () => {
        test('Debe ejecutar la funcion de auth de firebase con respuesta positiva', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.resolve();
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );

            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })

        test('Debe ejecutar la funcion de auth de firebase con respuesta negativa', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.reject(new Error('auth/wrong-password'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );

            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })

        test('Debe ejecutar la funcion de auth de firebase con respuesta negativa', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.reject(new Error('auth/invalid-email'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );

            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })

        test('Debe ejecutar la funcion de auth de firebase con respuesta negativa', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.reject(new Error('auth/user-not-found'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );

            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })

        test('Debe ejecutar la funcion de auth de firebase con respuesta negativa', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.reject(new Error('auth/too-many-requests'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );


            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })

        test('Debe ejecutar la funcion de auth de firebase con respuesta negativa', async () => {
            const signInWithEmailAndPassword = jest.fn(() => {
                return Promise.reject(new Error('error del servidor'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { signInWithEmailAndPassword }
            })

            const { getByTestId, } = render(
                <LoginScreen navigation={navigation} route={route} />
            );

            const loginButton = getByTestId('loginButton');
            const emailInput = getByTestId('emailInput');
            const passwordInput = getByTestId('passwordInput');

            act(() => fireEvent.changeText(emailInput, 'dalexis.da@gmail.com'))
            act(() => fireEvent.changeText(passwordInput, 'password'))
            await act(async () => await fireEvent.press(loginButton))
        })
    })

    describe('Funcion para enviar un correo', () => {
        test('Debe enviar un email al correo indicado', async () => {
            const sendPasswordResetEmail = jest.fn(() => {
                return Promise.resolve();
            })

            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { sendPasswordResetEmail }
            })

            sendEmail('dalexis.da@gmail.com')
            expect(sendPasswordResetEmail).toHaveBeenCalled();
        })

        test('Debe retornar un error de email invalido', async () => {
            const sendPasswordResetEmail = jest.fn(() => {
                return Promise.reject(new Error('auth/invalid-email'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { sendPasswordResetEmail }
            })

            sendEmail('dalexis.da@gmail')
            expect(sendPasswordResetEmail).toHaveBeenCalled();
        })

        test('Debe retornar un error de que no se pudo enviar el email', async () => {
            const sendPasswordResetEmail = jest.fn(() => {
                return Promise.reject(new Error('error de servidor'));
            })
            //@ts-ignore
            jest.spyOn(firebase, 'auth').mockImplementation(() => {
                return { sendPasswordResetEmail }
            })

            sendEmail('dalexis.da@gmail.com')
            expect(sendPasswordResetEmail).toHaveBeenCalled();
        })
    })

    test('Debe llamarse un prompt', async () => {
        const prompt = jest.spyOn(g, 'default');

        passwordRecovery();
        expect(prompt).toHaveBeenCalled();
    })

    describe('useLoginElements', () => {
        const Elements = () => {
            const props = useElements({ navigation });
            //@ts-ignore
            return <View {...props} />;
        }; // since hooks can only be used inside a function component we wrap it inside one
        const container = shallow(<Elements />);

        it('El campo de password debe tener una funcion focus', () => {
            container.prop('passwordField').focus();
        });
    });
});

