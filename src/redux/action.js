export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const SET_USER_BIO = 'SET_USER_BIO';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_CHECKED_TAG = 'SET_CHECKED_TAG';
export const SET_ARTICLE_SLUG = 'SET_ARTICLE_SLUG'; 
export const SET_LOADING = 'SET_LOADING'; 

// Profiles 
export const SET_PROFILES_USER_NAME = 'SET_PROFILES_USER_NAME';
export const SET_PROFILES_USER_IMAGE = 'SET_PROFILES_USER_IMAGE';
export const SET_PROFILES_USER_FOLLOW = 'SET_PROFILES_USER_FOLLOW';
export const SET_DATA_UPDATE = 'SET_DATA_UPDATE';
export const SET_COMMENT_DATA_UPDATE = 'SET_COMMENT_DATA_UPDATE';
export const SET_REFRESHING = 'SET_REFRESHING';

// Edit Article
export const SET_EDIT_DATA = 'SET_EDIT_DATA';
export const SET_PROFILES_OPEN =  'SET_PROFILES_OPEN';


export const setUserName = userName => dispatch => {
    dispatch({
        type:SET_USER_NAME,
        payload: userName,
    });
}

export const setUserEmail = userEmail => dispatch => {
    dispatch({
        type:SET_USER_EMAIL,
        payload: userEmail,
    });
}

export const setUserImage = userImage => dispatch => {
    dispatch({
        type:SET_USER_IMAGE,
        payload: userImage,
    });
}

export const setUserBio = userBio => dispatch => {
    dispatch({
        type:SET_USER_BIO,
        payload: userBio,
    });
}

export const setUserToken = userToken => dispatch => {
    dispatch({
        type:SET_USER_TOKEN,
        payload: userToken,
    });
}

export const setCheckTag = tag => dispatch => {
    dispatch({
        type:SET_CHECKED_TAG,
        payload: tag,
    });
}

export const setArticleSlug = articleSlug => dispatch => {
    dispatch({
        type:SET_ARTICLE_SLUG,
        payload: articleSlug,
    });
}

export const setLoading = loading => dispatch => {
    dispatch({
        type:SET_LOADING,
        payload: loading,
    });
}

export const setProfilesUserName = profilesUserName => dispatch => {
    dispatch({
        type:SET_PROFILES_USER_NAME,
        payload: profilesUserName,
    });
}

export const setProfilesUserImage = profilesUserImage => dispatch => {
    dispatch({
        type:SET_PROFILES_USER_IMAGE,
        payload: profilesUserImage,
    });
}

export const setProfilesUserFollow = profilesUserFollow => dispatch => {
    dispatch({
        type:SET_PROFILES_USER_FOLLOW,
        payload: profilesUserFollow,
    });
}

export const setDataUpdate = dataUpdate => dispatch => {
    dispatch({
        type:SET_DATA_UPDATE,
        payload: dataUpdate,
    });
}

export const setRefreshing = refreshing => dispatch => {
    dispatch({
        type:SET_REFRESHING,
        payload: refreshing,
    });
}

export const setCommentDataUpdate = commentDataUpdate => dispatch => {
    dispatch({
        type:SET_COMMENT_DATA_UPDATE,
        payload: commentDataUpdate,
    });
}

export const setEditData = editData => dispatch => {
    dispatch({
        type:SET_EDIT_DATA,
        payload: editData,
    });
}

export const setProfilesOpen = profilesOpen => dispatch => {
    dispatch({
        type:SET_PROFILES_OPEN,
        payload: profilesOpen,
    });
}