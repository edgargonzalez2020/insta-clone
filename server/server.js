const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const mkdirp = require('mkdirp');
const app = express()
const db = require('./db')
const apiPort = 3000
const router = require("./routes/routes");
const path = require('path');
const MongoClient = require("./db/mongoUtil");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload());
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use('/api', router);
app.get("/image/:uid/:name",(req,res)=>{
    res.sendFile(`/images/${req.params.uid}/` + req.params.name, {root: "./public/"});
});
app.get("/assets/:name",(req,res)=>{
    res.sendFile(`/assets/${req.params.name}`,{root: "./public/"});
});
app.post('/upload/:uid', (req, res)=> {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const myFile = req.files.file;
    mkdirp(`${__dirname}/public/images/${req.params.uid}/`, function(err) {
        // path exists unless there was an error
    });
    myFile.mv(`${__dirname}/public/images/${req.params.uid}/${myFile.name}`, (err) => {
        if(err)
        {
            console.log(err);
            return res.status(500).send({ msg: "Error occured" });
        }
        MongoClient.connectToServer(function(err, client) {
            if(err) console.log(err);
            const db = MongoClient.getDb();
            db.collection('post').insert({useruid: req.params.uid, uuid: "2", caption: "new caption", image: myFile.name, comments:[], userName: "yo_girl" });
        });
        return res.send({name: myFile.name, path: `/image/${myFile.name}`});
     });
});
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
module.exports = app;
