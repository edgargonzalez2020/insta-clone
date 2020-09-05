import React, {useState, useRef} from 'react';
import axios from 'axios';
import Consumer from './loggedInContextProvider';
import './createnewpost.css';
function CreateNewPost(props)
{
    const [file, setFile] = useState();
    const [data, getFile] = useState({ name: "", path: "" });
    const [caption ,setCaption] = useState();
    const el = useRef();
    return(
        <div className="createpost-container">
            <Consumer>
            {
                ctx => {
                    return(
                        <div className="createpost">
                            <div className="createpost-top">
                                <i class="fas fa-times fa-2x" onClick={()=> {props.setRenderPostBox(!props.renderPostBox)}}></i>
                                <h1> Create Post </h1>
                            </div>
                            <div className="select-photo">
                                <input type="file" ref={el} onChange={(e)=> handleChange(e, setFile)} />
                            </div>
                            {
                            // <div className="choose-photo">
                            //     <input id="myInput" type="file" ref={(ref) => setPictureFile(ref)} style={{ display: 'none' }} />
                            //     <i class="far fa-images fa-7x"></i>
                            // </div>
                            }
                            <textarea className="post-caption" maxLength="2200" onChange={(e) => setCaption(e.target.value)}/>
                            {
                                //TODO: We need to fix this button later max sure it sits on the
                                //bottom of the container
                            }
                            <button onClick={()=> {uploadFile(file, ctx, caption); props.setRenderPostBox(!props.renderPostBox);}}> Post </button>
                        </div>
                    );
                }
            }
            </Consumer>
        </div>
    );
}

function handleChange(e, setFile)
{
    const file = e.target.files[0];
    setFile(file);
}
function uploadFile(file, ctx, caption)
{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('useruid', ctx.profile.uid);
    formData.append('caption', caption);
    formData.append('userName', ctx.profile.userName);
    axios.post(`http://localhost:3000/upload/`, formData, {
        //set progress
    }).then((res)=>{
        //set picture on dom
        console.log(res);
    }).catch((err)=> console.log(err));
}

export default CreateNewPost;
