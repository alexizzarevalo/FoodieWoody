import '../../../__mocks__/firebase-firestore-mock';
import '../../../__mocks__/firebase-auth-mock';
import { firebase as firebaseStore, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React from 'react';
import renderer from "react-test-renderer";
import { Alert } from 'react-native';
import useCreateAndUpdateRecipeState from './state';
import { renderHook, act } from '@testing-library/react-hooks';
import { Recipe } from '../../models/recipe';
import SearchScreen from '.';

const navigation: any = null;

const getReceta = (data: object) => {
    const recipe: Recipe = {
        descripcion: 'Pizza hawaiana',
        id: '1',
        imagen: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg',
        negocio_id: '1',
        nombre: 'pizza',
        pasos: [],
        precio: 50,
        ingredientes: [],
        tiempo_preparacion: 0,
        ...data
    }
    return recipe;
}

function firestoreMock() {
    //@ts-ignore
    jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                get: jest.fn(() => {
                    //@ts-ignore
                    const snapshot: FirebaseFirestoreTypes.DocumentSnapshot = {
                        data: () => {
                            return getReceta({ id: "xhdi8fnb" });
                        },
                        id: 'xhdi8fnb',
                    }
                    return Promise.resolve(snapshot);
                })
            })),
        }))
    }))
}

