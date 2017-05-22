import * as webService from '../webservice/index'

const receiveLists = lists => ({
    type: "getList",
    payload: lists
});

export const getUserListAction = () => dispatch => {
    let userLists = webService.getUserLists();
    //redux-promise added
    dispatch(receiveLists(userLists));

    //so there is no need to call then

    /*webService.getUserLists().then((res) => {
     if (res.data.success) {
     dispatch(receiveLists(res.data));
     }
     });*/

};
