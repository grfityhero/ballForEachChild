import React, {useState} from 'react';
import ImageProfile from '../../asserts/ImageProfile.png';
import ImagePicker from 'react-native-image-picker';
import {View,} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {buttonTheme} from '../ThemeComponents';
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';

export const ImageUpload = ({onImageChange, ...props}) => {
    const [image, setImage] = useState(ImageProfile);

    React.useEffect(() => {

    }, [])

    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
        };



        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const source = {
                    uri,
                    type,
                    name: 'image.jpg',
                };
                setImage(source);
                onImageChange({name, source});
            }
        });
    };

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{alignSelf: 'stretch'}}>
                <Button style={{marginTop: 20}} onPress={selectPhotoTapped}
                        mode="contained" theme={buttonTheme}>
                    <Text style={{fontSize: 12}}> {props.text}</Text>
                </Button>
            </View>
            <View>
                <Avatar.Image source={image}/>
            </View>
        </View>
    );

};
