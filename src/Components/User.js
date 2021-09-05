import React from 'react'


const User = (props) =>{


    return (
        <div className="user">
            {props.User.map((everyUser) => (
               
             <div className="show" >
                 
             <h3>Name: {everyUser.name}</h3>
             <h3>Email :{everyUser.email}</h3>
             
        </div>

))}
   
        </div>
        
    )
}
export default User;
