import 'element-internals-polyfill'

class MyInput extends HTMLElement {
  static formAssociated = true

  internals: ElementInternals = null

  constructor() {
    super()
    const root = this.attachShadow({
      mode: 'open',
    })

    const input: HTMLInputElement = document.createElement('input')
    input.type = 'text'
    input.required = true
    root.appendChild(input)

    this.internals = this.attachInternals()

    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement
      this.internals.setFormValue(target.value)
    })
  }

  get form() {
    return this.internals.form
  }

  get name() {
    return this.getAttribute('name')
  }
}

class MyButton extends HTMLElement {
  static formAssociated = true
  internals: ElementInternals = null

  constructor() {
    super()
    const root = this.attachShadow({
      mode: 'open',
    })

    const button: HTMLButtonElement = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Custom Button Submit'
    root.appendChild(button)

    this.internals = this.attachInternals()

    button.addEventListener('click', (event) => {
      this.internals.form.requestSubmit()
    })
  }
}

class MyButton2 extends HTMLElement {
  static formAssociated = true
  internals: ElementInternals = null

  constructor() {
    super()
    const root = this.attachShadow({
      mode: 'open',
    })

    const button: HTMLButtonElement = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Custom Button 2 Submit'
    root.appendChild(button)

    this.internals = this.attachInternals()

    button.addEventListener('click', (event) => {
      const form = findParentForm(this)
      form.requestSubmit()
    })
  }
}

function findParentForm(element: HTMLElement): HTMLFormElement {
  let el = element.parentElement

  while (el != null && el.tagName.toLowerCase() !== 'form') {
    el = el.parentElement
  }

  return el as HTMLFormElement
}

customElements.define('my-input', MyInput)
customElements.define('my-button', MyButton)
customElements.define('my-button2', MyButton2)

const form: HTMLFormElement = document.querySelector('form')

form.addEventListener('submit', () => {
  console.log('submit form')
})
