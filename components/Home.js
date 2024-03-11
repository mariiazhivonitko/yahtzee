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
            console.log('player name was entered')
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
                            style={style.button}
                            mode="contained"
                            onPress={() => handlePlayerName(playerName)
                            }>ok</Button>
                    </>
                    :
                    <>
                        <Text>Rules of the game</Text>
                        <Text>THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.
                            POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the
                            game you can not select same points from
                            {MIN_SPOT} to {MAX_SPOT} again.
                            GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMITS} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.</Text>
                        <Text>Good luck, {playerName}!!!</Text>
                        <Button mode="contained" onPress={() => navigation.navigate('Gameboard')}>PLAY</Button>
                    </>
                }
            </View>
            <Footer />
        </View>);
}