import { Routes, Route, Link } from 'react-router-dom'
import AppDashboard from './pages/AppDashboard'
import KomunitasPage from './pages/KomunitasPage'
import KomunitasAdminMapPage from './pages/KomunitasAdminMapPage'
import CheckIn from './pages/CheckIn'
import { AppLogin, AppRegister } from './pages/Auth'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<AppDashboard />} />
        <Route path="/komunitas" element={<KomunitasPage />} />
        <Route path="/admin" element={<KomunitasAdminMapPage />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/login" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <div className="text-3xl font-semibold mb-2">404</div>
        <p className="text-slate-500">Halaman tidak ditemukan. <Link className="text-indigo-600 underline" to="/">Kembali</Link></p>
      </div>
    </div>
  )
}
