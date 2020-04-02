
import * as Axios from "@/actions/Axios/axiosTypes.js";

const username =  {
    token: '',
    sidebarData: [],
};

const UserNameReducer = ( state = username, action) => {
    switch(action.type) {
        case `${Axios["AXIOS_ACTION_LOGGIN"]}`:
            return { ...state, token: action.payload }
        case `${Axios["AXIOS_GET_SIDEBARDATA"]}`:
            return { ...state, sidebarData: action.payload }
        default:
            return state;
    }
}

export default UserNameReducer;
