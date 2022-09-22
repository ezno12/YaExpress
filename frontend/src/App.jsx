import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Brand from "./pages/Brand";
import Checkout from "./pages/Checkout";
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';


const App = () => {
  const user = localStorage.getItem('user');
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products/:category" exact component={ProductList} />
        <Route path="/products/brand/:brand" exact component={Brand} />
        <Route path="/product/:id" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/wishlist" exact component={WishList} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/login" exact component={Login} >
        {user ? <Redirect to = "/" />: <Login />}</Route>
        <Route path="/REGISTER" exact component={Register } />
        {user ? <Redirect to = "/" />: <Register />}
      </Switch>
    </Container>
  </BrowserRouter>

    
  );
};

export default App;
