
//一開始的資料
const message = 
    [
        {key:"1",name:'Mochi',message:'安安大家好'},
        {key:"2",name:'Yiling',message:'是麻糬欸 !?'},
        {key:"3",name:'Mochi',message:'我不是麻糬 = ='},
    ]

const messageReducer = ( state = message, action ) => {
    switch(action.type) {
        case 'addMessage':
            return [ ...message, action.payload ];
        default:
            return state;
    }
}

export default messageReducer