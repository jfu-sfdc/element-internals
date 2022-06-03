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

customElements.define('my-input', MyInput)
customElements.define('my-button', MyButton)

const form: HTMLFormElement = document.querySelector('form')

form.addEventListener('submit', () => {
  console.log('submit form')
})
