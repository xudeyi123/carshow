import dva from 'dva'
import router from './router'
import carshowModel from '../models/carshowModel'
import { createLogger } from 'redux-logger';

const app = dva({
    onAction: createLogger()  
});

app.model(carshowModel)

app.router(router)

app.start('#app')