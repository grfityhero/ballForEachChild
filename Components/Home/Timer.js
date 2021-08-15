import React, {useState, useEffect} from 'react';
import {Text, Avatar} from 'react-native-paper';
import moment from 'moment';
import countdown from 'moment-countdown';
import ball from '../asserts/ball2.png';
import basketball from '../asserts/basketball.png';
import football from '../asserts/football.png';
import {StyleSheet, View} from 'react-native';

const Timer = ({restartDay}) => {
    const [time, setTime] = useState(0);

    const timeLeft = () => {
        const date = moment().utc(-2);
        const end = moment().utc(-2);

        if (end.get('hour') >= 14) {
            end.set('day', end.get('day') + 1).set('hour', 14).set('minute', 0).set('second', 0);
        }

        end.get('hour') >= 14 ? end.set('day', end.get('day') + 1).set('hour', 14).set('minute', 0).set('second', 0)
            : end.set('hour', 14).set('minute', 0).set('second', 0);

        const def = moment(date).countdown(end);
        const hours = def.hours;
        const min = def.minutes < 10 ? `0${def.minutes}` : def.minutes;
        const sec = def.seconds < 10 ? `0${def.seconds}` : def.seconds;

        if(def.seconds ===0 && def.minutes===0 && def.hours === 0 && def.days ===0){
            restartDay();
        }
        setTime(`${hours}:${min}:${sec}`);
    };

    useEffect(() => {

        let interval = null;
        interval = setInterval(() => {
            timeLeft();
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    const GetBall = ()=>{
        let day = moment().day();
        let h = moment().hour();
        if((day ===2 && h > 13 || day === 3 && h < 14) || (day ===4 && h > 13 || day === 5 && h < 14) ||
            (day ===6 && h > 13 || day === 7 && h <14 )){
            return <Avatar.Image source={football} size={30} ></Avatar.Image>
        }
        else{
            return <Avatar.Image source={basketball} size={30} ></Avatar.Image>
        }
    }

    return (
        <View style={styles.timer}>
           <GetBall/>
            {/*<Avatar.Image source={ball} size={30} ></Avatar.Image>*/}
            <Text style={styles.text}>{time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timer :{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    text: {
        fontSize: 40,
        width: '60%',
    },

});

export default Timer;
