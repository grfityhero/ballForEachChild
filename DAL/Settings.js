import {post, get,put} from './DAL';

export const getNotificationStatus = () => {
    return get('notifications');
};

export const updateNotification = (data) =>{
    return put('notifications',data);
}
