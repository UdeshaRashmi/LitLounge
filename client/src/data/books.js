export const books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    summary: 'A portrait of the Jazz Age and the disillusionment of the American Dream.'
  },
  {
    id: '2',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    summary: 'A classic novel about manners, marriage, and misunderstandings.'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    summary: 'A dystopian novel about surveillance, totalitarianism and truth.'
  }
];

export function getBooks() {
  return books;
}

export function getBookById(id) {
  return books.find((b) => String(b.id) === String(id));
}

export function addBook(data) {
  const id = String(Date.now());
  const book = { id, ...data };
  books.push(book);
  return book;
}

export function updateBook(id, data) {
  const idx = books.findIndex((b) => String(b.id) === String(id));
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...data };
  return books[idx];
}

export function deleteBook(id) {
  const idx = books.findIndex((b) => String(b.id) === String(id));
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

// Simple in-memory reading list (stores book ids)
export const readingList = [];

export function getReadingList() {
  return readingList.map((id) => getBookById(id)).filter(Boolean);
}

export function addToReadingList(bookId) {
  if (!readingList.includes(String(bookId))) {
    readingList.push(String(bookId));
    return true;
  }
  return false;
}

export function removeFromReadingList(bookId) {
  const idx = readingList.findIndex((id) => String(id) === String(bookId));
  if (idx === -1) return false;
  readingList.splice(idx, 1);
  return true;
}
