const express = require("express");
const config = require('config');
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/betslip", require("./routes/betslip"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} !`);
});
