
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import CardInformationPage from './pages/CardInformationPage';
import { TransactionsPage } from './pages/TransactionsPage';
import Layout from './tsx components/Layout';

function App() {

  return (
    <BrowserRouter>
       <Routes>
       <Route path="/" element={<Layout/>}>
          <Route index element={<CardInformationPage />} />
          <Route path="transactions" element={<TransactionsPage/>} />
        </Route>
        </Routes>
        </BrowserRouter>
        
  )
}

export default App
