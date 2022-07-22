import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const MemberForm = ({ errors, touched, status }) => {

       const [members, setMembers] = useState([]);

       useEffect(() => {
              if (status) {
                     setMembers([...members, status])
              }
       }, [status])

       return (
       <>
              <Form>
                     {touched.name && errors.name && <p className="error">{errors.name}</p>}
                     <Field name="name" 
                            type="text" 
                            placeholder="Full Name" 
                            /> 
                     {touched.email && errors.email && <p className="error">{errors.email}</p>}
                     <Field name="email" 
                            type="email" 
                            placeholder="Email" 
                            /> 
                     {touched.password && errors.password && <p className="error">{errors.password}</p>}
                     <Field name="password" 
                            type="password" 
                            placeholder="Password" 
                            /> 
                     {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
                     <Field name="terms" 
                            type="checkbox"  
                            /> 
                     <button type="submit">
                            Submit
                     </button>
              </Form>
              {members.map(member => {
                     return ( 
                     <div key={member.email}>
                           <p>{member.name}</p> 
                           <p>{member.email}</p>
                     </div>
              )})}
       </>
       )
}

export default withFormik({
       mapPropsToValues: (values) => {
              return {
                     name: values.name || '',
                     email: values.email || '',
                     password: values.password || '',
                     terms: values.terms || false
              }
       },
       validationSchema: yup.object().shape({
              name: yup.string().required("Name is required."),
              email: yup.string().required("Email is required."),
              password: yup.string().required("Password is required."),
              terms: yup.boolean().oneOf([true], "You must agree to the terms & conditions.")
       }),
       handleSubmit: (values, {setStatus}) => {
              axios.post('https://reqres.in/api/users', values)
              .then(response => {
                     setStatus(response.data)
                     console.log("res", response.data)
              })
              .catch(err => {
                     console.log("Error:", err)
              })
       }
})(MemberForm);