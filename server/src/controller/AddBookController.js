import Book from "../models/AddBook.js";

// Create Book
const addBook = async (req, res) => {
  try {
    const { title, author, description, year, photo } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    const book = await Book.create({
      title,
      author,
      description,
      year,
      photo,
      user: req.user._id,
    });
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user._id });
  res.json(books);
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description = req.body.description || book.description;

    const updatedBook = await book.save();
    return res.json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    console.debug('DeleteBook request params.id =', req.params.id);
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.deleteOne();
    return res.json({ message: "Book removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addBook, getBooks, updateBook, deleteBook };
