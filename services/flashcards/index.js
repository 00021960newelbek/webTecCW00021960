const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../../data/flashcards.json');

async function readFlashcards() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT' || err.message.includes('Unexpected end of JSON input')) {
            return [];
        }
        throw err;
    }
}

async function writeFlashcards(flashcards) {
    try {
        await fs.writeFile(filePath, JSON.stringify(flashcards, null, 2), 'utf8');
    } catch (err) {
        throw new Error(`Failed to write flashcards data: ${err.message}`);
    }
}

const flashcardsService = {
    async getAll() {
        return await readFlashcards();
    },

    async getById(id) {
        const flashcards = await readFlashcards();
        const flashcard = flashcards.find(card => card.id === id);
        
        if (!flashcard) {
            throw new Error(`Flashcard with ID ${id} not found`);
        }
        
        return flashcard;
    },

    async create(flashcardData) {
        const flashcards = await readFlashcards();
        
        const isDuplicate = flashcards.some(card => 
            card.term.toLowerCase() === flashcardData.term.toLowerCase() && 
            card.language.toLowerCase() === flashcardData.language.toLowerCase()
        );
        
        if (isDuplicate) {
            throw new Error(`A flashcard with term "${flashcardData.term}" in ${flashcardData.language} already exists`);
        }
        
        const newFlashcard = {
            id: uuidv4(),
            ...flashcardData,
            createdAt: new Date().toISOString()
        };
        
        flashcards.push(newFlashcard);
        await writeFlashcards(flashcards);
        
        return newFlashcard;
    },

    async update(id, flashcardData) {
        const flashcards = await readFlashcards();
        const index = flashcards.findIndex(card => card.id === id);
        
        if (index === -1) {
            throw new Error(`Flashcard with ID ${id} not found`);
        }
        
        const isDuplicate = flashcards.some(card => 
            card.id !== id &&
            card.term.toLowerCase() === flashcardData.term.toLowerCase() && 
            card.language.toLowerCase() === flashcardData.language.toLowerCase()
        );
        
        if (isDuplicate) {
            throw new Error(`A flashcard with term "${flashcardData.term}" in ${flashcardData.language} already exists`);
        }
        
        const updatedFlashcard = {
            ...flashcards[index],
            ...flashcardData,
            updatedAt: new Date().toISOString()
        };
        
        flashcards[index] = updatedFlashcard;
        await writeFlashcards(flashcards);
        
        return updatedFlashcard;
    },

    // Remove 
    async remove(id) {
        const flashcards = await readFlashcards();
        const index = flashcards.findIndex(card => card.id === id);
        
        if (index === -1) {
            throw new Error(`Flashcard with ID ${id} not found`);
        }
        
        const removedFlashcard = flashcards[index];
        flashcards.splice(index, 1);
        await writeFlashcards(flashcards);
        
        return removedFlashcard;
    }
};

module.exports = flashcardsService;