/* Formulaires, qualification et conversion. Aucun cookie analytics sans accord. */
(() => {
  'use strict';
  const config = window.EJWS_CONFIG || {};
  const locale = (document.documentElement.lang || 'fr').slice(0,2);
  const strings = {
    fr: {sending:'Envoi en cours…', error:'Envoi non confirmé. Vérifiez votre connexion puis réessayez. Vous pouvez aussi utiliser le formulaire classique : ',native:'Envoyer sans JavaScript', consent:'Autorisez-vous les mesures anonymisées de fréquentation (Google Analytics) pour améliorer notre site ?',accept:'Accepter',reject:'Refuser'},
    en: {sending:'Sending…',error:'Submission not confirmed. Check your connection and try again, or use standard form submission: ',native:'Use standard form',consent:'Allow anonymous Google Analytics traffic measurement to help improve this website?',accept:'Accept',reject:'Decline'},
    ar: {sending:'جارٍ الإرسال…',error:'لم يتم تأكيد الإرسال. حاول مجدداً أو استخدم الإرسال العادي: ',native:'إرسال بالنموذج العادي',consent:'هل تسمح بقياس الزيارات باستخدام Google Analytics لتحسين الموقع؟',accept:'موافق',reject:'رفض'}
  };
  const i18n = strings[locale] || strings.fr;
  const query = new URLSearchParams(location.search);
  const safeTracking = key => {
    let current=query.get(key)||'';
    try {
      if(current)sessionStorage.setItem('ejws_'+key,current.slice(0,150));
      else current=sessionStorage.getItem('ejws_'+key)||'';
    } catch(_) { /* tab storage unavailable */ }
    return current.replace(/[<>"']/g,'').slice(0,150);
  };
  const consentKey = 'ejws_analytics_consent_v1';
  let analyticsReady = false;
  function startAnalytics(){
    const id = (config.ga4MeasurementId||'').trim();
    if(analyticsReady || !/^G-[A-Z0-9]{7,}$/.test(id))return;
    analyticsReady = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:true});
    const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(tag);
  }
  function track(name,details={}){
    if(localStorage.getItem(consentKey)==='yes' && analyticsReady && typeof window.gtag==='function')window.gtag('event',name,details);
  }
  window.ejwsTrack=track;
  function appendTracking(form){
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(key=>{
      const value=safeTracking(key); if(!value)return;
      let field=form.querySelector('input[name="'+key+'"]');
      if(!field){field=document.createElement('input');field.type='hidden';field.name=key;form.appendChild(field);} field.value=value;
    });
    if(!form.querySelector('input[name="source_page"]')){
      const el=document.createElement('input');el.type='hidden';el.name='source_page';el.value=location.pathname.slice(0,200);form.appendChild(el);
    }
  }
  function initForms(){
    document.querySelectorAll('form').forEach(form=>{
      if(!/formspree\.io\/f\//i.test(form.action||''))return;
      appendTracking(form);
      // Minimal friction: only essential data on first audit contact.
      if(form.classList.contains('audit-form')){
        ['business','city'].forEach(key=>{const el=form.querySelector('[name="'+key+'"]');if(el)el.required=false;});
        const summary=document.createElement('summary');summary.textContent=locale==='ar'?'تفاصيل إضافية (اختياري)':locale==='en'?'Additional details (optional)':'Informations complémentaires (facultatif)';
        const details=document.createElement('details');details.className='ejws-audit-extra';details.appendChild(summary);
        for(const key of ['business','city','email','link','service']){
          const input=form.querySelector('[name="'+key+'"]');
          const field=input && input.closest('.field');
          if(field)details.appendChild(field);
        }
        const button=form.querySelector('button[type="submit"]');
        if(button && details.children.length>1)button.before(details);
      }
      let status=form.querySelector('.ejws-form-feedback');
      if(!status){status=document.createElement('p');status.className='ejws-form-feedback';status.hidden=true;status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.appendChild(status);}
      const btn=form.querySelector('button[type="submit"],input[type="submit"]');
      const original=btn ? (btn.tagName==='INPUT'?btn.value:btn.textContent) : '';
      form.addEventListener('submit', async ev=>{
        if(!form.checkValidity())return;
        ev.preventDefault();
        if(btn){btn.disabled=true;if(btn.tagName==='INPUT')btn.value=i18n.sending;else btn.textContent=i18n.sending;}
        status.hidden=true;status.textContent='';
        try{
          const resp=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
          if(!resp.ok)throw new Error('Form status '+resp.status);
          const service=form.querySelector('[name="service"]');
          track('generate_lead',{form_name:form.className||'contact',service:service?service.value.slice(0,90):'autre'});
          const audit=form.classList.contains('audit-form');
          if(audit)track('audit_request');
          location.assign('/merci.html?type='+(audit?'audit':'contact'));
        }catch(err){
          console.warn('Form delivery could not be confirmed:',err);
          status.hidden=false;
          status.appendChild(document.createTextNode(i18n.error));
          const fallback=document.createElement('a');fallback.href='#';fallback.textContent=i18n.native;
          fallback.addEventListener('click',ev2=>{ev2.preventDefault();form.submit();});
          status.appendChild(fallback);
          if(btn){btn.disabled=false;if(btn.tagName==='INPUT')btn.value=original;else btn.textContent=original;}
        }
      });
    });
  }
  function initLinks(){
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');if(!a)return;
      const href=a.getAttribute('href')||'';
      if(/wa\.me\//i.test(href))track('click_whatsapp',{page_path:location.pathname});
      else if(/^tel:/i.test(href))track('click_call',{page_path:location.pathname});
      else if(a.pathname && /contact\.html/.test(a.pathname))track('request_quote',{page_path:location.pathname});
    });
    const service=safeTracking('service');
    if(service){document.querySelectorAll('form select[name="service"]').forEach(select=>{
      const term=service.toLowerCase();
      let keywords=[];
      if(/google.business|maps|fiche.google/.test(term))keywords=['google business','بطاقة'];
      else if(/google.ads|publicite|publicit|meta.ads|facebook.ads|instagram.ads/.test(term))keywords=['google ads','publicité','إعلانات'];
      else if(/seo|referencement|référencement/.test(term))keywords=['seo','référencement','الظهور'];
      else if(/reseaux|réseaux|social|instagram|facebook/.test(term))keywords=['réseaux','social','الشبكات'];
      else if(/site|web|wordpress|ecommerce/.test(term))keywords=['site web','website','موقع'];
      const match=[...select.options].find(o=>[o.value,o.textContent.trim()].some(v=>keywords.some(k=>v.toLowerCase().includes(k))));
      if(match)select.value=match.value;
    });}
  }
  function initAnalytics(){
    if(!/^G-[A-Z0-9]{7,}$/.test((config.ga4MeasurementId||'').trim()))return;
    const saved=localStorage.getItem(consentKey);
    if(saved==='yes'){startAnalytics();return;}if(saved==='no')return;
    const banner=document.createElement('div');banner.className='ejws-consent';banner.setAttribute('role','dialog');banner.setAttribute('aria-label','Mesure d’audience');
    const p=document.createElement('p');p.textContent=i18n.consent;banner.appendChild(p);
    [['yes',i18n.accept],['no',i18n.reject]].forEach(([value,label])=>{
      const b=document.createElement('button');b.type='button';b.textContent=label;
      b.addEventListener('click',()=>{localStorage.setItem(consentKey,value);banner.remove();if(value==='yes')startAnalytics();});banner.appendChild(b);
    });document.body.appendChild(banner);
  }
  function ready(){initLinks();initForms();try{initAnalytics();}catch(e){console.warn('Analytics consent unavailable');}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
