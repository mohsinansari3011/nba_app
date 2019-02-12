import React, { Component } from 'react';
import style from './dashboard.css'
import FormFeild from '../widgets/FormFeilds/formfeilds';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState , convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';

import { firebaseTeams } from '../../fireabase';
import Uploader from '../widgets/FileUploader/fileuploader'

class Dashboard extends Component {

    state ={
    editorState : EditorState.createEmpty(),
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
         }, body: {
             element: 'texteditor',
             value: '',
             valid: true,
           
         }, image: {
             element: 'image',
             value: '',
             valid: true,

         },
         teams: {
                 element: 'select',
                 value: '',
                 config: {
                     name: 'teams_input',
                    options:[]
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


    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        if(content === ''){
        newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }
        

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


onEditorStateChange =(editorState) =>{

        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);

        this.updateForm({id:'body'},html)
    this.setState({
        editorState
    })
}

componentDidMount(){
    this.loadTeams();
}

loadTeams = () =>{
    firebaseTeams.once('value')
    .then((snapshot) =>{
        let teams = [];
        snapshot.forEach((childsnapshot) =>{
            teams.push({
                id:childsnapshot.val().teamId,
                name : childsnapshot.val().city
            })
        })

        const newFormdata = {...this.state.formdata};
        const newElement = {...newFormdata['teams']};
        newElement.config.options = teams;
        newFormdata['teams'] = newElement;

        this.setState({
            formdata : newFormdata
        })
       
    })
}
 

storeFilename = (filename) =>{
 this.updateForm({id:'image'},filename)
}


    render() {
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                <h2>Add Post</h2>


                <Uploader filename={ (filename)=>this.storeFilename(filename) }/>

                 <FormFeild id={'author'} formdata={this.state.formdata.author} 
            change={(element)=>this.updateForm(element)} />
             <FormFeild id={'title'} formdata={this.state.formdata.title} 
            change={(element)=>this.updateForm(element)} />

            <Editor editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName = "myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
            />

             <FormFeild id={'teams'} formdata={this.state.formdata.teams} 
            change={(element)=>this.updateForm(element)} />

            {this.submitButton() }
             {this.showError()}
                    </form>
            </div>
        );
    }
}

export default Dashboard;