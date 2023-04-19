import { configureStore, getDefaultMiddleware } from 'react-redux'

import monitorReducersEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from '../middleware/logger'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer, 
        middleWare: [loggerMiddleware, ...getDefaultMiddleware()],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    }

    return store;
}