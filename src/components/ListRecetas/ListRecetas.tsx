import { Text, View, Button } from "react-native";
import React, { useState } from "react";


function Receta(props:any){
    const [amount, changeAmount] = useState(0);

    return (
        <View style={{flexDirection: "row", justifyContent: "space-evenly", padding: 5, borderBottomColor: 'lightgray',
    borderBottomWidth: 1}}>
            <View style={{flex: 0.7}}>
                <Text>
                    {props.name}
                </Text>
            </View>
            <View style={{flex: 0.1}}>
                <Button
                    title="-"
                    onPress={() => {{changeAmount(amount - 1)}}}
                    disabled={amount <= 0}
                />
            </View>
            <View style={{flex: 0.1, justifyContent: 'center'}}>
                <Text style={{textAlign: "center"}}>
                    {amount}
                </Text>
            </View>
            <View style={{flex: 0.1}}>
                <Button
                    title="+"
                    onPress={() => changeAmount(amount + 1)}
                />
            </View>
        </View>
    );
}

function ListItems(){
    //TODO should get info from firestore
    const [amount, changeAmount] = useState(0);

    return (<>
        <Receta name="Limonada"></Receta>
        <Receta name="Jugo de naranja"></Receta>
        <Button title="Ir a carrito" onPress={() => console.log("deberia ir a checkout")}/>
    </>);
}

export default ListItems;