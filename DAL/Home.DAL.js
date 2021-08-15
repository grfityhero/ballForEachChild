import {get, post} from './DAL';

export const getPosts = async () => {
    return await get('post/from14/');
};

export const like = async (postId) => {
    return await post(`like/${postId}`);
};

export const translate = async (text) => {
    return await post('translate/he', {text: 'כדורסל הוא '});
};
