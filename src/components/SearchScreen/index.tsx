import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, ActivityIndicator } from "react-native";
import Receta, { IReceta } from "./Receta";
import firestore from "@react-native-firebase/firestore";

export default function SearchScreen() {
    const [search, setSearch] = useState<string>('');
    const [recetas, setRecetas] = useState<IReceta[]>([]);
    const [busqueda, setBusqueda] = useState<IReceta[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        firestore()
            .collection('recetas')
            .get()
            .then(snapshot => {
                const recetas: IReceta[] = [];
                snapshot.forEach(docSnapshot => {
                    recetas.push({ ...docSnapshot.data() as IReceta, id: docSnapshot.id })
                })
                setRecetas(recetas);
                setBusqueda(recetas);
            }).finally(() => { setLoading(false) })
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

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={{
                    backgroundColor: '#f87c09',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}>
                    <Text>Icon</Text>
                    <TextInput
                        placeholder="Buscar..."
                        style={{ borderBottomWidth: 1, flex: 1 }}
                        value={search}
                        onChangeText={setSearch}
                    />
                    <Text>Hola</Text>
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
                                data={busqueda}
                                renderItem={({ item }) => <Receta key={item.id} receta={item} />}
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