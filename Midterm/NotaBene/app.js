const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Flash middleware
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
