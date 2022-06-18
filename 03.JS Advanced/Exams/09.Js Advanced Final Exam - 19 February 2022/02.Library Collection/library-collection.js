class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length === this.capacity) {
            throw new Error('Not enough space in the collection.');
        }

        this.books.push({
            bookName,
            bookAuthor,
            payed: false
        });

        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook(bookName) {
        let bookIndex = this.books.findIndex(el => el.bookName === bookName);
        if (bookIndex === -1) {
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (this.books[bookIndex].payed) {
            throw new Error(`${bookName} has already been paid.`);
        }

        this.books[bookIndex].payed = true;
        return `${bookName} has been successfully paid.`;
    }

    removeBook(bookName) {
        let bookIndex = this.books.findIndex(el => el.bookName === bookName);
        if (bookIndex === -1) {
            throw new Error(`The book, you're looking for, is not found.`);
        }

        if (!this.books[bookIndex].payed) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        this.books.splice(bookIndex, 1);
        return `${bookName} remove from the collection.`;
    }

    getStatistics(bookAuthor) {
        if (!bookAuthor) {
            let books = this.books.sort((a, b) => a.bookName.localeCompare(b.bookName));
            books = books.map(el => `${el.bookName} == ${el.bookAuthor} - ${el.payed ? 'Has Paid' : 'Not Paid'}.`);
            if (books.length > 0) { books.unshift('') }
            return `The book collection has ${this.capacity - this.books.length} empty spots left.${books.join('\n')}`;
        } else {
            let books = this.books.filter(el => el.bookAuthor === bookAuthor);
            if (books.length === 0) {
                throw new Error(`${bookAuthor} is not in the collection.`);
            }
            
            books = books.map(el => `${el.bookName} == ${el.bookAuthor} - ${el.payed ? 'Has Paid' : 'Not Paid'}.`);
            return books.join('\n');
        }
    }
}