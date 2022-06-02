export {}

declare global {
  interface ElementInternals {
    setFormValue(value: string): void
    form: HTMLFormElement
  }
}
