import React, { Component, createContext, useState } from "react";
const {Provider, Consumer} = createContext();

function LoggedInContextProvider(props)
{
    const [login, setLogin] = useState(false);
    const [profile, setProfile] = useState();
    return (
        <Provider value={{
                loggedIn: login,
                profile: profile,
                setIsLogged: ()=>setLogin(!login),
                setProfile: (val)=> {
                    for(let p in val)
                    {
                        let temp = {uid: val["uid"], userName: val["userName"]};
                        setProfile(temp);
                    }
                }
            }}>
            {props.children}
        </Provider>
    );
}
export { LoggedInContextProvider };

// I make this default since it will probably be exported most often.
export default Consumer;
