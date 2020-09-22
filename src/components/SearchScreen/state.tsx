import React, { useEffect, useState } from "react";
import Receta, { IReceta } from "./Receta";
import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../navigation/types";
import { act } from "react-test-renderer";

export function getRecetas(): Promise<FirebaseFirestoreTypes.QuerySnapshot> {
    return new Promise((resolve) => {
        firebase.firestore()
            .collection('recetas')
            .get()
            .then(resolve)
    })
}

export function SetRecetas(setLoading: any, setRecetas: any) {
    setLoading(true);
    getRecetas().then(snapshot => {
        const recetas: IReceta[] = [];
        snapshot.docs.forEach(docSnapshot => {
            recetas.push({ ...docSnapshot.data() as IReceta, id: docSnapshot.id })
        })
        setRecetas(recetas);
    }).finally(() => { setLoading(false) })
}

export function filterRecetas(recetas: IReceta[], txtToFind: string) {
    return recetas.filter(receta => {
        return receta.nombre.toLowerCase().includes(txtToFind) ||
            receta.descripcion.toLowerCase().includes(txtToFind);;
    })
}
export function useElements({ navigation, showSearch = false }: { navigation: StackNavigationProp<SearchStackParamList, "Search">, showSearch?: boolean }) {
    const [search, setSearch] = useState<string>('');
    const [recetas, setRecetas] = useState<IReceta[]>([]);
    const [busqueda, setBusqueda] = useState<IReceta[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showInput, setShowInput] = useState<boolean>(showSearch);

    const update = (recetas: IReceta[]) => {
        act(() => {
            setRecetas(recetas);
            setBusqueda(recetas);
        })
    }

    const updateLoading = (loading: boolean) => act(() => setLoading(loading))

    useEffect(() => {
        SetRecetas(updateLoading, update);
    }, [])

    useEffect(() => {
        const txtToFind = search.toLowerCase();
        setBusqueda(filterRecetas(recetas, txtToFind))
    }, [search])

    const onPressIcon = () => { setShowInput(state => !state); setSearch('') }

    const onPressCartIcon = () => { navigation.push('Checkout') }

    const renderReceta = ({ item }: { item: IReceta }) => <Receta key={item.id} receta={item} nav={navigation} />

    const getKeyReceta = (item: IReceta) => item.id;

    return {
        search: {
            icon: {
                name: showInput ? 'back' : 'search1',
                onPress: onPressIcon
            },
            showInput,
            value: search,
            onChangeText: setSearch
        },
        cartIcon: {
            onPress: onPressCartIcon
        },
        recetas: busqueda,
        loading,
        renderReceta,
        getKeyReceta
    }
}