import React, {useState} from 'react';
import axios from 'axios';
import "./login.css";
import Consumer from './loggedInContextProvider';
const api = axios.create({baseURL: 'http://localhost:3000/api'});
function Login(props)
{
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [err, setErr] = useState();
    let error = err ? <p style={{color:"red", fontSize:"10px"}}>{err}</p>:<p style={{display:"none"}}>{err}</p>
    return(
        <Consumer>
        {
            ctx => {
                return(
                <div className="login-container">
                    <img className="login-logo" src="http://localhost:3000/assets/insta-logo.png"/>
                    <form className="login-form" onSubmit={(e)=>handleSubmit(email, password, e, setErr, ctx)}>
                        <input type="text" name="email"
                            placeholder="Phone number, username, or email"
                            onChange={(e)=> setEmail(e.target.value)}/>
                        <input type="text" name="password"
                            placeholder="Password"
                            onChange={(e)=> setPassword(e.target.value)}/>
                        <input type="submit" value="Login"/>
                        {error}
                    </form>
                </div>
                );
            }
        }
        </Consumer>
    );
}
async function handleSubmit(email, password, e, setErr, ctx)
{
    e.preventDefault();
    if(email === undefined || email === "" || password === undefined || password === "")
    {
        setErr("You must provide an email or password");
    }
    else
    {
        setErr(undefined);
        const res = api.get(`/login/${email}/${password}`).then((res)=>{
            if(res.data.message === "Invalid username or password.")
            {
                setErr(res.data.message);
            }
            else
            {
                let uuid = res.data.uid;
                let uuserName = res.data.userName;
                ctx.setProfile({uid: uuid, userName: uuserName});
                ctx.setIsLogged(!ctx.loggedIn);
            }
        }, (err)=> console.log(err))
    }
}

export default Login;
