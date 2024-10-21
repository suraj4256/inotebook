const connetToMongo = require("./db");
const express = require("express");
const cors = require('cors');
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);


connetToMongo().then(app.listen(port,()=>{
console.log(`Listening to port ${port}`)
}))

