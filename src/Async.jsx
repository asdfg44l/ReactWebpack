import { Fragment, Component, useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from "react-redux";
import { postLoggin, getSideBarData } from '@/actions/Axios/axios.js';

function Loggin(props) {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");

    const token = useSelector( state => state.username.token)
    const sidebar = useSelector( state => state.username.sidebarData)

    const dispatch = useDispatch();
    const Loggin = () => {
        dispatch(postLoggin({ AccountID: account, Password: password }))
    }
    const GetSideBar = () => {
        dispatch(getSideBarData())
    }
    
    function ModulesData() {
        if( sidebar.length === 0 ) { return };
        let modules = {};
        sidebar.forEach( item => {
            let functions = {};
            item.FunctionList.forEach( list => {
                functions[list.FunctionName] = list;
            })
            modules[item.ModuleName] = functions;
        })
        
        return modules;
    }
    // if(sidebar.length !== 0) {
    //     ModulesData()
    // }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <div className="border border-primary p-2 m-2">
                        <div className="input-group my-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">帳號:</span>
                            </div>
                            <input className="form-control" type="text" value={account} onChange={ (e) => setAccount(e.target.value) }/>
                        </div>
                        <div className="input-group my-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">密碼:</span>
                            </div>
                            <input className="form-control" type="text" value={password} onChange={ (e) => setPassword(e.target.value) }/>
                        </div>
                        <button className="btn btn-primary" onClick={Loggin}>登入</button>
                        <button className="btn btn-warning ml-3" onClick={GetSideBar}>取得資料</button>
                        {/* <button onClick={ModulesData}>ModulesData</button> */}
                        <div className="">{token || "No Token"}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loggin;