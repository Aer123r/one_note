const initState = '在此处编辑'
function contentReducer (prevState=initState,action){
    const {type,data} = action
    switch (type){
        case 'update':
            return data;
        default:
            return prevState;
    }
}
export default contentReducer
