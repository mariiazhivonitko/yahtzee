import { Text, View, TextInput, Pressable, Keyboard } 
from "react-native";
import style from '../style/style';
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_DICES,
NBR_OF_THROWS, 
MIN_SPOT,
MAX_SPOT,
BONUS_POINTS,
BONUS_POINTS_LIMITS } from "../constants/Game";

export default Home = ({navigation}) => {
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState('');

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }
    return(
        <View style={style.header}>
            <Text style={style.title}>
                Homescreen will be hear....
            </Text>
        </View>
    )
}