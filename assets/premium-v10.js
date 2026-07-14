
(()=>{
  const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  // Remove legacy caches/service worker that caused stale or blank translated pages.
  if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});}
  if('caches' in window){caches.keys().then(keys=>keys.forEach(k=>caches.delete(k))).catch(()=>{});}
  const btn=qs('.menu-btn'), nav=qs('.nav-links');
  if(btn&&nav){
    btn.setAttribute('aria-controls',nav.id||'navLinks'); if(!nav.id)nav.id='navLinks';
    const close=()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
    btn.addEventListener('click',e=>{e.stopPropagation();const open=!nav.classList.contains('open');nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
    qsa('a',nav).forEach(a=>a.addEventListener('click',close));
    document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!btn.contains(e.target))close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  // Mark current page.
  qsa('.nav-links a').forEach(a=>{try{const u=new URL(a.href,location.href);const here=location.pathname.replace(/index\.html$/,'');const there=u.pathname.replace(/index\.html$/,'');if(here===there)a.setAttribute('aria-current','page')}catch(e){}});
  // Current year.
  qsa('[data-year],#year').forEach(x=>x.textContent=new Date().getFullYear());
  // Better form reassurance and submitting state.
  qsa('form').forEach(form=>{
    if(!qs('.privacy-note',form)){
      const p=document.createElement('p');p.className='privacy-note';
      const lang=document.documentElement.lang||'fr';
      p.innerHTML=lang.startsWith('ar')?'بإرسال النموذج، فإنك توافق على استخدام معلوماتك للرد على طلبك فقط. <a href="/ar/privacy.html">سياسة الخصوصية</a>.' : lang.startsWith('en')?'By sending this form, you agree that your information may be used only to respond to your request. <a href="/en/privacy.html">Privacy policy</a>.' : 'En envoyant ce formulaire, vous acceptez que vos informations soient utilisées uniquement pour répondre à votre demande. <a href="/politique-confidentialite.html">Confidentialité</a>.';
      form.appendChild(p);
    }
    form.addEventListener('submit',()=>{const b=qs('button[type="submit"],input[type="submit"]',form);if(b){b.dataset.label=b.textContent||b.value;b.disabled=true;if(b.tagName==='INPUT')b.value='Envoi…';else b.textContent=document.documentElement.lang.startsWith('ar')?'جارٍ الإرسال…':document.documentElement.lang.startsWith('en')?'Sending…':'Envoi…'}});
  });
  // Lazy-load non-critical images.
  qsa('img').forEach((img,i)=>{if(i>1&&!img.closest('.brand'))img.loading='lazy';img.decoding='async'});
})();
