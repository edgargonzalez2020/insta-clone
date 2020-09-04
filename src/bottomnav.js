import React, {useState} from 'react';
import './bottomnav.css'
import "@fortawesome/fontawesome-free/css/all.css";


function BottomNav(props)
{
    return(
      <div className="bottomnav-container">
            <div className="post-submit" onClick={()=> handlePostSubmit(props.renderPostBox,props.setRenderPostBox)}>
                <i class="fas fa-plus fa-lg"></i>
            </div>
      </div>
    );
}

function handlePostSubmit(renderPostBox, setRenderPostBox)
{
    setRenderPostBox(!renderPostBox);
}
export default BottomNav;
