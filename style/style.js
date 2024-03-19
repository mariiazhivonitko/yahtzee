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
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
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
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 5
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    marginTop: 30,
    //flexDirection: "row",
    padding: 5,
    //backgroundColor: "#73CED6",
    //width: 150,
    //borderRadius: 15,
    //justifyContent: 'center',
    //alignItems: 'center'
  },

  modal:{
    backgroundColor: 'white', 
    padding: 20,
    margin: 30,

  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
});