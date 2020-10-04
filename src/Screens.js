// screens.js
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

export const registerScreens = (store) => {
    Navigation.registerComponentWithRedux('Home', () => Home, Provider, store);
}

// SCREENS //
import Home from './Containers/Home';

