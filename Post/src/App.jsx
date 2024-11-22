import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostList from './conponents/PostList'
import CreatePost from './conponents/CreatePost'
import EditPost from './conponents/EditPost'
import Login from './conponents/Login'
import Signup from './conponents/Signup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  )
}

export default App