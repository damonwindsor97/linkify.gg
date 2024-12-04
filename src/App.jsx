import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Down from './pages/Down'

import './App.css'

import PrivacyPolicy from './pages/PrivacyPolicy'

import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index path="/" element={<Home/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App
