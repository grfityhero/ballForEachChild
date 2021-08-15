import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-paper';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';


const date = moment().utc(-2);

const Timer = ({endTime}) => {
    const [time, setTime] = useState(0);
    const [eventEndTime, setEventEndTime] = useState(endTime);


    useEffect(() => {
        setEventEndTime(endTime);
        console.log("endTime :", endTime)
    }, [endTime])


    const timeLeft = () => {

        const endTimeSplit = eventEndTime.split('/');
        let momentEndTime = moment().set('year', endTimeSplit[2]).set('month', endTimeSplit[0] - 1).set('date', endTimeSplit[1]).set('hour',17).set('minute:',0).set('second',0);

        const def = moment(date).countdown(momentEndTime);
        let hours = def.hours;
        if(def.days > 1){
            hours += (def.days)*24
        }
        const min = def.minutes < 10 ? `0${def.minutes}` : def.minutes;
        const sec = def.seconds < 10 ? `0${def.seconds}` : def.seconds;

        setTime(`${hours}:${min}:${sec}`);
    };

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            timeLeft();
        }, 1000);
        return () => clearInterval(interval);

    }, [time]);

    return (
        <View style={styles.timer}>
            <Text style={styles.text}>{time}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    timer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        // width: '70%',
    },

});

export default Timer;
