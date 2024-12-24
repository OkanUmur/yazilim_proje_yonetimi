import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import MainScreen from './Pages/MainScreen/MainScreen';
import SalesScreen from './Pages/SalesScreen/SalesScreen';
import PaymentScreen from './Pages/PaymentScreen/PaymentScreen';
import Receipt from './Pages/RecieptPage/Reciept';
import ShowPricePage from './Pages/ShowPricePage/ShowPricePage';
import ReturnOrderPage from './Pages/ReturnOrderPage/ReturnOrderPage';
import ReturnReciept from './Pages/RecieptPage/RetrunReciept';
import Setings from './Pages/SetingsPage/Setings';







function App() {

  

  return (
    <div className={`App`} >
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/main' element={<MainScreen/>}/>
    <Route path='/sales' element={<SalesScreen/>}/>
    <Route path='/payment' element={<PaymentScreen/>}/>
    <Route path='/reciept' element={<Receipt/>}/>
    <Route path='/showprice' element={<ShowPricePage/>}/>
    <Route path='/setTings' element={<Setings/>}/>
    <Route path='returnorder' element={<ReturnOrderPage/>}/>
    <Route path='/returnreciept/:id' element={<ReturnReciept/>}/>
   
  </Routes> 
         
    </div>
  );
}

export default App;
