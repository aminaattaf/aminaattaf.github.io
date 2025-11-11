// année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// gestion des modales
document.addEventListener('click', e => {
  const card = e.target.closest('.proj-card');
  if (card) {
    const id = card.dataset.projid;
    const dialog = document.getElementById(id);
    if (dialog) {
      dialog.showModal();
    }
  }
  if (e.target.matches('[data-close]')) {
    const dlg = e.target.closest('dialog');
    dlg.close();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }
});
