import './App.css';
import Home from './components/Home';
import {Provider} from 'react-redux';
import store from './store';

export default function App() {
    return (
        <Provider store={store}>
            <div className="container text-center">
                <Home/>
            </div>
        </Provider>
    );
};
