import React from 'react';
import { withFormik, Form, Field } from 'formik';

const MemberForm = ({ status }) => {

       return (
       <Form>
              <Field name="name" 
                     type="text" 
                     placeholder="Full Name" 
                     /> 
              <Field name="email" 
                     type="email" 
                     placeholder="Email" 
                     /> 
              <Field name="password" 
                     type="password" 
                     placeholder="Password" 
                     /> 
              <Field name="terms" 
                     type="checkbox"  
                     /> 
              <button type="submit">
                     Submit
              </button>
       </Form>
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
       }
})(MemberForm);