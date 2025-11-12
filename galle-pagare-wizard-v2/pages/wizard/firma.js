import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HeadCdn } from '../_headCdn'
import { getState, setState } from './_utils'

const LEGAL = `pagare a la orden y contrato de suministro a credito
numero {NUMERO_PAGARE}  ciudad de emision y pago cucuta norte de santander  fecha {FECHA_EMISION}

acreedor comercializadora gale18k oro laminado y accesorios s a s nit 901 375 704 4 domicilio cucuta representante legal omar santiago supelano garavito cc 1 090 460 868
deudor {DEUDOR_NOMBRE} identificado con {DEUDOR_TIPO_DOC} {DEUDOR_NUM_DOC} domicilio {DEUDOR_CIUDAD} direccion {DEUDOR_DIRECCION} correo {DEUDOR_EMAIL} telefono {DEUDOR_TELEFONO}

1 titulo valor pagare
yo {DEUDOR_NOMBRE} prometo pagar en forma incondicional a la orden de comercializadora gale18k oro laminado y accesorios s a s la suma de {MONTO_COP} valor en letras {MONTO_EN_LETRAS} el dia {FECHA_VENCIMIENTO} en la ciudad de cucuta sin necesidad de requerimiento previo ni presentacion para el pago conforme a los articulos 709  710  711 y demas concordantes del codigo de comercio el presente pagare constituye obligacion clara expresa y exigible

2 contrato de suministro a credito accesorio
objeto el acreedor suministra mercancias consistentes en joyeria en oro laminado y accesorios a favor del deudor bajo modalidad de credito
desembolso en especie el credito se materializa en entrega de bienes no en dinero por lo que el valor corresponde al precio pactado en factura
pruebas constituyen plena prueba de la obligacion las facturas remisiones guias de transporte comunicaciones electronicas ordenes de pedido registros de plataforma y demas evidencias generadas en el giro ordinario del negocio segun los articulos 772  774  781 del codigo de comercio
intereses sin intereses corrientes en mora se causara interes moratorio a la maxima tasa permitida por la superintendencia financiera desde el dia siguiente al vencimiento y hasta el pago total
gastos el deudor asumira gastos de notificacion cobro y las costas y agencias en derecho que se liquiden judicialmente
clausula aceleratoria el incumplimiento total o parcial anticipa el vencimiento de todas las obligaciones a cargo del deudor habilitando la exigibilidad inmediata del saldo total
compensacion y aplicacion de pagos el acreedor podra compensar saldos y aplicar pagos primero a gastos luego a intereses de mora y finalmente a capital
cesion el acreedor podra ceder total o parcialmente el credito y este pagare bastando aviso por correo al deudor
entrega y riesgos el riesgo se traslada al deudor con la entrega fisica al transportador o con la constancia de recibido segun la prueba de guia o documento equivalente
domicilio y jurisdiccion para todos los efectos el domicilio contractual es cucuta los conflictos podran ventilarse ante los jueces competentes de cucuta sin perjuicio de las reglas generales de competencia
notificaciones se surtiran validamente en los correos y telefonos aqui indicados o los actualizados por escrito se aceptan como idoneos el correo electronico y la mensajeria instantanea whatsapp con constancia de entrega

3 carta de instrucciones del pagare
autorizo a completar espacios en blanco rectificar errores mecanicos y llenar fechas valores y demas datos del titulo de conformidad con facturas ordenes de pedido remisiones y demas soportes autorizo igualmente el endoso en propiedad o en procuracion y el protesto cuando sea procedente

4 firma y evidencia electronica ley 527 de 1999 decreto 2364 de 2012
consentimiento declaro que he leido y comprendo el contenido y que mi firma electronica trazo en pantalla codigo otp registro de clic o mecanismo biometrico identifica de manera unica mi voluntad y me vincula juridicamente
pruebas acepto como medios de prueba las imagenes selfie documento frente y reverso metadatos ip geolocalizacion si esta activa huella del dispositivo y trazas de auditoria generadas por el sistema
conservacion el acreedor conservara el instrumento y sus anexos en formato digital y podra reproducirlos en pdf y json manteniendo integridad y disponibilidad

5 tratamiento de datos y consulta en centrales leyes 1581 de 2012 y 1266 de 2008
autorizo el tratamiento de mis datos para gestion del credito verificacion de identidad prevencion de fraude cobranza y contacto autorizo la consulta y reporte de mi comportamiento a operadores de informacion como datacredito o transunion respetando terminos de permanencia procedimientos de actualizacion y rectificacion derechos arco y demas garantias de habeas data podre ejercer mis derechos escribiendo a galleaprobaciones arroba gmail punto com

6 regimen de incumplimiento
mora configurada cuando no se pague la obligacion total a la fecha de vencimiento desde el dia siguiente se causara interes moratorio a la tasa maxima permitida
gestion operativa en mora el acreedor podra bloquear cupo de credito reducir niveles suspender nuevas entregas y exigir garantias adicionales de ser necesario
clausula penal si se pactare en factura podra exigirse la penalidad alli prevista sin perjuicio de los intereses moratorios y perjuicios demostrados
pagos parciales los pagos aplicaran primero a gastos luego a intereses de mora y por ultimo a capital salvo pacto distinto por escrito
compromisos de pago cualquier acuerdo de pago sera valido si consta en soporte escrito o electronico remitido por canales del acreedor

7 declaracion del deudor
manifiesto que la informacion aportada es veraz que conozco la politica de credito del acreedor y que recibi a satisfaccion la mercancia correspondiente al valor aqui consignado
reconozco que en caso de mora superior a quince dias calendario podran activarse las medidas operativas de bloqueo reduccion de cupo y exigibilidad total
acepto comunicaciones por correo y whatsapp como medios validos de gestion acuerdos y notificaciones

8 clausulas finales
interpretacion supletoria en lo no previsto se aplican el codigo de comercio la ley 527 de 1999 y demas normas colombianas pertinentes
severabilidad la nulidad de una clausula no afectara la validez del resto del instrumento
integridad este documento junto con las facturas y soportes constituye el acuerdo integro respecto del suministro a credito aqui regulado

resumen economico
valor del pagare {MONTO_COP} en letras {MONTO_EN_LETRAS}
fecha de vencimiento {FECHA_VENCIMIENTO}
ciudad de pago cucuta
soportes facturas y constancias del pedido {CODIGO_PEDIDO_OPCIONAL}

aceptacion y firma
con mi firma electronica acepto integralmente este pagare y contrato de suministro a credito
deudor {DEUDOR_NOMBRE}  {DEUDOR_TIPO_DOC} {DEUDOR_NUM_DOC}
fecha y hora de firma {FECHA_HORA_FIRMA}  ip y dispositivo {IP_Y_DEVICE}
acreedor comercializadora gale18k oro laminado y accesorios s a s nit 901 375 704 4 representante legal omar santiago supelano garavito cc 1 090 460 868`

