import React, { Component } from 'react';
import FormFeild  from './../widgets/FormFeilds/formfeilds'
import style from './../widgets/FormFeilds/formfeilds.css'

class SignIn extends Component {
    state = {

        registorError :'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    password: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }

    }

updateForm = (element) =>{
    const newFormdata = {
        ...this.state.formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }
    newElement.value = element.event.target.value;
    newFormdata[element.id] = newElement;


    this.setState({

        formdata: newFormdata
    })

    console.log(newFormdata)
}



    render() {
        return (
            <div className={style.logContainer}>
               <from>
                   <h2>Register/Login</h2>
            <FormFeild id={'email'} formdata={this.state.formdata.email} 
            change={(element)=>this.updateForm(element)} />
             <FormFeild id={'password'} formdata={this.state.formdata.password} 
            change={(element)=>this.updateForm(element)} />
               </from>
            </div>
        );
    }
}

export default SignIn;