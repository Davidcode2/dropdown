import css from './css/style.css';

class DropDown {
  makeDropDownButton() {
    const dropDownButtons = document.querySelectorAll('.dropdown');
    dropDownButtons.forEach((button) => button.addEventListener('click', this.toggleMenu.bind(this)));
  }

  getAllSiblings(element) {
    const siblings = [];
    let elementCopy = element;
    while (elementCopy.nextElementSibling) {
      siblings.push(elementCopy.nextElementSibling);
      elementCopy = elementCopy.nextElementSibling;
    }
    return siblings;
  }

  toggleMenu(event) {
    event.target.classList.toggle('active');
    const siblings = this.getAllSiblings(event.target);
    if (event.target.classList.contains('active')) {
      for (let i = 1; i <= siblings.length; i++) {
        setTimeout(() => {
          siblings[siblings.length - i].style.visibility = 'hidden';
          siblings[siblings.length - i].style.opacity = '0';
          siblings[siblings.length - i].style.transition = 'visibility 0.2s linear, opacity 0.2s linear';
        }, i * 50);
      }
    } else {
      siblings.forEach((elem, index) => {
        setTimeout(() => {
          elem.style.visibility = 'visible';
          elem.style.opacity = '1';
        }, index * 20);
      });
    }
  }
}

const myDropDown = new DropDown();
myDropDown.makeDropDownButton();
