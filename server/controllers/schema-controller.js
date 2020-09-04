const User = require("../models/user-model");
const Post = require("../models/post-model");
const UserProfile = require("../models/userProfile-model");
const MongoClient = require("../db/mongoUtil");
const uuidv4 = require("../uuid");
let addUser = (req, res) => {
}
function loginUser(req, res) {
    User.findOne({email: req.params.email, password: req.params.password}, (err, foundUser)=> {
            if(err || foundUser === null)
            {
                return res.status(200).json(
                    {
                        message: "Invalid username or password."
                    }
                );
            }
            else
            {
                return res.status(200).json({
                    uid: foundUser.uid,
                    userName: foundUser.userName
                });
            }
        }
    );
}

async function getPosts(req, res)
{
    const body = req.body;
    const uid = req.params.uid;
    MongoClient.connectToServer( function( err, client ) {
        if (err) console.log(err);
        const db = MongoClient.getDb();
        db.collection("userProfile").findOne({u_uid: uid}, (err, foundProfile)=> {
            if(err || foundProfile === null)
            {
                return res.status(200).json({
                    error: err,
                    message: "No posts to be shown."
                });
            }
            else
            {
                retrievePosts(db, foundProfile).then((it)=> {
                    return res.status(200).json({
                      retrievedPosts: it
                    })
                });
            }
        });
    });
}

async function retrievePosts(db, foundProfile)
{
    let followings = foundProfile.followings;
    let posts = [];
    let currentUserPosts = await db.collection("post").find({useruid:foundProfile.u_uid}).toArray().then((itr) => {
        posts.push(...itr);
    });
    for(let i = 0; i < followings.length; i++)
    {
        let retrievedPosts = await db.collection("post").find({useruid:followings[i]}).toArray().then((itr)=>{
            posts.push(...itr);
        });
    }
    console.log(posts);
    return posts;
}
module.exports = {addUser, loginUser, getPosts};
