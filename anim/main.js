const container = document.querySelector('.main')
const front = document.querySelector('.front')
const back = document.querySelector('.back')

front.addEventListener('click', e => {
  console.log(e.target.classList.toggle('out'))
  back.classList.toggle('out-back')
})

front.addEventListener('animationend', e=> {
  container.removeChild(front);
})

