import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Timer = ({initTime, onTimeFinish}) => {
  const [time, setTime] = useState(initTime);
  const intervalId = React.useRef();
  // let intervalId;
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(oldTime => (oldTime > 0 ? oldTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (!time > 0) {
      clearInterval(intervalId);
      onTimeFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <View style={styles.warper}>
      <Text style={styles.text}>
        {new Date(time * 1000).toISOString().substr(14, 5)}
      </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  warper: {
    backgroundColor: 'rgba(105, 105, 105, 0.3)',
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
