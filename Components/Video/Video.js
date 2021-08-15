import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

import {reportChatStatus, updateStatusUser} from '../../DAL/Chat.DAL';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import Timer from './Timer';
import {checkPermissions} from '../Config/checkPermissions';

const dimensions = Dimensions.get('window');

const TwilioVideoCom = ({token, chatID, hideModal, twilioRef}) => {
  // const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  // const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [videoTracks, setVideoTracks] = useState(new Map());

  // const twilioRef = useRef(null);
  // twilioRef = useRef(null);

  useEffect(() => {
    checkPermissions(() => {
      twilioRef.current.connect({
        accessToken: token,
      });
      setStatus('connecting');
    });

    return () => {
      updateStatusUser(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onRoomDidConnect = ({roomName, error}) => {
    setStatus('connected');
    console.log('onRoomDidConnect: ', roomName);
    updateStatusUser(false);
    reportChatStatus(chatID, 1);
  };

  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('[Disconnect]ERROR: ', error);
    hideModal();
    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);
    hideModal();
    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
  };

  const stopVideoExit = () => {
    twilioRef.current.disconnect();
    hideModal();
  };

  return (
    <SafeAreaView>
      {status === 'connecting' && (
        <Text style={{justifyContent: 'center'}}>connecting...</Text>
      )}

      {status === 'connected' && (
        <View style={{height: '100%'}}>
          {status === 'connected' && (
            <View style={{flex: 3, justifyContent: 'flex-start'}}>
              <Timer initTime={90} onTimeFinish={stopVideoExit} />
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={{
                      height: '95%',
                      width: 300,
                      top: '10%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                    }}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </View>
          )}

          <TwilioVideoLocalView style={styles.localVideo} />
        </View>
      )}
      <View style={styles.container}>
        <TwilioVideo
          ref={twilioRef}
          onRoomDidConnect={_onRoomDidConnect}
          onRoomDidDisconnect={_onRoomDidDisconnect}
          onRoomDidFailToConnect={_onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    color: 'yellow',
    backgroundColor: 'red',
  },

  localVideo: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    width: dimensions.width / 4,
    height: dimensions.height / 4,
  },
  remoteGrid: {},
  remoteVideo: {
    width: 300,
    height: 200,
  },

  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TwilioVideoCom;
