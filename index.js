const express = require("express");
const { connectToMongoDB } = require("./connect");
//models
const URL = require("./models/url");

//Routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user")

const app = express();

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
    console.log("Mongodb connected")
);
app.set('view engine', "ejs");
app.set('views', 'views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);
app.use('/test', async(req, res) => {
    const allUrls = await URL.find();
    return res.render('home', { urls: allUrls });
});
app.get("/redirecturl/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));