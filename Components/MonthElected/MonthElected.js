import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView,View} from 'react-native';
import NavigationRow from '../Layout/NavigationRow';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {Text} from 'react-native-paper';
import {getonthElected} from '../../DAL/MonthElected.DAL';
import WinPost from './WinPost';
import {TranslateText} from '../Config/Translate';

const MonthElected = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('נבחרי החודש');

    const getMonthPosts = async () => {
        getonthElected().then((posts) => {
            setPosts(posts.data);
        });
    };

    useEffect(() => {
        TranslateText(setTitle, title);
        getMonthPosts();
    }, []);


    return (
        <SafeAreaView style={styles.style}>
            <NavigationRow navigation={navigation}/>
            <Text style={{alignSelf: 'center', paddingTop: 20, fontSize: 25, fontWeight: 'bold',paddingBottom:20}}>{title}</Text>
            <ScrollView >
                <View>
                    {posts.map((_p, index) => {
                        return <WinPost key={index} data={_p}/>;
                    })}
                </View>
            </ScrollView>

        </SafeAreaView>

    );
};


const styles = StyleSheet.create({

    style: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0097FF',
    },
});


export default MonthElected;
