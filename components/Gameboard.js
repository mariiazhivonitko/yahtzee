import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import style from '../style/style';
import Header from './Header';
import Footer from './Footer';

import { UserContext } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMITS
} from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
import { Button, Icon, Modal, Portal } from 'react-native-paper';

let board = [];
const STORAGE_KEY = '@score_key';

export default Gameboard = ({ navigation, route }) => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');

    const [playerName, setPlayerName] = useState('');
    const [totalPoints, setTotalPoints] = useState(0);

    const [bonusStatus, setBonusStatus] = useState('You are ' + BONUS_POINTS_LIMITS + ' away from bonus.');

    const [records, setRecords] = useState([]);

    //if dices selected or not
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

    // dice spots
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

    //if dice points selected or not for spots
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

    //Total point for different spots
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    //variables for modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        if (playerName === "" && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {

        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        if (selectedDicePoints.every((val, i, arr) => val === true)) {
            //setRecords( prev => [...prev,{key: prev.length + 1, player: playerName, score: totalPoints}])
            showModal();

            setStatus("Game over. All points celected.");
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
            setDicePointsTotal(new Array(MAX_SPOT).fill(0));
            console.log()
            getData()
            saveScoreboardData()


        }
    }, [selectedDicePoints])

    const saveScoreboardData = async () => {
        try {
            
            // Store playerName and totalPoints in AsyncStorage
            const newKey = records.length + 1;
            const newRecord = {
                key: newKey.toString(),
                playerName: playerName,
                score: totalPoints.toString()
            }
            const newRecords = [...records, newRecord];
            setRecords(newRecords);
            await storeData(newRecords);
            
            
            // Navigate to Scoreboard component
        //     navigation.navigate('Scoreboard');
        } catch (error) {
            console.error('Error saving scoreboard data:', error);
        }
    };

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
          console.log(jsonValue)
        }
        
        catch (e) {
          console.log(e);
        }
      }  

      const getData = async() => {
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
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonRow" + diceButton}>
                <Pressable
                    key={"buttonRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        key={"buttonRow" + diceButton}
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        size={35}
                        color={getDicePointsColor(diceButton)}></MaterialCommunityIcons>
                </Pressable>
            </Col>);

    }

    //row with points
    const pointsRow = [];

    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointRow" + spot} style={{ alignItems: 'center' }}>

                <Text key={"pointRow" + spot} >{getSpotTotal(spot)}</Text>
            </Col>
        )

    }
    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? "black" : "#663399";
        }
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "black" : "#29307A";
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft === 3) {
            setStatus('You have to throw dices first');
        } else {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
    }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0 || board.every((val, i, arr) => val === arr[0])) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];

            if (!selectedDicePoints[i]) {
                selectedPoints[i] = true;
                let bonusLeft = BONUS_POINTS_LIMITS - totalPoints;
                let nbrOfDices = diceSpots.reduce(
                    (total, x) => (x === (i + 1) ? total + 1 : total), 0);


                points[i] = nbrOfDices * (i + 1);

                if (points.reduce((partialSum, a) => partialSum + a, 0) >= BONUS_POINTS_LIMITS) {
                    setTotalPoints(points.reduce((partialSum, a) => partialSum + a, 0) + BONUS_POINTS);
                    setBonusStatus('Congrats! Bonus points (' + BONUS_POINTS + ')added');
                } else {

                    console.log(bonusLeft);
                    setTotalPoints(points.reduce((partialSum, a) => partialSum + a, 0));
                    setBonusStatus('You are ' + bonusLeft + ' away from bonus');
                }

                setDicePointsTotal(points);

                setSelectedDicePoints(selectedPoints);
                setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                setNbrOfThrowsLeft(NBR_OF_THROWS);
                setStatus('Keep throwing');
                return points[i];
            }
            else {
                setStatus("You have already selected points for " + (i + 1) + ".")
            }

        }

        else {
            setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
        }
    }

    function getSpotTotal(i) {

        return dicePointsTotal[i]
    }


    const throwDices = () => {
        let spots = [...diceSpots];

        if (nbrOfThrowsLeft === 0) {

            setStatus('Select your points before next throw')
        }
        else {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
                    spots[i] = randomNumber;
                    board[i] = 'dice-' + randomNumber;
                }
            }
            setDiceSpots(spots);
            setStatus('Keep on throwing');
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        }
    }

    const startNewGame = () => {
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setStatus('Game starts')
        hideModal();
    }

    return (
        <View style={style.gameboard}>
            <Header />
            {(selectedDicePoints.every((val, i, arr) => val === false) && nbrOfThrowsLeft === 3) ?
                <>
                    <Icon
                        source='dice-multiple'
                        color={'#29307A'}
                        size={60}
                    />
                </>
                :
                <>
                    <Container>
                        <Row>{row}</Row>
                    </Container>
                </>}

            <Portal>
                <Modal visible={visible} contentContainerStyle={style.modal}>
                    <Text style={style.gameinfo}>Game over!</Text>
                    <Text style={style.gameinfo2}>{playerName}, you got {totalPoints} points.</Text>
                    <Button
                        style={style.button}
                        mode="contained"
                        onPress={startNewGame}>Start new game</Button>
                </Modal>
            </Portal>



            <Text style={style.gameinfo2}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={style.gameinfo}>{status}</Text>
            <Button
                style={style.button}
                mode="contained"
                onPress={() => throwDices()}>

                THROW DICES

            </Button>
            <Text style={style.gameinfo}>Total: {totalPoints}</Text>
            <Text style={style.gameinfo2}>{bonusStatus}</Text>

            <Container>
                <Row style={style.pointsrow}>{pointsRow}</Row>
            </Container>
            <Container>
                <Row style={style.row}>{pointsToSelectRow}</Row>
            </Container>


            <Text style={style.gameinfo2}>Player name: {playerName}</Text>
            <Footer />
        </View>
    )
}