import React from 'react';
import hebrewDate from 'hebrew-date';
import JewisMonthView from './JewisMonthView';
import HebrewDateTexts from './hebrewDateTexts.json';
import {isRTL} from '../../Config/I18nManager';
import TheSevenUniversalLaws from './TheSevenUniversalLaws'
import moment from 'moment';
const Month = () => {

    if (!isRTL)
        return <TheSevenUniversalLaws/>

    let month = HebrewDateTexts.filter((m) => {
        return m.month === hebrewDate(moment().get('year'),moment().get('month')+1,moment().get('date')).month_name;
    })[0];

    return <JewisMonthView text={month.text} title={month.hebrewMonth}/>;


};


export default Month;
