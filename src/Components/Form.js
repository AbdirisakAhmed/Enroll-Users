import React, {useState} from 'react';
import axios from 'axios'
import * as yup from 'yup';

    const Form =  (props) => {
        const initialData = {
            name: "",
            email: "",
            password: "",
            terms:false
        }
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
 

//    Crate HandlleChange Funtion
    const handleChange = (event) => {
        const inputData = {...formData, 
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value}
            
            handleValidationChange(event)
            setFormData(inputData)
    }

    //Crate HnadleSubmit Funtion
    const handleSubmit = (event) => {
        event.preventDefault()
       
    axios.post("https://reqres.in/api/users", formData)
    .then((res) => {
      console.log(res.data)
        
      props.addNewUser(formData)
      setFormData(initialData)
    })
    .catch((err) => console.log(err))
    }
    
    //Form Validation
    let schema = yup.object().shape({
        name: yup.string().required("Empty Feild Not Allowed"),
        email: yup.string().email("Enter Valid Email").required("Invalid Email"),
        password: yup.string().required("Empty Feild Not Allowed"),
        terms: yup.boolean().oneOf([false], "Must Accept Terms of Service")

    })

//Create That Controls the Changes of Form
    const handleValidationChange = (event) => {
        yup
        .reach(schema, event.target.name)
        .validate(event.target.value)
        .then((valid) => {
          setErrors({...errors, [event.target.name]: ""})
        })
        .catch((err) => {
          setErrors({...errors, [event.target.name]: err.errors[0]})
        })
    }
    return (
        <div>
        <div className="main">
            <h3>Fill This Form </h3>
       <form onSubmit={handleSubmit} >
           <label >
               Name:</label >
                <input type="text"
                 name="name"
                 value={formData.name}
              onChange={handleChange} />
             {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
           <label>
               Email:
                <input type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}   />
                 {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
           </label>

           <label>
               Password:
                <input type="password" 
                name="password"
                value={formData.password} 
                onChange={handleChange}  />
             {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
           </label>

           <label className="terms">
                <input  type="checkbox"
            name="terms"
            value={formData.terms} 
          onChange={handleChange} />
          Terms and Conditions
                {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
           </label>
    

           <button type="submit">Submit</button>

       </form>
      </div>

      
    
   </div>
    )
  }

export default Form;