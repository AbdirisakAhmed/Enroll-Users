import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Form from './Components/Form';
import User from './Components/User'
import Data from './Data'
function App() {

  const [newData, setNewData] = useState(Data)
 function addNewUser(oneUser) {
   const newUser = [...newData, {...oneUser}]
   setNewData(newUser)
 }

  return (
    <div className="App">
     <h1>Enroll Users</h1>
    
     <Form addNewUser = {addNewUser}/>
     <User User={newData} />
    </div>
  );
}

export default App;
