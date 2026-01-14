import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    accountContainer: {
      backgroundColor: 'green', 
      height: 250, 
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 15,  
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginLeft: 20,
      marginTop: 60,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    accountView: {
      flexDirection: 'column',
      marginLeft: 20, 
      marginTop: 20,
      marginBottom: 30, 
    },
    accountTitle: {
      fontSize: 30,
      color: '#fff', 
    },
    accountText: {
      color: '#fff', 
    },
    inputTitle: {
      color: 'gray',
      marginLeft: 20,
      marginTop: 20, 
    },
    inputTitleText: {
      color: 'gray',
      marginLeft: 20,
      marginTop: 10,  
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor: 'lightgray',
      padding: 10,
      marginTop: 0,
    },
    button: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
    linkText: {
      color: 'grey',
      marginTop: 20,
      textAlign: 'center',
    },
    link: {
      color: 'green',
      marginLeft: 15,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
   
});

export default styles