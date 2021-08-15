import {get, post} from './DAL';

export const addAnswer = async (data) => {
    return await post('post/', data);
};

export const isCanWrite = async () => {
    return await get('post/allowtopost/');
};
