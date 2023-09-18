import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Gallery} from './pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
