import { Routes, Route } from "react-router-dom"
import { Container, Form } from "react-bootstrap"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import data from "./data/items.json"
import React, { useState } from "react"
function App() {
  const [ search, setSearch ] = useState('');

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </Form.Group>
        </Form>
        <Routes>
          <Route path="/store" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
