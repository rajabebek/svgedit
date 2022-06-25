/* globals svgEditor */
import { t } from '../locale.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
  .dropdown-item {
    color: #4a4a4a;
    display: block;
    position: relative;
  }
  
  .dropdown-divider {
    background-color: #ededed;
    border: none;
    display: block;
    height: 1px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  </style>
  <div class="dropdown-item">
    <img alt="icon" />
    <slot></slot>
  </div>
  <hr class="dropdown-divider">
`
/**
 * @class SeMenu
 */
export class SeListItem extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super()
    // create the shadowDom and insert the template
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.append(template.content.cloneNode(true))
    this.$menuitem = this._shadowRoot.querySelector('.dropdown-item')
    this.$img = this._shadowRoot.querySelector('img')
    this.$img.setAttribute('style', 'display: none;')
    this.imgPath = svgEditor.configObj.curConfig.imgPath
  }

  /**
   * @function observedAttributes
   * @returns {any} observed
   */
  static get observedAttributes () {
    return ['option', 'src', 'title', 'img-height']
  }

  /**
   * @function attributeChangedCallback
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   * @returns {void}
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (name) {
      case 'option':
        this.$menuitem.setAttribute('option', newValue)
        this.$menuitem.textContent = t(newValue)
        break
      case 'src':
        this.$img.setAttribute('style', 'display: block;')
        this.$img.setAttribute('src', this.imgPath + '/' + newValue)
        break
      case 'title':
        this.$img.setAttribute('title', t(newValue))
        break
      case 'img-height':
        this.$img.setAttribute('height', newValue)
        break
      default:
        console.error(`unknown attribute: ${name}`)
        break
    }
  }

  /**
   * @function get
   * @returns {any}
   */
  get option () {
    return this.getAttribute('option')
  }

  /**
   * @function set
   * @returns {void}
   */
  set option (value) {
    this.setAttribute('option', value)
  }

  /**
   * @function get
   * @returns {any}
   */
  get title () {
    return this.getAttribute('title')
  }

  /**
   * @function set
   * @returns {void}
   */
  set title (value) {
    this.setAttribute('title', value)
  }

  /**
   * @function get
   * @returns {any}
   */
  get imgHeight () {
    return this.getAttribute('img-height')
  }

  /**
   * @function set
   * @returns {void}
   */
  set imgHeight (value) {
    this.setAttribute('img-height', value)
  }

  /**
   * @function get
   * @returns {any}
   */
  get src () {
    return this.getAttribute('src')
  }

  /**
   * @function set
   * @returns {void}
   */
  set src (value) {
    this.setAttribute('src', value)
  }
}

// Register
customElements.define('se-list-item', SeListItem)
