import { StyleSheet } from 'react-native';

let primaryColor = '#29307A';

export default StyleSheet.create(

  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      margin: 10
    },
    header: {
      marginTop: 30,
      marginBottom: 15,
      backgroundColor: primaryColor,
      flexDirection: 'row',
    },
    footer: {
      marginTop: 20,
      backgroundColor: primaryColor,
      flexDirection: 'row'
    },
    title: {
      color: '#ffff',

      flex: 1,
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
      fontFamily: 'PermanentMarker',
    },
    author: {
      color: '#fff',
      fontFamily: 'PermanentMarker',
      flex: 1,
      fontSize: 15,
      textAlign: 'center',
      margin: 10,

    },
    gameboard: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    gameinfo: {
      backgroundColor: '#fff',
      color: primaryColor,
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 19,
      margin: 5
    },
    gameinfo2: {
      backgroundColor: '#fff',
      color: primaryColor,
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
      margin: 5
    },
    row: {
      marginBottom: 20,
    },
    pointsrow:{
      marginTop: 20
    },
    flex: {
      flexDirection: "row"
    },
    button: {
      margin: 20,
      fontWeight: 'bold'
      
    },

    modal: {
      backgroundColor: 'white',
      padding: 20,
      margin: 30,

    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      margin: 10,

    }
  });