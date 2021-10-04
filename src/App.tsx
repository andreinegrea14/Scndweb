import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductList from './pages/product-list';
import { AddProduct } from './pages/add-product';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RerenderContext = createContext<{rerender?: boolean, setRerender(value: boolean): void}>({
  setRerender() {}
});

function App() {
  const [rerender, setRerender] = useState(false);
  return (
    <Router>
      <RerenderContext.Provider value = {{rerender, setRerender}}>
    <div className="App">
        <Switch>
              <Route exact path='/' component={ProductList} />
              <Route path='/addproduct' component={AddProduct} /> 
        </Switch>
    </div>
    </RerenderContext.Provider>
    </Router>
    
  );
}

export default App;
