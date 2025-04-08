const { validationResult } = require('express-validator');
const flashcardsService = require('../../services/flashcards');

const flashcardsController = {
    // all flashcards
    async list(req, res) {
        try {
            const flashcards = await flashcardsService.getAll();
            res.render('flashcards', {
                title: 'Flashcards',
                flashcards
            });
        } catch (error) {
            req.flash('error_msg', `Error fetching flashcards: ${error.message}`);
            res.redirect('/');
        }
    },

    // create form
    showCreate(req, res) {
        res.render('addFlashcard', {
            title: 'Add New Flashcard'
        });
    },

    // new flashcard
    async create(req, res) {
        // validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).render('addFlashcard', {
                title: 'Add New Flashcard',
                formData: req.body,
                errors: errors.array()
            });
        }

        try {
            const { term, definition, language } = req.body;
            await flashcardsService.create({ term, definition, language });
            
            req.flash('success_msg', 'Flashcard created successfully');
            res.redirect('/flashcards');
        } catch (error) {
            req.flash('error_msg', error.message);
            res.render('addFlashcard', {
                title: 'Add New Flashcard',
                formData: req.body
            });
        }
    },

    //  edit 
    async showEdit(req, res) {
        try {
            const flashcard = await flashcardsService.getById(req.params.id);
            res.render('editFlashcard', {
                title: 'Edit Flashcard',
                flashcard
            });
        } catch (error) {
            req.flash('error_msg', error.message);
            res.redirect('/flashcards');
        }
    },

    // update 
    async update(req, res) {
        // validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).render('editFlashcard', {
                title: 'Edit Flashcard',
                flashcard: {
                    id: req.params.id,
                    ...req.body
                },
                errors: errors.array()
            });
        }

        try {
            const { term, definition, language } = req.body;
            await flashcardsService.update(req.params.id, { term, definition, language });
            
            req.flash('success_msg', 'Flashcard updated successfully');
            res.redirect('/flashcards');
        } catch (error) {
            req.flash('error_msg', error.message);
            res.render('editFlashcard', {
                title: 'Edit Flashcard',
                flashcard: {
                    id: req.params.id,
                    ...req.body
                }
            });
        }
    },

    // delete
    async remove(req, res) {
        try {
            await flashcardsService.remove(req.params.id);
            req.flash('success_msg', 'Flashcard removed successfully');
        } catch (error) {
            req.flash('error_msg', error.message);
        }
        res.redirect('/flashcards');
    }
};

module.exports = flashcardsController;