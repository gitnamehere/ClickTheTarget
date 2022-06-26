//Game can be played here: https://codehs.com/sandbox/jasonh34/click-the-target/run

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

//Game developed in CodeHS Javascript React Native Sandbox

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
var timer = 0;

export default class App extends Component {
    state = {
        size: [(deviceWidth/5),(deviceWidth/12)], //Size of the target and center.
        color: ["Red","Orange","Yellow","Lime","Green","Cyan","Blue","Indigo","Purple","Pink","Brown","White","Black"],
        centerColor: ["Orange","Green","Blue","Cyan","Red","White","Gold","Lime","Orange","White","Green","#00ACDC","Yellow"],
        colorCounter: 0, //Used to cycle through colors in color picker.
        backgroundColor: ["#235789","#0B6E4F","#E6AF2E","#BD1E1E"], //Blue, Green, Yellow, and red; used in game over.
        backgroundColorSelector: 0,
        timeCounter: 30, //Stores remaining time in-game.
        setTime: 30, //Duration of the game.
        locationValues: [39,54], //X and Y values of targets, max value for X is 39, and max value for Y is 54.
        scoreCounter: [0,0], //Counter for score and highscore.
        ending: "", //Game Over text.
        display: ['flex','none','none','none'], //controls display of various view components. In order: Menu, Game, Game End, Settings.
    };
    
    //Function for when the target is clicked.
    targetHit = () => {
        this.getRandomLocation();
        this.setState({scoreCounter: [this.state.scoreCounter[0] + 1, this.state.scoreCounter[1]]})
    };
    
    //Function for when the center of the target is clicked.
    targetCrit = () => {
        this.getRandomLocation();
        this.setState({scoreCounter: [this.state.scoreCounter[0] + 2, this.state.scoreCounter[1]]})
    };
    
    // Function for when the user miss the target. Point will be deducted if score is higher than 0; if score is equal to 0, point will not be deducted to prevent the accumulation of negative score.
    targetMiss = () => {
        this.getRandomLocation();
        if (this.state.scoreCounter[0] > 0) {
            this.setState({scoreCounter: [this.state.scoreCounter[0] - 1, this.state.scoreCounter[1]]})
        };
    };
    
    //Function that generates a random location for the target.
    getRandomLocation = () => {
        var XLocation = 39*Math.random() + 1; //Generates a random varible for the location of target in X axis.
        var YLocation = 54*Math.random() + 1; //Generates a random varible for the location of target in X axis.
        this.setState({locationValues: [this.state.locationValues[0] = XLocation, this.state.locationValues[1] = YLocation]});
    };
    
    //Function that starts an interval timer on 1000ms intervals.
    timerStart = () => {
        timer = setInterval(this.timerCountdown, 1000);
    };
    
    //Function that controls the timer and events.
    timerCountdown = () => {
        if (this.state.timeCounter > 0) {
            this.setState({timeCounter: this.state.timeCounter - 1})
        } else if (this.state.timeCounter == 0) {
            this.gameEnd();
            this.timerStop();
        }
    };
    
    //Function to stop the timer. This is put into a seperate function in case if I add a pause menu.
    timerStop = () => {
        clearInterval(timer)
    };
    
    //Function to start the game.
    gameStart = () => {
        this.getRandomLocation();
        this.timerStart();
        this.setState({
            display: [this.state.display[0] = 'none', this.state.display[1] = 'flex', this.state.display[2] = 'none', this.state.display[3] = 'none'],
            timerCounter: this.state.timeCounter = this.state.setTime,
            scoreCounter: [this.state.scoreCounter[0] = 0, this.state.scoreCounter[1]]
        });
    };
    
    //Function to end the game.
    gameEnd = () => {
        this.compareScore();
        this.setState ({
            display: [this.state.display[0] = 'none', this.state.display[1] = 'none', this.state.display[2] = 'flex', this.state.display[3] = 'none'],
            timeCounter: this.state.timeCounter = this.state.setTime
        });
    };
    
