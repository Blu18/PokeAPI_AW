import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import PokemonDetalle from "./pages/PokemonDetalle"
import ComparadorPage from "./pages/ComparadorPage"
import ComparadorFAB from "./components/ComparadorFAB"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/detalles-pokemon/:id" element={<PokemonDetalle />}></Route>
        <Route path="/comparador" element={<ComparadorPage />} />
      </Routes>
      <ComparadorFAB />
    </>
  )
}

export default App
