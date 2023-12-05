const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const helpers = require('./utils/helper')
const Swal = require('sweetalert2')



const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};

const app = express();
const PORT = process.env.PORT||3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false })
.then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));

});

module.exports = Swal;