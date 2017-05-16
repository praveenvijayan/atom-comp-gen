'use babel';

export default class CompgenView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('compgen');

    // Create message element
    const message = document.createElement('div');
    const cmdInput = document.createElement('input');
    message.textContent = 'Add Packages';
    message.classList.add('message');
    cmdInput.classList.add('command');
    cmdInput.classList.add('native-key-bindings');
    this.element.appendChild(message);
    this.element.appendChild(cmdInput);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  

}
