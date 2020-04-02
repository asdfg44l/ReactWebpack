
import { createContext, Fragment, useState, useEffect, useRef, useContext, useCallback, useMemo } from 'react';
import { Provider, useSelector, useDispatch } from "react-redux";
import { InputGroup, FormControl } from 'react-bootstrap';
// Pure Redux
// const mapStateToProps = state => {
//     return { data: state.message }       
// }
// const mapDispatchToProps = dispatch => {
//     return { changeData: data => dispatch(addMessage({key: null, name: "T1234", message: data}))}
// }
// const List = connect(mapStateToProps, mapDispatchToProps)(MessageList)

const themes = {
    light: "btn-light",
    dark: "btn-dark"
}

const style = {
    primary: "primary"
}

const ThemesContext = createContext({ theme: themes.light });
const StyleContent = createContext({ style: style.primary });

function Hook(props) {
    const { theme } = useContext(ThemesContext);
    const [ themeData, setThemeData ] = useState(theme)

    return (
        <Fragment>
            <h2 className="title">React Hook</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <MessageList />
                        {/* <Example /> */}
                        <StyleContent.Provider value={{style: "warning"}}>
                            <ThemesContext.Provider value={{themeData, setThemeData}}>
                                <ThemeButton />
                            </ThemesContext.Provider>
                        </StyleContent.Provider>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function ThemeButton() {
    const { themeData, setThemeData } = useContext(ThemesContext);
    const { style } = useContext(StyleContent)

    return (
        <button
            className={"btn " + themeData} 
            onClick={() => setThemeData( () => themeData === themes.light ? themes.dark : themes.light )}
        >
            ThemeButton
        </button>
    )
}

function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count)
    return (
        <>
            <h1>Now: {count}, before: {prevCount}</h1>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </>
    );
}

function usePrevious(value) {
    const prevCountRef = useRef(null);
    useEffect(() => {
        console.log("[previous] in the useEffect")
        prevCountRef.current = value;
    });
    console.log("[previous] out of useEffect")
    return prevCountRef.current;
}

function RefTest() {
    const [ test, setTest ] = useState("Hello")
    useEffect( () => {
        console.log("[Test] in")
        setTest("AAAAAA")
    }, [])
    console.log(`[Test] ${test} out`)
    return ( <h3 className="text-primary">{test}</h3> )
}

function MessageList(props) {
    //Reduce with React Hooks
    //React Hooks 用以使用 local state
    const [inputMsg, setInputMsg] = useState('')
    //取得特定資料
    const message = useSelector( state => state.message)
    //定義 dispatch
    const dispatch = useDispatch();
    const addMessage = () => {
        dispatch({
            type: "addMessage",
            payload: { key: message.length + 1, name: "T1231", message: inputMsg }
        })
    }
    let count = 0;
    const themeData = useContext(ThemesContext);

    const memoizedCallback = useCallback( () => {
        return message.map( data => (<li key={data.key.toString()}>{data.name}: {data.message}</li>) )
    }, [message])

    const memoizedValue = useMemo(() => 
        message.map( data => (<li key={data.key.toString()}>{data.name}: {data.message}</li>) )
    , [message])

    

    return (
        <>
            <RefTest />
            {/* <Counter /> */}
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    onBlur={ (e) => setInputMsg(e.target.value) }
                />
                <InputGroup.Append>
                    <div className="">
                        <button type="button" className={"btn " + themeData.theme} onClick={addMessage}>新增 Todo</button>
                    </div>
                </InputGroup.Append>
            </InputGroup>
            <ul>
                {memoizedValue}
            </ul>
        </>
    )
}

function useExample() {
    const [count, setCount] = useState(0)
    const [banana, setBanana] = useState(10)

    // click count 第二參數為 "[]"，只有在 mount、unmount 才會執行。
    useEffect( () => {
        console.log(`Hey! it is Active-${count} by useEffect`)
    }, []) 
    // banana 第二參數為 "[banana]"，只有在 banana 改變時才會執行。
    useEffect( () => {
        console.log(`I eat ${banana} banana`)
    }, [banana])

    return { count, setCount, banana, setBanana }
}

function Example() {
    const { count, setCount, banana, setBanana } = useExample()
    const inputE1 = useRef();
    const onButtonClick = () => {
        console.log(inputE1.current);
    }

    return (
        <Fragment>
            <div className="">
                <input type="text" ref={inputE1} />
                <button onClick={onButtonClick}>print input</button>
            </div>
            <div className="">
                <span>You clicked {count} times</span>
                <button onClick={ () => setCount(count + 1)}>
                    Click me
                </button>
            </div>
            <div className="">
                <span>You eat {banana} banana</span>
                <button onClick={ () => setBanana(banana + 1)}>
                    Eat banana
                </button>
            </div>
        </Fragment>
    )
}

export default Hook;