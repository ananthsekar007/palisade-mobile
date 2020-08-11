import { createStackNavigator } from 'react-navigation-stack'
import Login from '../Auth/login'
import Signup from '../Auth/Signup'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  {
    initialRouteName: 'Login',
    headerMode:'none'
  }
)

export default AuthNavigation