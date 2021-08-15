import {post,get} from './DAL';


export const getonthElected = async () => {
    return await get('post/monthlywinsapp/');
};
