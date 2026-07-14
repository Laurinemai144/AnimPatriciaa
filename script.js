/* ==========================================================================
   AnimPatricia — Script principal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 400);
  });
  // Sécurité si 'load' a déjà été déclenché
  setTimeout(() => loader.classList.add('done'), 1800);

  /* ---------- Année footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar au scroll + progress bar ---------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Menu hamburger mobile ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileOverlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
  mobileOverlay.addEventListener('click', () => toggleMenu(false));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .thread-divider');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const duration = 1400;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;
      const tick = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = Math.floor(current);
          requestAnimationFrame(() => setTimeout(tick, stepTime));
        }
      };
      tick();
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  /* ---------- Témoignages ---------- */
  const testimonials = [
    { name: 'Camille D.', place: 'Paris, France', animal: 'chatte Mimi', text: "Grâce à cette séance, j'ai enfin compris pourquoi Mimi refusait de manger. Un moment bouleversant de justesse." },
    { name: 'Julien M.', place: 'Lyon, France', animal: 'chien Rex', text: "Patricia a mis des mots sur l'anxiété de Rex depuis notre déménagement. Nous avons pu l'accompagner autrement." },
    { name: 'Sophie L.', place: 'Bruxelles, Belgique', animal: 'cheval Storm', text: "Une écoute incroyable de mon cheval. Les détails partagés étaient d'une précision troublante." },
    { name: 'Marc T.', place: 'Genève, Suisse', animal: 'chat Léo', text: "Séance à distance très professionnelle. J'ai reçu un compte-rendu clair et bienveillant." },
    { name: 'Anaïs F.', place: 'Luxembourg', animal: 'lapine Câline', text: "Je ne savais pas à quoi m'attendre, et j'ai été touchée par la justesse des ressentis partagés." },
    { name: 'Nicolas B.', place: 'Marseille, France', animal: 'chien Balto', text: "Un vrai soulagement de comprendre pourquoi Balto grognait la nuit. Merci pour cet accompagnement." },
    { name: 'Elodie R.', place: 'Monaco', animal: 'chat Nala', text: "La communication à distance a permis de comprendre le mal-être de Nala après notre séparation." },
    { name: 'Thomas V.', place: 'Toulouse, France', animal: 'perruche Pixel', text: "Je ne pensais pas qu'on pouvait 'lire' un oiseau à ce point. Une expérience surprenante et douce." },
    { name: 'Claire P.', place: 'Liège, Belgique', animal: 'chien Oups', text: "Patricia nous a aidés à préparer Oups à l'arrivée du bébé. Tout s'est très bien passé." },
    { name: 'Pauline G.', place: 'Nantes, France', animal: 'chat Simba', text: "Un accompagnement précieux lors du départ de Simba. Une présence rassurante dans ce moment difficile." },
    { name: 'Vincent C.', place: 'Lausanne, Suisse', animal: 'cheval Duke', text: "Séance très professionnelle, avec des observations qui correspondaient parfaitement au comportement de Duke." },
    { name: 'Laura N.', place: 'Bordeaux, France', animal: 'chatte Olive', text: "J'ai adoré la douceur de l'échange. Patricia a su transmettre les émotions d'Olive avec justesse." },
    { name: 'Antoine S.', place: 'Namur, Belgique', animal: 'chien Iggy', text: "La recherche de notre chien perdu a été un vrai soutien moral, même dans l'incertitude." },
    { name: 'Marion K.', place: 'Strasbourg, France', animal: 'lapin Théo', text: "Des conseils personnalisés qui ont vraiment amélioré le quotidien de Théo." },
    { name: 'Hugo D.', place: 'Monaco', animal: 'chat Milo', text: "Une expérience apaisante, menée avec beaucoup de professionnalisme et de tact." },
  ];

  const track = document.getElementById('testimonialTrack');
  testimonials.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-person">
        <div class="testimonial-avatar" style="background:linear-gradient(135deg,var(--sage),var(--forest));display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-style:italic;">${t.name.charAt(0)}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-meta">${t.place} · avec ${t.animal}</div>
        </div>
      </div>`;
    track.appendChild(card);
  });

  document.getElementById('tPrev').addEventListener('click', () => {
    track.scrollBy({ left: -340, behavior: 'smooth' });
  });
  document.getElementById('tNext').addEventListener('click', () => {
    track.scrollBy({ left: 340, behavior: 'smooth' });
  });

  /* ---------- Galerie : filtres + lightbox ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hide', !show);
      });
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src.replace('w=500', 'w=1200');
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

  /* ---------- FAQ ---------- */
  const faqData = [
    { q: "Qu'est-ce que la communication animale ?", a: "C'est une approche intuitive qui permet d'entrer en connexion avec le ressenti d'un animal, au-delà du langage verbal, pour mieux comprendre ses émotions et ses besoins." },
    { q: "La communication à distance fonctionne-t-elle vraiment ?", a: "Oui : la connexion intuitive ne dépend pas de la distance physique. Une photo récente et quelques informations suffisent." },
    { q: "Combien de temps dure une séance ?", a: "Une séance dure en moyenne 45 minutes à 1 heure, compte-rendu inclus." },
    { q: "Est-ce que cela remplace un vétérinaire ?", a: "Non, en aucun cas. La communication animale est un complément à un suivi vétérinaire, jamais un substitut à un avis médical." },
    { q: "Comment se préparer avant une séance ?", a: "Il suffit d'envoyer une photo récente de votre animal ainsi qu'un contexte sur la situation qui vous préoccupe." },
    { q: "Puis-je poser des questions précises à mon animal ?", a: "Tout à fait, vous pouvez me transmettre une liste de questions que je transmettrai lors de la connexion." },
    { q: "Les résultats sont-ils garantis ?", a: "Comme toute approche intuitive, aucun résultat ne peut être garanti à 100%, mais chaque séance est menée avec sérieux et sincérité." },
    { q: "Travaillez-vous avec tous les animaux ?", a: "Oui : chats, chiens, chevaux, lapins, oiseaux, NAC... toute connexion consciente est possible." },
    { q: "Que se passe-t-il si mon animal est décédé ?", a: "Un accompagnement de deuil est possible pour vous aider à traverser cette étape, en douceur et avec respect." },
    { q: "Combien coûte une séance ?", a: "Les tarifs varient de 45€ à 70€ selon le type de service, précisés dans la section Services." },
    { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire, virement et paiement en ligne sécurisé sont proposés lors de la réservation." },
    { q: "Proposez-vous des séances en présentiel ?", a: "Oui, en Île-de-France. Pour les autres régions et pays, la communication à distance est privilégiée." },
    { q: "Puis-je annuler ou reporter un rendez-vous ?", a: "Bien sûr, il suffit de me prévenir au moins 24h à l'avance par email ou téléphone." },
    { q: "La confidentialité est-elle garantie ?", a: "Absolument, chaque échange reste strictement confidentiel entre vous et moi." },
    { q: "Comment se déroule la recherche d'un animal perdu ?", a: "Je me connecte intuitivement à l'animal pour tenter de percevoir son environnement, en complément des recherches actives sur le terrain." },
    { q: "Est-ce adapté aux animaux âgés ?", a: "Tout à fait, c'est même souvent l'occasion de mieux comprendre leurs besoins en fin de vie." },
    { q: "Puis-je offrir une séance en cadeau ?", a: "Oui, des bons cadeaux sont disponibles sur simple demande par email." },
    { q: "Faut-il que mon animal soit présent lors d'une séance à distance ?", a: "Non, ce n'est pas nécessaire : la photo et la connexion intuitive suffisent." },
    { q: "Proposez-vous un suivi après la séance ?", a: "Oui, un suivi peut être mis en place selon vos besoins et ceux de votre animal." },
    { q: "Comment vous contacter pour toute autre question ?", a: "Via le formulaire de contact ci-dessous, par email ou par téléphone : je réponds personnellement à chaque message." },
  ];

  const faqList = document.getElementById('faqList');
  faqData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon"></span>
      </button>
      <div class="faq-answer"><p>${item.a}</p></div>`;
    faqList.appendChild(el);

    const btn = el.querySelector('.faq-question');
    const answer = el.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      // Ferme les autres
      faqList.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-answer').style.maxHeight = null;
        open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        el.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Formulaire de contact ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formStatus.textContent = 'Merci de compléter tous les champs obligatoires.';
      formStatus.className = 'form-status error';
      return;
    }
    formStatus.textContent = 'Merci ! Votre message a bien été envoyé, je reviens vers vous rapidement.';
    formStatus.className = 'form-status success';
    showToast('Message envoyé avec succès 🐾');
    form.reset();
  });

  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Merci pour votre inscription à la newsletter 🐾');
    newsletterForm.reset();
  });

  /* ---------- Toast ---------- */
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* ---------- Curseur personnalisé (desktop uniquement) ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!isTouch) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .gallery-item, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1.6)');
      el.addEventListener('mouseleave', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  } else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  /* ---------- Effet machine à écrire sur le slogan du hero (subtil, une fois) ---------- */
  // Volontairement omis en excès pour rester sobre : le titre reste statique
  // afin de ne pas nuire au LCP / SEO. Le mouvement est concentré sur le hero-glow
  // et le fil de lumière, qui portent la signature du site.

});
