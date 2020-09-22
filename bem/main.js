var card = document.querySelector('.c-card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
  document.querySelector('.c-card__desc--back').classList.toggle('c-card__desc--flipped');
});