describe('Pantalla Crear y Actualizar Receta', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('La pantalla debe renderizar correctamente en modo: Crear nueva receta', async () => {
        jest.useFakeTimers();
        firestoreMock();
        const route = {
            params: {} // Dado que no hay id, se creara una receta
        }
        //@ts-ignore
        await act(async () => renderer.create(<SearchScreen navigation={navigation} route={route} />))
    })

    test('La pantalla debe renderizar correctamente en modo: Actualizar receta', async () => {
        jest.useFakeTimers();
        firestoreMock();
        const route = {
            params: { id: 'xhdi8fnb' } // Dado que si hay id, se actualizara la receta
        }
        //@ts-ignore
        await act(async () => renderer.create(<SearchScreen navigation={navigation} route={route} />))
    })

    describe('Estados de la pantalla', () => {
        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
            jest.useFakeTimers();
        })

        // afterAll

        test('Estado inicial de la pantalla cuando es modo: Crear receta', () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }
            //@ts-ignore
            const { result, waitFor } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            expect(result.current.update).toBe(false);
            expect(result.current.canSaveOrUpdate()).toBe(false);
            waitFor(() => expect(result.current.loading).toBe(false));
        })

        test('Estado inicial de la pantalla cuando es modo: Actualizar receta', async () => {
            firestoreMock();
            const route = {
                params: { id: 'xhdi8fnb' } // Dado que hay id, se actualizara una receta
            }

            //@ts-ignore
            const { result, waitForNextUpdate } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await waitForNextUpdate();
            expect(result.current.update).toBe(true);
        })

        test('Debe actualizar correctamente los ingredientes', async () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }

            //@ts-ignore
            const { result } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await act(async () => result.current.recipe.ingredients.temp.onChange("Sal de mesa"));
            expect(result.current.recipe.ingredients.temp.value).toBe("Sal de mesa");
            await act(async () => result.current.recipe.ingredients.add());
            expect(result.current.recipe.ingredients.value).toEqual(["Sal de mesa"]);
            await act(async () => result.current.recipe.ingredients.remove(0));
            expect(result.current.recipe.ingredients.value).toEqual([]);
        })

        test('Debe actualizar correctamente los pasos', async () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }

            //@ts-ignore
            const { result } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await act(async () => result.current.recipe.steps.temp.onChange("Verter agua en al olla"));
            expect(result.current.recipe.steps.temp.value).toBe("Verter agua en al olla");
            await act(async () => result.current.recipe.steps.add());
            expect(result.current.recipe.steps.value).toEqual(["Verter agua en al olla"]);
            await act(async () => result.current.recipe.steps.remove(0));
            expect(result.current.recipe.steps.value).toEqual([]);
        })

        test('Debe actualizar correctamente los datos de la receta', async () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }

            //@ts-ignore
            const { result } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await act(async () => result.current.recipe.bussinessId.onChange('vxh85dpk'));
            expect(result.current.recipe.bussinessId.value).toBe("vxh85dpk");

            await act(async () => result.current.recipe.description.onChange('Pastel de frutas'));
            expect(result.current.recipe.description.value).toBe("Pastel de frutas");

            await act(async () => result.current.recipe.id.onChange('zuor5dpk'));
            expect(result.current.recipe.id.value).toBe("zuor5dpk");

            await act(async () => result.current.recipe.image.onChange('http://image.png'));
            expect(result.current.recipe.image.value).toBe("http://image.png");

            await act(async () => result.current.recipe.name.onChange('Pastel'));
            expect(result.current.recipe.name.value).toBe("Pastel");

            await act(async () => result.current.recipe.price.onChange('150'));
            expect(result.current.recipe.price.value).toBe(150);

            await act(async () => result.current.recipe.time.onChange('60'));
            expect(result.current.recipe.time.value).toBe(60);
        })

        test('Debe poder navegar hacia la pantalla anterior', async () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }

            const navigation = {
                goBack: jest.fn()
            }
            //@ts-ignore
            const { result } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await act(async () => result.current.actions.goBack());
            expect(navigation.goBack).toHaveBeenCalledTimes(1);
        })

        test('Debe actualizar una receta en firestore', async () => {
            firestoreMock();
            const route = {
                params: { id: 'xhdi8fnb' } // Dado que hay id, se actualizara una receta
            }

            //@ts-ignore
            const { result, waitFor, waitForNextUpdate } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            await waitForNextUpdate();
            expect(result.current.update).toBe(true);

            const mockSet = jest.fn(() => Promise.resolve());

            //@ts-ignore
            jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
                collection: () => ({
                    doc: () => ({
                        set: mockSet
                    })
                })
            }));

            await act(async () => result.current.actions.updateRecipe());
            waitFor(() => expect(mockSet).toHaveBeenCalledTimes(1)); // Se ejecuta la funcion para guardar
        })

        test('Debe eliminar una receta e ir a la pantalla anterior', async () => {
            firestoreMock();
            jest.spyOn(Alert, 'alert');
            const route = {
                params: { id: 'dujwxr9f' } // Dado que hay id, se eliminara una receta
            }

            const navigation = {
                goBack: jest.fn()
            }

            //@ts-ignore
            const { result, waitFor } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));

            const mockDelete = jest.fn(() => Promise.resolve());

            //@ts-ignore
            jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
                collection: () => ({
                    doc: () => ({
                        delete: mockDelete
                    })
                })
            }));

            await act(async () => result.current.actions.deleteRecipe());
            expect(Alert.alert).toHaveBeenCalledTimes(1);
            //@ts-ignore
            Alert.alert.mock.calls[0][2][1].onPress(); // Se confirma la eliminacion
            expect(mockDelete).toHaveBeenCalledTimes(1); // Se ejecuta la funcion para elliminar
            waitFor(() => expect(navigation.goBack).toHaveBeenCalled()); // Se redirige a la pantalla anterior
        })

        test('Debe guardar una receta e ir a la pantalla anterior', async () => {
            firestoreMock();
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }

            const navigation = {
                goBack: jest.fn()
            }

            //@ts-ignore
            const { result, waitFor } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            waitFor(() => expect(result.current.update).toBe(false));

            const mockAdd = jest.fn(() => Promise.resolve());

            //@ts-ignore
            jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
                collection: () => ({
                    add: mockAdd
                })
            }));

            await act(async () => result.current.actions.handleSubmit());
            waitFor(() => expect(mockAdd).toHaveBeenCalledTimes(1)); // Se ejecuta la funcion para guardar
            waitFor(() => expect(navigation.goBack).toHaveBeenCalled()); // Se redirige a la pantalla anterior
        })
    })
})

