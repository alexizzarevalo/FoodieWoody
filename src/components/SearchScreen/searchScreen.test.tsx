import '../../../__mocks__/firebase-firestore-mock';
import "../../../__mocks__/react-redux-mock";
import { firebase } from "@react-native-firebase/firestore";
import React from 'react';
import { Alert, View } from 'react-native';
import renderer from 'react-test-renderer';
import SearchScreen, { getRecetas, SetRecetas } from '.';
// import { shallow } from "enzyme";

jest.spyOn(Alert, 'alert');

const navigation: any = null;
const route: any = null;

describe('Search Screen Component', () => {
    test('Debe renderizar correctamente', () => {
        jest.useFakeTimers();
        renderer.create(<SearchScreen navigation={navigation} route={route} />)
    })

    test('Debe retornar un arreglo de recetas', () => {
        // @ts-ignore
        jest.spyOn(firebase, 'firestore').mockImplementation(() => {
            return {
                collection: jest.fn(() => {
                    return {
                        get: jest.fn(() => {
                            return Promise.resolve([{}, {}, {}]);
                        })
                    }
                })
            }
        })

        getRecetas();
    })

    it('should set value on search value onChangeText event', (done) => {
      function setLoading() {
        done();
      }

      function setRecetas() {
        done();
      }

      function setBusqueda() {
        done();
      }

      SetRecetas(setLoading, setRecetas, setBusqueda);
    });
});

