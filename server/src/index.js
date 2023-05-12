
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routers/route");
const  mongoose  = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect(
  "mongodb+srv://kimmi_kumari:kimmi@cluster0.mfdc6.mongodb.net/kimmi-DOTSNEKY?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
)
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err));


app.use('/', route);


app.listen(process.env.PORT || 3004, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3004))
});