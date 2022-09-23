import css from './css/style.css';

class DropDown {
  makeDropDownButton() {
    const dropDownButtons = document.querySelectorAll('.dropdown');
    dropDownButtons.forEach((button) => {
      if (Array.from(button.classList).includes('dropdown-hover')) {
        button.addEventListener('mouseenter', this.toggleMenu.bind(this));
        button.parentNode.addEventListener(
          'mouseleave',
          this.toggleMenuOnMouseOut.bind(this),
        );
      } else {
        button.addEventListener('click', this.toggleMenu.bind(this));
      }
      console.log(button.classList);
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
      target.classList.toggle('active');
      const siblings = this.getAllSiblings(target);
      if (target.classList.contains('active')) {
        this.animationFoldIn(siblings);
      } else {
        this.animationFoldOut(siblings);
      }
    }
  }

  toggleMenuOnMouseOut(event) {
    const target = this.getEventTarget(event);
    target.firstElementChild.classList.remove('active');
    const { children } = target;
    this.animationFoldOut(children);
  }

  animationFoldOut(siblings) {
    for (let i = 1; i <= siblings.length; i++) {
      setTimeout(() => {
        if (
          !Array.from(siblings[siblings.length - i].classList).includes(
            'dropdown',
          )
        ) {
          siblings[siblings.length - i].style.visibility = 'hidden';
          siblings[siblings.length - i].style.opacity = '0';
          siblings[siblings.length - i].style.transition = 'visibility 0.2s linear, opacity 0.2s linear';
        }
      }, i * 50);
    }
  }

  animationFoldIn(siblings) {
    siblings.forEach((elem, index) => {
      setTimeout(() => {
        elem.style.visibility = 'visible';
        elem.style.opacity = '1';
      }, index * 20);
    });
  }
}

const myDropDown = new DropDown();
myDropDown.makeDropDownButton();
