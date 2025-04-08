const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const flashcardsController = require('./controllers/flashcards');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'flashcards-app-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    next();
});

app.get('/', (req, res) => {
    res.redirect('/flashcards');
});

app.get('/flashcards', flashcardsController.list);
app.get('/flashcards/new', flashcardsController.showCreate);
app.post('/flashcards', [
    body('term').trim().notEmpty().withMessage('Term is required'),
    body('definition').trim().notEmpty().withMessage('Definition is required'),
    body('language').trim().notEmpty().withMessage('Language is required')
], flashcardsController.create);
app.get('/flashcards/:id/edit', flashcardsController.showEdit);
app.put('/flashcards/:id', [
    body('term').trim().notEmpty().withMessage('Term is required'),
    body('definition').trim().notEmpty().withMessage('Definition is required'),
    body('language').trim().notEmpty().withMessage('Language is required')
], flashcardsController.update);
app.delete('/flashcards/:id', flashcardsController.remove);

// 404 
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

// Error 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Error', 
        message: 'Something went wrong fsdgdsff! fdsf dsfds',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;