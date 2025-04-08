# Language Flashcards Application

## Project Overview
This is a complete Express.js/Node.js flashcard language learning application developed for the Web Technology module coursework. It provides a simple yet effective way to create, manage, and review language flashcards through a clean web interface.

## Features
- **Complete CRUD Operations**:
  - Create new flashcards with term, definition, and language
  - Read/view all flashcards in an interactive grid
  - Update existing flashcard information
  - Delete unwanted flashcards
- **Form Validation**:
  - Input validation using express-validator
  - Prevention of duplicate terms within the same language
  - Required field validation
- **Interactive UI**:
  - Flip-style flashcards for learning
  - Responsive design that works on mobile and desktop
  - Custom CSS styling
- **JSON Data Storage**:
  - No database required - all data is stored in JSON files

## Technologies Used
- **Node.js & Express.js**: Backend framework
- **Pug**: Templating engine
- **express-validator**: Form validation
- **method-override**: Support for PUT and DELETE requests
- **connect-flash**: Flash messages for user feedback
- **express-session**: Session management
- **Custom CSS**: No frameworks, fully custom styling

Visit `https://flashcardwiut.onrender.com/flashcards` in your browser

## Routes
- **GET /flashcards**: View all flashcards
- **GET /flashcards/new**: Display create form
- **POST /flashcards**: Create a new flashcard
- **GET /flashcards/:id/edit**: Display edit form
- **PUT /flashcards/:id**: Update a flashcard
- **DELETE /flashcards/:id**: Delete a flashcard

## Data Model
Each flashcard has the following properties:
- **id**: Unique identifier (UUIDv4)
- **term**: The word or phrase to learn
- **definition**: The meaning or translation
- **language**: The language of the term
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update

## Project Requirements
This application was created to fulfill Web Technology module's requirements and does not represent an actual company or service. It demonstrates competency in:
- Express.js/Node.js usage
- JSON file storage implementation
- CRUD operations with proper validation
- Route grouping
- Pug template engine
- Clean, responsive UI design with custom CSS

## Deployment
Used Render services to deploy

Elbek Makhmudov 
00021960
