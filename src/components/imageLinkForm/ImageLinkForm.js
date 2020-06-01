import React, {useState} from 'react';
import './imagelink.css'


const ImageLinkForm = ({onInputChange, onSubmit}) => {
const [img, setImg]=useState('')
const [load, setLoad]=useState(false)
    let loade;
    const image=(e)=>{
        const pictureUrl = e.target.files[0]
    }
    const  upload =async(e)=>{
        const file = e.target.files[0]
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'muse_img')
        setLoad(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/muse1/image/upload',
        {
            method:'POST',
            body: data
        })

        const picture = await res.json()
        setImg(picture.secure_url)
        setLoad(false)
        console.log(img)
    }
    const show =()=>{
        upload()
        loade.click()
    }
    return (
        <div>
            <p className='f3'>This Magic Brain will detect faces in your pictures.
                Give it a try 
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-2'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <input type='file' ref={(upl)=>{loade = upl}} style={{display:'none'}} onChange={upload} />
                <button onClick={upload} >upload</button>
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