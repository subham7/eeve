const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const compression = require("compression")

var app = express()
var port = process.env.PORT || 8088
var val = 0

app.use(compression())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/getValue", (req, res) => {
  console.log(`/getValue - value: ${val}`)
  res.status(200).json({ value: val })
})

app.get("/changeValue/:value", (req, res) => {
  console.log(`/changeValue - value: ${val}`)
  val = req.params.value
  res.status(200).json({val})
})

app.get("/test", (req, resp) => {
  resp.sendFile(path.join(__dirname, "public", "test.html"))
})

app.get("/privacy", (req, resp) => {
  resp.sendFile(path.join(__dirname, "public", "privacy.html"))
})

app.listen(port, () => {
  console.log(`Server started at ${port}`)
})
