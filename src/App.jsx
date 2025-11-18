import Header from "./components/ui/header"
import PageFile from "./pages/PageFile"
import PageApi from "./pages/PageApi"
import PageContacto from "./pages/PageContacto"
import PageServicios from "./pages/PageServicios"
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-4 min-h-content gap-4 bg-gray-800">
        <Routes>
          <Route path="/" element={<PageContacto />} />
          <Route path="/File" element={<PageFile />} />
          <Route path="/Servicios" element={<PageServicios />} />
          <Route path="/Api" element={<PageApi />} />
        </Routes>
      </main>
    </>
  )
}

export default App
