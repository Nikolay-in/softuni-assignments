import { index } from './index.js';
import { render } from './node_modules/lit-html/lit-html.js'
import { get, add, del, edit } from './api.js';
import { rows } from './rowsTemplate.js';

// Rows context
let ctx = {
    onEdit,
    onDelete,
}

// Index context
let ictx = {
    addBook,
    editBook
}

// Render index
render(index(ictx), document.body);

// Load books functionality
const loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', onLoad);

async function onLoad() {
    // Load books
    ctx.books = await get();

    // Send to template engine
    const rowsHtml = rows(ctx);

    // Insert rows into tbody
    const tbody = document.getElementsByTagName('tbody')[0];
    render(rowsHtml, tbody)
}

// Edit button functionality
function onEdit(e) {
    const editForm = document.getElementById('edit-form');

    // Switch forms
    editForm.style.display = '';
    document.getElementById('add-form').style.display = 'none';

    // Get fields
    const [id, titleField, authorField] = Array.from(editForm.querySelectorAll('input'));

    // Get author and title from row
    const row = e.target.parentElement.parentElement;
    const [title, author] = row.children;

    // Insert values in fields
    id.value = e.target.id;
    titleField.value = title.textContent
    authorField.value = author.textContent
}

// Delete button functionality
function onDelete(e) {
    if (del(e.target.id)) {
        e.target.parentElement.parentElement.remove();
    }
}

// Add book functionality
async function addBook(e) {
    e.preventDefault();
    const form = e.target;

    // Get values
    const formData = new FormData(form);

    // Check fields
    if (formData.get('title') != '' && formData.get('author') != '') {

        // Send data to api
        const data = Object.fromEntries(formData.entries());
        
        const reply = await add(data);

        // Create new book object
        const newBook = {
            author: reply.author,
            title: reply.title
        }

        // Add book to context
        ctx.books[reply._id] = newBook;

        // Rerender page with new context
        // Send to template engine
        const rowsHtml = rows(ctx);

        // Insert rows into tbody
        const tbody = document.getElementsByTagName('tbody')[0];
        render(rowsHtml, tbody)

        // Clear form
        form.reset();
    }
}

async function editBook(e) {
    e.preventDefault();
    const form = e.target;

    // Get values
    const formData = new FormData(form);

    // Check fields
    if (formData.get('title') != '' && formData.get('author') != '') {
        
        const formData = new FormData(form);
        const book = Object.fromEntries(formData.entries());

        // Send data to api
        if (await edit(book) == true) {
            ctx.books[book.id] = {
                author: book.author,
                title: book.title
            }

            // Rerender page with new context
            // Send to template engine
            const rowsHtml = rows(ctx);

            // Insert rows into tbody
            const tbody = document.getElementsByTagName('tbody')[0];
            render(rowsHtml, tbody)
        }

        form.reset();
        // Switch forms
        form.style.display = 'none';
        document.getElementById('add-form').style.display = '';
    }
}