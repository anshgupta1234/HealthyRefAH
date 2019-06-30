import React, { Component } from "react";
import { Image, ScrollView, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Text,
  Title,
  Button,
  Icon,
  Left,
  Body
} from "native-base";
import {AppLoading, Font} from "expo";
export default class RecipeScreen extends Component<{}> {

  state = {
      result: [],
      isLoaded: false
  };

  static navigationOptions = {
    header: null
  };

  loadFonts = async() => {
      return Promise.all([
          Font.loadAsync({
              "Roboto_medium": require('../../assets/Roboto_medium.ttf'),
          })
      ])
  };

  async componentDidMount() {
    fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&fillIngredients=false&includeIngredients=apple%2C+banana&instructionsRequired=false&limitLicense=false&number=20&type=main+course",
      {
        method: "GET",
        headers: {
          "X-Mashape-Key": "API_KEY",
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.warn(response.results);
        this.setState({ result: response.results });
      });

    await this.loadFonts();

    this.setState({ isLoaded: true })

  }

  render() {
    const description = [
      "Just burned 2,000 calories. That's the last time I leave brownies in the oven while I nap.",
      "I hope when I inevitably choke to death on gummy bears people just say I was killed by bears and leave it at that.",
      "Entered what I ate today into my new fitness app and it just sent an ambulance to my house.",
      "Smoking will kill you... Bacon will kill you... But,smoking bacon will cure it.",
      "I would request a last meal of soda and pop rocks so I could die on my own terms.",
      "The dinner I was cooking for my family was going to be a surprise but the fire trucks ruined it.",
      "I know milk does a body good, but damn girl, how much have you been drinking?",
      "Diet Day #1 - I removed all the fattening food from my house. It was delicious.",
      "One day you're the best thing since sliced bread. The next, you're toast.",
      "The rarest of all types",
      "Everything I want to be",
      "Special and idiosyncratic (heh, in a good way)",
      "Beautiful, not just outside, but deep inside as well",
      "Perfection, even the sun is jealous of the way the food shines",
      "Proof that there is good in this world",
      "Constantly racing through my mind",
      "The next Food Channel Model",
      "Loved always",
      "Important and amazing",
      "Geniune and sincere",
      "One I want to spend my future with",
      "Hotter than donut grease"
    ];
    return (
        <Container>
            <Header style={{ backgroundColor: 'white'}}>
                <Left>
                    <Icon
                        name="arrow-back"
                        size={32}
                        onPress={() => this.props.navigation.goBack()}
                    />
                </Left>
                <Body>
                    <Text>Recipe Index</Text>
                </Body>
                <Right />
            </Header>
            <ScrollView style={{ backgroundColor: "#319cb4" }}>
          {this.state.result.map(recipe => {
            return (
                <Content style={{ backgroundColor: "#afdee9" }}>
                  <Card style={{ flex: 1 }}>
                    <CardItem style={{ backgroundColor: '#d7eff4' }}>
                      <Left>
                        <Thumbnail source={{ uri: "https://bit.ly/2YlFZHe" }} />
                        <Body>
                          <Text>{recipe.title}</Text>
                          <Text note>
                            {
                              description[
                                `${parseInt(
                                  Math.floor(Math.random() * 21) + 1
                                )}`
                              ]
                            }
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem style={{ flex: 1 }}>
                      <Body style={{ flex: 1 }}>
                        <Image
                          source={{ uri: recipe.image }}
                          style={{ height: 200, width: 200, flex: 1 }}
                        />
                        <Text>{recipe.title}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent textStyle={{ color: "#87838B" }}>
                          <Icon name="thumbs-up" />
                          <Text>
                            {`${parseInt(recipe.likes) +
                              Math.floor(Math.random() * 99) +
                              1} Thumbs up!`}
                          </Text>
                        </Button>
                      </Left>
                      <Right>
                          <Button>
                            <Text>
                                More info
                            </Text>
                          </Button>
                      </Right>
                    </CardItem>
                  </Card>
                </Content>
            );
          })}
          </ScrollView>
        </Container>
    );
  }
}
