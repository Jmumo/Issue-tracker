import {combineReducers} from 'redux';
import repositoriesReducer from './reporeducer';


const reducers = combineReducers({
    repositories: repositoriesReducer
})

export default reducers;