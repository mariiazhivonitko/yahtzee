import { Text, View } from "react-native"
import style from '../style/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

const STORAGE_KEY = '@score_key';

export default Scoreboard = ({route, navigation}) => {

    
    const {records} = useContext();

    useEffect(() =>{
        const unsubscribe = navigation.addListener('focus', () =>{ getScoreData()});
        return unsubscribe;
    }, [navigation])

    // useEffect(() => {
    //     if (route.params?.record) {
    //       const newKey = records.length + 1;
    //       const newRecord = {
    //         key: newKey.toString(),
    //         playerName: route.params.player,
    //         score: route.params.record.toString()
    //       }
    //       const newRecords = [...records, newRecord];
    //       storeData(newRecords);
    //     }
    //     //getData();
    //   },[route.params?.record])

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        }
        catch (e) {
          console.log(e);
        }
      }  

      const getScoreData = async() => {
        try {
          return AsyncStorage.getItem(STORAGE_KEY)
          .then(req => JSON.parse(req))
          .then(json => {
            if (json === null) {
              json = [];
            }
            setRecords(json);
          })
          .catch(error => console.log(error))
        }
        catch (e) {
          console.log(e);
        }
      }

      function Item({record}){
        
    
        return(
            
    
                <View >
    
                    <Text>{record.player}  : {record.score}</Text>
                           
    
    
    
                </View>
           
        );
    }

    return(
        <View style={style.header}>
            <FlatList
                data={records}
                renderItem={({item}) => <Item record={item}/> }
                
            />
        </View>
    )
}