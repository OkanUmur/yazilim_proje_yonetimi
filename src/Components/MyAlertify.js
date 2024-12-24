// Alert.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faExclamationTriangle,faTimesCircle} from '@fortawesome/free-solid-svg-icons';

const MyAlertify = ({ variant, children }) => {
    
const getIcon = (variant) => {
    switch (variant) {
        case 'success':
            return <FontAwesomeIcon icon={faCheckCircle}/>;
        case 'warning':
            return <FontAwesomeIcon icon={faExclamationTriangle}/>;
        case 'error':
            return <FontAwesomeIcon icon={faTimesCircle}/>;
        default:
            return null;
    }}
    return (
        <div className={`alert ${variant}`}>
            <span className="icon">{getIcon(variant)}</span>
            <span className="message">{children}</span>
        </div>
    );
};



export default MyAlertify;
/*using it
import './App.css';
import "./Styles/Alert.css"
import MyAlertify from './Components/MyAlertify';


function App() {


  return (
    <div className="App">
  <MyAlertify variant="success">
    başarılı
  </MyAlertify>
  <MyAlertify variant="warning">
    Uyarı
  </MyAlertify>
  <MyAlertify variant="error">
    Hatalı
  </MyAlertify>
        
    </div>
  );
}

export default App;

*/