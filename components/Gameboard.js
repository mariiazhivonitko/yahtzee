import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import style from '../style/style';
import Header from './Header';
import Footer from './Footer';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMITS
} from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';

let board = [];

export default Gameboard = ({ navigation, route }) => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    const [playerName, setPlayerName] = useState('');

    //if dices selected or not
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

    // dice spots
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

    //if dice points selected or not for spots
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

    //Total point for different spots
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    useEffect(() =>{
        if (playerName === "" && route.params?.player){
            setPlayerName(route.params.player); 
        }
    }, []);


    const Dice = ({ index }) => {
        return (
            <Col key={"dice" + index}>
                <Pressable
                    key={"dice" + index}
                    onPress={() => selectDice(index)}>
                    <MaterialCommunityIcons
                        name={board[index]}
                        key={"dice" + index}
                        size={50}
                        color={getDiceColor(index)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    //row with dices
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(<Dice key={i} index={i} />);
    }

    //row with spots
    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
        pointsToSelectRow.push(
        <Col key={"buttonRow" + diceButton}>
            <Pressable 
                key={"buttonRow" + diceButton}
                onPress={() => selectDicePoints(diceButton)}>
                <MaterialCommunityIcons 
                    key={"buttonRow" + diceButton}
                    name={"numeric-" + (diceButton+1) + "-circle"}
                    size={35}
                    color={getDicePointsColor(diceButton)}></MaterialCommunityIcons>
            </Pressable>
        </Col>);

    }

    //row with points
    const pointsRow = [];

    for (let spot = 0; spot < MAX_SPOT; spot++){
        pointsRow.push(
            <Col key={"pointRow" + spot}>
                {/* <Text key={"pointRow" + spot}>{getSpotTotal(spot)}</Text> */}
                <Text key={"pointRow" + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        )

    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
    }, [nbrOfThrowsLeft]);

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function getDicePointsColor(i){
        return selectedDicePoints[i] ? "black" : "steelblue";
    }

    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedDicePoints[i]){
            selectedPoints[i] = true;
            let nbrOfDices = diceSpots.reduce(
                (total, x) => (x === (i + 1) ? total + 1 : total), 0);


            points[i] = nbrOfDices * (i + 1);

            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            return points[i];}
            else{
                setStatus("You have already selected points for " + (i + 1) + "." )
            }
        }
        else {
            setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
        }
    }

    function getSpotTotal(i) {
        
        return dicePointsTotal[i]
    }

    const checkWinner = () => {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('Keep on throwing');
        }
    }

    const throwDices = () => {
        let spots =[...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
                spots[i] = randomNumber;
                board[i] = 'dice-' + randomNumber;
            }
        }
        setDiceSpots(spots);
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    }

    return (
        <View style={style.gameboard}>
            <Header />

            <Container>
                <Row>{row}</Row>
            </Container>


            {/* <View style={style.flex}>{row}</View> */}
            <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={style.gameinfo}>{status}</Text>
            <Pressable style={style.button}
                onPress={() => throwDices()}>
                <Text style={style.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
            <View style={style.flex}>{pointsRow}</View>
            <View style={style.flex}>{pointsToSelectRow}</View>
            <Text>Player name: {playerName}</Text>
            <Footer />
        </View>
    )
}