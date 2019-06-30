import { createStackNavigator, createAppContainer } from "react-navigation";
import MainScreen from "./src/screens/MainScreen";
import CameraScreen from "./src/screens/CameraScreen";
import RecipeScreen from "./src/screens/RecipeScreen";

const AppNavigator = createStackNavigator(
    {
        MainScreen: {
            screen: MainScreen,
        },
        CameraScreen: CameraScreen,
        RecipeScreen: RecipeScreen,
    },
    {
        initialRouteName: "MainScreen",
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator)