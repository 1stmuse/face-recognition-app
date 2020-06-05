import React, {useState} from 'react';
import './imagelink.css'


const ImageLinkForm = ({pload, onSubmit}) => {
const [load, setLoad]=useState(false)
    let loade;
    // const image=(e)=>{
    //     const pictureUrl = e.target.files[0]
    // }
    const  upload =async(e)=>{
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'muse_img')
        setLoad(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/muse1/image/upload',
        {
            method:'POST',
            body: data
        })

        const picture = await res.json()
        pload(picture.url)
        setLoad(false)
        // setTimeout(()=>{
        //     console.log(files[0])
        // },5000)
    }

    return (
        <div>
            <p className='f3'>This Magic Brain will detect faces in your pictures.
                Give it a try 
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-2'>
                {load ? <h1>Loading ...</h1> : 
                <div className='f4 pa2 w-50 ph5 bg-white' style={{marginRight:'5%'}} >
                    <input type='file' id='files' ref={(upl)=>{loade = upl}} style={{display:'none'}} onChange={upload} />
                    <label htmlFor='files' className='f4 pa2 w-50 center' > upload</label>
                </div>}
                <button 
                onClick={onSubmit}
                    className='w-50 grow link ph3 pv2 dib white bg-light-purple'>
                    Detect
                </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;