
// import { combineReducers } from 'redux'
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import immutableTransform from 'redux-persist-transform-immutable'
import configureStore from '../Config/CreateReduxStore'
import rootSaga from '../Sagas'

const config = { 
    key: 'root', 
    storage: AsyncStorage, 
    blacklist: [
        // "global"
    ],
    transforms: [immutableTransform()]
}

/* ------------- Assemble The Reducers ------------- */
export const reducers = persistCombineReducers(config, {
  global: require('./Global').reducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}



// import { createStore, applyMiddleware } from 'redux';
// import { persistCombineReducers } from 'redux-persist';
// import thunk from 'redux-thunk'
// import { AsyncStorage } from 'react-native';

// const config = { 
//     key: 'root', 
//     storage: AsyncStorage, 
//     blacklist: [
//         // "global"
//     ] 
// }


// import global from './global/globalReducer';

// // Combine reducers
// const reducers = persistCombineReducers(config, {
//     global
// });

// const reduxStore = () => createStore(reducers, {}, applyMiddleware(thunk));

// export default reduxStore;
