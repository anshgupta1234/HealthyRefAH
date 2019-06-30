import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, FlatList, KeyboardAvoidingView, Image, Platform } from 'react-native';
import {Icon, Input} from 'react-native-elements'
import ActionButton from "react-native-action-button";
import IngredientComponent from "../components/IngredientComponent";
import { Header, Left, Body, Right } from 'native-base'
import globalState from '../utils/global'
import { NavigationEvents } from "react-navigation";
import DisappearingTouchable from "../components/DisappearingTouchable";


export default class MainScreen extends Component<{}>{

    static navigationOptions = ({ navigation }) => {
        return ({
            header: null,
            title: 'Main',
        })
    };

    componentDidMount(){
        console.ignoredYellowBox = ["Unhandled Promise"];
        console.disableYellowBox = true;
    }

    onNavigated = () => {
        try {
            this.props.navigation.getParam("addedItems").map(item => this.addItem(item))
        } catch (e) {

        }
    };

    addItem = item => {
        if(item !== "" && !this.state.itemName.includes(item.toLowerCase())){
            fetch("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/classify", {
                method: 'POST',
                body: JSON.stringify(
                    {
                        title: item,
                        upc: '',
                        plu_code: '',
                    }
                ),
                headers: {
                    'X-Mashape-Key': 'API_KEY',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(response => this.validateItem(response))
                .then(() => this.setState({ inputValue: '' }))
            }
    };



    validateItem = response => {
        if(response.breadcrumbs[0] !== "non food item"){
            this.setState({
                items: [...this.state.items, {name: response.cleanTitle, image: response.image}],
                itemName: [...this.state.itemName, response.cleanTitle.toLowerCase()]
            });
            globalState.items.push({name: response.cleanTitle, image: response.image});
            globalState.itemName.push(response.cleanTitle.toLowerCase())
        }
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#6B6565",
                    alignItems: 'center',
                    marginRight: '7%',
                    marginLeft: '7%',
                    borderRadius: 3
                }}
          />
    );
  };



    state = {
        items: globalState.items,
        itemName: globalState.itemName,
        fridgeOpened: false,
        inputValue: '',
        errorMessage: ''
    };

    render(){
        return(
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => this.onNavigated()}/>
                <Header style={styles.header}>
                    <Left>
                        <Icon
                            name="restaurant-menu"
                            size={32}
                            style={styles.camera}
                            onPress={() => this.props.navigation.navigate("RecipeScreen", { items: [this.state.items.map(item => item.name)]})}
                        />
                    </Left>
                    <StatusBar hidden />
                    <Body>
                        <Text style={{ fontSize: 20, textDecorationStyle: "solid", fontWeight: 'bold' }}>RecipEZ</Text>
                    </Body>
                    <Right>
                        <Icon name="camera-alt" size={32} style={styles.camera} onPress={() => this.props.navigation.navigate("CameraScreen", { addItem: this.addItem })} />
                    </Right>
                </Header>
                <StatusBar transluscent />
                <View style={styles.container}>
                    <View style={styles.fridge}>
                        <FlatList
                            columnWrapperStyle={{ width: '50%' }}
                            data={this.state.items}
                            extraData={this.state.items}
                            numColumns={2}
                            renderItem={({ item, index }) => <IngredientComponent image={item.image} text={item.name} index={index}/>}
                            keyExtractor={item => item.name}
                        />
                        <Input
                            value={this.state.inputValue}
                            onChangeText={text => this.setState({ inputValue: text })}
                            errorMessage={this.state.errorMessage}
                            placeholder="Enter Item..."
                            containerStyle={{ marginBottom: 10 }}
                            placeholderTextColor='#515151'
                        />
                        <TouchableOpacity style={styles.addButton} onPress={() => this.addItem(this.state.inputValue)}>
                            <Icon name="add" size={25} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', marginTop: Platform.OS ==='ios' ? 25: StatusBar.currentHeight }}>
                    <DisappearingTouchable
                        style={styles.fridgeDoor}
                        onPress={() => this.setState({ fridgeOpened: true })}
                        visible={!this.state.fridgeOpened}
                    >
                        <Image source={require('../../assets/splash.png')} style={{ position: 'absolute', resizeMode: 'contain', width: 300, height: 300 }} />
                    </DisappearingTouchable>
                    <DisappearingTouchable
                        style={{ alignSelf: 'flex-start', backgroundColor: '#808080', height: '77%', width: '10%', left: 3, borderRadius: 20 }}
                        visible={this.state.fridgeOpened}
                        onPress={() => this.setState({ fridgeOpened: false })}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9bd6e4',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    fridge: {
        height: '85%',
        width: '80%',
        backgroundColor: 'white',
        borderWidth: 10,
        borderColor: '#919191',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        right: 10,
        bottom: 12,
        width: 40,
        height: 40,
        backgroundColor: '#90EE90',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    header: {
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 7,
    },
    fridgeDoor: {
        height: '80%',
        width: '80%',
        backgroundColor: '#919191',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
    },
});