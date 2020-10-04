import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { GlobalTypes } from '../Redux/Global'

/* ------------- Sagas ------------- */

import { getPosts } from './GlobalSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([

    // Global
    takeLatest(GlobalTypes.POSTS_REQUEST, getPosts, api),

  ])
}
