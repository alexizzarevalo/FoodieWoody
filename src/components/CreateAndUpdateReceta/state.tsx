import { useState } from "react";
import { firebase } from '@react-native-firebase/firestore';

interface Recipe {
    id: string;
    name: string;
    description: string;
    image: string;
    ingredients: [];
    steps: [];
    time: number;
    price: number;
    bussinessId: string;
}

const defaultRecipe: Recipe = {
    id: '',
    name: '',
    description: '',
    image: '',
    ingredients: [],
    steps: [],
    time: 0,
    price: 0,
    bussinessId: ''
}

export type Props = {
    update: boolean
}

export default function useCreateAndUpdateRecipeState({ update }: Props) {
    const [recipe, setRecipe] = useState<Recipe>({ ...defaultRecipe });

    const changeId = (value: string) => {
        setRecipe(recipe => ({ ...recipe, id: value }));
    }

    const changeName = (value: string) => {
        setRecipe(recipe => ({ ...recipe, name: value }));
    }

    const changeDescription = (value: string) => {
        setRecipe(recipe => ({ ...recipe, description: value }));
    }

    const changeIngredients = (value: []) => {
        setRecipe(recipe => ({ ...recipe, ingredients: value }));
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
            ingredients: { value: recipe.ingredients, onChange: changeIngredients },
            steps: { value: recipe.steps, onChange: changeSteps },
            time: { value: recipe.time, onChange: changeTime },
            price: { value: recipe.price, onChange: changePrice },
            bussinessId: { value: recipe.bussinessId, onChange: changeBussinessId },
        },
        actions: {
            handleSubmit
        }
    }
}