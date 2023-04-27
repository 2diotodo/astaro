/*
    @h0rn0chse/night-sky - dist/bundle.min.js
    version 1.0.5 - built at 2022-02-26T19:15:22.140Z
    @license MIT
*/
!(function () {
  const t = document.createElement("template");
  t.innerHTML =
    "<style>#container{width:100%;height:100%;background:radial-gradient(ellipse at bottom,#1b2735 0,#090a0f 100%);overflow:hidden}</style>";
  class e extends HTMLElement {
    static get observedAttributes() {
      return ["layers", "density", "starcolor", "velocity"];
    }
    connectedCallback() {
      this.attachShadow({
        mode: "open",
      }),
        this.shadowRoot.appendChild(t.content.cloneNode(!0)),
        (this._styles = document.createElement("style")),
        this.shadowRoot.appendChild(this._styles),
        (this._container = document.createElement("div")),
        (this._container.id = "container"),
        this.shadowRoot.appendChild(this._container),
        this.recalculateStyles(),
        (this._observer = new ResizeObserver(this._handleResize.bind(this))),
        this._observer.observe(this._container);
    }
    _handleResize() {
      this._timer && clearTimeout(this._timer),
        (this._timer = setTimeout(() => {
          (this._timer = null), this.recalculateStyles();
        }, 200));
    }
    attributeChangedCallback(t, e, s) {
      if (null != s && e !== s) {
        switch (t) {
          case "starcolor":
            this.setAttribute(t, s);
            break;
          case "layers":
          case "density":
          case "velocity":
            this.setAttribute(t, parseInt(s, 10));
            break;
          default:
            throw new Error(`The property ${t} is not supported`);
        }
        this.shadowRoot && this.recalculateStyles();
      }
    }
    getOptions() {
      const t = {
        starColor: this.getAttribute("starcolor") || "#FFF",
        layerCount: parseInt(this.getAttribute("layers"), 10) || 3,
        layers: [],
        density: parseInt(this.getAttribute("density"), 10) || 50,
        velocity: parseInt(this.getAttribute("velocity"), 10) || 60,
        width: parseInt(this._container.clientWidth, 10),
        height: parseInt(this._container.clientHeight, 10),
      };
      let e = ((t.width * t.height) / 2073600) * t.density;
      for (let s = 0; s < t.layerCount; s++) {
        e *= 2;
        const s = [];
        for (let n = 0; n < e; n++) {
          const e = {
            x: Math.round(Math.random() * t.width),
            y: Math.round(Math.random() * t.height),
          };
          s.push(e);
        }
        t.layers.push(s);
      }
      return (t.baseSpeed = t.height * (1 / Math.abs(t.velocity))), t;
    }
    recalculateStyles() {
      const t = this.getOptions(),
        e = JSON.parse(JSON.stringify(t));
      if (
        (delete e.layers,
        JSON.stringify(e) !== JSON.stringify(this._lastOptions))
      ) {
        (this._lastOptions = e),
          (this._styles.innerHTML = (function (t) {
            let e = "";
            return (
              t.layers.forEach((s, n, i) => {
                const r = t.layers.length - n,
                  a = s.reduce(
                    (e, s, n, i) =>
                      e +
                      `${s.x}px ${s.y}px ${t.starColor}${
                        n < i.length - 1 ? "," : ""
                      }\n`,
                    ""
                  );
                e += `\n        #stars${n} {\n            width: ${r}px;\n            height: ${r}px;\n            background: transparent;\n            box-shadow: ${a};\n            animation: animStar ${
                  t.baseSpeed * (n + 1)
                }s linear infinite;\n        }\n        #stars${n}:after {\n            content: " ";\n            position: absolute;\n            top: ${
                  t.height
                }px;\n            width: ${r}px;\n            height: ${r}px;\n            background: transparent;\n            box-shadow: ${a};\n        }\n        `;
              }),
              (e += `\n    @keyframes animStar {\n        from {\n            transform: translateY(${
                t.velocity > 0 ? 0 : -t.height
              }px);\n        }\n        to {\n            transform: translateY(${
                t.velocity > 0 ? -t.height : 0
              }px);\n        }\n    }\n    `),
              e
            );
          })(t)),
          this._container.querySelectorAll(".stars").forEach((t) => {
            t.remove();
          });
        for (let e = 0; e < t.layerCount; e++) {
          const t = document.createElement("div");
          (t.id = `stars${e}`),
            t.classList.add("stars"),
            this._container.appendChild(t);
        }
      }
    }
  }
  window.customElements.define("night-sky", e);
})();