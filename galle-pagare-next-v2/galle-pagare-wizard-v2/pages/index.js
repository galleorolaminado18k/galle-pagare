import Link from 'next/link'
import { HeadCdn } from './_headCdn'

export default function Home(){
  return (
    <main className="min-h-screen">
      <HeadCdn/>
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{background:'#d4af37'}}></span>
          <span className="font-semibold">Galle 18K — Pagaré</span>
        </div>
        <Link href="/wizard/datos" className="btn btn-gold">Crear pagaré</Link>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="card p-8">
          <p className="muted">Flujo por pasos</p>
          <h1 className="text-4xl font-extrabold">Pagaré y firma electrónica</h1>
          <p className="mt-3 text-gray-300">Datos → verificación → firma → resumen.</p>
          <div className="mt-6">
            <Link href="/wizard/datos" className="btn btn-gold">Empezar</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
