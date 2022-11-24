import _QRCode from 'https://cdn.skypack.dev/qrjs'

export default class QRCode extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        Object.keys(QRCode.defaultAttributes).forEach(attribute => {
            this[attribute] = this.getAttribute(attribute) ?? QRCode.defaultAttributes[attribute]
        })
    }

    static get defaultAttributes () {
        return {
            data: null,
            format: 'png',
            size: 5,
            margin: 5
        }
    }

    static get observedAttributes () {
        return [data, format, size, margin]
    }

    connectedCallback() {
        this.render()
    }

    getOptions() {
        const { size, margin} = this

        return {
            modulesize: size ?? Number(size),
            margin: margin ?? Number(margin)
        }
    }

    render() {
        if (this.format === 'png') {
            const src = _QRCode.generatePNG(this.data, this.getOptions())
            this.shadowRoot.innerHTML = `
                <img src='${src}' />
            `
        }
       

        if (this.format === 'svg') {
            const svg = _QRCode.generateSVG(this.data, this.getOptions())
            this.shadowRoot.appendChild(svg)
        }
    }
}

window.customElements.define('qr-code', QRCode)