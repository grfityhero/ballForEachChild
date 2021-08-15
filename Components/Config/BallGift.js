import moment from 'moment';
import Basketball from '../asserts/basketball.png';
import football from '../asserts/football.png';

export const IsBasketball = (date) => {

    let day = moment().day();
    if (date) {
        day = moment(date).day();
    }

    if (day % 2 === 0) {
        return Basketball;
    }
    return football;
};
