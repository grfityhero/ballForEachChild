import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Answer from './Answer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getPosts} from '../../DAL/Home.DAL';
import Filter from './Filter/Filter';
import ModalAnswer from './ModalAnswer';
import {getUserId} from '../Config/localStorage';
import NavigationRow from '../Layout/NavigationRow';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://161.35.43.123:5000';
const socket = socketIOClient(ENDPOINT);

const Home = ({route, navigation}) => {
    const useScroll = React.useRef();
    const [posts, setPosts] = useState([]);
    const [answerVisible, setAnswerVisible] = useState(false);
    const [modalId, setModalId] = useState('');
    const [userRank, setUserRank] = useState({myRank: -1, total: posts.length});
    const [search, setSearch] = useState({name: '', location: ''});

    function compare(a, b) {
        if (a.likesCount < b.likesCount) {
            return 1;
        } else if (a.likesCount > b.likesCount) {
            return -1;
        } else {
            if (moment(a.postedOn).isAfter(b.postedOn))
                return 1;
            else return -1;
        }
    }

    const answerData = () => {
        console.log("answerData")
        getPosts()
            .then(async response => {
                setPosts(response.data);
                updateRank(response.data)
            })
            .catch(error => {
                navigation.navigate('Login');
            });
    };

    useEffect(() => {
        answerData();
    }, []);



    useEffect(() => {
        if (route.params && route.params.newPost) {
            let postsList = [...posts];
            postsList.push(route.params.newPost);
            setPosts(postsList);
        }
    }, [route.params]);

    const updateRank = async (data) => {
        if (!data) {
            data = posts
        }
        const userId = await getUserId();
        let rank = await data.sort(compare).findIndex(x => x.userId === JSON.parse(userId).id);
        if (userRank.myRank !== rank) {
            setUserRank({myRank: rank === -1 ? 'no rank' : rank + 1, total: data.length});
        }
    }

    const modalClick = postId => {
        setModalId(postId);
        setAnswerVisible(!answerVisible);
    };

    const showPostOnModal = () => {
        let post = posts.filter(_p => {
            return _p.postId === modalId;
        })[0];

        return post;
    };

    const postLike = async postId => {
        const getPost = posts.find(p => p.postId === postId);
        getPost.didLike ? getPost.likesCount-- : getPost.likesCount++;
        getPost.didLike = !getPost.didLike;
        updateRank();
    };

    const filterSearch = data => {
        setSearch({name: data.name, location: data.location});
    };

    const scrollRank = data => {
        if (data > 0)
            useScroll.current.scrollTo({x: 0, y: 110 * (data - 1) + 10 * (data - 1)})
    };

    socket.on("likesupdated", (data) => {
        if (data) {
            const getPost = posts.find(p => p.postId == data.postid);
            if (getPost && getPost.likesCount !== data.likes) {
                getPost.likesCount = data.likes;
                // console.log(getPost)
                updateRank();
            }
        }
    })

    socket.on("got_new_post",async (newPost)=>{
        console.log("newPost :",newPost)
        if(!posts.find(x=>newPost.postId === x.postId)){
            console.log("not fount")
            let newPosts = [...posts];
            newPosts.push(newPost)
            await setPosts(newPosts);
        }
    })

    const restartDay = () => {
        setPosts([]);
    }


    return (
            <SafeAreaView style={styles.style}>
                <NavigationRow restartDay={restartDay} navigation={navigation}/>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <Filter
                        scrollRank={scrollRank}
                        userSearch={filterSearch}
                        ranking={userRank}
                    />
                </View>

                <ScrollView
                    ref={scroller => {
                        // this.scroller = scroller;
                        useScroll.current = scroller
                    }}>
                    {posts
                        .sort(compare)
                        .filter(_p => {
                            return (
                                _p.name?.toLowerCase().includes(search?.name?.toLowerCase()) &&
                                (_p.city
                                        .toLowerCase()
                                        .includes(search?.location?.toLowerCase()) ||
                                    _p.country
                                        .toLowerCase()
                                        .includes(search?.location?.toLowerCase()))
                            );
                        })
                        .map((_p, index) => {
                            console.log(_p)
                            return (
                                <Answer
                                    onPress={modalClick}
                                    key={index}
                                    data={_p}
                                    postLike={postLike}
                                />
                            );
                        })}
                </ScrollView>

                <ModalAnswer
                    data={showPostOnModal}
                    likeHandler={postLike}
                    isShow={answerVisible}
                    isClose={() => {
                        setAnswerVisible(!answerVisible);
                    }}
                />
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    style: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0097FF',
        paddingTop: 10,
    },
    timer: {
        backgroundColor: 'gray',
        width: '70%',
        fontSize: 50,
    },
});

export default Home;
