import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-paper';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';



const Timer = ({endTime}) => {
    const [time, setTime] = useState(0);
    const [eventEndTime, setEventEndTime] = useState(endTime);

    useEffect(() => {
        setEventEndTime(endTime);
    }, [endTime])

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            timeLeft();
        }, 1000);
        return () => {clearInterval(interval)};
    }, [time]);

    const timeLeft = () => {
        const date = moment().utc(-2);
        const endTimeSplit = eventEndTime.split('/');
        let momentEndTime = moment().utc(-2).set('year', endTimeSplit[2]).set('month', endTimeSplit[0] - 1).set('date', endTimeSplit[1]);
        momentEndTime.set({hour:0,minute:0,second:0,millisecond:0})

        const def = moment(date).countdown(momentEndTime);
        let hours = def.hours;
        if(def.days > 1){
            hours += (def.days)*24
        }
        const min = def.minutes < 10 ? `0${def.minutes}` : def.minutes;
        const sec = def.seconds < 10 ? `0${def.seconds}` : def.seconds;
        setTime(`${hours}:${min}:${sec}`);
    };


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
