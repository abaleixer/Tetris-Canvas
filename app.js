const express = require("express");
const app = express();
app.use(express.static(__dirname));

const d = app.listen(2000,()=>{
    console.log("iniciado "  + "http://localhost:2000");
}); 