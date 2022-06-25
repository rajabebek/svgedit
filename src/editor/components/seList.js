/* globals svgEditor */
import { t } from '../locale.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
.dropdown-trigger {
  position: relative;
}

.dropdown {
  display: inline-flex;
  position: absolute;
  vertical-align: top;
}

.dropdown.is-active .dropdown-menu {
  display: block;
}

.dropdown.is-up .dropdown-menu {
  bottom: 100%;
  margin-bottom: 20px;
  padding-top: initial;
  top: auto;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 1rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 10000;
}

.dropdown-content {
  background-color: white;
  border-radius: 4px;
  padding-bottom: 1px;
  padding-top: 1px;
}

</style>
<label>Label</label>
<div class="dropdown-trigger">
<img alt="icon" style="display: block;" src="./images/linejoin_miter.svg" height="22px">
</div>
<div class="dropdown is-up">
  <div class="dropdown-menu " id="menu" role="menu">
    <div class="dropdown-content">
        <slot></slot>
    </div>
  </div>
</div>

`
/**
 * @class SeList
 */
export class SeList extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super()
    // create the shadowDom and insert the template
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.append(template.content.cloneNode(true))
    this.$dropdown = this._shadowRoot.querySelector('.dropdown-trigger')
    this.$dropdownMenu = this._shadowRoot.querySelector('.dropdown')
    this.$label = this._shadowRoot.querySelector('label')
    // this.$selection = this.$dropdown.shadowRoot.querySelector('#value')
    this.items = this.querySelectorAll('se-list-item')
    this.imgPath = svgEditor.configObj.curConfig.imgPath
  }

  /**
   * @function observedAttributes
   * @returns {any} observed
   */
  static get observedAttributes () {
    return ['label', 'width', 'height', 'title', 'value']
  }

  /**
   * @function attributeChangedCallback
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   * @returns {void}
   */
  attributeChangedCallback (name, oldValue, newValue) {
    const currentObj = this
    if (oldValue === newValue) return
    switch (name) {
      case 'title':
        this.$dropdown.setAttribute('title', t(newValue))
        break
      case 'label':
        this.$label.textContent = t(newValue)
        break
      case 'height':
        this.$dropdown.style.height = newValue
        break
      case 'width':
        this.$dropdown.style.width = newValue
        break
      case 'value':
        /*
        Array.from(this.items).forEach(function (element) {
          if (element.getAttribute('value') === newValue) {
            if (element.hasAttribute('src')) {
            // empty current selection children
              while (currentObj.$selection.firstChild) { currentObj.$selection.removeChild(currentObj.$selection.firstChild) }
              // replace selection child with image of new value
              const img = document.createElement('img')
              img.src = currentObj.imgPath + '/' + element.getAttribute('src')
              img.style.height = element.getAttribute('img-height')
              img.setAttribute('title', t(element.getAttribute('title')))
              currentObj.$selection.append(img)
            } else {
              currentObj.$selection.textContent = t(element.getAttribute('option'))
            }
          }
        })
        */
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
  get label () {
    return this.getAttribute('label')
  }

  /**
   * @function set
   * @returns {void}
   */
  set label (value) {
    this.setAttribute('label', value)
  }

  /**
   * @function get
   * @returns {any}
   */
  get width () {
    return this.getAttribute('width')
  }

  /**
   * @function set
   * @returns {void}
   */
  set width (value) {
    this.setAttribute('width', value)
  }

  /**
   * @function get
   * @returns {any}
   */
  get height () {
    return this.getAttribute('height')
  }

  /**
   * @function set
   * @returns {void}
   */
  set height (value) {
    this.setAttribute('height', value)
  }

  /**
   * @function connectedCallback
   * @returns {void}
   */
  connectedCallback () {
    const currentObj = this
    this.$dropdown.addEventListener('click', (e) => {
      this.$dropdownMenu.classList.toggle('is-active')
      console.log(e)
    })
    this.$dropdown.addEventListener('selectedindexchange', (e) => {
      if (e?.detail?.selectedIndex !== undefined) {
        const value = this.$dropdown.selectedItem.getAttribute('value')
        const closeEvent = new CustomEvent('change', { detail: { value } })
        currentObj.dispatchEvent(closeEvent)
        currentObj.value = value
        currentObj.setAttribute('value', value)
      }
    })
  }
}

// Register
customElements.define('se-list', SeList)
