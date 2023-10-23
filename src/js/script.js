const  navBar = () => {
  const menuMobile = document.querySelector('.header--navbar');
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "src/img/bx-menu.svg";
  } else{
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "src/img/bx-x.svg";
  }
  const links = document.querySelectorAll('.item--navbar');

for (const link of links) {
    link.addEventListener('click', function () {
        menuMobile.classList.remove('open')
        document.querySelector('.icon').src = "src/img/bx-menu.svg"
    })
}
}

const animaElements = document.querySelectorAll('.js-scroll');
const windowMetade = window.innerHeight * 0.62;
console.log(windowMetade)
const animate = () => {
    animaElements.forEach((anima) => {
        const animaTop = anima.getBoundingClientRect().top;
        const isAnimaElementsVisible = (animaTop - windowMetade) < 0 ;
        if(isAnimaElementsVisible){
        anima.classList.add('ativo');
        }else{
            anima.classList.remove('ativo');  
        }
    });
}

animate();

window.addEventListener('scroll', animate)