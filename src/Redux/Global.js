import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    // Posts
    postsRequest: null,
    postsSuccess: ['data'],
    postsFailure: null,
    postsReset: null
})

export const GlobalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    posts: null,
    fetching: false,
    error: null
})

/* ------------- Reducers ------------- */

// Posts //
export const postsRequest = (state) => state.merge({ fetching: true, data: null });
export const postsSuccess = (state, action) => state.merge({ fetching: false, error: null, posts: action.data });
export const postsFailure = (state) => state.merge({ fetching: false, error: true, posts: null })
export const postsReset = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    // Posts
    [Types.POSTS_REQUEST]: postsRequest,
    [Types.POSTS_SUCCESS]: postsSuccess,
    [Types.POSTS_FAILURE]: postsFailure,
    [Types.POSTS_RESET]: postsReset
})
