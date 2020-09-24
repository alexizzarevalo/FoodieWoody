import React, { useState, useRef } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import {styles} from '../../Style'

export default function Registronegocio({ navigation }: DrawerScreenProps<DrawerParamList, 'RegistroNegocio'>) {
    return(<View style={styles.container}>
        <View style={styles.container}>
            <Text style={[styles.headerText, { fontSize: 40 }]}>Foodie Woody</Text>
            <Text style={styles.headerText}>Registra tu Negocio</Text>
        </View>
        <View style={styles.footer}>
            <ScrollView>
                <Text style={styles.labelbold}>Correo:</Text>
                <TextInput
                    testID="email"
                    style={styles.input}
                    placeholder={"Escribe tu correo electrónico"}
                    blurOnSubmit={false} //Para que no se baje el teclado cuando presiona enter
                    value = ""
                />
                <Text style={styles.labelbold}>Contraseña:</Text>
                <TextInput
                    testID="password"
                    style={styles.input}
                    placeholder={"Escribe tu contraseña"}
                    blurOnSubmit={true}
                    secureTextEntry={true} // Modo contraseña
                    value = ""
                />
                <Text style={styles.labelbold}>Confirma Contraseña:</Text>
                <TextInput
                    testID="passwordc"
                    style={styles.input}
                    placeholder={"Escribe tu contraseña"}
                    blurOnSubmit={true}
                    secureTextEntry={true} // Modo contraseña
                    value = ""
                />
                <Text style={styles.labelbold}>Nombre de Negocio:</Text>
                <TextInput
                    testID="nombre"
                    style={styles.input}
                    placeholder={"Negocio"}
                    blurOnSubmit={true}
                    value = ""
                />
                <Text style={styles.labelbold}>Teléfono:</Text>
                <TextInput
                    testID="telefono"
                    style={styles.input}
                    placeholder={"Teléfono"}
                    blurOnSubmit={true}
                    value = ""
                />
            </ScrollView>
        </View>
    </View>
);
}
