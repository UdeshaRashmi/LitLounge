import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BookList from './pages/Books/BookList';
import BookDetails from './pages/Books/BookDetails';
import AddBook from './pages/Books/AddBook';
import Create from './pages/Create';
import ReadingList from './pages/ReadingList';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/create" element={<Create />} />
              <Route path="/reading-list" element={<ReadingList />} />
              <Route path="/books/add" element={<AddBook />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/books/:id/edit" element={<AddBook />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;