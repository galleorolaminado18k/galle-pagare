import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HeadCdn } from '../_headCdn'
import { getState, setState } from './_utils'

export default function Verificacion(){
  const router = useRouter();
  const [selfie,setSelfie]=useState(''); const [front,setFront]=useState(''); const [back,setBack]=useState('');
  useEffect(()=>{ const s=getState(); if(!s.deudor){ router.replace('/wizard/datos'); } },[]);

  const useCam = async (facing, setter)=>{
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:facing }, audio:false });
      const video = document.createElement('video'); video.autoplay=true; video.srcObject=stream;
      await new Promise(r=>video.onloadedmetadata=r);
      const cn=document.createElement('canvas'); cn.width=video.videoWidth; cn.height=video.videoHeight;
      const ctx=cn.getContext('2d'); ctx.drawImage(video,0,0,cn.width,cn.height);
      const data=cn.toDataURL('image/jpeg',0.92);
      stream.getTracks().forEach(t=>t.stop());
      setter(data);
    }catch(e){ alert('No se pudo usar la cámara. Usa Subir.'); console.error(e); }
  }
  const fileToData = (file, setter)=>{ const r=new FileReader(); r.onload=()=>setter(r.result); r.readAsDataURL(file); }
  const next=()=>{
    if(!selfie||!front||!back){ alert('Falta selfie y/o documento.'); return; }
    setState({selfie, docFront:front, docBack:back});
    router.push('/wizard/firma');
  }
  return (
    <main className="min-h-screen">
      <HeadCdn/>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="muted text-sm">paso 2</h2>
        <h1 className="text-3xl font-extrabold mb-6">Verificación de identidad</h1>
        <div className="card p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm mb-1">Selfie</p>
              {selfie ? <img src={selfie} className="rounded-lg" /> : <div className="rounded-lg h-40 bg-black/30 border border-gray-700"></div>}
              <div className="flex gap-2 mt-2">
                <button className="btn border border-gray-700" onClick={()=>useCam('user',setSelfie)}>Cámara</button>
                <label className="btn border border-gray-700 cursor-pointer">Subir<input className="hidden" type="file" accept="image/*" onChange={e=>fileToData(e.target.files[0],setSelfie)}/></label>
              </div>
            </div>
            <div>
              <p className="text-sm mb-1">Documento (frente)</p>
              {front ? <img src={front} className="rounded-lg" /> : <div className="rounded-lg h-40 bg-black/30 border border-gray-700"></div>}
              <div className="flex gap-2 mt-2">
                <button className="btn border border-gray-700" onClick={()=>useCam('environment',setFront)}>Cámara</button>
                <label className="btn border border-gray-700 cursor-pointer">Subir<input className="hidden" type="file" accept="image/*" onChange={e=>fileToData(e.target.files[0],setFront)}/></label>
              </div>
            </div>
            <div>
              <p className="text-sm mb-1">Documento (reverso)</p>
              {back ? <img src={back} className="rounded-lg" /> : <div className="rounded-lg h-40 bg-black/30 border border-gray-700"></div>}
              <div className="flex gap-2 mt-2">
                <button className="btn border border-gray-700" onClick={()=>useCam('environment',setBack)}>Cámara</button>
                <label className="btn border border-gray-700 cursor-pointer">Subir<input className="hidden" type="file" accept="image/*" onChange={e=>fileToData(e.target.files[0],setBack)}/></label>
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Link href="/wizard/datos" className="btn border border-gray-700">← Atrás</Link>
            <button onClick={next} className="btn btn-gold">Continuar → Firma</button>
          </div>
        </div>
      </div>
    </main>
  )
}
