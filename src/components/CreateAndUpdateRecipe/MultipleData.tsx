import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MultiProps } from "./state";

export default function MultipleData({ provider, title, placeholder }: MultiProps) {
  return (
    <>
      <Text style={styles.textos}> {title} </Text>
      {
        provider.value.map((value, index) =>
          <View key={index} style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', marginVertical: 8 }}>
            <View style={{ width: '85%' }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#05375a',
              }}>• {value}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
                <TouchableOpacity style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  shadowColor: "red",
                  shadowOpacity: 0.25,
                  shadowRadius: 0,
                  elevation: 4,
                }} onPress={() => provider.remove(index)}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#05375a',
                    padding: 4
                  }}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
      <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
        <View style={{ width: '85%' }}>
          <TextInput
            style={[styles.input, { marginHorizontal: 0, marginRight: 8 }]}
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            value={provider.temp.value}
            onChangeText={provider.temp.onChange}
            onSubmitEditing={provider.add}
          />
        </View>
        <View style={{ width: '15%' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', }}>
              <TouchableOpacity style={{
                backgroundColor: 'purple',
                width: '100%',
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8
              }} onPress={provider.add}>
                <Text style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    marginTop: 10,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  }
});