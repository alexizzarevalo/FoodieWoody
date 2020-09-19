import '../../../__mocks__/firestore-emulator'

import React from 'react';

import DetalleReceta, {getIngredientes, getNegocioNombre, SectionTitle, StaticComponent} from './DetalleReceta';
import { render, waitFor } from "@testing-library/react-native";

import {Receta, Ingrediente} from '../../models/receta'

describe('DetalleReceta', () => {
    
    const negocio_nombre = "Domino's Pizza"
    const receta:Receta = {
        "imagen":"https://i.cbc.ca/1.3993184.1583946118!/fileImage/httpImage/hawaiian-pizza-pineapple-pizza.jpg",
        "negocio_id":"users/Z2Pzggc3gem8Bx5qsbgD",
        "id":"JLMlOFhyoheIjAP4uieS",
        "pasos":["Hacer la masa","Agregar piña","Hornear"],
        "nombre":"Pizza Hawaiana",
        "precio":55.5,
        "descripcion":"Para un italiano añadir piña a una pizza es una aberracion. Por suerte no somos italianos."
    }
    const ingredientes:Array<Ingrediente> = [
        {
            id:'CgczoanNQRYWXbA300rf',
            nombre:'Harina',
            imagen:'https://cdn.shopify.com/s/files/1/0081/5929/7599/products/Pureza-HarinaPizza_grande.jpg?v=1595534856',
        },
        {
            id:'KOwV7jFkdf9kg2q1x469',
            nombre:'Piña',
            imagen:'https://cdn.forbescentroamerica.com/2019/12/PI%C3%91A.jpg',
        },
    ]

    beforeAll(() => {
        
    })

    it('Componente SectionTitle muestra el texto correcto', () => {
        const { getByTestId } = render(
            <SectionTitle title='Titulo de Prueba'/>
        );
        let textComponent = getByTestId('title');
        
        //@ts-ignore
        expect(textComponent).toHaveTextContent('Titulo de Prueba')
    })

    it('Componente muestra el nombre del negocio', () => {

        const { getByTestId } = render(
            <StaticComponent receta={receta} negocio_nombre={negocio_nombre} ingredientes={ingredientes}/>
        )

        let negocioTextComponent = getByTestId('negocio_nombre');

        //@ts-ignore
        expect(negocioTextComponent).toHaveTextContent(negocio_nombre)
    })

    it('Componente muestra nombre, imagen, precio, descripcion de receta', () => {
        const { getByTestId } = render(
            <StaticComponent receta={receta} negocio_nombre={negocio_nombre} ingredientes={ingredientes}/>
        )

        let nombre = getByTestId('nombre');
        let imagen = getByTestId('imagen');
        let precio = getByTestId('precio');
        let descripcion = getByTestId('descripcion');

        //@ts-ignore
        expect(nombre).toHaveTextContent(receta.nombre)
        //@ts-ignore
        expect(imagen).toHaveProp('source', {uri: receta.imagen})
        //@ts-ignore
        expect(precio).toHaveTextContent('Q' + receta.precio)
        //@ts-ignore
        expect(descripcion).toHaveTextContent(receta.descripcion)
    })

    it('Se obtiene el nombre del negocio a partir del id del negocio', (done) => {
        function callback(str:string){
            try {
                expect(str).toBe(negocio_nombre);
                done();
            } catch (error) {
                done(error);
            }
        }
        
        getNegocioNombre(receta.negocio_id, callback)
    })

    it('Se obtiene la lista de ingredientes', (done) => {
        function callback(arr:Array<Ingrediente>){
            try {
                expect(arr[0]).toEqual(ingredientes[0]);
                done();
            } catch (error) {
                done(error);
            }
        }
        
        getIngredientes(receta.id, callback)
    })

    it('Componente une UI con la logica', async () => {
        const nav:any = null;
        const route:any = {params:{receta: receta}}

        const { getByTestId } = render(
            <DetalleReceta navigation={nav} route={route}/>
        )
        
        await waitFor(() => getByTestId('nombre'))
    })
});