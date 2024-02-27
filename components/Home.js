import { Text, View, Pressable, Keyboard, Alert }
    from "react-native";
import style from '../style/style';
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMITS
} from "../constants/Game";
import { Button, Icon, TextInput } from "react-native-paper";
//import { UserContext } from "./UserContext";
//import { useContext } from "react";

export default Home = ({ navigation }) => {

    //const {playerName, setPlayerName} = useContext(UserContext);
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState('');

    const handlePlayerName = (value) => {
        if (typeof value === 'string' && value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


    return (
        <View style={style.container}>
            <Header />
            <View>
                <Icon
                    source="information"
                    color={'steelblue'}
                    size={60}
                />
                {!hasPlayerName ?
                    <>
                        <TextInput
                            label={'For scoreboard enter your name:'}
                            value={playerName}
                            onChangeText={setPlayerName}
                            autoFocus={true}>
                        </TextInput>
                        <Button
                            mode="contained-tonal"
                            onPress={handlePlayerName}>ok</Button>
                    </>
                    :
                    <>
                        <Text>Rules of the game</Text>
                        <Text>Some rulwes</Text>
                        <Text>Good luck, {playerName}!!!</Text>
                        <Button onPress={() => navigation.navigate('Gameboard')}>PLAY</Button>
                    </>
                }
            </View>
            <Footer />
        </View>);
}