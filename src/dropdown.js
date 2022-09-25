export default class DropdownButton {
  FOLD_OUT_ANIMATION_STEP_MILLI_SEC = 0;

  FOLD_IN_ANIMATION_STEP_MILLI_SEC = 0;

  classArguments = [];

  menuRootElement;

  constructor(button) {
    this.menuRootElement = button;
  }

  init() {
    this.collectAnimationOptions(this.menuRootElement);
    this.classArguments.push('expanded');
    if (Array.from(this.menuRootElement.classList).includes('dropdown-hover')) {
      this.menuRootElement.addEventListener(
        'mouseenter',
        this.toggleMenuOnMouseIn.bind(this),
      );
      this.menuRootElement.parentNode.addEventListener(
        'mouseleave',
        this.toggleMenuOnMouseOut.bind(this),
      );
    } else {
      this.menuRootElement.addEventListener('click', this.toggleMenu.bind(this));
    }
  }

  collectAnimationOptions(element) {
    const targetClassList = Array.from(element.classList);
    if (targetClassList.includes('dropdown-step')) {
      this.FOLD_IN_ANIMATION_STEP_MILLI_SEC = 30;
      this.FOLD_OUT_ANIMATION_STEP_MILLI_SEC = 10;
      if (targetClassList.includes('fade')) {
        this.classArguments.push('fade');
      }
    }
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
    const siblings = this.getAllSiblings(target);
    if (target.classList.contains('active')) {
      this.animationFoldIn(siblings, this.rollIn.bind(this));
    } else {
      this.animationFoldOut(siblings, this.rollOut.bind(this));
    }
    target.classList.toggle('active');
  }

  toggleMenuOnMouseIn(event) {
    const target = this.getEventTarget(event);
    const siblings = this.getAllSiblings(target);
    this.animationFoldOut(siblings, this.rollOut.bind(this));
  }

  toggleMenuOnMouseOut(event) {
    const target = this.getEventTarget(event);
    target.firstElementChild.classList.remove('active');
    this.animationFoldIn(Array.from(target.children), this.rollIn.bind(this));
  }

  animationFoldOut(siblings, callback) {
    Array.from(siblings).forEach((elem, index) => callback(elem, index));
  }

  rollOut(elem, index) {
    setTimeout(() => {
      elem.classList.add(...this.classArguments);
    }, index * this.FOLD_OUT_ANIMATION_STEP_MILLI_SEC);
  }

  animationFoldIn(siblings, callback) {
    const reversedSiblings = siblings.reverse();
    reversedSiblings.forEach((elem, index) => callback(elem, index));
  }

  rollIn(elem, i) {
    setTimeout(() => {
      if (!Array.from(elem.classList).includes('dropdown')) {
        elem.classList.remove(...this.classArguments);
      }
    }, i * this.FOLD_IN_ANIMATION_STEP_MILLI_SEC);
  }
}
