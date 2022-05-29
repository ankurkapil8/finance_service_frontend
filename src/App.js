import './App.css';
import { Provider } from 'react-redux';
import { store, persistor} from './store';
import Routes from './Routes';
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          {/* <Header/> */}
          <Routes/>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
