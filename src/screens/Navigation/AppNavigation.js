import { createStackNavigator } from 'react-navigation-stack'
import Home from '../Auth/Home'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: 'Home'
  }
)

export default AppNavigation