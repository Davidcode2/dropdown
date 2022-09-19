import css from './css/style.css';

class DropDown {
  makeDropDownButton() {
    const dropDownButton = document.querySelector('.dropdown');
    const menu = document.querySelectorAll('.dropdown ~ li');
    dropDownButton.addEventListener('click', this.toggleMenu.bind(this));
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
      siblings.forEach((elem) => {
        elem.style.visibility = 'hidden';
      });
    } else {
      siblings.forEach((elem) => {
        elem.style.visibility = 'visible';
      });
    }
  }
}

const myDropDown = new DropDown();
myDropDown.makeDropDownButton();
