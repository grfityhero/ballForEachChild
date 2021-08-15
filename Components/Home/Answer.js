import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import ImageProfile from '../../Components/asserts/ImageProfile.png';
import Like from '../asserts/Like/like.png';
import unLike from '../asserts/Like/unLike.png';
import {like} from '../../DAL/Home.DAL';

const Answer = ({data, onPress, postLike}) => {
    const [answer, setAnswer] = useState(data);
    const answerRef = React.useRef(data);



    useEffect(() => {
            setAnswer(data);
    }, [data]);

    const imageSource = () => {
        return data.avatarStatus === 0
            ? ImageProfile
            : {uri: `http://161.35.43.123:5000/usersPics/${data?.avatarPicUrl}`};
    };

    const likeHandler = async () => {
        await like(answer.postId).then(req => {
            console.log("req",req.data)
            if (req.data.nModified > 0) {
                const countLike = !answer.didLike
                    ? answer.likesCount + 1
                    : answer.likesCount - 1;
                setAnswer(oldState => {
                    return {...oldState, didLike: !answer.didLike, likesCount: countLike};
                });
                // postLike(answer.postId);
            }
        });
    };

    return (
        <Card
            style={styles.card}
            onPress={() => {
                onPress(answer.postId);
            }}>
            <Card.Content style={styles.cardContentContainer}>
                <View style={{width: '20%'}}>
                    <Image
                        source={imageSource()}
                        style={{width: '100%', height: '100%'}}
                    />
                </View>
                <View style={{flex: 8, flexDirection: 'column'}}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 3, alignItems: 'flex-start', paddingLeft: 10}}>
                            <Text style={{fontWeight: 'bold'}}>
                                {answer.name} ({answer.city} , {answer.country})
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text >
                                {/*onPress={likeHandler}*/}
                                <Image
                                    source={answer.didLike ? Like : unLike}
                                    style={{width: 15, height: 15}}
                                />
                                {answer.likesCount}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 8, flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={{paddingLeft: 10, textAlign: 'left'}}>
                            {answer.body.length < 120 ? answer.body : answer.body.slice(0, 120) + "..."}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
    },
    cardContentContainer: {
        flexDirection: 'row',
        height: 110,
    },
});

export default Answer;
