import { useState } from 'react'
import { Card } from '../components/ui'
import { apiPost } from '../lib/api'

export function AppLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await apiPost('/api/auth/login', { email, password })
      setStatus('Login berhasil')
    } catch {
      setStatus('Login gagal')
    }
  }

  return (
    <AuthShell title="Masuk">
      <form className="space-y-4" onSubmit={submit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-2xl border"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Kata sandi" className="w-full px-4 py-3 rounded-2xl border"/>
        <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">Masuk</button>
      </form>
      {status && <div className="mt-3 text-sm">{status}</div>}
    </AuthShell>
  )
}

export function AppRegister() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await apiPost('/api/auth/register', { name, email, password })
      setStatus('Registrasi berhasil')
    } catch {
      setStatus('Registrasi gagal')
    }
  }

  return (
    <AuthShell title="Daftar">
      <form className="space-y-4" onSubmit={submit}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nama" className="w-full px-4 py-3 rounded-2xl border"/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-2xl border"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Kata sandi" className="w-full px-4 py-3 rounded-2xl border"/>
        <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">Daftar</button>
      </form>
      {status && <div className="mt-3 text-sm">{status}</div>}
    </AuthShell>
  )
}

function AuthShell({ title, children }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">{title}</h1>
        {children}
      </Card>
    </div>
  )
}
