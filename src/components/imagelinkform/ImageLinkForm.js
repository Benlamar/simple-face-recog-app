import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(<div>
        <p className='f4 tc' >
            {'This magic rain will detect face'}
        </p>
        <div className='center'>
            <div className='form center shadow-5 br3 pa4 '>
                <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                <button className='w-30 center grow f4 link ph5 pv2 white
                bg-light-purple' onClick={onButtonSubmit}>
                    {'Detect'}
                </button>
            </div>
        </div>
    </div>);
}


export default ImageLinkForm;