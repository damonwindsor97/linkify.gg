import './index.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Down from './pages/Down'


import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import StatusPage from './pages/Status'

import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index path="/" element={<Home/>} />
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/status" element={<StatusPage/>} />

        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  )
}

export default App
