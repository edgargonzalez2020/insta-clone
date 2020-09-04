import React, {useState, useLayoutEffect} from 'react';
import Navbar from './navbar';
import BottomNav from './bottomnav';
import CreateNewPost from './createnewpost';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.css";
import "./home.css";

const api = axios.create({baseURL: 'http://localhost:3000/api'});

function Home()
{
    async function getPosts()
    {
        let res = await api.get(`/user/posts/${"1"}`);
        setPosts(res.data.retrievedPosts);
        console.log(res.data.retrievedPosts);
        setLoaded(true);
    }
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState();
    const [currentComment, setCurrentComment] = useState(undefined);
    const [currentUserCommentBox, setCurrentUserCommentBox] = useState();
    const [renderPostBox, setRenderPostBox] = useState(false);
    useLayoutEffect(()=>{
        getPosts();
    }, []);
    return (
        <React.Fragment>
            <Navbar/>
            <div className="timeline">
                {
                    posts && posts.map((post, itr)=>{
                        let comments = post.comments.map((comment, i)=>{
                            return (
                                <div>
                                    <p><strong>{comment.userName}</strong>: {comment.text}</p>
                                </div>
                            );
                        })
                        return(
                            <div className="post-card">
                                <img src={`http://localhost:3000/image/${post.useruid}/${post.image}`} alt={post.caption} />
                                <div className="post-card-actions-container">
                                    <div className="post-card-actions">
                                        <i class="far fa-heart fa-lg"></i>
                                        <i class="far fa-comment-alt fa-lg"></i>
                                        <i class="far fa-envelope fa-lg"></i>
                                    </div>
                                    <p><strong> {post.userName}</strong>: {post.caption}</p>
                                    {comments}
                                    <form className="comment-form">
                                        <input type="text" className="post-add-comment" placeholder="Add a comment..." onChange={(e)=> handleCommentChage(e, setCurrentComment, post.uuid, setCurrentUserCommentBox)} id={post.useruid} onFocus={(e)=> handleOnFocus(post.uuid, setCurrentUserCommentBox,e)}/>
                                        {
                                          post.uuid == currentUserCommentBox ?
                                          <input style={{color: "#0094F6"}} type="submit" value="Post" className="comment-submit"/>:
                                          <input style={{color: "#B9E0FC"}} type="submit" value="Post" className="comment-submit"/>

                                        }
                                    </form>
                                </div>
                            </div>
                        )
                    })
                }
                {renderPostBox && <CreateNewPost setRenderPostBox={setRenderPostBox} renderPostBox={renderPostBox}/>}
            </div>
            <BottomNav setRenderPostBox={setRenderPostBox} renderPostBox={renderPostBox}/>
        </React.Fragment>
    );
}
function handleCommentChage(e, setCurrentComment,uuid, setCurrentUserCommentBox)
{
    setCurrentComment(e.target.value);
    if(e.target.value === "")
    {
      setCurrentUserCommentBox(undefined);
    }
    else
    {
      setCurrentUserCommentBox(uuid);
    }
}
function handleOnFocus(uuid, setCurrentUserCommentBox, e)
{
    if(e.target.value === "")
    {
        setCurrentUserCommentBox(undefined);
    }
    else
    {
        setCurrentUserCommentBox(uuid);
    }
}
export default Home;
