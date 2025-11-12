export const getState = () => {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('pagare')||'{}'); } catch(e){ return {}; }
}
export const setState = (obj) => {
  if (typeof window === 'undefined') return;
  const now = getState();
  localStorage.setItem('pagare', JSON.stringify({...now, ...obj}));
}
export const clearState = () => { if (typeof window!=='undefined') localStorage.removeItem('pagare'); }
export const todayISO = () => new Date().toISOString().slice(0,10);
