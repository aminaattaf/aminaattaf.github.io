document.addEventListener('DOMContentLoaded', function () {

  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Ouverture des fiches projets
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var modal = document.getElementById(trigger.dataset.modal);
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }
    });
  });

  document.querySelectorAll('dialog.proj-modal').forEach(function (modal) {
    var closeBtn = modal.querySelector('[data-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modal.close();
      });
    }
    // Fermeture au clic sur le fond
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  });

  // Filtres par domaine
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.projects-grid .proj-card');

  function applyFilter(filter) {
    cards.forEach(function (card) {
      var tags = (card.dataset.tags || '').split(' ');
      var match = filter === 'tous' || tags.indexOf(filter) !== -1;
      card.classList.toggle('hidden', !match);
    });

    // On masque aussi l'intitulé d'un groupe devenu vide
    document.querySelectorAll('[data-group-grid]').forEach(function (grid) {
      var visible = grid.querySelectorAll('.proj-card:not(.hidden)').length;
      var heading = grid.previousElementSibling;
      grid.classList.toggle('hidden', visible === 0);
      if (heading && heading.hasAttribute('data-group')) {
        heading.classList.toggle('hidden', visible === 0);
      }
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === chip));
      });
      applyFilter(chip.dataset.filter);
    });
  });

  // Si une image manque, on garde un cadre neutre plutôt qu'une icône cassée
  document.querySelectorAll('.proj-thumb img, .feedback-image img, .hero-visual img').forEach(function (img) {
    img.addEventListener('error', function () {
      var box = img.closest('.proj-thumb');
      if (box) {
        box.classList.add('is-empty');
      }
      img.remove();
    });
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  // Adresse recomposée à l'affichage : elle n'apparaît pas en clair dans le source
  var mailLink = document.getElementById('mail');
  if (mailLink) {
    var user = 'aminaattaf31';
    var domain = 'gmail.com';
    mailLink.textContent = user + '@' + domain;
    mailLink.setAttribute('href', 'mailto:' + user + '@' + domain);
  }

});