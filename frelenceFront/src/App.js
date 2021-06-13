import React, { useEffect } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App () {  

  const [role,setRole] = React.useState('user')
  useEffect(() => {
    setRole(localStorage.getItem('role'))
  })
  function lgout () {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }
 
    return (
  
        <Router >
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
             
              <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"

              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className="navbar-menu">
                <Link to="/products" className="navbar-item">
                  Products
                </Link>

                
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                    </Link>
               
        
                <Link to="/register" className="navbar-item">
                  Register
                 
                </Link>
               
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>

                  <Link to="/products" className="navbar-item" onClick={lgout}>
                  logout
                  </Link>
               
                
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/cart" component={Cart} /> */}
              <Route exact path='/register' component ={Register} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
          <ToastContainer />
        </Router>
    

    );
  
}
