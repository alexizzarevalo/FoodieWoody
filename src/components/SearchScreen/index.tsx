import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native";
import Receta, { IReceta } from "./Receta";
import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { SearchStackParamList } from "../../navigation/types";
import Icon from 'react-native-vector-icons/AntDesign';

export function getRecetas(): Promise<FirebaseFirestoreTypes.QuerySnapshot> {
    return new Promise((resolve) => {
        firebase.firestore()
            .collection('recetas')
            .get()
            .then(resolve)
    })
}

export function SetRecetas(setLoading: any, setRecetas: any, setBusqueda: any) {
    setLoading(true);
        getRecetas().then(snapshot => {
            const recetas: IReceta[] = [];
            snapshot.forEach(docSnapshot => {
                recetas.push({ ...docSnapshot.data() as IReceta, id: docSnapshot.id })
            })
            setRecetas(recetas);
            setBusqueda(recetas);
        }).finally(() => { setLoading(false) })
}

export function useElements({ navigation }: { navigation: StackNavigationProp<SearchStackParamList, "Search"> }) {
    const [search, setSearch] = useState<string>('');
    const [recetas, setRecetas] = useState<IReceta[]>([]);
    const [busqueda, setBusqueda] = useState<IReceta[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showInput, setShowInput] = useState<boolean>(false);

    useEffect(() => {
        SetRecetas(setLoading, setRecetas, setBusqueda);
    }, [])

    useEffect(() => {
        const txtToFind = search.toLowerCase();
        setBusqueda(() => {
            return recetas.filter(receta => {
                return receta.nombre.toLowerCase().includes(txtToFind) ||
                    receta.descripcion.toLowerCase().includes(txtToFind);
            })
        })
    }, [search])

    const onPressIcon = () => { setShowInput(state => !state); setSearch('') }

    const onPressCartIcon = () => { navigation.push('Checkout') }

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
        loading
    }
}

export default function SearchScreen({ navigation }: StackScreenProps<SearchStackParamList, 'Search'>) {
    const { loading, recetas, search, cartIcon } = useElements({ navigation })

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={{
                    backgroundColor: '#f87c09',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                    <Icon name={search.icon.name} size={40} onPress={search.icon.onPress} ></Icon>
                    {
                        !search.showInput ? <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Foodie Woody</Text> :
                            <TextInput
                                placeholder="Buscar..."
                                style={{ borderBottomWidth: 1, flex: 1, fontSize: 18 }}
                                value={search.value}
                                onChangeText={search.onChangeText}
                            />
                    }
                    <Icon name="shoppingcart" size={40} onPress={cartIcon.onPress}></Icon>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ flex: 1, overflow: 'hidden', borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: 'white' }}>
                    {
                        loading ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator color="#f87c09" size={30}></ActivityIndicator>
                            </View>
                            :
                            <FlatList
                                data={recetas}
                                renderItem={({ item }) => <Receta key={item.id} receta={item} nav={navigation} />}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={
                                    <View style={{ marginTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>No hay recetas por ahora</Text>
                                    </View>
                                }
                            />
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f87c09'
    },
    searchContainer: {
        height: 80,
    }
});