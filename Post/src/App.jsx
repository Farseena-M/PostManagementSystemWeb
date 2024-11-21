import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostList from './conponents/PostList'
import CreatePost from './conponents/CreatePost'

const App = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        </Routes>
    </div>
  )
}

export default App