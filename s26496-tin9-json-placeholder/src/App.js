import './App.css';
import Posts from './Posts';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import PostsForm from './PostsForm';
import PostsDetails from './PostsDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar/>
          <Routes>
            <Route path="/" element={<Posts/>}/>
            <Route path="/add" element={<PostsForm/>}/>
            <Route path="/posts/:id" element={<PostsDetails/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
          </header>
    </div>
    </Router>
  );
}

export default App;
