import * as webService from '../webservice/index'

const receiveLists = lists => ({
    type: "getList",
    success: lists.success
});

export const getUserListAction = () => dispatch => {
    webService.getUserLists().then((res) => {
        if (res.data.success) {
            dispatch(receiveLists(res.data));
        }
    });
};
