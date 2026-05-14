import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import PokemonDetalle from "./pages/PokemonDetalle"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/detalles-pokemon/:id" element={<PokemonDetalle />}></Route>
      </Routes>
    </>
  )
}

export default App
