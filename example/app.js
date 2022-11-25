const SIZES = {
    small: '24px',
    medium: '58px',
    large: '116px'
}

class WebComponent extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({mode: 'open'})
    }

    disconnectedCallback() {
        console.log('disconnected')
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log({attributeName, oldValue, newValue})
    }

    connectedCallback() {

        const social = this.getAttribute('social')
        const username = this.getAttribute('username')
        const size = this.getAttribute('size') ?? 'medium'
        const cssSize = SIZES[size] ?? 'medium'


        const parts = [social, username]
            .filter(Boolean)
            .join('/')

        this.shadowRoot.innerHTML = `
            <style>
                img {
                    border-radius: 9999px;
                    aspect-ratio: 1/1;
                    width: ${cssSize}
                }
            </style>
            <img src='https://unavatar.io/${parts}' />
        `
    }
}

window.customElements.define('web-component', WebComponent)