import { useEffect, useMemo, useState } from 'react'
import { Card, HoverLift, FadeIn } from '../components/ui'
import { Search, ShieldCheck, Users } from 'lucide-react'
import { apiGet, apiPost } from '../lib/api'
import Nav from '../components/Nav'

function useDebounce(value, delay) {
  const [v, setV] = useState(value)
  useEffect(() => { const t = setTimeout(()=>setV(value), delay); return ()=>clearTimeout(t) }, [value, delay])
  return v
}

function GroupCard({ item, onJoin }) {
  return (
    <HoverLift>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{item.title}</h4>
              {item.badge_admin && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700"><ShieldCheck size={12}/>Admin</span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">{item.description}</p>
            <div className="text-xs text-slate-500 mt-2 inline-flex items-center gap-1"><Users size={14}/> {item.member_count || 0} anggota</div>
          </div>
          <button onClick={() => onJoin?.(item)} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500">Gabung</button>
        </div>
      </Card>
    </HoverLift>
  )
}

export default function KomunitasPage() {
  const [tab, setTab] = useState('recommend')
  const [query, setQuery] = useState('')
  const dq = useDebounce(query, 400)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    apiGet('/api/communities', { q: dq, tab: tab === 'mine' ? 'mine' : undefined }).then((d)=>{ setItems(d.items || []); setLoading(false) }).catch(()=>setLoading(false))
  }, [dq, tab])

  const onJoin = async (item) => {
    // demo purpose: fake user id "demo-user"
    try {
      await apiPost('/api/communities/join', { community_id: item.id || item._id || item.community_id, user_id: 'demo-user' })
      setItems((prev)=>prev.map(it=> it.id===item.id ? { ...it, member_count: (it.member_count||0)+1 } : it))
      alert('Berhasil bergabung')
    } catch (e) {
      alert('Gagal bergabung')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Temukan Komunitas</h1>
          <div className="relative mt-4">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari komunitas..." className="w-full px-4 py-3 pl-11 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 dark:bg-slate-900/70"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
          </div>
          <div className="mt-4 inline-flex p-1 rounded-full bg-slate-100/70 dark:bg-slate-800/70">
            {[
              { key: 'mine', label: 'Komunitas Saya' },
              { key: 'recommend', label: 'Rekomendasi' },
              { key: 'search', label: 'Hasil Pencarian' },
            ].map((t)=> (
              <button key={t.key} onClick={()=>setTab(t.key)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${tab===t.key ? 'bg-white dark:bg-slate-900 shadow text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-28">
        {loading && <div className="text-slate-500">Memuat...</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {items.map((it, idx)=> (
            <FadeIn key={idx} delay={idx*0.03}><GroupCard item={it} onJoin={onJoin}/></FadeIn>
          ))}
        </div>
        {!loading && items.length===0 && <Card className="p-6 text-slate-500">Tidak ada hasil</Card>}
      </main>

      <Nav />
    </div>
  )
}
