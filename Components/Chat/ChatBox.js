import React from 'react';
import {View} from 'react-native';
import {Text, Card} from 'react-native-paper';

const ChatBox = ({user, onPressUser}) => {
  return (
    <View style={{width: '50%', margin: 5}}>
      {user && (
        <Card
          onPress={() => {
            onPressUser(user);
          }}>
          <Card.Cover
            style={{width: '100%', height: 200}}
            source={{
              uri: `http://161.35.43.123:5000/usersPics/${user?.avatarPicUrl}`,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: '80%',
              left: '5%',
              right: 0,
              bottom: 0,
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                backgroundColor: ' rgba(255,255,255, 0.4)',
                color: 'black',
                borderRadius: 10,
              }}>
              {user?.name}
              {'\n'} ({user?.city})
            </Text>
          </View>
        </Card>
      )}
    </View>
  );
};
export default ChatBox;
