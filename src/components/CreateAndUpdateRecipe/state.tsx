import { useEffect, useState } from "react";
import { firebase } from '@react-native-firebase/firestore';
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import { Alert } from "react-native";

interface Recipe {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    ingredientes: string[];
    pasos: string[];
    tiempo_preparacion: number;
    precio: number;
    negocio_id: string;
}

const defaultRecipe: Recipe = {
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    ingredientes: [],
    pasos: [],
    tiempo_preparacion: 0,
    precio: 0,
    negocio_id: ''
}

export type MultiProps = {
    provider: {
        value: string[];
        add: () => void;
        remove: (index: number) => void;
        temp: {
            value: string,
            onChange: (value: string) => void
        }
    },
    title: string;
    placeholder: string;
}

export default function useCreateAndUpdateRecipeState({ navigation, route }: DrawerScreenProps<DrawerParamList, 'CrearReceta'>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<Recipe>({ ...defaultRecipe });
    const [tempState, setTempState] = useState<{ ingredient: string; step: string }>({ ingredient: '', step: '' });
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const id = route.params.id;

        setUpdate(!!id);

        if (route.params.id) {
            firebase.firestore().collection('recetas')
                .doc(id)
                .get()
                .then(doc => {
                    const recipe = doc.data() as any;
                    setRecipe({
                        id: doc.id,
                        negocio_id: recipe.negocio_id,
                        descripcion: recipe.descripcion,
                        imagen: recipe.imagen,
                        ingredientes: recipe.ingredientes || [],
                        nombre: recipe.nombre,
                        precio: recipe.precio,
                        pasos: recipe.pasos || [],
                        tiempo_preparacion: recipe.tiempo_preparacion || 0
                    })
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }

    }, [route.params]);

    const goBack = () => {
        navigation.goBack();
    }

    const changeId = (value: string) => {
        setRecipe(recipe => ({ ...recipe, id: value }));
    }

    const changeName = (value: string) => {
        setRecipe(recipe => ({ ...recipe, nombre: value }));
    }

    const changeDescription = (value: string) => {
        setRecipe(recipe => ({ ...recipe, descripcion: value }));
    }

    const changeImage = (value: string) => {
        setRecipe(recipe => ({ ...recipe, imagen: value }));
    }

    const changeTime = (value: string) => {
        setRecipe(recipe => ({ ...recipe, tiempo_preparacion: Number(value) }));
    }

    const changePrice = (value: string) => {
        setRecipe(recipe => ({ ...recipe, precio: Number(value) }));
    }

    const changeBussinessId = (value: string) => {
        setRecipe(recipe => ({ ...recipe, negocio_id: value }));
    }

    const addIngredient = () => {
        if (!tempState.ingredient) return;

        setRecipe(recipe => ({ ...recipe, ingredientes: [...recipe.ingredientes, tempState.ingredient] }))
        changeTempIngredient('');
    }

    const removeIngredient = (index: number) => {
        recipe.ingredientes.splice(index, 1);
        setRecipe(recipe => ({ ...recipe, ingredientes: [...recipe.ingredientes] }))
    }

    const changeTempIngredient = (ingredient: string) => {
        setTempState(temp => ({ ...temp, ingredient }))
    }

    const addStep = () => {
        if (!tempState.step) return;

        setRecipe(recipe => ({ ...recipe, pasos: [...recipe.pasos, tempState.step] }))
        changeTempStep('');
    }

    const removeStep = (index: number) => {
        recipe.pasos.splice(index, 1);
        setRecipe(recipe => ({ ...recipe, pasos: [...recipe.pasos] }))
    }

    const changeTempStep = (step: string) => {
        setTempState(temp => ({ ...temp, step }))
    }

    const saveRecipe = () => {
        console.log('Guardar', recipe);
        // firebase.firestore()
        //     .collection('ordenes')
        //     .add(recipe)
        //     .then(console.log)
        //     .catch(console.log);
    }

    const updateRecipe = () => {
        firebase.firestore()
            .collection('recetas')
            .doc(recipe.id)
            .set(recipe, { merge: true })
            .then()
            .catch(console.log)
    }

    const handleSubmit = () => {
        if (update)
            updateRecipe();
        else
            saveRecipe();
    }

    const deleteRecipe = () => {
        Alert.alert('Eliminar receta', 'Desea eliminar la receta?', [
            { text: 'Cancelar' },
            {
                text: 'Eliminar', onPress: () => {
                    firebase.firestore().collection('recetas')
                        .doc(recipe.id).delete().then(() => {
                            goBack()
                        }).catch(console.log)
                }
            }
        ])
    }

    return {
        recipe: {
            id: { value: recipe.id, onChange: changeId },
            name: { value: recipe.nombre, onChange: changeName },
            description: { value: recipe.descripcion, onChange: changeDescription },
            image: { value: recipe.imagen, onChange: changeImage },
            ingredients: {
                add: addIngredient,
                remove: removeIngredient,
                value: recipe.ingredientes,
                temp: {
                    value: tempState.ingredient,
                    onChange: changeTempIngredient
                }
            },
            steps: {
                add: addStep,
                remove: removeStep,
                value: recipe.pasos,
                temp: {
                    value: tempState.step,
                    onChange: changeTempStep
                }
            },
            time: { value: recipe.tiempo_preparacion, onChange: changeTime },
            price: { value: recipe.precio, onChange: changePrice },
            bussinessId: { value: recipe.negocio_id, onChange: changeBussinessId },
        },
        actions: {
            handleSubmit,
            goBack,
            deleteRecipe
        },
        update,
        loading
    }
}