    //Function used in Game Over; compares the score and highscore to display different messages and updates highscore when neccessary.
    compareScore = () => {
        if (this.state.scoreCounter[0] > this.state.scoreCounter[1]) { 
            this.setState({
                scoreCounter: [this.state.scoreCounter[0], this.state.scoreCounter[1] = this.state.scoreCounter[0]],
                ending: this.state.ending = "Congratulations! New High Score!",
                backgroundColorSelector: this.state.backgroundColorSelector = 1
            })
        } else if (this.state.scoreCounter[0] == 0) {
            this.setState({
                ending: this.state.ending = "Maybe try clicking the target more accurately next time...?",
                backgroundColorSelector: this.state.backgroundColorSelector = 3
            })
        } else if (this.state.scoreCounter[0] == this.state.scoreCounter[1]) {
            this.setState({
                ending: this.state.ending = "Darn, so close! Would you like to try again?",
                backgroundColorSelector: this.state.backgroundColorSelector = 2
            })
        } else if (this.state.scoreCounter[0] < this.state.scoreCounter[1]) {
            this.setState({
                ending: this.state.ending = "You got a score of " + this.state.scoreCounter[0] + " points. Would you like to try again?",
                backgroundColorSelector: this.state.backgroundColorSelector = 0
            })
        }
    };
    
    //Function to Reset Scores
    resetScore = () => {
        this.setState({
            scoreCounter: [this.state.scoreCounter[0] = 0, this.state.scoreCounter[1] = 0]
        })    
    };
    
    //Function to display Main Menu
    toMenu = () => {
        this.setState ({
            display: [this.state.display[0] = 'flex', this.state.display[1] = 'none', this.state.display[2] = 'none', this.state.display[3] = 'none'],
        })
    };
    
    //Function to display Settings page
    toSettings = () => {
        this.setState ({
            display: [this.state.display[0] = 'none', this.state.display[1] = 'none', this.state.display[2] = 'none', this.state.display[3] = 'flex'],
        })
    };
    
    //Function to cycle through color in reverse.
    leftColorCycler = () => {
        if (this.state.colorCounter == 0) {
            this.setState({colorCounter: this.state.colorCounter = 12})
        } else {
            this.setState({colorCounter: this.state.colorCounter - 1})
        }
    };
    
    //Function to cycle through color.
    rightColorCycler = () => {
        if (this.state.colorCounter == 12) {
            this.setState({colorCounter: this.state.colorCounter = 0})
        } else {
            this.setState({colorCounter: this.state.colorCounter + 1})
        }
    };
    
    //Functions to set time
    setTime5 = () => {
        this.setState({
            setTime: this.state.setTime = 5,
            timeCounter: this.state.timeCounter = 5
        })
    };
    
    setTime15 = () => {
        this.setState({
            setTime: this.state.setTime = 15,
            timeCounter: this.state.timeCounter = 15
        })
    };
    
    setTime30 = () => {
        this.setState({
            setTime: this.state.setTime = 30,
            timeCounter: this.state.timeCounter = 30
        })
    };
    
    setTime60 = () => {
        this.setState({
            setTime: this.state.setTime = 60,
            timeCounter: this.state.timeCounter = 60
        })
    };
 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                
                    {/*The top bar*/}
                    <View style={styles.topbarContainer}>
                        <Text style={styles.topbarTitle}>
                            Click The Target!
                        </Text>
                        <View style={styles.topbarText}>
                            {/*Display score.*/}
                            <Text style={styles.topbarText}>
                                {' Score: ' + this.state.scoreCounter[0]}
                            </Text>
                            {/*Display high score.*/}
                            <Text style={styles.topbarText}>
                            {'High Score: ' + this.state.scoreCounter[1] + ' '}
                            </Text>
                            {/*Display time.*/}
                            <Text style={styles.topbarText}>
                                {'Time: ' + this.state.timeCounter + ' '}
                            </Text>
                        </View>
                    </View>
                                                
