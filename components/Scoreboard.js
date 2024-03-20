import { Text, View } from "react-native"
import style from '../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState, useContext } from "react";
import { Icon, DataTable } from "react-native-paper";
import Gameboard from "./Gameboard";
//import { UserContext } from "./UserContext";

const STORAGE_KEY = '@score_key';

export default Scoreboard = ({route, navigation}) => {

    
    //const {records} = useContext();
    const [records, setRecords] = useState([])

    useEffect(() =>{
        const unsubscribe = navigation.addListener('focus', () =>{ getScoreData()});
        return unsubscribe;
    }, [navigation])

    

    

      const getScoreData = async() => {
        try {
          return AsyncStorage.getItem(STORAGE_KEY)
          .then(req => JSON.parse(req))
          .then(json => {
            if (json === null) {
              json = [];
            }
            setRecords(json);
            console.log(json)
          })
          .catch(error => console.log(error))
        }
        catch (e) {
          console.log(e);
        }
      }

      

    return(
        <View style={style.gameboard}>
            <Header />
            <Icon
                        source='view-list'
                        color={'#29307A'}
                        size={60}
                    />

            <Text>records: {records.player}</Text>
            <Footer />
                
           
        </View>
    )
}