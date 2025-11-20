import { useEffect, useState } from 'react'
import { Card, FadeIn, HoverLift } from '../components/ui'
import { Megaphone, Shield, Users, Map, Globe, Send } from 'lucide-react'
import { apiGet, apiPost } from '../lib/api'
import Nav from '../components/Nav'

export default function KomunitasAdminMapPage() {
  const [communityId] = useState('demo-community')
  const [info, setInfo] = useState(null)
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [form, setForm] = useState({ title: '', message: '' })
  const [archive, setArchive] = useState([])

  useEffect(()=>{
    apiGet(`/api/communities/${communityId}`).then(setInfo).catch(()=>setInfo(null))
    apiGet('/api/announcements', { community_id: communityId }).then(d=>setArchive(d.items||[]))
  }, [communityId])

  const sendBroadcast = async () => {
    if (!form.title || !form.message) return
    try {
      const res = await apiPost('/api/announcements', { ...form, community_id: communityId })
      setBroadcastOpen(false)
      setForm({ title: '', message: '' })
      setArchive(prev => [{ id: res.id, title: form.title, message: form.message }, ...prev])
      alert('Terkirim')
    } catch (e) {
      alert('Gagal mengirim')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="px-6 py-5 sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">Admin Komunitas</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium" onClick={()=>setBroadcastOpen(true)}><Megaphone size={16} className="inline mr-2"/>Broadcast</button>
            <button className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-sm">Quick Action</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { label: 'Anggota', value: info?.stats?.member_count || 0, icon: Users },
            { label: 'Event', value: info?.stats?.events || 0, icon: Globe },
            { label: 'Pengumuman', value: info?.stats?.announcements || 0, icon: Megaphone },
          ].map((s, idx)=>(
            <FadeIn key={s.label} delay={idx*0.05}><HoverLift><Card className="p-5 flex items-center gap-3"><s.icon className="text-indigo-600" size={20}/><div><div className="text-2xl font-semibold">{s.value}</div><div className="text-sm text-slate-600 dark:text-slate-300">{s.label}</div></div></Card></HoverLift></FadeIn>
          ))}
        </div>

        <div className="mt-6">
          <div className="inline-flex p-1 rounded-full bg-slate-100/70 dark:bg-slate-800/70">
            {['Overview', 'Peta'].map((t)=> (
              <button key={t} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${t==='Overview' ? 'bg-white dark:bg-slate-900 shadow text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="p-5 lg:col-span-2" style={{ minHeight: 300 }}>
            <div className="h-72 w-full bg-gradient-to-br from-blue-200 to-indigo-200 rounded-2xl grid place-items-center text-slate-700">
              <Map className="mr-2"/>
              <span>Peta (Leaflet) placeholder</span>
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-5">
              <div className="font-medium mb-2">Status Darurat</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Tidak ada status darurat saat ini.</div>
            </Card>
            <Card className="p-5">
              <div className="font-medium mb-2">Anggota</div>
              <div className="space-y-2">
                {(info?.members||[]).slice(0,6).map((m,i)=>(
                  <div key={i} className="flex items-center justify-between text-sm"><span>{m.user_id || m.id || 'User'}</span><span className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">{m.role||'member'}</span></div>
                ))}
                {(!info?.members || info.members.length===0) && <div className="text-sm text-slate-500">Belum ada anggota</div>}
              </div>
            </Card>
          </div>
        </div>

        {broadcastOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={()=>setBroadcastOpen(false)} />
            <div className="relative z-10 w-full max-w-5xl">
              <Card className="p-6 md:p-8 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">Broadcast Pengumuman</div>
                  <button onClick={()=>setBroadcastOpen(false)} className="text-slate-500">✕</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <input value={form.title} onChange={e=>setForm(f=>({ ...f, title: e.target.value }))} placeholder="Judul" className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <textarea value={form.message} onChange={e=>setForm(f=>({ ...f, message: e.target.value }))} placeholder="Pesan" rows={6} className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <button onClick={sendBroadcast} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium inline-flex items-center gap-2"><Send size={16}/>Kirim</button>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Arsip</div>
                    <div className="space-y-2 max-h-72 overflow-auto pr-2">
                      {archive.map((a,i)=> (
                        <Card key={i} className="p-3">
                          <div className="font-medium text-sm">{a.title}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{a.message}</div>
                        </Card>
                      ))}
                      {archive.length===0 && <div className="text-sm text-slate-500">Belum ada arsip</div>}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Nav />
    </div>
  )
}
