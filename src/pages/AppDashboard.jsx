import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { Card, HoverLift, FadeIn } from '../components/ui'
import { Bell, Calendar, UserCheck } from 'lucide-react'
import Nav from '../components/Nav'

export default function AppDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    apiGet('/api/dashboard').then((d) => { if (mounted) { setData(d); setLoading(false) } }).catch(()=>setLoading(false))
    return () => { mounted = false }
  }, [])

  const stats = data?.stats || { active_members: 0, events_this_month: 0, new_messages: 0 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="px-6 py-5 sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Komunitas</h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Selamat datang kembali</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 pb-28">
        <FadeIn>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Halo! 👋</h2>
            <p className="opacity-90">Semoga harimu menyenangkan. Lihat update terbaru dari komunitas kamu di bawah ini.</p>
          </Card>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          {[
            { label: 'Anggota aktif', value: stats.active_members, icon: UserCheck },
            { label: 'Event bulan ini', value: stats.events_this_month, icon: Calendar },
            { label: 'Pesan baru', value: stats.new_messages, icon: Bell },
          ].map((s, idx) => (
            <FadeIn key={s.label} delay={0.05 * idx}>
              <HoverLift>
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <s.icon className="text-indigo-600" size={20} />
                    <div>
                      <div className="text-2xl font-semibold">{loading ? '-' : s.value}</div>
                      <div className="text-slate-600 dark:text-slate-300 text-sm">{s.label}</div>
                    </div>
                  </div>
                </Card>
              </HoverLift>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <section>
            <h3 className="font-semibold mb-3">Event Mendatang</h3>
            <div className="space-y-3">
              {(data?.upcoming_events || []).map((e, i) => (
                <FadeIn key={i}>
                  <HoverLift>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{e.title || 'Event'}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{e.location || 'TBD'}</div>
                        </div>
                        <div className="text-sm text-slate-500">{new Date(e.starts_at).toLocaleString()}</div>
                      </div>
                    </Card>
                  </HoverLift>
                </FadeIn>
              ))}
              {!loading && (data?.upcoming_events?.length || 0) === 0 && (
                <Card className="p-4 text-slate-500">Belum ada event</Card>
              )}
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-3">Pengumuman</h3>
            <div className="space-y-3">
              {(data?.announcements || []).map((a, i) => (
                <FadeIn key={i}>
                  <HoverLift>
                    <Card className="p-4">
                      <div className="font-medium">{a.title}</div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{a.message}</p>
                    </Card>
                  </HoverLift>
                </FadeIn>
              ))}
              {!loading && (data?.announcements?.length || 0) === 0 && (
                <Card className="p-4 text-slate-500">Belum ada pengumuman</Card>
              )}
            </div>
          </section>
        </div>
      </main>

      <Nav />
    </div>
  )
}
