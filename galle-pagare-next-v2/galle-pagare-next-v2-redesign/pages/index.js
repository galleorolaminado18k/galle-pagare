export default function Home(){
  return (
    <main className="min-h-screen text-white" style={{fontFamily:'Inter, system-ui'}}>
      <div className="relative overflow-hidden" style={{background:'radial-gradient(1200px 800px at 10% 10%, #101010 0, #0b0b0b 40%, #060606 100%)'}}>
        <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{background:'#d4af37'}}></span>
            <span className="font-semibold">Galle 18K — Pagaré</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#como-funciona" className="hover:text-white">Cómo funciona</a>
            <a href="#seguridad" className="hover:text-white">Seguridad</a>
            <a href="#preguntas" className="hover:text-white">Preguntas</a>
          </nav>
          <a href="/pagare.html" className="rounded-xl px-4 py-2 font-semibold" style={{background:'linear-gradient(90deg,#cc9f2b,#e6c65b)', color:'#111'}}>Crear pagaré</a>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Firma pagarés <span style={{color:'#d4af37'}}>sin intereses</span> con verificación de identidad
            </h1>
            <p className="text-gray-300 mt-4 text-lg">Selfie, cédula frente y reverso, firma electrónica y envío automático en PDF a tu correo.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="/pagare.html" className="rounded-xl px-5 py-3 font-semibold" style={{background:'linear-gradient(90deg,#cc9f2b,#e6c65b)', color:'#111'}}>Crear pagaré ahora</a>
              <a href="#como-funciona" className="rounded-xl px-5 py-3 border border-gray-700 hover:bg-white/5">Ver cómo funciona</a>
            </div>
            <p className="text-xs text-gray-400 mt-4">Modo: <b>Acreedor</b>. El deudor llena sus datos y firma.</p>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-yellow-700/30 bg-black/40 p-4 shadow-2xl">
              <img src="/hero-mock.png" alt="Mockup" className="rounded-xl w-full"/>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl px-3 py-2 text-xs" style={{background:'linear-gradient(90deg,#cc9f2b,#e6c65b)', color:'#111'}}>PDF + Metadatos</div>
          </div>
        </section>
      </div>

      <section id="como-funciona" className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          ['1. Completa','Datos del deudor y valor del pagaré'],
          ['2. Verifica','Selfie + cédula frente y reverso'],
          ['3. Firma y recibe','PDF por email y registro interno']
        ].map(([t,d],i)=>(
          <div key={i} className="rounded-2xl p-6 border border-yellow-700/30 bg-black/30">
            <div className="text-3xl font-extrabold" style={{color:'#d4af37'}}>{t}</div>
            <p className="text-gray-300 mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section id="seguridad" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl p-6 border border-yellow-700/30 bg-black/30">
          <h2 className="text-2xl font-bold mb-2">Seguridad</h2>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            <li>Firma electrónica con trazo en lienzo.</li>
            <li>Captura de identidad: selfie + documento.</li>
            <li>Envío por correo con <b>metadatos</b> (valor, número, fechas) y adjunto JSON.</li>
          </ul>
        </div>
      </section>

      <footer className="text-center text-xs text-gray-500 pb-10">© Galle 18K</footer>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.4/dist/tailwind.min.css"/>
    </main>
  );
}
