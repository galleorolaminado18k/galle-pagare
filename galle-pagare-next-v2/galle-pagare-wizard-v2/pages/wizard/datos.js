import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HeadCdn } from '../_headCdn'
import { getState, setState, todayISO } from './_utils'

export default function Datos(){
  const router = useRouter();
  const [f,setF] = useState({deudor:'',deudorDoc:'',deudorTel:'',deudorEmail:'',deudorDir:'', monto:250000, fechaEmision:todayISO(), fechaVenc:'', numeroPagare:''});
  useEffect(()=>{
    const s=getState();
    const autoNum = 'PG-'+new Date().toISOString().replace(/[-:T.Z]/g,'').slice(0,14);
    setF(v=>({...v, ...s, fechaVenc: s.fechaVenc || new Date(Date.now()+14*864e5).toISOString().slice(0,10), numeroPagare: s.numeroPagare||autoNum }))
  },[]);

  const next=()=>{
    if(!f.deudor || !f.deudorDoc || !f.deudorEmail || !f.monto){ alert('Completa deudor, documento, email y monto.'); return; }
    setState(f); router.push('/wizard/verificacion');
  }
  return (
    <main className="min-h-screen">
      <HeadCdn/>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="muted text-sm">paso 1</h2>
        <h1 className="text-3xl font-extrabold mb-6">Datos del pagaré</h1>
        <div className="card p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Nombre del deudor</label>
              <input className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.deudor} onChange={e=>setF({...f,deudor:e.target.value})}/>
            </div>
            <div>
              <label className="text-sm">Documento</label>
              <input className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.deudorDoc} onChange={e=>setF({...f,deudorDoc:e.target.value})}/>
            </div>
            <div>
              <label className="text-sm">Teléfono</label>
              <input className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.deudorTel} onChange={e=>setF({...f,deudorTel:e.target.value})}/>
            </div>
            <div>
              <label className="text-sm">Email del deudor</label>
              <input type="email" className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.deudorEmail} onChange={e=>setF({...f,deudorEmail:e.target.value})}/>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Dirección</label>
              <input className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.deudorDir} onChange={e=>setF({...f,deudorDir:e.target.value})}/>
            </div>
          </div>
          <hr className="border-gray-700/60" />
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm">Monto (COP)</label>
              <input type="number" className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.monto} onChange={e=>setF({...f,monto:parseInt(e.target.value||0)})}/>
            </div>
            <div>
              <label className="text-sm">Emisión</label>
              <input type="date" className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.fechaEmision} onChange={e=>setF({...f,fechaEmision:e.target.value})}/>
            </div>
            <div>
              <label className="text-sm">Vencimiento</label>
              <input type="date" className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.fechaVenc} onChange={e=>setF({...f,fechaVenc:e.target.value})}/>
            </div>
            <div className="md:col-span-3">
              <label className="text-sm">Número de pagaré</label>
              <input className="w-full rounded-xl bg-black/40 px-3 py-2" value={f.numeroPagare} onChange={e=>setF({...f,numeroPagare:e.target.value})}/>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Link href="/" className="btn border border-gray-700">Volver</Link>
            <button onClick={next} className="btn btn-gold">Continuar → Verificación</button>
          </div>
        </div>
      </div>
    </main>
  )
}
