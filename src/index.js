import css from './css/style.css';

class DropDown {
  makeDropDownButton() {
    const dropDownButtons = document.querySelectorAll('.dropdown');
    dropDownButtons.forEach((button) => {
      if (Array.from(button.classList).includes('dropdown-hover')) {
        button.addEventListener('mouseenter', this.toggleMenuOnMouseIn.bind(this));
        button.parentNode.addEventListener(
          'mouseleave',
          this.toggleMenuOnMouseOut.bind(this),
        );
      } else {
        button.addEventListener('click', this.toggleMenu.bind(this));
      }
    });
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

  getEventTarget(event) {
    return event.target;
  }

  toggleMenu(event) {
    const target = this.getEventTarget(event);
    const targetClassList = Array.from(target.classList);
    if (targetClassList.includes('dropdown')) {
      const siblings = this.getAllSiblings(target);
      if (target.classList.contains('active')) {
        this.animationFoldIn(siblings, this.rollIn);
      } else {
        this.animationFoldOut(siblings, this.rollOut);
      }
      target.classList.toggle('active');
    }
  }

  toggleMenuOnMouseIn(event) {
    const target = this.getEventTarget(event);
    const siblings = this.getAllSiblings(target);
    this.animationFoldOut(siblings, this.rollOut);
  }

  toggleMenuOnMouseOut(event) {
    const target = this.getEventTarget(event);
    target.firstElementChild.classList.remove('active');
    this.animationFoldIn(Array.from(target.children), this.rollIn);
  }

  animationFoldOut(siblings, callback) {
    Array.from(siblings).forEach((elem, index) => callback(elem, index));
  }

  rollOut(elem, index) {
    setTimeout(() => {
      elem.classList.add('expanded');
    }, index * 20);
  }

  animationFoldIn(siblings, callback) {
    const reversedSiblings = siblings.reverse();
    reversedSiblings.forEach((elem, index) => callback(elem, index));
  }

  rollIn(elem, i) {
    setTimeout(() => {
      if (!Array.from(elem.classList).includes('dropdown')) {
        elem.classList.remove('expanded');
      }
    }, i * 50);
  }


}

const myDropDown = new DropDown();
myDropDown.makeDropDownButton();
