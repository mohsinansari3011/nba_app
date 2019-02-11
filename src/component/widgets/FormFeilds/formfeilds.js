import React from 'react'
import style from './formfeilds.css'


const FormFeilds =({formdata,change,id}) =>{



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
