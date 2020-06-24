const express = require("express");
let path = require("path");
let app = express();
let fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //fixes undefined error

app.use((req, resp, next) => {
  console.log(req.originalUrl);
  next();
}); //custom middleware

app.get("/", (req, res) => {
  res.send("Hello from the web server side...");
});

app.use("/static", express.static(path.join(__dirname, "../public")));

app.post("/contact-form", (req, res) => {
  //console.log(req.body)
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  fs.appendFile("./contact.json", JSON.stringify(data), () => {
    console.log("files written");
  });
});
res.redirect("/formsubmissions");

app.get("/formsubmissions", (req, res) => {
  fs.readFile("./contact.json", (err, data) => {
    res.type("text").send(data);
  });
});

app.listen(3000);
