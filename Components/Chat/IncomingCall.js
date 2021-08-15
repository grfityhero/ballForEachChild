import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

const IncomingCall = ({onPress}) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(oldShowText => !oldShowText);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      onPress={onPress}
      style={[
        styles.incomingCallText,
        {backgroundColor: showText ? 'green' : 'red'},
      ]}>
      incoming call
    </Text>
  );
};

export default IncomingCall;

const styles = StyleSheet.create({
  incomingCallText: {
    borderRadius: 10,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
