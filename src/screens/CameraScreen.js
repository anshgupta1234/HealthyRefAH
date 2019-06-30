import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import { Icon } from "react-native-elements";
import { RNCamera } from "react-native-camera";
import { Permissions, AppLoading } from 'expo'
import { Camera } from 'expo'
import globalState from '../utils/global'


export default class CameraScreen  extends Component<{}>{

    validateItem = response => {
        if(response.breadcrumbs[0] !== "non food item"){
            globalState.items.push({name: response.cleanTitle, image: response.image});
            globalState.itemName.push(response.cleanTitle.toLowerCase())
        }
    };

    static navigationOptions = ({ navigation }) => {
        return ({
            header: <View style={{ height: 0}} />
        })
    };

    async componentDidMount(){
        await this.askPermissions();
        this.takePicture();
        console.disableYellowBox = true
    }

    takePicture = async() => {
        await setInterval(async() => {
            let photo = await this.camera.takePictureAsync({ quality: 0.6, base64: true, });
            fetch('http://10.10.137.247:2002', {
                method: 'POST',
                body: JSON.stringify({
                    base64: photo.base64
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => {
                    response["items"].map(item => {
                        if(!this.state.addedItems.includes(item)){
                            this.setState({ addedItems: [...this.state.addedItems, item ], latestItem: item });
                        }
                    });
                });
            if(this.state.takePicture){
                this.takePicture()
            }
        }, 3500)
    };

    state = {
        isLoaded: false,
        takePicture: true,
        addedItems: [],
        latestItem: '',
    };


    askPermissions = async() => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if(status === 'granted'){
            this.setState({ isLoaded: true })
        }
    };


    render(){
        return(
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: '#fff' }}>
                    <Left>
                        <Icon name="arrow-back" size={32} onPress={() => {
                            this.setState({ takePicture: false });
                            this.props.navigation.navigate("MainScreen", { addedItems: this.state.addedItems })
                        }} />
                    </Left>
                    <Body>
                        <Text>Camera</Text>
                    </Body>
                    <Right />
                </Header>
                {
                    this.state.isLoaded ? (
                        <Camera style={{ flex: 1 }} ref={ref => this.camera = ref} type={Camera.Constants.Type.back}>
                            <View style={styles.camContainer}>
                                <View style={styles.displayContainer}>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.latestItem}</Text>
                                </View>
                            </View>
                        </Camera>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    camContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    displayContainer: {
        marginBottom: 40,
        height: 100,
        width: '85%',
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

