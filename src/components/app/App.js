import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import { ArticlePage, ArticlesPage, LoginPage, RegisterPage } from "../pages";
import './App.scss';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route
          path="/login"
          element={
            <LoginPage/>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router >
  )
}

export default App;