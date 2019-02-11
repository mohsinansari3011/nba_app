import React from 'react'
import style from './formfeilds.css'


const FormFeilds =({formdata,change,id}) =>{


    const showError = () =>{
        let errorMessage = null;
        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className={style.labelError}>
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }



    const renderTemplate = () =>{
        let fromTempelate = null;

        switch (formdata.element) {
            case ('input'):
                fromTempelate = (
                    <div>
                        <input {...formdata.config} value={formdata.value} 
                        onBlur={(event) => change({event,id,blur:true})}
                        onChange={(event) => change({event,id,blur:false})}
                        />
                        {showError()}
                    </div>
                )
                break;
        
            default:
            fromTempelate = null;
                break;
        }


        return fromTempelate;
    }



return(<div>
    {renderTemplate()}
</div>)
}

export default FormFeilds;
