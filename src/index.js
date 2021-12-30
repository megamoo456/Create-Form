import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Field, ErrorMessage, withFormik } from 'formik';


import * as Yup from 'yup';

const CustomInput = ({ field, form, ...props }) => {
    return (
        <div className="form-group">
            <label>{ props.displayname ? props.displayname : field.name }</label>
            <input { ...field } { ...props }  className="form-control"/>
        </div>
    )
}

const CustomError = props => {
    return (
        <div className="text-danger">{ props.children }</div>
    )
}

class App extends Component {
   
    render () {
        const {  isSubmitting, handleSubmit,handleReset } = { ...this.props }
        return (
            <div className="container-fluid p-5 bg-light d-flex flex-column justify-centent-center align-items-center">
                <form  onSubmit={ handleSubmit } className="bg-white border p-5 d-flex flex-column">
               
                <Field name="name"   placeholder="name"
                    component={ CustomInput } /> 
                <ErrorMessage name="name" component={ CustomError } />
                <Field name="email" type="email"   placeholder="Email"
                       component={ CustomInput } />
                <ErrorMessage name="email" component={ CustomError } /> 
                <Field name="password"  placeholder="password"
                       type="password" component={ CustomInput } />
                <ErrorMessage name="password" component={ CustomError } />
               
                <button type="submit" className=" my-3 btn btn-small btn-primary" disabled={ isSubmitting }>Valider</button>
                <button type="button" className=" my-3 btn btn-small btn-danger" onClick={handleReset}>Annuler</button>

                </form>
            </div>     
        );
    }
}

const MyForm = withFormik({
    mapPropsToValues: () => ({ name: '', email: '', password: '' }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Too Short').max(7, 'Too Long').required('required'),
        email: Yup.string().email('Wrong Email').required('required'),
        password: Yup.string().min(5, 'Too Short')
    }),
    // this is when the submit button onClick
    handleSubmit: (values, actions) => {
        actions.setSubmitting(false);  
        actions.resetForm();
        alert("Form is validated !");
    }
})(App)



ReactDOM.render(<MyForm />, document.getElementById('root'));

