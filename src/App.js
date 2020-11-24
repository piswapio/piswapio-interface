import React, {Component} from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font/Roboto-Regular.ttf'
import './css/App.css'
class App extends Component  {   
  render() {  
  return (
    <div className="main">
      <Header 
      />
    </div>
  );
}
}

export default App;
