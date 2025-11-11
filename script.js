// année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// gestion des modales
document.addEventListener('click', e=>{
  const card = e.target.closest('.proj-card');
  if(card){
    const id = card.dataset.projid;
    const dlg = document.getElementById(id);
    if(dlg){
      try{ dlg.showModal(); }
      catch{ dlg.setAttribute('open',''); dlg.style.display='block'; }
    }
  }
  const close = e.target.closest('[data-close]');
  if(close){
    const dlg = close.closest('dialog.proj-modal');
    if(dlg){
      try{ dlg.close(); }
      catch{ dlg.removeAttribute('open'); dlg.style.display='none'; }
    }
  }
});

document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('dialog.proj-modal').forEach(d=>{
      if(d.open) d.close();
    });
  }
});
