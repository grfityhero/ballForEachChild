import {post, get, put} from './DAL';

export const getUserToVideo = () => {
  return get('users/availbeForChat/');
};

export const inviteUserToVideo = async userID => {
  return post('videoChat/invite/', {
    callReciverId: userID,
  });
};

export const getTokenRoomChat = async (callerId, callReceiverId, isOutCall) => {
  const data = {
    identity: isOutCall ? callerId : callReceiverId,
    room: `${callerId}|${callReceiverId}`,
  };
  return await post('videoChat/video/token', data);
};

export const reportChatStatus = async (chatID, status) => {
  const data = {
    videoChatId: chatID,
    status,
  };
  return put('videoChat', data);
};

export const updateStatusUser = async newStatus => {
  return put('videoChat/setAvailbeForChat', {isAvailble: newStatus});
};

export const getNotifyCall = async () => {
  return get('videochat/notifications');
};
