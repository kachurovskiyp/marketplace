const express = require('express');
const path = require('path');
const cors = require('cors');
const connectiondb = require('./db/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const configure = require('./utils/configure');

const app = express();

if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: [configure.clientServerURI],
      credentials: true,
    })
  );
} else {
	app.use(cors());
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname + '/client/build')));
app.use(express.static(path.join(__dirname + '/public/upload')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'xcs343',
  store: MongoStore.create({ mongoUrl: configure.dbServerURI }),
	cookie: {
		httpOnly: false,
		maxAge: 30000,
		sameSite: 'none',
		secure: process.env.NODE_ENV == 'production',
	},
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', require('./routes/auth.routes.js'));
app.use('/api', require('./routes/ad.routes.js'));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

connectiondb();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;