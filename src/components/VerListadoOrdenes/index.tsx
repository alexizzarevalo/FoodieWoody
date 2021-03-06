import React from "react";
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { MyRecipesStackParamList } from "../../navigation/types";
import Icon from 'react-native-vector-icons/AntDesign';
import { useElements } from "./state";

type Props = StackScreenProps<MyRecipesStackParamList, 'ListOfRecipes'> & { showSearch?: boolean };

export default function ListOfRecipesScreen({ navigation, showSearch = false }: Props) {
    const { loading, recetas, search, addIcon, renderReceta, getKeyReceta, refresh } = useElements({ navigation, showSearch });
    
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
                    <Icon testID="searchIcon" name={search.icon.name} size={40} onPress={search.icon.onPress} ></Icon>
                    {
                        !search.showInput ? <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Mis Recetas</Text> :
                            <TextInput
                                testID="searchInput"
                                placeholder="Buscar..."
                                style={{ borderBottomWidth: 1, flex: 1, fontSize: 18 }}
                                value={search.value}
                                onChangeText={search.onChangeText}
                            />
                    }
                    <Icon testID="cartIcon" name="plus" size={40} onPress={addIcon.onPress}></Icon>
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
                                renderItem={renderReceta}
                                keyExtractor={getKeyReceta}
                                refreshing={false}
                                onRefresh={refresh}
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
