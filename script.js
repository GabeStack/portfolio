function navBar() {
  let menuMobile = document.querySelector('.header--navbar');
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
