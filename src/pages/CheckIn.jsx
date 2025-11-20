import { useState } from 'react'
import { Card } from '../components/ui'
import { apiPost } from '../lib/api'

export default function CheckIn() {
  const [coords, setCoords] = useState({ lat: '', lng: '' })
  const [share, setShare] = useState(true)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')

  const getLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation tidak tersedia')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) })
      },
      () => alert('Gagal mendapatkan lokasi')
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      await apiPost('/api/checkin', { user_id: 'demo-user', lat: Number(coords.lat), lng: Number(coords.lng), share_status: share, note })
      setStatus('Berhasil check-in')
    } catch {
      setStatus('Gagal check-in')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">Check-in Lokasi</h1>
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-3">
            <input value={coords.lat} onChange={(e)=>setCoords(c=>({ ...c, lat: e.target.value }))} placeholder="Latitude" className="px-3 py-3 rounded-xl border"/>
            <input value={coords.lng} onChange={(e)=>setCoords(c=>({ ...c, lng: e.target.value }))} placeholder="Longitude" className="px-3 py-3 rounded-xl border"/>
          </div>
          <button type="button" onClick={getLocation} className="px-3 py-2 rounded-xl border">Gunakan Lokasi Saat Ini</button>
          <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Catatan" className="w-full px-3 py-3 rounded-xl border"/>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={share} onChange={(e)=>setShare(e.target.checked)} /> Bagikan status ke komunitas
          </label>
          <button className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium">Check-in</button>
        </form>
        {status && <div className="mt-3 text-sm">{status}</div>}
      </Card>
    </div>
  )
}