                    {/*The Main Menu.*/}
                    <View style={[styles.menuContainer, { 
                        display: this.state.display[0],
                    }]}>
                        <Text style={styles.menuTitleText}>
                            Welcome to Click The Target!
                        </Text>
                        {/*The target*/}
                        <View style={[styles.target, {
                                height: (this.state.size[0]),
                                width: (this.state.size[0]),
                                backgroundColor: (this.state.color[this.state.colorCounter]),
                                marginBottom: deviceHeight/20,
                        }]}>
                            <View style={[styles.target, {
                                    height: (this.state.size[1]),
                                    width: (this.state.size[1]),
                                    backgroundColor: (this.state.centerColor[this.state.colorCounter]),
                            }]}>
                                <Text>
                                </Text>
                            </View>
                        </View>
                        {/*Start game button*/}
                        <TouchableHighlight style={styles.button}
                            onPress = {this.gameStart}
                            >
                                <Text style={styles.buttonText}>
                                    Play
                                </Text>
                        </TouchableHighlight>
                        {/*Settings page button*/}
                        <TouchableHighlight style={styles.button}
                            onPress = {this.toSettings}
                            >
                            <Text style={styles.buttonText}>
                            Settings
                            </Text>
                        </TouchableHighlight>
                    </View>
                    
                    {/*Play area of the game. One point will be deducted if clicked upon.*/}
                    <TouchableOpacity style={[styles.gameContainer, { display: this.state.display[1]}]}
                        onPress = {this.targetMiss}
                        >
                        {/*The target itself, one point will be awarded if clicked upon.*/}
                        <TouchableHighlight style={[styles.target, {
                            height: (this.state.size[0]),
                            width: (this.state.size[0]),
                            backgroundColor: (this.state.color[this.state.colorCounter]),
                            marginLeft: (this.state.locationValues[0] *(deviceWidth)/50),
                            marginTop: (this.state.locationValues[1]*(deviceHeight)/70),
                        }]}
                            onPress = {this.targetHit}
                            >
                            <TouchableHighlight style={[styles.target, {
                                height: (this.state.size[1]),
                                width: (this.state.size[1]),
                                backgroundColor: (this.state.centerColor[this.state.colorCounter]),
                                }]}
                                onPress = {this.targetCrit}
                                >
                                <Text>
                                </Text>
                            </TouchableHighlight>
                        </TouchableHighlight>
                    </TouchableOpacity>
                    
                    {/*Game over screen*/}
                    <View style={[styles.menuContainer, { 
                        alignItems: 'center',
                        display: this.state.display[2],
                        backgroundColor: this.state.backgroundColor[this.state.backgroundColorSelector],
                    }]}>
                        {/*Ending Text*/}
                        <Text style={styles.menuTitleText}>
                            {this.state.ending}
                        </Text>
                        {/*The target*/}
                        <View style={[styles.target, {
                                height: (this.state.size[0]),
                                width: (this.state.size[0]),
                                backgroundColor: (this.state.color[this.state.colorCounter]),
                                marginBottom: deviceHeight/20,
                        }]}>
                            <View style={[styles.target, {
                                    height: (this.state.size[1]),
                                    width: (this.state.size[1]),
                                    backgroundColor: (this.state.centerColor[this.state.colorCounter]),
                            }]}>
                                <Text>
                                </Text>
                            </View>
                        </View>
                        {/*Button to play the game again.*/}
                        <TouchableHighlight style={styles.button}
                            onPress = {this.gameStart}
                            >
                            <Text style={styles.buttonText}>
                                Try again
                            </Text>
                        </TouchableHighlight>
                        {/*Button to return to main menu.*/}
                        <TouchableHighlight style={styles.button}
                            onPress = {this.toMenu}
                            >
                            <Text style={styles.buttonText}>
                                Main Menu
                            </Text>
                        </TouchableHighlight>
                    </View>
                    
