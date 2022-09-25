import css from './css/style.css';
import DropdownButton from './dropdown';

class DropDown {
  getDropdownElements() {
    const dropDownButtons = document.querySelectorAll('.dropdown');
    return dropDownButtons;
  }

  makeDropDown(dropDownButtons) {
    dropDownButtons.forEach((button) => {
      const dropdownMenu = new DropdownButton(button);
      dropdownMenu.init();
    });
  }

}

const myDropDown = new DropDown();
let menuButtons = myDropDown.getDropdownElements();
myDropDown.makeDropDown(menuButtons);
