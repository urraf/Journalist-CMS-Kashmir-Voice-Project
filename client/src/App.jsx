import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import { FooterComponent } from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import ScrollToTop from './components/ScrollToTop'
import PostPage from './pages/PostPage'
import Search from './pages/Search'
import Contact from './components/Contact'
import "@fontsource/eb-garamond";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/400-italic.css";
import Admin from './pages/Admin'
import Article from './pages/Article'
import BackgroundAnimation from './components/BackgroundAnimation'
import MouseGlow from './components/MouseGlow'

const App = () => {
  return (
  <div className="relative">
    <MouseGlow />
    <BackgroundAnimation />
    <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path='/article' element={<Article/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute/>}>
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <FooterComponent/>
    </div>
  )
}

export default App