export default function Firma(){
  const router = useRouter();
  const canvasRef = useRef(null);
  const [aceptaDatos,setAceptaDatos]=useState(false);
  const [aceptaPagare,setAceptaPagare]=useState(false);
  const [aceptaLegal,setAceptaLegal]=useState(false);

  useEffect(()=>{ const s=getState(); if(!s.deudor||!s.selfie){ router.replace('/wizard/datos'); } },[]);

  useEffect(()=>{
    const canvas=canvasRef.current, ctx=canvas.getContext('2d'); const ratio=window.devicePixelRatio||1;
    const size=()=>{ canvas.width=canvas.clientWidth*ratio; canvas.height=220*ratio; ctx.setTransform(ratio,0,0,ratio,0,0); ctx.lineWidth=2; ctx.lineCap='round'; ctx.strokeStyle='#f5f5f5'; ctx.clearRect(0,0,canvas.width,canvas.height); };
    size(); const onResize=()=>size(); window.addEventListener('resize',onResize);
    let drawing=false,lastX=0,lastY=0; const pos=(e)=>{const r=canvas.getBoundingClientRect(); const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left; const y=(e.touches?e.touches[0].clientY:e.clientY)-r.top; return {x,y}};
    const start=(e)=>{drawing=true; const p=pos(e); lastX=p.x; lastY=p.y;}; const move=(e)=>{if(!drawing) return; const p=pos(e); ctx.beginPath(); ctx.moveTo(lastX,lastY); ctx.lineTo(p.x,p.y); ctx.stroke(); lastX=p.x; lastY=p.y; e.preventDefault();}; const end=()=>{drawing=false;};
    canvas.addEventListener('mousedown',start); canvas.addEventListener('mousemove',move); canvas.addEventListener('mouseup',end); canvas.addEventListener('mouseleave',end);
    canvas.addEventListener('touchstart',start,{passive:false}); canvas.addEventListener('touchmove',move,{passive:false}); canvas.addEventListener('touchend',end);
    return ()=>{ window.removeEventListener('resize',onResize); };
  },[]);

  const next=()=>{
    const s = getState();
    const text = LEGAL
      .replaceAll('{NUMERO_PAGARE}', s.numeroPagare||'')
      .replaceAll('{FECHA_EMISION}', s.fechaEmision||'')
      .replaceAll('{DEUDOR_NOMBRE}', s.deudor||'')
      .replaceAll('{DEUDOR_TIPO_DOC}', 'CC')
      .replaceAll('{DEUDOR_NUM_DOC}', s.deudorDoc||'')
      .replaceAll('{DEUDOR_CIUDAD}', s.deudorCiudad||'')
      .replaceAll('{DEUDOR_DIRECCION}', s.deudorDir||'')
      .replaceAll('{DEUDOR_EMAIL}', s.deudorEmail||'')
      .replaceAll('{DEUDOR_TELEFONO}', s.deudorTel||'')
      .replaceAll('{MONTO_COP}', (s.monto||0).toLocaleString('es-CO'))
      .replaceAll('{MONTO_EN_LETRAS}', 'valor en letras')
      .replaceAll('{FECHA_VENCIMIENTO}', s.fechaVenc||'')
      .replaceAll('{CODIGO_PEDIDO_OPCIONAL}', s.numeroPagare||'')
      .replaceAll('{FECHA_HORA_FIRMA}', new Date().toLocaleString('es-CO'))
      .replaceAll('{IP_Y_DEVICE}', 'ip-dispositivo');
    const img = canvasRef.current.toDataURL('image/png');
    if(!aceptaDatos||!aceptaPagare||!aceptaLegal){ alert('Debes aceptar términos y firmar.'); return; }
    setState({firma: img, aceptaDatos:true, aceptaPagare:true, legalText:text});
    router.push('/wizard/resumen');
  }
  const borrar=()=>{
    const c=canvasRef.current, ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height);
  }
  return (
    <main className="min-h-screen">
      <HeadCdn/>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="muted text-sm">paso 3</h2>
        <h1 className="text-3xl font-extrabold mb-6">Firma electrónica</h1>
        <div className="card p-6 space-y-6">
          <canvas ref={canvasRef} className="w-full rounded-xl border border-yellow-600/40" style={{height:220}}/>
          <div className="flex gap-3">
            <button className="btn border border-gray-700" onClick={borrar}>Borrar firma</button>
          </div>
          <div className="space-y-2 text-sm">
            <label className="flex gap-2 items-start"><input type="checkbox" onChange={e=>setAceptaDatos(e.target.checked)} className="mt-1"/><span className="muted">autorizo tratamiento de datos e imagenes para verificacion de identidad ley 1581 de 2012</span></label>
            <label className="flex gap-2 items-start"><input type="checkbox" onChange={e=>setAceptaPagare(e.target.checked)} className="mt-1"/><span className="muted">declaro conocer y aceptar el pagare y sus condiciones</span></label>
          </div>
          <div className="max-h-64 overflow-y-auto p-4 rounded-lg bg-black/30 border border-gray-800">
            <p className="text-[11px] leading-5 text-gray-300 whitespace-pre-wrap">{LEGAL}</p>
          </div>
          <label className="flex gap-2 items-start text-sm"><input type="checkbox" onChange={e=>setAceptaLegal(e.target.checked)} className="mt-1"/><span className="text-[12px] text-gray-300">acepto integralmente los terminos anteriores y autorizo la firma</span></label>
          <div className="flex justify-between pt-2">
            <Link href="/wizard/verificacion" className="btn border border-gray-700">← Atrás</Link>
            <button onClick={next} className="btn btn-gold">acepto los terminos y firmar</button>
          </div>
        </div>
      </div>
    </main>
  )
}
