import { useRef, useState } from "react";
import { firebase } from '@react-native-firebase/firestore';
import { TextInput } from "react-native";

interface Recipe {
    id: string;
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string[];
    time: number;
    price: number;
    bussinessId: string;
}

const defaultRecipe: Recipe = {
    id: '123',
    name: 'Darwin',
    description: 'Arevalo',
    image: 'https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/receta-de-conchas-de-pan.jpg',
    ingredients: [],
    steps: [],
    time: 0,
    price: 0,
    bussinessId: '50'
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

export type Props = {
    update: boolean
}

export default function useCreateAndUpdateRecipeState({ update }: Props) {
    const [recipe, setRecipe] = useState<Recipe>({ ...defaultRecipe });
    const [tempState, setTempState] = useState<{ ingredient: string; step: string }>({ ingredient: '', step: '' });

    const changeId = (value: string) => {
        setRecipe(recipe => ({ ...recipe, id: value }));
    }

    const changeName = (value: string) => {
        setRecipe(recipe => ({ ...recipe, name: value }));
    }

    const changeDescription = (value: string) => {
        setRecipe(recipe => ({ ...recipe, description: value }));
    }

    const changeSteps = (value: []) => {
        setRecipe(recipe => ({ ...recipe, steps: value }));
    }

    const changeImage = (value: string) => {
        setRecipe(recipe => ({ ...recipe, image: value }));
    }

    const changeTime = (value: string) => {
        setRecipe(recipe => ({ ...recipe, time: Number(value) }));
    }

    const changePrice = (value: string) => {
        setRecipe(recipe => ({ ...recipe, price: Number(value) }));
    }

    const changeBussinessId = (value: string) => {
        setRecipe(recipe => ({ ...recipe, bussinessId: value }));
    }

    const addIngredient = () => {
        if (!tempState.ingredient) return;

        setRecipe(recipe => ({ ...recipe, ingredients: [...recipe.ingredients, tempState.ingredient] }))
        changeTempIngredient('');
    }

    const removeIngredient = (index: number) => {
        recipe.ingredients.splice(index, 1);
        setRecipe(recipe => ({ ...recipe, ingredients: [...recipe.ingredients] }))
    }

    const changeTempIngredient = (ingredient: string) => {
        setTempState(temp => ({ ...temp, ingredient }))
    }

    const addStep = () => {
        if (!tempState.step) return;

        setRecipe(recipe => ({ ...recipe, steps: [...recipe.steps, tempState.step] }))
        changeTempStep('');
    }

    const removeStep = (index: number) => {
        recipe.steps.splice(index, 1);
        setRecipe(recipe => ({ ...recipe, steps: [...recipe.steps] }))
    }

    const changeTempStep = (step: string) => {
        setTempState(temp => ({ ...temp, step }))
    }

    const saveRecipe = () => {
        firebase.firestore()
            .collection('ordenes')
            .add(recipe)
            .then(console.log)
            .catch(console.log);
    }

    const updateRecipe = () => {
        firebase.firestore()
            .collection('ordenes')
            .doc(recipe.id)
            .set(recipe)
            .then(console.log)
            .catch(console.log)
    }

    const handleSubmit = () => {
        if (update)
            updateRecipe();
        else
            saveRecipe();
    }

    return {
        recipe: {
            id: { value: recipe.id, onChange: changeId },
            name: { value: recipe.name, onChange: changeName },
            description: { value: recipe.description, onChange: changeDescription },
            image: { value: recipe.image, onChange: changeImage },
            ingredients: {
                add: addIngredient,
                remove: removeIngredient,
                value: recipe.ingredients,
                temp: {
                    value: tempState.ingredient,
                    onChange: changeTempIngredient
                }
            },
            steps: {
                add: addStep,
                remove: removeStep,
                value: recipe.steps,
                temp: {
                    value: tempState.step,
                    onChange: changeTempStep
                }
            },
            time: { value: recipe.time, onChange: changeTime },
            price: { value: recipe.price, onChange: changePrice },
            bussinessId: { value: recipe.bussinessId, onChange: changeBussinessId },
        },
        actions: {
            handleSubmit
        }
    }
}