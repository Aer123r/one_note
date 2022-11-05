import contentReducer from './reducers/contentReducer'
import {legacy_createStore as createStore} from "redux";
export default createStore(contentReducer);

