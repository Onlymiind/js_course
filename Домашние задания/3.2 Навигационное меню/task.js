prevActiveMenu = null;

menus = Array.from(document.getElementsByClassName('menu__link'));
for (let elem of menus) {
  elem.onclick = () => {
    parent = elem.closest('.menu__item');
    menuElem = parent.querySelector('.menu_sub');
    if (prevActiveMenu !== null)
      prevActiveMenu.classList.remove('menu_active');
    if (menuElem === null)
      return true;
    menuElem.classList.add('menu_active');
    prevActiveMenu = menuElem;
    return false;
  };
}
