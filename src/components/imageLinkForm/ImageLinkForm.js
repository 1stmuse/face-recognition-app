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
        // setTimeout(()=>{
        //     console.log(files[0])
        // },5000)
    }
    // const show =()=>{
    //     loade.click()
    // }
    return (
        <div>
            <p className='f3'>This Magic Brain will detect faces in your pictures.
                Give it a try 
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-2'>
                {/* <input className='f4 pa2 w-70 center' type='text' onChange={()=>pload(img)}  /> */}
                <input type='file' id='files' ref={(upl)=>{loade = upl}} style={{display:'none'}} onChange={upload} />
                <label htmlFor='files' className='f4 pa2 w-50 center bg-white'style={{marginRight:'5%'}} > upload</label>
                {/* <button onClick={show} >upload</button> */}
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