// svgs
class SVG extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        
        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#8a8a8a"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="4 6"
                  />
                </svg>

        `;
  }
}



customElements.define('check-svg', SVG);