                    {/*Settings Page*/}
                    <View style={[styles.menuContainer, { alignItems: 'center', display: this.state.display[3] }]}>
                        <Text style={styles.menuTitleText}>
                            Settings
                        </Text>
                        {/*Target Color Setting*/}
                        <View style={styles.largeContainer}>
                            <Text style={styles.menuText}>
                                Target Color
                            </Text>
                            <View style={styles.smallContainer}>
                                {/*Reverse color cycle button*/}
                                <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.leftColorCycler}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'<'}
                                    </Text>
                                </TouchableHighlight>
                                {/*Displays target*/}
                                <View style={[styles.target, {
                                    height: (this.state.size[0]),
                                    width: (this.state.size[0]),
                                    backgroundColor: (this.state.color[this.state.colorCounter]),
                                }]}>
                                    <View style={[styles.target, {
                                        height: (this.state.size[1]),
                                        width: (this.state.size[1]),
                                        backgroundColor: (this.state.centerColor[this.state.colorCounter]),
                                    }]}
                                    >
                                        <Text>
                                        </Text>
                                    </View>
                                </View>
                                {/*Color cycle button*/}
                                <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.rightColorCycler}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'>'}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            {/*Displays Current Color*/}
                            <Text style={styles.subMenuText}>
                                {this.state.color[this.state.colorCounter]}
                            </Text>
                        </View>
                        <View style={[styles.largeContainer, {borderBottomWidth: 2}]}>
                            <Text style={styles.menuText}>
                                {"Time"}
                            </Text>
                                <View style={styles.smallContainer}>
                                <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.setTime5}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'5'}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.setTime15}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'15'}
                                    </Text>
                                </TouchableHighlight>
                                 <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.setTime30}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'30'}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.smallButton}
                                    onPress = {this.setTime60}
                                    >
                                    <Text style={styles.buttonText}>
                                        {'60'}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <TouchableHighlight style={styles.settingsButton}
                            onPress = {this.resetScore}
                            >
                            <Text style={styles.buttonText}>
                                Reset Score
                            </Text>
                        </TouchableHighlight>
                        {/*Main Menu Button*/}
                        <TouchableHighlight style={styles.settingsButton}
                            onPress = {this.toMenu}
                            >
                            <Text style={styles.buttonText}>
                                Main Menu
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    target: {
        borderWidth: 2,
        borderColor: "black",
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: "#FF0000"
    },
    menuContainer: {
        flex: 1,
        alignItems: 'center',
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: "#235789"
    },
    menuTitleText: {
        fontFamily: 'Arial',
        textAlign: 'center',
        marginTop: deviceHeight/20,
        marginBottom: deviceHeight/20,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: deviceHeight/20,
        width: 9*deviceWidth/10,
    },
    menuText: {
        marginTop: deviceHeight/35,
        textAlign: 'center',
        marginBottom: deviceHeight/35,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: deviceHeight/25,
        
    },
    subMenuText: {
        textAlign: 'center',
        marginBottom: deviceHeight/25,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: deviceHeight/30,
        width: 9*deviceWidth/10,
    },
    gameContainer: {
        height: 9*deviceHeight/10,
        width: deviceWidth,
        backgroundColor: "#606060",
    },
    topbarContainer: {
        height: deviceHeight/10,
        width: deviceWidth,
        backgroundColor: "#FFFFFF",
        justifyContent: 'space-around',
    },
    topbarTitle: {
        fontSize: deviceWidth/10,
        fontWeight: 'bold',
        color: "#00ACDC",
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    topbarText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: deviceWidth/20,
        fontWeight: 'bold',
        color: "#00ACDC",
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    largeContainer: {
        height: 4*deviceHeight/17,
        alignItems: 'center',
        marginBottom: deviceHeight/30,
        borderTopWidth: 2,
        borderColor: 'white'
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: deviceHeight/8,
        width: 9*deviceWidth/10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        borderColor: "#FFFFFF",
        marginBottom: deviceHeight/20,
        height: deviceHeight/10,
        width: 2*deviceWidth/3,
    },
    settingsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        borderColor: "#FFFFFF",
        marginBottom: deviceHeight/50,
        height: deviceHeight/12,
        width: 2*deviceWidth/3,
    },
    smallButton: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        borderColor: "#FFFFFF",
        height: deviceWidth/6,
        width: deviceWidth/6
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: deviceHeight/20,
    },
});
