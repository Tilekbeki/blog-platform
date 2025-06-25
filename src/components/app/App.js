import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import { ArticlePage, ArticlesPage, LoginPage, RegisterPage, EditProfilePage } from "../pages";
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
          path="/sign-in"
          element={
            <LoginPage/>
          }
        />

        <Route path="/sign-up" element={<RegisterPage />} />
         <Route path="/profile" element={<EditProfilePage />} />
      </Routes>
    </Router >
  )
}

export default App;