import _QRCode from 'https://cdn.skypack.dev/qrjs'

export default class QRCode extends HTMLElement {
    /**
     * It sets the default attributes for the component
     */
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        Object.keys(QRCode.defaultAttributes).forEach(attribute => {
            this[attribute] = this.getAttribute(attribute) ?? QRCode.defaultAttributes[attribute]
        })
    }

    /**
     * `defaultAttributes` is a static function that returns an object with the default values for the
     * attributes of the component
     * @returns The default attributes for the class.
     */
    static get defaultAttributes() {
        return {
            data: null,
            format: 'png',
            size: 5,
            margin: 5
        }
    }

   /**
    * It returns an array of attributes that the component will observe for changes.
    * @returns An array of strings.
    */
    static get observedAttributes() {
        return ['size']
    }

    /**
     * The connectedCallback() function is called when the element is inserted into the DOM
     */
    connectedCallback() {
        this.render()
    }

    /**
     * The disconnectedCallback() function is called when the element is removed from the DOM
     */
    disconnectedCallback() {
        console.log('disconnected')
    }

    /**
     * If the attribute changes, re-render the component
     * @param attributeName - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue !== newValue) {
						this['size'] = newValue
						this.render()
				}
    }

    /**
     * It returns an object with the properties modulesize and margin.
     * @returns The options object is being returned.
     */
    getOptions() {
        const { size, margin} = this

        return {
            modulesize: size ?? Number(size),
            margin: margin ?? Number(margin)
        }
    }

    /**
     * If the format is png, then generate a png image and add it to the shadow root. If the format is
     * svg, then generate an svg image and add it to the shadow root
     */
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

/* Registering the custom element. */
window.customElements.define('qr-code', QRCode)

/* Adding an event listener to each qr-code element. When the element is clicked, the size attribute is
changed to a random number between 2 and 10. */
const nodes = document.querySelectorAll("qr-code");
nodes.forEach(node => {
  node.addEventListener('click', (e) => {
    e.target.setAttribute('size', Math.floor(Math.random() * (10 - 2) + 2))
  });
});
