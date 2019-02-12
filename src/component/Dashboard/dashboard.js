import React, { Component } from 'react';
import style from './dashboard.css'
import FormFeild from '../widgets/FormFeilds/formfeilds';



class Dashboard extends Component {

    state ={
    postError: '',
     loading: false,
     formdata: {
         author: {
             element: 'input',
             value: '',
             config: {
                 name: 'author_input',
                 type: 'text',
                 placeholder: 'Enter your name'
             },
             validation: {
                 required: true,
             },
             valid: false,
             touched: false,
             validationMessage: ''
         }, title: {
             element: 'input',
             value: '',
             config: {
                 name: 'title_input',
                 type: 'text',
                 placeholder: 'Enter the title'
             },
             validation: {
                 required: true,
             },
             valid: false,
             touched: false,
             validationMessage: ''
         }
     }
    }


    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;

        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            //console.log(validData);
        }

        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        //console.log(newFormdata);
        this.setState({

            formdata: newFormdata
        })

        //console.log(newFormdata)
    }


    validate = (element) => {

        let error = [true, ''];

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This Feild is required' : ''}`;
            error = !valid ? [valid, message] : error;
        }

        return error;
    }


    
 submitButton = () =>{

    return(
    this.state.loading ?
     'loading...' : 
     <div>
         <button type="submit"> Add POST</button>
    </div>)
 }
submitForm = (event) =>{
    event.preventDefault();

      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formdata) {
          dataToSubmit[key] = this.state.formdata[key].value;
      }
      for (let key in this.state.formdata) {
          formIsValid = this.state.formdata[key].valid && formIsValid
      }
 console.log(dataToSubmit);
       if (formIsValid) {
        console.log('submit post');
    }else{
        this.setState({
            postError : 'Something went wrong!'
        })
       }
}

showError = () => (
    this.state.postError !== '' ?
    <div className={style.error}> 
    {this.state.postError}
    </div> : ''
)

    render() {
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                <h2>Add Post</h2>

                 <FormFeild id={'author'} formdata={this.state.formdata.author} 
            change={(element)=>this.updateForm(element)} />
             <FormFeild id={'title'} formdata={this.state.formdata.title} 
            change={(element)=>this.updateForm(element)} />

            {this.submitButton() }
             {this.showError()}
                    </form>
            </div>
        );
    }
}

export default Dashboard;