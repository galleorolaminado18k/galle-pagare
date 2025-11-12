import Head from 'next/head';
export const HeadCdn = () => (
  <Head>
    <title>Galle 18K – Pagaré</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>{`
      body{background:#0a0a0a;color:#eaeaea;font-family:Inter,system-ui}
      .card{border:1px solid rgba(212,175,55,.22);border-radius:1rem;background:#0d0d0d;box-shadow:0 12px 28px rgba(0,0,0,.45)}
      .btn{border-radius:.9rem;padding:.75rem 1rem;font-weight:700}
      .btn-gold{background:linear-gradient(90deg,#cc9f2b,#e6c65b);color:#111}
      a.btn-gold:hover{opacity:.95}
      .muted{color:#bdbdbd}
    `}</style>
  </Head>
);
