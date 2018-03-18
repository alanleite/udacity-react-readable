import { combineReducers } from 'redux'

import views from './views'
import entities from './entities'
import app from '../../components/app/reducers'

export default combineReducers({
    app, views, entities
})