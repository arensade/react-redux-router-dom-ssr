const UserListsReducer = (state={}, action) => {

    switch (action.type) {
        case "getList":
            return {
                ...state,
                ...action.payload.data
            };
            break;
        default:
            return state;
    }
};

export const getUserLists = (state) => {
    return state.UserListsReducer.success;
};

export default UserListsReducer;