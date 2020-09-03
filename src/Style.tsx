import {
  Platform,
  StyleSheet,
} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f87c09'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
  picker: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: "#2d74ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin : 15,
  },
  total:{
    backgroundColor:'white',
    alignContent:'center',
    borderRadius: 10,
  },
  textoTotal:{
    textAlign:'center',
    textTransform:'uppercase',
    color:'black',
    fontSize: 18
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    backgroundColor:'white',
    margin:10,
  },
});
