// Année dynamique dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Gestion des modales - Ouverture au clic sur une carte
document.addEventListener('click', function(e) {
  // Ouverture de modal au clic sur une carte projet
  const card = e.target.closest('.proj-card');
  if(card) {
    const projectId = card.dataset.projid;
    const dialog = document.getElementById(projectId);
    
    if(dialog) {
      dialog.showModal();
    }
    return;
  }

  // Fermeture de modal au clic sur le bouton close
  const closeBtn = e.target.closest('[data-close]');
  if(closeBtn) {
    const dialog = closeBtn.closest('dialog.proj-modal');
    if(dialog) {
      dialog.close();
    }
  }
});

// Fermeture au clic sur le backdrop (en dehors de la modale)
document.querySelectorAll('dialog.proj-modal').forEach(dialog => {
  dialog.addEventListener('click', function(e) {
    const rect = dialog.getBoundingClientRect();
    
    // Vérifier si le clic est en dehors du contenu de la modale
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
});

// Fermeture avec la touche Échap (déjà natif avec showModal mais on le garde pour compatibilité)
document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape') {
    document.querySelectorAll('dialog.proj-modal[open]').forEach(dialog => {
      dialog.close();
    });
  }
});
