import React from 'react';
import './imagelink.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='f3'>This Magic Brain will detect faces in your pictures.
                Give it a try 
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-2'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button 
                onClick={onSubmit}
                    className='w-30 grow link ph3 pv2 dib white bg-light-purple'>
                    Detect
                </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;