import Book from "../models/AddBook.js";

// Create Book
const addBook = async (req, res) => {
  const { title, author, description } = req.body;

  const book = await Book.create({
    title,
    author,
    description,
    user: req.user._id,
  });

  res.status(201).json(book);
};

// Get All Books
const getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user._id });
  res.json(books);
};

// Update Book
const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.description = req.body.description || book.description;

  const updatedBook = await book.save();
  res.json(updatedBook);
};

// Delete Book
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();
  res.json({ message: "Book removed" });
};

export { addBook, getBooks, updateBook, deleteBook };
