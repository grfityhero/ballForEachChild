import React from 'react';
import {Image, StyleSheet, View, SafeAreaView} from 'react-native';
import {Card, Text} from 'react-native-paper';
import ImageProfile from '../asserts/ImageProfile.png';
import {IsBasketball} from '../Config/BallGift';
import SwitchTranslate from '../Layout/UiComponents/SwitchTranslate.UiComponnent';
import {TranslateText} from '../Config/Translate';
import Like from "../asserts/Like/like.png";
import unLike from "../asserts/Like/unLike.png";

const WinPost = ({data}) => {
    const [translateMode, setTranslateMode] = React.useState(false);
    const [originalPost] = React.useState(data.post);
    const [translatedPost, setTranslatedPost] = React.useState('');

    const imageSource = () => {
        return !data.userPic ? ImageProfile : {uri: `http://161.35.43.123:5000/usersPics/${data.userPic}`};
    };
    const Translate = () => {
        if (translatedPost === '') {
            TranslateText(setTranslatedPost, originalPost);
        }
        return !translateMode ? originalPost : translatedPost;
    };

    React.useEffect(() => {
    }, [data])


    return (
        <SafeAreaView>
            <Card style={{marginBottom: 20}}>
                <Card.Content>
                    <View style={{flexDirection: "column"}}>
                        <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={{flexDirection: "row"}}>
                                <Image resizeMode={"stretch"} source={imageSource()}
                                       style={{width: '30%', height: 100}}/>
                                <View style={{alignSelf: "flex-end"}}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 12, paddingLeft: 20
                                    }}>{data.name} ({data.city} , {data.country})</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: "column", alignSelf: "flex-end", justifyContent: "flex-end"}}>
                                <View style={{alignSelf: "flex-end"}}><Text>{data.postDate.split('T')[0]}</Text></View>
                                <View style={{alignSelf: "flex-end"}}><Text>{data.likesCount}</Text></View>
                                <View style={{flexDirection: "row", alignSelf: "flex-end"}}>
                                    <SwitchTranslate isTranslated={(val) => {
                                        setTranslateMode(val);
                                    }}/>
                                    <Image source={IsBasketball(data.postDate)} style={{width: 20, height: 20}}/>
                                </View>
                            </View>
                        </View>
                        <View style={{width: '100%'}}>
                            <Text>
                                <Translate/>

                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </SafeAreaView>


        // <Card style={styles.card}>
        //     <Card.Content style={styles.cardContentContainer}>
        //         <View style={{width: '20%'}}>
        //             <Image source={imageSource()} style={{width: '100%', height: '100%'}}/>
        //         </View>
        //         <View style={{flex: 8, flexDirection: 'column'}}>
        //             <View style={{flex: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
        //                 <View style={{flex: 1, alignItems: 'flex-start'}}>
        //                     <Text style={{
        //                         fontWeight: 'bold',
        //                         fontSize: 12,
        //                     }}>{data.name} ({data.city} , {data.country})</Text>
        //                 </View>
        //                 <View style={{flex: 1, alignItems: 'flex-end'}}>
        //                     <Text>{data.postDate.split('T')[0]}</Text>
        //                     <Text>{data.likesCount}</Text>
        //                     <View style={{flexDirection: 'row', paddingRight: 30}}>
        //                         <View style={{flexDirection: 'row', width: '50%'}}>
        //                             <View style={{paddingRight: 15}}>
        //                                 <SwitchTranslate isTranslated={(val) => {
        //                                     setTranslateMode(val);
        //                                 }}/>
        //                             </View>
        //                             <View>
        //
        //                             </View>
        //                         </View>
        //
        //                     </View>
        //                 </View>
        //             </View>
        //             <View style={{flexDirection: 'row',alignSelf:""}}>
        //                 <Text style={{paddingLeft: 10, textAlign: 'right'}}>
        //                     {/*{data.post}*/}
        //                     <Translate/>
        //                 </Text>
        //             </View>
        //         </View>
        //     </Card.Content>
        // </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
    },
    cardContentContainer: {
        flexDirection: 'row',
    },
});

export default WinPost;
