import axios from "axios";
import * as Axios from "./axiosTypes.js";
import qs from "qs";

export function Loggin(payload) {
    return {
        type: Axios["AXIOS_ACTION_LOGGIN"],
        payload
    }
}

export function createSideBarData(payload) {
    return {
        type: Axios["AXIOS_GET_SIDEBARDATA"],
        payload
    }
}

axios.defaults.baseURL = 'http://172.16.30.111/';

var axioshttp = {
    post: function( url, params ) {
        return new Promise( (resolve, reject) => {
            if( url !== '/ApiBase/login') {
                params = { ...params, LoginToken: JSON.parse(sessionStorage.getItem("loginData"))["LoginToken"] }
            }
            axios.post(url, qs.stringify(params)).then( res => {
                if(res) {
                    sessionStorage.setItem("resultStatus", JSON.stringify(
                        {
                            StatusCode: res.data.StatusCode,
                            Msg: res.data.Msg
                        }));
                    return resolve(res.data);
                }else {
                    return reject("server has disconnected")
                }
            })
        })
    }
}

export const postLoggin = input => {
    return dispatch => {
        return axioshttp.post('/ApiBase/login', input)
        .then( res => {
            console.log("Login")
            dispatch(Loggin(res.ResultData.LoginToken))
            sessionStorage.setItem("loginData", JSON.stringify(res.ResultData));
        })
        .catch( error =>  error)
    }
}

export const getSideBarData = () => {
    return (dispatch, getState) => {
        return axioshttp.post('/ApiBase/GetMenu', {DMSRoleID: "0"}).then( res => {
            if(res.StatusCode === 1) {
                sessionStorage.setItem("sidebarData", JSON.stringify(res.ResultData));
                dispatch(createSideBarData(res.ResultData))
                return Promise.resolve()
            }
        })
        .catch( error => Promise.reject(error))
    }
}


