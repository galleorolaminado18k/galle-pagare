import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { HeadCdn } from '../_headCdn'
import { getState, clearState } from './_utils'

export default function Resumen(){
  const router = useRouter(); const [s,setS]=useState(null); const [msg,setMsg]=useState('');
  useEffect(()=>{ const x=getState(); if(!x.deudor||!x.firma){ router.replace('/wizard/datos'); } else setS(x); },[]);

  const buildAndSend = async ()=>{
    if(!s) return;
    setMsg('Generando PDF…');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt',format:'a4'});
    const left=56, top=56, width=483;

    doc.setFont('Times','Normal'); doc.setFontSize(8);
    const split=doc.splitTextToSize(s.legalText || '', width);
    doc.text(split,left,top);
    let y = top + split.length*9 + 16;
    doc.text('firma del deudor', left, y); y+=8;
    doc.addImage(s.firma,'PNG',left,y,180,60);

    const dataUrl = doc.output('dataurlstring');
    const fileName = `${s.numeroPagare||'pagare'}_Galle18K.pdf`;
    doc.save(fileName);

    setMsg('Enviando correo…');
    const resp = await fetch('/api/send-pdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      pdfBase64: dataUrl.split(',')[1],
      filename: fileName,
      toEmails: [s.deudorEmail,'galleaprobaciones@gmail.com'],
      metadata: { numeroPagare: s.numeroPagare, deudor:s.deudor, deudorDoc:s.deudorDoc, fechaEmision:s.fechaEmision, fechaVenc:s.fechaVenc, ciudadPago:'Cúcuta', monto:s.monto }
    })});
    if(!resp.ok){ setMsg('No se pudo enviar el correo.'); return; }
    setMsg('Listo. Enviado');
    clearState();
  }

  if(!s) return null;
  return (
    <main className="min-h-screen">
      <HeadCdn/>
      <Head><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script></Head>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="muted text-sm">paso 4</h2>
        <h1 className="text-3xl font-extrabold mb-6">Resumen</h1>
        <div className="card p-6 space-y-2">
          <p className="text-sm text-gray-300">se generará pdf con clausulado en letra pequeña y se enviará por correo</p>
          <div className="flex justify-between pt-4">
            <Link href="/wizard/firma" className="btn border border-gray-700">← Atrás</Link>
            <button className="btn btn-gold" onClick={buildAndSend}>Firmar, descargar y enviar</button>
          </div>
          <p className="text-sm text-gray-300">{msg}</p>
        </div>
      </div>
    </main>
  )
}
