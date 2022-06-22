import {SET_USER_NAME, SET_USER_EMAIL, SET_USER_IMAGE, SET_USER_BIO, SET_USER_TOKEN, SET_CHECKED_TAG, SET_ARTICLE_SLUG, SET_LOADING, SET_PROFILES_USER_NAME, SET_PROFILES_USER_IMAGE, SET_PROFILES_USER_FOLLOW, SET_DATA_UPDATE, SET_REFRESHING, SET_COMMENT_DATA_UPDATE, SET_EDIT_DATA, SET_PROFILES_OPEN} from './action';

const initialState = {
    userName:'',
    userEmail:'',
    userImage:'',
    userBio:'',
    userToken:'',
    tag:'',
    articleSlug:'',
    loading:false,
    profilesUserName:'',
    profilesUserImage:'',
    profilesUserFollow:false,
    dataUpdate:false,
    refreshing:false,
    commentDataUpdate:false,
    editData:[],
    profilesOpen:false
}

function userReducers(state=initialState, action){
    switch (action.type) {
        case SET_USER_NAME:
            return{...state, userName: action.payload}
        case SET_USER_EMAIL:
            return{...state, userEmail: action.payload}
        case SET_USER_IMAGE:
            return{...state, userImage: action.payload}
        case SET_USER_BIO:
            return{...state, userBio: action.payload}
        case SET_USER_TOKEN:
            return{...state, userToken: action.payload}
        case SET_CHECKED_TAG:
            return{...state, tag: action.payload}
        case SET_ARTICLE_SLUG:
            return{...state, articleSlug: action.payload}
        case SET_LOADING:
            return{...state, loading: action.payload}
        case SET_PROFILES_USER_NAME:
            return{...state, profilesUserName: action.payload}
        case SET_PROFILES_USER_IMAGE:
            return{...state, profilesUserImage: action.payload}
        case SET_PROFILES_USER_FOLLOW:
            return{...state, profilesUserFollow: action.payload}
        case SET_DATA_UPDATE:
            return{...state, dataUpdate: action.payload}
        case SET_REFRESHING:
            return{...state, refreshing: action.payload}
        case SET_COMMENT_DATA_UPDATE:
            return{...state, commentDataUpdate: action.payload}
        case SET_EDIT_DATA:
            return{...state, editData: action.payload}
        case SET_PROFILES_OPEN:
            return{...state, profilesOpen: action.payload}
        default:
            return state;
    }
}

export default userReducers

