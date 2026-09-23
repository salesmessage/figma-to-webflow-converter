
(function () {
  function initAiAgentsStack() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-agents-card]'));
    if (!cards.length) return;

    cards.forEach(function (card, i) {
      var isLast = card.hasAttribute('data-agents-card-last');
      var nextCard = cards[i + 1];

      if (isLast || !nextCard) return;

      ScrollTrigger.create({
        trigger: card,
        start: 'top 10%',
        endTrigger: nextCard,
        end: 'top 10%',
        pin: true,
        pinSpacing: false
      });

      gsap.to(card, {
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 10%',
          endTrigger: nextCard,
          end: 'top 10%',
          scrub: 1
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAiAgentsStack);
  } else {
    initAiAgentsStack();
  }
  window.addEventListener('load', function () {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
})();


/* ======== NEXT SCRIPT ======== */


(function () {
  // Use Cases V3 — click a collapsed card to expand it; whichever card was
  // previously expanded collapses. Each card has an identical DOM order
  // (Label, Media, TextCol) so the swap can address children by position.
  // The case study bar shown below the row also switches to match whichever
  // card is now active, via matching data-cs-id / data-cs-for attributes.
  function initUseCasesToggle() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-usecase-card]'));
    if (!cards.length) return;
    var caseStudies = Array.prototype.slice.call(document.querySelectorAll('[data-cs-for]'));

    function setState(card, expand) {
      var media = card.children[1];
      var textcol = card.children[2];
      if (!media || !textcol) return;
      var backdrop = media.children[0];
      var illustration = media.children[1];
      var headline = textcol.children[0];
      var bodygroup = textcol.children[1];

      card.setAttribute('data-state', expand ? 'expanded' : 'collapsed');
      card.className = expand ? 'usecases-v3_card-expanded' : 'usecases-v3_card-collapsed';
      media.className = expand ? 'usecases-v3_expanded-media' : 'usecases-v3_collapsed-media';
      if (backdrop) backdrop.className = expand ? 'usecases-v3_expanded-backdrop' : 'usecases-v3_backdrop-hidden';
      if (illustration) illustration.className = expand ? 'usecases-v3_expanded-illustration' : 'usecases-v3_collapsed-media-img';
      if (headline) headline.className = expand ? 'usecases-v3_expanded-headline' : 'usecases-v3_collapsed-headline';
      if (bodygroup) bodygroup.className = expand ? 'usecases-v3_bodygroup' : 'usecases-v3_bodygroup-hidden';
    }

    function switchCaseStudy(activeId) {
      caseStudies.forEach(function (cs) {
        var matches = cs.getAttribute('data-cs-for') === activeId;
        cs.className = matches ? 'usecases-v3_casestudy' : 'usecases-v3_casestudy-hidden';
      });
    }

    function expandCard(target) {
      cards.forEach(function (card) { setState(card, card === target); });
      switchCaseStudy(target.getAttribute('data-cs-id'));
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () { expandCard(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expandCard(card);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUseCasesToggle);
  } else {
    initUseCasesToggle();
  }
})();
