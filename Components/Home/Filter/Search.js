import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {Input} from '../../Layout/UiComponents/index.UiComponents';
import {TranslateObject} from '../../Config/Translate';


const InitialState = {
    Myrank: "My rank",
    From: "From",
    name: "name",
    location: "Location"
}

const Search = ({searchMode, ranking, userSearch}) => {
    const [search, setSearch] = useState({name: '', location: ''});
    const [translate, setTranslate] = useState(InitialState);
    const [rank, setRank] = useState(ranking);

    useEffect(() => {
        TranslateObject(setTranslate, InitialState);
    }, [])

    useEffect(() => {
        setRank(ranking)
        console.log("Search ranking :",ranking)
    }, [ranking])

    useEffect(() => {
        if (!searchMode) {
            setSearch({name: '', location: ''});
        }
    }, [searchMode]);

    useEffect(() => {
        userSearch(search);
    }, [search]);

    const onChangeValue = (key, value) => {
        setSearch((oldState) => {
            return {...oldState, [key]: value};
        });

    };

    const Rank = () => {
        return <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text>{translate["Myrank"]} : {rank.myRank !== -1 ? rank.myRank  : "Not Rank"}</Text>
            <Text>{translate["From"]} : {rank.total}</Text>
        </View>;
    };
    return (
        <>
            {searchMode ?
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                    <View style={{width: '40%'}}>
                        <Input style={{backgroundColor: 'white'}} text={translate["name"]} value={search.name}
                               onChangeText={(text) => {
                                   onChangeValue('name', text);
                               }}/>
                    </View>
                    <View style={{width: '60%', paddingLeft: 10}}>
                        <Input style={{backgroundColor: 'white'}} text={translate["location"]} value={search.location}
                               onChangeText={(text) => onChangeValue('location', text)}/>
                    </View>
                </View>
                :
                <Rank/>}
        </>
    );
};


export default Search;
