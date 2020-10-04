import { Navigation } from 'react-native-navigation';
import { registerScreens } from './Screens';
// import SplashScreen from 'react-native-splash-screen';
// import { font } from './styles/variables';
import { persistStore as persistStoreRaw } from 'redux-persist';
import reduxStore from "./Redux";
import { Wp, Hp, isIos } from './Lib/Utils';
// import { primaryColor } from './styles/themes'

const store = reduxStore();

// promisify persistStore
const persistStore = (store) =>
  new Promise(resolve => {
    persistStoreRaw(store, undefined, () => {
      resolve();
    });
  });

// promisify app launched event
const onAppLaunched = () =>
  new Promise(resolve => {
    Navigation.events().registerAppLaunchedListener(() => {
      goToEntryScreen()
      // goToTabStack();
      // goToSpecificScreen("ScreenName")
      // setTimeout(() => {  SplashScreen.hide(); }, 200);
      resolve();
    });
  });

(async () => {
  registerScreens(store);
  // persist store and w8 for app start simultaneously
  await Promise.all([persistStore(store), onAppLaunched()]);

  useDefaultOptions();
})();

// GO TO SCREEN //

export const goToSpecificScreen = (screen) => Navigation.showOverlay({ component: { name: screen } });

// TABS STACK //
export const goToEntryScreen = () => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'Home'
                }
              }
            ]
          },
          // sideMenu: {
          //   options: {
          //     sideMenu: {
          //       left: {
          //         width: Wp(0.8)
          //       },
          //       openGestureMode: 'bezel'
          //     }
          //   }
          // }
        }
    });
};

const useDefaultOptions = () => {
    
    // console.disableYellowBox = true;

    Navigation.setDefaultOptions({
      layout: { orientation: ['portrait'] },
      topBar: {
          visible: false,
          drawBehind: true
      },
      // animations: {
      //   push: {
      //     waitForRender: true
      //   },
      //   showModal: {
      //     waitForRender: true
      //   }
      // },
      statusBar: {
        visible: true,
        backgroundColor: '#fff',
        style: 'dark'
      },
      // bottomTabs: {
      //   visible: false,
      //   drawBehind: true
      // },
      modal: {
        modalPresentationStyle: 'fullScreen',
      },
      layout: { orientation: ['portrait' ] },
      animations: {
        push: {
          enabled: isIos() ? 'false' : 'true',
          content: {
            alpha: {
                from: 1, // Mandatory, initial value
                to: 1, // Mandatory, end value
                duration: 200, // Default value is 300 ms
            }
          }
        },
        pop: {
          enabled: 'false',
          content: {
            alpha: {
              from: 0,
              to: 1
            }
          }
        }
      }
    });
  };
  
  export const ScreenFadeAnimation = (duration) => {
    return ({
      animations: {
        push: {
          enabled: 'true',
          content: {
            alpha: {
                from: 0, // Mandatory, initial value
                to: 1, // Mandatory, end value
                duration: duration || 400, // Default value is 300 ms
                interpolation: 'accelerate'// Optional
            }
          }
        },
        pop: {
          enabled: 'true',
          content: {
            alpha: {
                from: 1, // Mandatory, initial value
                to: 0, // Mandatory, end value
                duration: 400, // Default value is 300 ms
                interpolation: 'accelerate'// Optional
            }
          }
        }
      }
    })
  }