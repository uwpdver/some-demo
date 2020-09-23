var card = document.querySelector('.c-card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
  document.querySelector('.c-card__face--back').classList.toggle('c-card__face--flipped');
});