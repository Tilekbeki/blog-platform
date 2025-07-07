import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import { ArticlePage, ArticlesPage, LoginPage, RegisterPage, EditProfilePage, NewArticlePage,EditArticlePage } from "../pages";
import './App.scss';
import { Provider } from "react-redux";
import store from "../store/store";
import withAuthProtection from "../hoc/withAuthProtection";

const App = () => {

  const ProtectedEditProfilePage = withAuthProtection(EditProfilePage);
  const ProtectedNewArticlePage = withAuthProtection(NewArticlePage);
  const ProtectedEditArticlePage = withAuthProtection(EditArticlePage);


  return (
    <Router><Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article" element={<ArticlePage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route
          path="/sign-in"
          element={
            <LoginPage/>
          }
        />

        <Route path="/sign-up" element={<RegisterPage />} />
         <Route path="/profile" element={<ProtectedEditProfilePage/>} />
         <Route path='/new-article' element={<ProtectedNewArticlePage />}/>
         <Route path='/articles/:article/edit' element={<ProtectedEditArticlePage />}/>
      </Routes></Provider>
    </Router >
  )
}

export default App;