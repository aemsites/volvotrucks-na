"use strict";(self.webpackChunkvolvotrucks_na=self.webpackChunkvolvotrucks_na||[]).push([[325],{1669:(e,t,i)=>{i.d(t,{FB:()=>d,IT:()=>l,UN:()=>c,gI:()=>n,zQ:()=>a});var o=i(8128),r=i(2618),s=i(2326);const n=r.AH`
  slot {
    display: inline;
    font-synthesis: none;
    margin: 0;
  }

  ::slotted(*) {
    font-synthesis: none;
    margin: 0;
  }
`,a=(e,t="small")=>{const i=(0,s.A)(e);return r.AH`
    font-family: var(
      --vcdk-typography-${(0,r.iz)(i)}-font-family-${(0,r.iz)(t)}-screens
    );
    font-size: var(
      --vcdk-typography-${(0,r.iz)(i)}-size-${(0,r.iz)(t)}-screens
    );
    line-height: var(
      --vcdk-typography-${(0,r.iz)(i)}-line-height-${(0,r.iz)(t)}-screens
    );
    letter-spacing: var(
      --vcdk-typography-${(0,r.iz)(i)}-letter-spacing-${(0,r.iz)(t)}-screens
    );
    font-weight: var(
      --vcdk-typography-${(0,r.iz)(i)}-weight-${(0,r.iz)(t)}-screens
    );
  `},l=["display-statement","display1","display2","heading1","heading2","heading3","heading4","subtitle1","subtitle2","large-body","body","button","caption1","caption2"].reduce((e,t)=>(e[t]=r.AH`
      .typography-${(0,r.iz)(t)},
        .typography-${(0,r.iz)(t)}
        ::slotted(*) {
        ${a(t,"small")}
      }
      @media (min-width: ${o.f.md.from}px) {
        .typography-${(0,r.iz)(t)},
          .typography-${(0,r.iz)(t)}
          ::slotted(*) {
          ${a(t,"large")}
        }
      }
    `,e),{}),d=Object.values(l),c=(e,t)=>{const i="font-size"===t?"size":t,o=(0,s.A)(e);return[`var(--vcdk-typography-${o}-${i}-small-screens)`,`var(--vcdk-typography-${o}-${i}-large-screens)`]}},2871:(e,t,i)=>{i.d(t,{l:()=>v});var o=i(767);const r=["volvo","mack","renault"];function s(e){return e.includes("light")?e.replace("light","dark"):e.replace("dark","light")}var n=i(2618),a=i(352),l=i(2302);const d=(0,o.q6)(Symbol("vcdk-theme"));if("undefined"!=typeof document){const e=new o.aU,t=()=>e.attach(document.body);document.body?t():document.addEventListener("DOMContentLoaded",t)}const c=n.AH`
  :host {
    --vcdk-z-index-zero: 0;
    --vcdk-z-index-over-input: 1;
    --vcdk-z-index-switch-thumb: 2;
    --vcdk-z-index-switch-input: 3;
    --vcdk-z-index-time-picker-popover: 15;
    --vcdk-z-index-search-popover: 20;
    --vcdk-z-index-drawer: 50;
    --vcdk-z-index-bottom-navigation: 50;
    --vcdk-z-index-banner: 60;
    --vcdk-z-index-modal-backdrop: 90;
    --vcdk-z-index-modal: 100;
    --vcdk-z-index-tooltip: 1000;
    --vcdk-z-index-dropdown-popover: 1100;
    --vcdk-z-index-context-menu: 1200;
    --vcdk-z-index-context-sub-menu: 1210;
    --vcdk-z-index-datepicker-overlay: 1300;
    --vcdk-z-index-calendar-overlay: 1305;
    --vcdk-z-index-snackbar: 1310;

    --vcdk-shadow-one:
      0px 0.2px 2px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2)),
      0px 1px 2px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2));
    --vcdk-shadow-two:
      0px 0.2px 2px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2)),
      0px 2px 4px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2));
    --vcdk-shadow-four:
      0px 0.3px 2px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2)),
      0px 3px 8px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2));
    --vcdk-shadow-eight:
      0px 0.6px 3px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2)),
      0px 8px 16px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2));
    --vcdk-shadow-sixteen:
      0px 1px 4px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2)),
      0px 16px 32px 0px var(--vcdk-color-bg-shadow, rgba(0, 0, 0, 0.2));
  }
`,p=n.AH`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font-family: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  :host {
    color: var(--vcdk-color-text);
    cursor: inherit;
    font-family: var(
      --vcdk-typography-large-body-font-family-small-screens,
      "Volvo Novum"
    );
  }

  :host([hidden]) {
    display: none;
  }

  :focus-visible {
    outline-color: var(--vcdk-color-border-focus, #2b8ede);
    outline-style: solid;
    outline-width: 2px;
  }
`;var h=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};class v extends n.WF{constructor(){super(...arguments),this.isThemeProvider=!1,this.themeProvider=void 0,this.themeConsumer=new o.G(this,{context:d,subscribe:!0,callback:()=>{this.handleTheming()}})}static get defaultLocale(){return"undefined"!=typeof document&&document.documentElement.lang?document.documentElement.lang:"undefined"!=typeof window?window.navigator.language:"en-US"}get currentTheme(){let e=this.themeId??this.contextTheme??v.defaultTheme;return this.invertTheme&&(e=s(e)),e}get contextTheme(){return this.themeConsumer?.value?.themeId}get brandId(){return this.currentTheme?.split("-")[0]}get colorSchemeId(){return this.currentTheme?.split("-")[1]}themeChanged(){(0,l.A)()}update(e){(e.has("themeId")||e.has("invertTheme"))&&this.handleTheming(),super.update(e)}handleTheming(){if(this.currentTheme!==this.contextTheme)return this.isThemeProvider?this.themeProvider?.setValue({themeId:this.currentTheme}):(this.isThemeProvider=!0,this.themeProvider=new o.DT(this,{context:d,initialValue:{themeId:this.currentTheme}})),this.setThemeCssClasses(),void this.themeChanged();this.isThemeProvider&&this.themeProvider&&(this.isThemeProvider=!1,this.removeController(this.themeProvider),this.themeProvider=void 0,this.setThemeCssClasses(),this.themeChanged())}setThemeCssClasses(){const e=this.currentTheme!==this.contextTheme;for(const t of r)this.classList.toggle(`vcdk-theme-${t}`,e&&this.brandId===t);this.classList.toggle("vcdk-mode-dark",e&&"dark"===this.colorSchemeId)}static finalizeStyles(e){return e?Array.isArray(e)?(e.unshift(c,p),n.WF.finalizeStyles(e)):n.WF.finalizeStyles([c,p,e]):n.WF.finalizeStyles([c,p])}}v.version="9.16.0",v.defaultTheme="volvo-light",h([(0,a.MZ)({type:String,reflect:!0})],v.prototype,"themeId",void 0),h([(0,a.MZ)({type:Boolean,attribute:"invert-theme",reflect:!0})],v.prototype,"invertTheme",void 0)},2932:(e,t,i)=>{var o=i(582);const r="https://cdn.designsystem.volvogroup.com/1-2-1";var s=i(2618),n=i(352),a=i(31),l=i(8776),d=i(5664),c=i(6487),p=i(1669),h=i(6591),v=i(8128),u=i(9703),b=i(2049);const y=Object.keys(v.f),f=e=>(0,u.A)(e)?e:`${e}px`,g=(e,t)=>{if(t)return(0,b.A)(t)?t.reduce((t,i,o)=>{const r=y[o];return{...t,[`${e}-${r}`]:f(i)}},{}):{[e]:f(t)}},m=Object.entries(v.f),k=(e,t)=>{const i=`\n  ${e} {\n    ${t}: var(${t}-xs);\n  }`,o=Object.entries(v.f).splice(1).map(([i,o],r)=>{const s=m[r+2],n=s?`, var(${t}-${s[0]})`:"";return`\n    @media(min-width: ${o.from}px) {\n      ${e} {\n        ${t}: var(${t}-${i} ${n});\n      } \n    }`});return(0,s.iz)([i,o].join(""))};var x=i(302),w=i(3720),$=i(1145),z=i(4135),M=i(6260);const E=s.AH`
  @keyframes pulse {
    0% {
      opacity: 0.12;
    }
    50% {
      opacity: 0.06;
    }
    100% {
      opacity: 0.12;
    }
  }

  ${k(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-line-height")}
  ${k(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-font-size")}

  .skeleton {
    display: block;
    height: var(--vcdk-skeleton-height, var(--vcdk-skeleton-size));
    width: var(--vcdk-skeleton-width, var(--vcdk-skeleton-size));
    cursor: progress;
    background-color: var(--vcdk-color-bg-inverse);
    overflow: hidden;
    opacity: 0.12;

    &[class*="typography-"].variant-typography {
      height: var(--vcdk-skeleton-font-size);
      margin-block-end: calc(
        var(--vcdk-skeleton-line-height) - var(--vcdk-skeleton-font-size)
      );
    }

    &:not(.variant-typography).aspect-ratio {
      aspect-ratio: var(--vcdk-skeleton-aspect-ratio);
    }

    &:not(.disable-animation, .variant-container) {
      animation: pulse 2s infinite;
    }

    &.variant-ellipse {
      border-radius: 50%;
    }

    &.variant-rounded-rectangle,
    &.variant-typography {
      border-radius: var(--vcdk-radius-default);
    }

    &.variant-container {
      border-radius: var(--vcdk-radius-large);
      border-color: var(--vcdk-color-border-subtle);
      border-width: 1px;
      opacity: 1;
      border-style: solid;
      background-color: var(--vcdk-color-bg);
    }
  }

  .hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton:not(.disable-animation, .variant-container) {
      animation: none;
    }
  }
`;var C=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let S=class extends((0,z.F)(M.l)){constructor(){super(...arguments),this.disableAnimation=!1,this.typographyVariant="body",this.variant="typography",this.elementAriaDescription=null}get cssVariables(){return{...this.typographyVariant&&g("--vcdk-skeleton-line-height",(0,p.UN)(this.typographyVariant,"line-height")),...this.typographyVariant&&g("--vcdk-skeleton-font-size",(0,p.UN)(this.typographyVariant,"font-size"))}}render(){return s.qy`
      <div
        class=${(0,w.H)({skeleton:1,"disable-animation":!!this.disableAnimation,"aspect-ratio":!!this.aspectRatio,[`typography-${this.typographyVariant}`]:!!this.typographyVariant,[`variant-${this.variant}`]:1})}
        style=${(0,$.W)(this.cssVariables)}>
        ${(0,x.z)(this.elementAriaDescription,()=>s.qy`
            <div class="hidden">${this.elementAriaDescription}</div>
          `)}
        <slot aria-hidden="true"></slot>
      </div>
    `}};S.styles=[E,...p.FB],S.responsiveProperties={prefix:"vcdk-skeleton",props:["width","height","size","aspectRatio"]},C([(0,n.MZ)({attribute:"aspect-ratio",converter:h.g})],S.prototype,"aspectRatio",void 0),C([(0,n.MZ)({type:Boolean,attribute:"disable-animation"})],S.prototype,"disableAnimation",void 0),C([(0,n.MZ)({converter:h.g})],S.prototype,"height",void 0),C([(0,n.MZ)({converter:h.g})],S.prototype,"size",void 0),C([(0,n.MZ)({type:String,attribute:"typography-variant"})],S.prototype,"typographyVariant",void 0),C([(0,n.MZ)({converter:h.g})],S.prototype,"width",void 0),C([(0,n.MZ)({type:String})],S.prototype,"variant",void 0),C([(0,n.MZ)({type:String,attribute:"element-aria-description"})],S.prototype,"elementAriaDescription",void 0),S=C([(0,c.E)("vcdk-skeleton")],S);const A=s.AH`
  svg {
    max-width: 100%;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    color: var(--vcdk-color-icon, inherit);
    width: var(--vcdk-system-icon-size, 24px);
    height: var(--vcdk-system-icon-size, 24px);
    min-width: var(--vcdk-system-icon-size, 24px);
    min-height: var(--vcdk-system-icon-size, 24px);
  }
`;var Z=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const O={};let I=class extends M.l{constructor(){super(...arguments),this.elementRole="presentation",this.elementAriaHidden=null,this.assetsTask=new o.YZ(this,{task:async([e,t,i])=>{if(!e)return"";const o=function({brand:e="volvo",type:t="filled",iconId:i}){return`${r}/icons/${e}/system/${t}/${i}.svg`}({type:t?"filled":"lined",brand:i,iconId:e});return void 0===O[o]&&(O[o]=fetch(o).then(e=>{if(!e.ok)throw new Error(`Response from CDN returned a non ok status: ${e.status}`);return e.text()}).then(e=>(0,l.T)(e)).catch(t=>{throw console.error(`Failed when loading icon id: "${e}". ${t}`),t})),await O[o]},args:()=>[this.icon,this.filled,this.brandId]})}render(){return this.assetsTask.render({pending:()=>s.qy`
        <vcdk-skeleton
          variant="rounded-rectangle"
          size=${(0,a.J)(this.size)}></vcdk-skeleton>
      `,complete:e=>e,error:()=>s.qy`
        <span style="width:${this.size}px;height:${this.size}px"></span>
      `})}updated(e){super.updated(e),this.setAttributes(),this.extendSvg()}extendSvg(){if(this.svgElement){if(this.elementTitle){this.elementAriaLabelledBy=this.elementAriaLabelledBy||(0,d.A)("svg-title-"),this.svgElement.setAttribute("aria-labelledby",this.elementAriaLabelledBy);const e=this.svgElement.querySelector("title");if(e)e.id=this.elementAriaLabelledBy,e.textContent=this.elementTitle;else{if(!document)return void console.warn("Document is not available, cannot create title element for SVG.");const e=document.createElement("title");e.id=this.elementAriaLabelledBy,e.textContent=this.elementTitle,this.svgElement.insertBefore(e,this.svgElement.firstChild)}}if(this.description){this.elementAriaDescribedBy=this.elementAriaDescribedBy||(0,d.A)("svg-description-"),this.svgElement.setAttribute("aria-describedby",this.elementAriaDescribedBy);const e=this.svgElement.querySelector("desc");if(e)e.id=this.elementAriaDescribedBy,e.textContent=this.description;else{const e=document.createElementNS("http://www.w3.org/2000/svg","desc");e.id=this.elementAriaDescribedBy,e.textContent=this.description,this.svgElement.appendChild(e),this.elementTitle?this.svgElement.querySelector("title")?.insertAdjacentElement("afterend",e):this.svgElement.insertBefore(e,this.svgElement.firstChild)}}}}setAttributes(){this.svgElement?.setAttribute("part","svg"),this.svgElement?.setAttribute("focusable","false"),"number"==typeof this.size&&this.svgElement?.setAttribute("style",`--vcdk-system-icon-size: ${this.size}px;`),this.elementRole?this.svgElement?.setAttribute("role",this.elementRole):s.s6,this.elementAriaHidden?this.svgElement?.setAttribute("aria-hidden",this.elementAriaHidden):s.s6}};I.styles=[A],Z([(0,n.MZ)({type:Boolean})],I.prototype,"filled",void 0),Z([(0,n.MZ)({type:String})],I.prototype,"icon",void 0),Z([(0,n.MZ)({type:Number})],I.prototype,"size",void 0),Z([(0,n.MZ)({type:String,attribute:"element-aria-labelledby"})],I.prototype,"elementAriaLabelledBy",void 0),Z([(0,n.MZ)({type:String,attribute:"element-title"})],I.prototype,"elementTitle",void 0),Z([(0,n.MZ)({type:String,attribute:"element-aria-describedby"})],I.prototype,"elementAriaDescribedBy",void 0),Z([(0,n.MZ)({type:String})],I.prototype,"description",void 0),Z([(0,n.MZ)({type:String,attribute:"element-role"})],I.prototype,"elementRole",void 0),Z([(0,n.MZ)({type:String,attribute:"element-aria-hidden"})],I.prototype,"elementAriaHidden",void 0),Z([(0,n.P)("svg")],I.prototype,"svgElement",void 0),Z([(0,n.wk)()],I.prototype,"assetsTask",void 0),I=Z([(0,c.E)("vcdk-system-icon")],I)},3254:(e,t,i)=>{var o=i(6591),r=i(2618),s=i(352),n=i(3720),a=i(1145),l=i(6487),d=i(4135),c=i(6260);const p=r.AH`
  @keyframes spinner-keyframes {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }

  svg {
    max-height: 100%;
    max-width: 100%;
    width: var(--vcdk-spinner-size, 38px);
    height: var(--vcdk-spinner-size, 38px);
    stroke-dasharray: calc(
        var(--vcdk-spinner-progress) * calc(2 * 3.14159265359 * 45) / 100
      )
      calc(2 * 3.14159265359 * 45);
    transform-origin: center center;
    stroke-dashoffset: 0;
    transform: rotate(-90deg);
    stroke-width: 3px;
    stroke-linecap: round;
    stroke: var(--vcdk-spinner-stroke, var(--vcdk-color-bg-selected));
  }

  .indefinite {
    stroke-dasharray: 50;
    animation: 700ms cubic-bezier(0.62, 0.63, 0, 0.53) infinite
      spinner-keyframes;
  }

  circle {
    stroke-dashoffset: 0;
  }
`;var h=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let v=class extends((0,d.F)(c.l)){render(){return r.JW`
    <svg
      class=${(0,n.H)({indefinite:void 0===this.progress})}
      part="svg"
      viewBox="20 20 40 40"
      role="progressbar"
      aria-busy="true"
      aria-live="polite"
      aria-label="${this.elementAriaLabel}"
      style=${(0,a.W)({"--vcdk-spinner-progress":"number"==typeof this.progress?this.progress+"%":void 0})}>
        <circle
          cx="40"
          cy="40"
          r="18"
          fill="none" />     
    </svg>
    `}};v.styles=[p],v.responsiveProperties={prefix:"vcdk-spinner",props:["size"],styleTransform:(e,t,i)=>{if("size"===e&&"string"==typeof i)switch(i){case"small":return 18;case"large":return 80;default:return 38}return i}},h([(0,s.MZ)({type:Number})],v.prototype,"progress",void 0),h([(0,s.MZ)({converter:o.g})],v.prototype,"size",void 0),h([(0,s.MZ)({type:String,attribute:"element-aria-label"})],v.prototype,"elementAriaLabel",void 0),v=h([(0,l.E)("vcdk-spinner")],v);i(2932);var u=i(1669),b=i(302),y=i(7502);const f=r.AH`
  .button {
    align-items: center;
    appearance: none;
    border-radius: var(--vcdk-radius-default);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    max-width: 100%;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    border-style: solid;
    --vcdk-button-border-width: 0px;
    border-width: var(--vcdk-button-border-width);

    &:focus-visible {
      outline-width: 3px;
      outline-offset: 2px;
    }

    /* SIZES */
    &.fullWidth {
      width: 100%;
    }

    /* Primary */
    &.variant-primary {
      background-color: var(--vcdk-color-bg-button-primary);
      color: var(--vcdk-color-text-on-button-primary);
      vcdk-system-icon::part(svg) {
        color: var(--vcdk-color-icon-on-button-primary);
      }
      &:not([aria-disabled], .loading):hover {
        background-color: var(--vcdk-color-bg-button-primary-hover);
      }
      &:not([aria-disabled], .loading):active {
        background-color: var(--vcdk-color-bg-button-primary-pressed);
      }
      &.loading,
      &[aria-disabled="true"] {
        background-color: var(--vcdk-color-bg-disabled);
      }
    }

    /* Secondary */
    &.variant-secondary {
      --vcdk-button-border-width: 1px;
      background-color: var(--vcdk-color-bg-button-secondary);
      border-color: var(--vcdk-color-border-button-secondary);
      color: var(--vcdk-color-text-on-button-secondary);
      vcdk-system-icon::part(svg) {
        color: var(--vcdk-color-icon-on-button-secondary);
      }
      &.loading,
      &[aria-disabled="true"] {
        border-color: var(--vcdk-color-border-button-secondary-disabled);
      }
      &:not([aria-disabled], .loading):hover {
        background-color: var(--vcdk-color-bg-button-secondary-hover);
      }
      &:not([aria-disabled], .loading):active {
        background-color: var(--vcdk-color-bg-button-secondary-pressed);
      }
    }

    /* Marketing */
    &.variant-marketing {
      background-color: var(--vcdk-color-bg-button-marketing);
      color: var(--vcdk-color-text-on-button-marketing);
      vcdk-system-icon::part(svg) {
        color: var(--vcdk-color-icon-on-button-marketing);
      }
      &.loading,
      &[aria-disabled="true"] {
        background-color: var(--vcdk-color-bg-disabled);
      }
      &:not([aria-disabled], .loading):hover {
        background-color: var(--vcdk-color-bg-button-marketing-hover);
      }
      &:not([aria-disabled], .loading):active {
        background-color: var(--vcdk-color-bg-button-marketing-pressed);
      }
    }

    /* Tertiary */
    &.variant-tertiary {
      background-color: var(--vcdk-color-bg-button-tertiary);
      color: var(--vcdk-color-text-on-button-tertiary);
      vcdk-system-icon::part(svg) {
        color: var(--vcdk-color-icon-on-button-tertiary);
      }
      &:not([aria-disabled], .loading):hover {
        background-color: var(--vcdk-color-bg-button-tertiary-hover);
      }
      &:not([aria-disabled], .loading):active {
        background-color: var(--vcdk-color-bg-button-tertiary-pressed);
      }
    }

    &.size-small {
      padding-block: calc(6px - var(--vcdk-button-border-width));
      padding-inline: 8px;
    }
    &.size-medium {
      padding-block: calc(8px - var(--vcdk-button-border-width));
      padding-inline: 12px;
      .text {
        padding-block: 2px;
      }
    }
    &.size-large {
      padding-block: calc(12px - var(--vcdk-button-border-width));
      padding-inline: 16px;
      .text {
        padding-block: 2px;
      }
    }

    &.loading,
    &[aria-disabled="true"] {
      cursor: not-allowed;
      color: var(--vcdk-color-text-disabled);
      & vcdk-system-icon::part(svg) {
        color: var(--vcdk-color-icon-disabled);
      }
    }
  }

  /* TEXT */
  .text {
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-inline: 8px;
  }
  .loading .text {
    visibility: hidden;
  }

  /* SPINNER */
  .spinner {
    height: 24px;
    width: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;
  }

  /* ICON */
  .icon {
    flex-shrink: 0;
    pointer-events: none;
  }

  .loading .icon {
    opacity: 0;
  }
`;var g=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let m=class extends c.l{constructor(){super(...arguments),this.ariaLabel="",this.autofocus=!1,this.size="medium",this.variant="marketing",this.clickHandler=e=>{if(!this.href)return this.disabled?(e.preventDefault(),void e.stopPropagation()):void("submit"!==this.type||e.defaultPrevented||this.closest("form")?.requestSubmit())}}render(){const{href:e,variant:t="primary",size:i,loading:o,iconStart:s,iconEnd:a,disabled:l,fullWidth:d,ariaLabel:c,title:p,type:h}=this,v={button:!0,[`variant-${t}`]:!0,[`size-${i}`]:!0,fullWidth:!!d,loading:!!o},u={text:!0,"typography-button":!0},f=r.qy`
      ${(0,b.z)(s,()=>r.qy`
          <vcdk-system-icon
            .size=${24}
            .icon=${s}
            class="icon"></vcdk-system-icon>
        `)}
      <div class=${(0,n.H)(u)}>
        <slot></slot>
      </div>
      ${(0,b.z)(a,()=>r.qy`
          <vcdk-system-icon
            .size=${24}
            .icon=${a}
            class="icon"></vcdk-system-icon>
        `)}
      ${(0,b.z)(o,()=>r.qy`
          <vcdk-spinner class="spinner"></vcdk-spinner>
        `)}
    `;return e?r.qy`
        <a
          part="button"
          class=${(0,n.H)(v)}
          title=${(0,y.m)(p)}
          aria-label=${(0,y.m)(c)}
          aria-disabled=${l?"true":r.s6}
          href=${e}
          download=${(0,y.m)(this.download)}
          hreflang=${(0,y.m)(this.hreflang)}
          ping=${(0,y.m)(this.ping)}
          referrerpolicy=${(0,y.m)(this.referrerpolicy)}
          rel=${(0,y.m)(this.rel)}
          target=${(0,y.m)(this.target)}
          type=${(0,y.m)(h)}>
          ${f}
        </a>
      `:r.qy`
      <button
        part="button"
        title=${(0,y.m)(p)}
        aria-label=${(0,y.m)(c)}
        aria-disabled=${l?"true":r.s6}
        @click=${this.clickHandler}
        ?autofocus=${this.autofocus}
        formaction=${(0,y.m)(this.formaction)}
        formenctype=${(0,y.m)(this.formenctype)}
        formmethod=${(0,y.m)(this.formmethod)}
        ?formnovalidate=${this.formnovalidate}
        formtarget=${(0,y.m)(this.formtarget)}
        name=${(0,y.m)(this.name)}
        type=${h??"button"}
        value=${(0,y.m)(this.value)}
        class=${(0,n.H)(v)}>
        ${f}
      </button>
    `}};m.styles=[u.IT.button,f],g([(0,s.MZ)({type:String})],m.prototype,"ariaLabel",void 0),g([(0,s.MZ)({type:Boolean})],m.prototype,"autofocus",void 0),g([(0,s.MZ)({type:String})],m.prototype,"size",void 0),g([(0,s.MZ)({type:Boolean})],m.prototype,"fullWidth",void 0),g([(0,s.MZ)({type:String})],m.prototype,"iconEnd",void 0),g([(0,s.MZ)({type:String})],m.prototype,"iconStart",void 0),g([(0,s.MZ)({type:Boolean})],m.prototype,"loading",void 0),g([(0,s.MZ)({type:String})],m.prototype,"variant",void 0),g([(0,s.MZ)({type:String})],m.prototype,"download",void 0),g([(0,s.MZ)({type:String})],m.prototype,"href",void 0),g([(0,s.MZ)({type:String})],m.prototype,"hreflang",void 0),g([(0,s.MZ)({type:String})],m.prototype,"ping",void 0),g([(0,s.MZ)({type:String})],m.prototype,"referrerpolicy",void 0),g([(0,s.MZ)({type:String})],m.prototype,"rel",void 0),g([(0,s.MZ)({type:String})],m.prototype,"target",void 0),g([(0,s.MZ)({type:Boolean})],m.prototype,"disabled",void 0),g([(0,s.MZ)({type:String})],m.prototype,"form",void 0),g([(0,s.MZ)({type:String})],m.prototype,"formaction",void 0),g([(0,s.MZ)({type:String})],m.prototype,"formenctype",void 0),g([(0,s.MZ)({type:String})],m.prototype,"formmethod",void 0),g([(0,s.MZ)({type:Boolean})],m.prototype,"formnovalidate",void 0),g([(0,s.MZ)({type:String})],m.prototype,"formtarget",void 0),g([(0,s.MZ)({type:String,reflect:!0})],m.prototype,"name",void 0),g([(0,s.MZ)({type:String})],m.prototype,"type",void 0),g([(0,s.MZ)({type:String})],m.prototype,"value",void 0),m=g([(0,l.E)("vcdk-button")],m)},4135:(e,t,i)=>{i.d(t,{F:()=>l});var o=i(8128),r=i(2618),s=i(2326),n=i(6260);const a=Object.keys(o.f),l=e=>class extends e{static fallbackVariableValue(e,t,i){if(!i.length)return"";const o=i.shift();return i.length?`var(--${e}-${t}-${o}, ${this.fallbackVariableValue(e,t,i)})`:`var(--${e}-${t}-${o})`}static responsiveVariables(e,t,i,o){return t.map(t=>{const r=(0,s.A)(t);return o?`\n    --${e}-${r}-fallback: ${this.fallbackVariableValue(e,r,[...o])};\n    --${e}-${r}: var(--${e}-${r}-${i}, var(--${e}-${r}-fallback));`:`\n    --${e}-${r}: var(--${e}-${r}-${i});`}).join("")}static responsiveStyles(e){return r.AH`
        :host {
          ${(0,r.iz)(this.responsiveVariables(e.prefix,e.props,"xs"))}
        }
        @media(min-width: ${o.f.sm.from}px) {
          :host {
            ${(0,r.iz)(this.responsiveVariables(e.prefix,e.props,"sm",["xs"]))}
          }
        }
        @media (min-width: ${o.f.md.from}px) {
          :host {
            ${(0,r.iz)(this.responsiveVariables(e.prefix,e.props,"md",["sm","xs"]))}
          }
        }
        @media (min-width: ${o.f.lg.from}px) {
          :host {
            ${(0,r.iz)(this.responsiveVariables(e.prefix,e.props,"lg",["md","sm","xs"]))}
          }
        }
        @media (min-width: ${o.f.xl.from}px) {
          :host {
            ${(0,r.iz)(this.responsiveVariables(e.prefix,e.props,"xl",["lg","md","sm","xs"]))}
          }
        }
      }`}static finalizeStyles(e){if(!this.responsiveProperties)return n.l.finalizeStyles(e);const t=[this.responsiveStyles(this.responsiveProperties)];return e&&Array.isArray(e)?t.push(...e):e&&t.push(e),n.l.finalizeStyles(t)}connectedCallback(){super.connectedCallback(),this.setResponsiveVariables()}update(e){const t=this.constructor.responsiveProperties,i=t?.props;t&&i.some(t=>e.has(t))&&this.setResponsiveVariables(),super.update(e)}setResponsiveVariables(){const e=this.constructor.responsiveProperties;if(void 0===e)return;const t=e.props;for(const i of t){let t=this[i];if(t){Array.isArray(t)||(t=[t]);for(let o=0;o<t.length;o++){const r=String(i);let n=t[o];if(e.styleTransform&&(n=e.styleTransform(r,a[o],n)),void 0===n)continue;"number"==typeof n&&(n=`${n}px`);const l=a[o];this.style.setProperty(`--${e.prefix}-${(0,s.A)(r)}-${l}`,n)}}}}}},6260:(e,t,i)=>{i.d(t,{l:()=>o.l});var o=i(2871)},6487:(e,t,i)=>{i.d(t,{E:()=>o});const o=e=>(t,i)=>{const o=()=>{const i=customElements.get(e);if(!i)return void customElements.define(e,t);const o=i.version,r=t.version;o&&r&&o!==r&&console.warn(`vcdk warning: Attempted to register <${e}>v, but <${e}>v. was already registered. This could indicate that your application might contain duplicate instances of the same component.`)};i?i.addInitializer(o):o()}},6591:(e,t,i)=>{i.d(t,{g:()=>r});i(8128);var o=i(2618);const r={fromAttribute(e,t){if(!e)return null;if(e.startsWith("[")&&e.endsWith("]"))return JSON.parse(e);if(void 0===t){const t=Number(e);if(!Number.isNaN(t))return t}return o.W3.fromAttribute?.(e,t)},toAttribute:(e,t)=>Array.isArray(e)?o.W3.toAttribute?.(e,Array):o.W3.toAttribute?.(e,t)}},7118:(e,t,i)=>{var o=i(767);const r=(0,o.q6)("vcdk-checkbox-group");function s(e,t){const i={waitUntilFirstUpdate:!1,...t};return(t,o)=>{const{update:r}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{const r=t;if(e.has(r)){const t=e.get(r),s=this[r];t!==s&&(i.waitUntilFirstUpdate&&!this.hasUpdated||this[o](t,s))}}),r.call(this,e)}}}var n=i(1669),a=i(2618),l=i(352),d=i(3720),c=i(538),p=i(7832),h=i(302),v=i(5664),u=i(6487),b=i(7502),y=function(e,t,i,o){if("a"===i&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?o:"a"===i?o.call(e):o?o.value:t.get(e)},f=function(e,t,i,o,r){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?r.call(e,i):r?r.value=i:t.set(e,i),i};function g(e){var t,i,o,r,s,n,a,l,d,c,p,h,v,u,b,g,m,k;class x extends e{static get formAssociated(){return!0}static get validators(){return this.formControlValidators||[]}static get observedAttributes(){const e=this.validators.map(e=>e.attribute).flat(),t=super.observedAttributes||[];return[...new Set([...t,...e])]}static getValidator(e){return this.validators.find(t=>t.attribute===e)||null}static getValidators(e){return this.validators.filter(t=>{if(t.attribute===e||t.attribute?.includes(e))return!0})}get form(){return this.internals.form}get showError(){return y(this,t,"m",b).call(this)}checkValidity(){return this.internals.checkValidity()}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}constructor(...e){super(...e),t.add(this),this.internals=this.attachInternals(),i.set(this,!1),o.set(this,!1),r.set(this,!1),s.set(this,void 0),n.set(this,void 0),a.set(this,!0),l.set(this,""),d.set(this,()=>{f(this,r,!0,"f"),f(this,i,!0,"f"),y(this,t,"m",b).call(this)}),c.set(this,()=>{f(this,i,!1,"f"),y(this,t,"m",g).call(this,this.shouldFormValueUpdate()?y(this,l,"f"):""),!this.validity.valid&&y(this,r,"f")&&f(this,o,!0,"f");const e=y(this,t,"m",b).call(this);this.validationMessageCallback&&this.validationMessageCallback(e?this.internals.validationMessage:"")}),p.set(this,()=>{y(this,a,"f")&&this.validationTarget&&(this.internals.setValidity(this.validity,this.validationMessage,this.validationTarget),f(this,a,!1,"f")),f(this,r,!0,"f"),f(this,o,!0,"f"),y(this,t,"m",b).call(this),this?.validationMessageCallback?.(this.showError?this.internals.validationMessage:"")}),h.set(this,void 0),v.set(this,!1),u.set(this,Promise.resolve()),this.addEventListener?.("focus",y(this,d,"f")),this.addEventListener?.("blur",y(this,c,"f")),this.addEventListener?.("invalid",y(this,p,"f")),this.setValue(null)}attributeChangedCallback(e,t,i){super.attributeChangedCallback?.(e,t,i);const o=this.constructor.getValidators(e);o?.length&&this.validationTarget&&this.setValue(y(this,l,"f"))}setValue(e){f(this,o,!1,"f"),this.validationMessageCallback?.(""),f(this,l,e,"f");const i=this.shouldFormValueUpdate()?e:null;this.internals.setFormValue(i),y(this,t,"m",g).call(this,i),this.valueChangedCallback&&this.valueChangedCallback(i),y(this,t,"m",b).call(this)}shouldFormValueUpdate(){return!0}get validationComplete(){return new Promise(e=>e(y(this,u,"f")))}formResetCallback(){f(this,r,!1,"f"),f(this,o,!1,"f"),y(this,t,"m",b).call(this),this.resetFormControl?.(),this.validationMessageCallback?.(y(this,t,"m",b).call(this)?this.validationMessage:"")}}return i=new WeakMap,o=new WeakMap,r=new WeakMap,s=new WeakMap,n=new WeakMap,a=new WeakMap,l=new WeakMap,d=new WeakMap,c=new WeakMap,p=new WeakMap,h=new WeakMap,v=new WeakMap,u=new WeakMap,t=new WeakSet,b=function(){if(this.hasAttribute("disabled"))return!1;const e=y(this,o,"f")||y(this,r,"f")&&!this.validity.valid&&!y(this,i,"f");return e&&this.internals.states?this.internals.states.add("--show-error"):this.internals.states&&this.internals.states.delete("--show-error"),e},g=function(e){const i=this.constructor,o={},r=i.validators,a=[],l=r.some(e=>e.isValid instanceof Promise);y(this,v,"f")||(f(this,u,new Promise(e=>{f(this,h,e,"f")}),"f"),f(this,v,!0,"f")),y(this,s,"f")&&(y(this,s,"f").abort(),f(this,n,y(this,s,"f"),"f"));const d=new AbortController;let c;f(this,s,d,"f");let p=!1;r.length&&(r.forEach(i=>{const r=i.key||"customError",s=i.isValid(this,e,d.signal);s instanceof Promise?(a.push(s),s.then(s=>{null!=s&&(o[r]=!s,c=y(this,t,"m",k).call(this,i,e),y(this,t,"m",m).call(this,o,c))})):(o[r]=!s,this.validity[r]!==!s&&(p=!0),s||c||(c=y(this,t,"m",k).call(this,i,e)))}),Promise.allSettled(a).then(()=>{d?.signal.aborted||(f(this,v,!1,"f"),y(this,h,"f")?.call(this))}),!p&&l||y(this,t,"m",m).call(this,o,c))},m=function(e,t){if(this.validationTarget)this.internals.setValidity(e,t,this.validationTarget),f(this,a,!1,"f");else{if(this.internals.setValidity(e,t),this.internals.validity.valid)return;f(this,a,!0,"f")}},k=function(e,t){if(this.validityCallback){const t=this.validityCallback(e.key||"customError");if(t)return t}return e.message instanceof Function?e.message(this,t):e.message},x}const m=e=>class extends e{focus(e){this.getInputRef()?.focus(e)}blur(){this.getInputRef()?.blur()}select(){const e=this.getInputRef();if(!e||!("select"in e))throw new Error("Element is not selectable.");e?.select?.()}},k=e=>class extends e{constructor(){super(...arguments),this.hasFirstUpdateRun=!1}willUpdate(e){this.hasFirstUpdateRun||this.willFirstUpdate(e),super.willUpdate(e)}update(e){this.hasFirstUpdateRun||this.firstUpdate(e),super.update(e)}updated(e){this.hasFirstUpdateRun||(this.hasFirstUpdateRun=!0),super.updated(e)}firstUpdate(e){}willFirstUpdate(e){}};var x=i(6260);const w=a.AH`
  .size-small {
    --vcdk-checkbox-size: 16px;
    --vcdk-checkbox-hover-circle: 32px;
    --vcdk-checkbox-hover-adjust: 3px;
  }

  .size-medium {
    --vcdk-checkbox-size: 18px;
    --vcdk-checkbox-hover-circle: 40px;
    --vcdk-checkbox-hover-adjust: 1px;
  }

  .checkbox {
    --vcdk-checkbox-input-margin: 3px;
    align-items: flex-start;
    color: var(--vcdk-color-text);
    display: flex;
    position: relative;
    user-select: none;
  }

  .checkbox:after {
    border-radius: var(--vcdk-radius-circular);
    content: "";
    height: var(--vcdk-checkbox-hover-circle);
    width: var(--vcdk-checkbox-hover-circle);
    /** 
     * this margin is a bit random, but what decides the height 
     * of the checkbox differs depending on the sizes, we might want 
     * to adjust this to a fixed value in the future.
     */
    margin: var(--vcdk-checkbox-hover-adjust);
    inset-block-start: calc(var(--vcdk-checkbox-size) / -2);
    inset-inline-start: calc(var(--vcdk-checkbox-size) / -2);
    position: absolute;
    z-index: var(--vcdk-z-index-zero);
  }

  .checkbox:not(.is-diabled, .has-error):has(input:hover, label:hover):after {
    background-color: var(--vcdk-color-bg-hover);
  }
  .checkbox:not(.is-disabled, .has-error):has(
      input:active,
      label:active
    ):after {
    background-color: var(--vcdk-color-bg-pressed);
  }

  input {
    appearance: none;
    border: 2px solid var(--vcdk-color-border);
    border-radius: var(--vcdk-radius-small);
    cursor: pointer;
    margin: var(--vcdk-checkbox-input-margin);
    height: var(--vcdk-checkbox-size);
    width: var(--vcdk-checkbox-size);
    position: relative;
    z-index: var(--vcdk-z-index-over-input);
    flex-shrink: 0;
  }

  input:hover,
  input:active {
    border-color: var(--vcdk-color-border);
  }

  input:checked,
  .is-intermediate input {
    background-color: var(--vcdk-color-bg-selected);
    border-color: var(--vcdk-color-border-selected);
  }

  .has-error input,
  .has-error input:checked {
    border-color: var(--vcdk-color-bg-error);
  }

  .has-error:not(.is-disabled) input:checked,
  .is-intermediate.has-error:not(.is-disabled) input {
    background-color: var(--vcdk-color-bg-error);
  }

  .is-disabled input,
  .in-disabled input:checked {
    border-color: var(--vcdk-color-border-subtle);
    cursor: not-allowed;
  }

  .is-disabled input:checked,
  .is-intermediate.is-disabled input {
    background-color: var(--vcdk-color-border-subtle);
  }

  input:focus-visible {
    outline-offset: 2px;
    outline-width: 3px;
  }

  /* LABEL */
  label {
    cursor: pointer;
    color: var(--vcdk-color-text);
    padding-inline: 8px;
  }

  .size-small label {
    padding-inline: 6px;
  }

  .is-disabled label {
    cursor: not-allowed;
    color: var(--vcdk-color-text-disabled);
  }

  .state-icon {
    pointer-events: none;
    position: absolute;
    width: var(--vcdk-checkbox-size);
    height: var(--vcdk-checkbox-size);
    z-index: var(--vcdk-z-index-over-input);
    fill: var(--vcdk-color-text-on-inverse);
    inset-inline-start: var(--vcdk-checkbox-input-margin);
    inset-block-start: var(--vcdk-checkbox-input-margin);
  }
`;class $ extends CustomEvent{constructor(e,t,i){super("vcdk-checkbox-change",{detail:{checked:e,value:t,nativeEvent:i},bubbles:!0,composed:!0,cancelable:!0})}}var z=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let M=class extends(m(g(k(x.l)))){constructor(){super(...arguments),this.label="",this.checked=!1,this.size="medium",this.uniqueCheckboxId=(0,v.A)("vcdk-checkbox-"),this.input=(0,p._)(),this.groupContext=new o.G(this,{context:r,subscribe:!0}),this.checkedChanged=()=>{this.setFormValue(this.checked)},this.changeHandler=async e=>{const t=e.target;await this.setCheckedValue(t.checked,e)},this.getInputRef=()=>this.shadowRoot?.querySelector("input")??null}setFormValue(e){const t=this.getCheckboxFormValue(e);this.setValue(t)}willFirstUpdate(e){e.has("defaultChecked")&&(this.checked=this.defaultChecked)}shouldFormValueUpdate(){return!0}resetFormControl(){this.setCheckedValue(this.defaultChecked??!1),this.input.value&&(this.input.value.checked=this.defaultChecked??!1)}async setCheckedValue(e,t){this.setFormValue(e),e!==this.checked&&(this.checked=e,await this.updateComplete,this.dispatchEvent(new CustomEvent("change",{detail:{checked:e,value:this.value,nativeEvent:t},bubbles:!0,composed:!0})),this.dispatchEvent(new $(e,e.toString(),t)))}getCheckboxFormValue(e){return e?this.value||"on":null}render(){const e=this.error||this.groupContext.value?.error,t=this.disabled||this.groupContext.value?.disabled,i=this.groupContext.value?.size||this.size,{label:o,checked:r,changeHandler:s,intermediate:n}=this,l=Boolean(n||void 0===r),v=l?"mixed":r?"true":"false",u=this.id||this.uniqueCheckboxId;return a.qy`
      <div
        class=${(0,d.H)({checkbox:!0,"is-disabled":!!t,"has-error":!!e,"is-intermediate":l,[`size-${i}`]:!!i})}>
        <input
          ${(0,p.K)(this.input)}
          id=${u}
          type="checkbox"
          role="checkbox"
          @change=${s}
          .checked=${l?void 0:(0,c.V)(r)}
          ?disabled=${t}
          .value=${l?void 0:this.value}
          aria-checked=${v}
          aria-label=${(0,b.m)(this.ariaLabel)}
          name=${(0,b.m)(this.name||u)}
          ?readonly=${(0,b.m)(this.readonly)}
          tabindex=${(0,b.m)(this.tabindex)} />

        ${(0,h.z)(!l&&this.checked,()=>a.qy`
            <svg
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="state-icon">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 13.42L3 8.42L4.41 7.01L8 10.59L15.59 3L17 4.42L8 13.42Z" />
            </svg>
          `)}
        ${(0,h.z)(l,()=>a.qy`
            <svg
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="state-icon intermediate">
              <path d="M3 3H13V5H3V3Z" />
            </svg>
          `)}
        ${(0,h.z)(o,()=>a.qy`
            <label
              part="label"
              for=${u}
              class=${(0,d.H)({"typography-body":"medium"===this.size,"typography-caption1":"small"===this.size})}>
              ${o}
            </label>
          `)}
      </div>
    `}};M.styles=[w,n.IT.caption1,n.IT.body],z([(0,l.MZ)({type:String})],M.prototype,"label",void 0),z([(0,l.MZ)({type:Boolean})],M.prototype,"error",void 0),z([(0,l.MZ)({type:Boolean,reflect:!0})],M.prototype,"checked",void 0),z([(0,l.MZ)({attribute:!1})],M.prototype,"defaultChecked",void 0),z([(0,l.MZ)({type:Boolean,reflect:!0})],M.prototype,"disabled",void 0),z([(0,l.MZ)({type:String,reflect:!0})],M.prototype,"name",void 0),z([(0,l.MZ)({type:Boolean})],M.prototype,"readonly",void 0),z([(0,l.MZ)({type:Number})],M.prototype,"tabindex",void 0),z([(0,l.MZ)({type:String})],M.prototype,"value",void 0),z([(0,l.MZ)({type:Boolean})],M.prototype,"intermediate",void 0),z([(0,l.MZ)({type:String})],M.prototype,"size",void 0),z([s("checked")],M.prototype,"checkedChanged",void 0),M=z([(0,u.E)("vcdk-checkbox")],M);i(2932);class E extends CustomEvent{constructor(e){super("vcdk-chip-click",{detail:{source:"chip",selected:e},bubbles:!0,composed:!0})}}class C extends CustomEvent{constructor(){super("vcdk-chip-remove",{detail:{source:"close-button"},bubbles:!0,composed:!0})}}const S=a.AH`
  :host {
    max-width: 100%;
  }

  .size-small {
    --vcdk-chip-gap: 4px;
    --vcdk-chip-padding-block: 0px;
    --vcdk-chip-padding-inline: 8px;
  }

  button {
    appearance: none;
    background: none;
    border: 0;
  }

  .chip-wrapper {
    padding-block: var(--vcdk-chip-padding-block, 4px);
    padding-inline: var(--vcdk-chip-padding-inline, 12px);
    align-items: center;
    appearance: none;
    background-color: var(--vcdk-color-bg);
    border-color: var(--vcdk-color-border);
    border-radius: var(--vcdk-radius-circular);
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    max-width: 100%;
    min-height: 26px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    gap: var(--vcdk-chip-gap, 4px);
  }

  .chip-wrapper:not(.disabled) {
    &:hover {
      @media (pointer: fine) {
        background-color: var(--vcdk-color-bg-hover);
      }
    }
    &:active {
      background-color: var(--vcdk-color-bg-pressed);
    }
    &:focus-within:has(.chip-button:focus-visible) {
      outline: 3px solid var(--vcdk-color-border-focus);
      outline-offset: 2px;
    }
  }

  .chip-wrapper.selected:not(.disabled) {
    background-color: var(--vcdk-color-bg-selected);
    border-color: var(--vcdk-color-border-selected);
    .text {
      color: var(--vcdk-color-text-on-selected);
    }
    vcdk-system-icon::part(svg),
    vcdk-icon-button::part(svg) {
      color: var(--vcdk-color-icon-on-selected);
    }

    &:hover {
      @media (pointer: fine) {
        background-color: var(--vcdk-color-bg-selected-hover);
        border-color: var(--vcdk-color-bg-selected-hover);
      }
    }
    &:active {
      background-color: var(--vcdk-color-bg-selected-pressed);
      border-color: var(--vcdk-color-bg-selected-pressed);
    }
  }

  .chip-wrapper.disabled {
    border-color: var(--vcdk-color-border-subtle);
    background-color: var(--vcdk-color-bg);
    cursor: not-allowed;
    button {
      cursor: not-allowed;
    }
    .text {
      color: var(--vcdk-color-text-disabled);
    }
    vcdk-system-icon::part(svg),
    vcdk-icon-button::part(svg) {
      color: var(--vcdk-color-icon-disabled);
    }
    vcdk-icon-button::part(button):focus-visible {
      outline: none;
    }
  }

  .chip-button {
    align-items: center;
    cursor: pointer;
    color: var(--vcdk-color-text);
    display: flex;
    gap: var(--vcdk-chip-gap, 4px);
    padding: 0;
    &:focus-visible {
      outline: none;
    }
  }

  .text {
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: inherit;
    padding-block: 2px;
    display: inline-block;
    font-family: var(--vcdk-chip-font-family);
    font-size: var(--vcdk-chip-font-size);
    line-height: var(--vcdk-chip-line-height);
    letter-spacing: var(--vcdk-chip-letter-spacing);
    font-weight: var(--vcdk-chip-font-weight);
  }
`;var A=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Z=class extends x.l{constructor(){super(...arguments),this.selected=!1,this.removable=!1,this.removeAriaLabel="",this.handleChipClick=()=>{this.dispatchEvent(new E(this.selected??!1))},this.handleRemoveClick=()=>{this.dispatchEvent(new C)},this.handleKeyDown=e=>{"Enter"!==e.key&&"Space"!==e.code||this.handleRemoveClick()}}render(){const{selected:e,iconStart:t,iconEnd:i,removable:o,removeAriaLabel:r,disabled:s,form:n,formaction:l,formenctype:c,formmethod:p,formnovalidate:v,formtarget:u,name:y,type:f,value:g,size:m}=this;return a.qy`
      <div
        class=${(0,d.H)({"chip-wrapper":!0,"typography-caption1":"small"===m,"typography-caption2":"small"!==m,"size-small":"small"===m,selected:!!e,disabled:!!s})}>
        <button
          class=${(0,d.H)({"chip-button":!0})}
          @click=${this.handleChipClick}
          form=${(0,b.m)(n)}
          ?disabled=${s}
          ?selected=${e}
          formaction=${(0,b.m)(l)}
          formenctype=${(0,b.m)(c)}
          formmethod=${(0,b.m)(p)}
          ?formnovalidate=${v}
          formtarget=${(0,b.m)(u)}
          name=${(0,b.m)(y)}
          type=${f??"button"}
          value=${(0,b.m)(g)}>
          ${t&&a.qy`
            <vcdk-system-icon .size=${16} .icon=${t}></vcdk-system-icon>
          `}
          <slot
            class=${(0,d.H)({text:1})}></slot>
          ${i&&a.qy`
            <vcdk-system-icon .size=${16} .icon=${i}></vcdk-system-icon>
          `}
        </button>
        ${(0,h.z)(o,()=>a.qy`
            <vcdk-icon-button
              class=${(0,d.H)({"chip-button-close":!0,selected:!!e,disabled:!!s})}
              ?disabled=${s}
              @click=${this.handleRemoveClick}
              @keydown=${this.handleKeyDown}
              aria-label=${(0,b.m)(r)}
              size="extra-small"
              icon="close"></vcdk-icon-button>
          `)}
      </div>
    `}};Z.styles=[S,n.IT.caption1,n.IT.caption2],A([(0,l.MZ)({type:Boolean})],Z.prototype,"selected",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"iconEnd",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"iconStart",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"size",void 0),A([(0,l.MZ)({type:Boolean})],Z.prototype,"removable",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"removeAriaLabel",void 0),A([(0,l.MZ)({type:Boolean})],Z.prototype,"disabled",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"form",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"formaction",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"formenctype",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"formmethod",void 0),A([(0,l.MZ)({type:Boolean})],Z.prototype,"formnovalidate",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"formtarget",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"name",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"type",void 0),A([(0,l.MZ)({type:String})],Z.prototype,"value",void 0),Z=A([(0,u.E)("vcdk-chip")],Z);var O=i(8128);const I=a.AH`
  slot {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  .size-default {
    --vcdk-chip-gap: 4px;
    --vcdk-chip-padding-block: 4px;
    --vcdk-chip-padding-inline: 12px;
    --vcdk-chip-font-family: var(
      --vcdk-typography-caption-1-font-family-small-screens
    );
    --vcdk-chip-font-size: var(--vcdk-typography-caption-1-size-small-screens);
    --vcdk-chip-line-height: var(
      --vcdk-typography-caption-1-line-height-small-screens
    );
    --vcdk-chip-letter-spacing: var(
      --vcdk-typography-caption-1-letter-spacing-small-screens
    );
    --vcdk-chip-font-weight: var(
      --vcdk-typography-caption-1-weight-small-screens
    );
  }
  .size-small {
    --vcdk-chip-gap: 4px;
    --vcdk-chip-padding-block: 0px;
    --vcdk-chip-padding-inline: 8px;
    --vcdk-chip-font-family: var(
      --vcdk-typography-caption-2-font-family-small-screens
    );
    --vcdk-chip-font-size: var(--vcdk-typography-caption-2-size-small-screens);
    --vcdk-chip-line-height: var(
      --vcdk-typography-caption-2-line-height-small-screens
    );
    --vcdk-chip-letter-spacing: var(
      --vcdk-typography-caption-2-letter-spacing-small-screens
    );
    --vcdk-chip-font-weight: var(
      --vcdk-typography-caption-2-weight-small-screens
    );
  }
  @media (min-width: ${O.f.md.from}px) {
    .size-default {
      --vcdk-chip-font-family: var(
        --vcdk-typography-caption-1-font-family-large-screens
      );
      --vcdk-chip-font-size: var(
        --vcdk-typography-caption-1-size-large-screens
      );
      --vcdk-chip-line-height: var(
        --vcdk-typography-caption-1-line-height-large-screens
      );
      --vcdk-chip-letter-spacing: var(
        --vcdk-typography-caption-1-letter-spacing-large-screens
      );
      --vcdk-chip-font-weight: var(
        --vcdk-typography-caption-1-weight-large-screens
      );
    }
    .size-small {
      --vcdk-chip-font-family: var(
        --vcdk-typography-caption-2-font-family-large-screens
      );
      --vcdk-chip-font-size: var(
        --vcdk-typography-caption-2-size-large-screens
      );
      --vcdk-chip-line-height: var(
        --vcdk-typography-caption-2-line-height-large-screens
      );
      --vcdk-chip-letter-spacing: var(
        --vcdk-typography-caption-2-letter-spacing-large-screens
      );
      --vcdk-chip-font-weight: var(
        --vcdk-typography-caption-2-weight-large-screens
      );
    }
  }
`;var D=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let T=class extends x.l{constructor(){super(...arguments),this.size="default"}render(){return a.qy`
      <slot
        class=${(0,d.H)({[`size-${this.size}`]:!0})}></slot>
    `}};T.styles=[I],D([(0,l.MZ)({type:String})],T.prototype,"size",void 0),T=D([(0,u.E)("vcdk-chips")],T);class R extends CustomEvent{constructor(e=!0){super("vcdk-close",{bubbles:e,composed:!0,cancelable:!0})}}var P=i(663);function V(e,t){return(i,o)=>{const r="slot"+(e?`[name=${e}]`:":not([name])");Object.defineProperty(i,o,{get(){const e=this.renderRoot?.querySelector(r),i=e?.assignedElements({flatten:!0})??[];return[...i.filter(e=>e.matches(t)),...(0,P.A)(i.filter(e=>e instanceof HTMLElement).map(e=>Array.from(e.querySelectorAll(t))))]}})}}var L=i(31);const B=a.AH`
  a,
  button {
    align-items: center;
    appearance: none;
    border-radius: var(--vcdk-radius-default);
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0;
    user-select: none;
  }

  a:focus-visible,
  button:focus-visible {
    outline-offset: 2px;
    outline-width: 3px;
  }

  /* SIZES */
  .size-extra-small {
    height: var(--vcdk-icon-button-size, 24px);
    width: var(--vcdk-icon-button-size, 24px);
    --vcdk-system-icon-size: 16px;
  }

  .size-small {
    height: var(--vcdk-icon-button-size, 32px);
    width: var(--vcdk-icon-button-size, 32px);
  }

  .size-medium {
    height: var(--vcdk-icon-button-size, 40px);
    width: var(--vcdk-icon-button-size, 40px);
  }

  .size-large {
    height: var(--vcdk-icon-button-size, 48px);
    width: var(--vcdk-icon-button-size, 48px);
  }

  /* VARIANTS */

  /* Primary */
  .variant-primary {
    background-color: var(--vcdk-color-bg-button-primary);
    border-width: 0;
    color: var(--vcdk-color-text-on-button-primary);
  }
  .variant-primary:hover {
    background-color: var(--vcdk-color-bg-button-primary-hover);
  }
  .variant-primary:active {
    background-color: var(--vcdk-color-bg-button-primary-pressed);
  }
  .variant-primary vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-on-button-primary);
  }
  .variant-primary[aria-disabled="true"] {
    background-color: var(--vcdk-color-bg-disabled);
    color: var(--vcdk-color-text-disabled);
    cursor: not-allowed;
  }
  .variant-primary[aria-disabled="true"]:hover {
    background-color: var(--vcdk-color-bg-disabled);
  }
  .variant-primary[aria-disabled="true"] vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-disabled);
  }

  /* Secondary */
  .variant-secondary {
    background-color: var(--vcdk-color-bg-button-secondary);
    border: 1px solid var(--vcdk-color-border-button-secondary);
    color: var(--vcdk-color-text-on-button-secondary);
  }
  .variant-secondary:hover {
    background-color: var(--vcdk-color-bg-button-secondary-hover);
  }
  .variant-secondary:active {
    background-color: var(--vcdk-color-bg-button-secondary-pressed);
  }
  .variant-secondary vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-on-button-secondary);
  }
  .variant-secondary[aria-disabled="true"] {
    border-color: var(--vcdk-color-border-button-secondary-disabled);
    color: var(--vcdk-color-text-disabled);
    cursor: not-allowed;
  }
  .variant-secondary[aria-disabled="true"]:hover {
    background-color: var(--vcdk-color-bg-button-secondary);
  }
  .variant-secondary[aria-disabled="true"] vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-disabled);
  }

  /* Tertiary */
  .variant-tertiary {
    background-color: var(--vcdk-color-bg-button-tertiary);
    border: 0;
    color: var(--vcdk-color-text-on-button-tertiary);
  }
  .variant-tertiary:hover {
    background-color: var(--vcdk-color-bg-button-tertiary-hover);
  }
  .variant-tertiary:active {
    background-color: var(--vcdk-color-bg-button-tertiary-pressed);
  }
  .variant-tertiary vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-on-button-tertiary);
  }
  .variant-tertiary[aria-disabled="true"] {
    border-color: var(--vcdk-color-border-button-tertiary-disabled);
    color: var(--vcdk-color-text-disabled);
    cursor: not-allowed;
  }
  .variant-tertiary[aria-disabled="true"]:hover {
    background-color: var(--vcdk-color-bg-button-tertiary);
  }
  .variant-tertiary[aria-disabled="true"] vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-disabled);
  }
`;var j=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let H=class extends x.l{constructor(){super(...arguments),this.icon="home",this.size="medium",this.variant="tertiary",this.buttonAriaExpanded=!1,this.buttonAriaHaspopup=!1,this.autofocus=!1,this.clickHandler=e=>{if(this.disabled)return e.preventDefault(),void e.stopPropagation()}}render(){const{href:e,size:t,icon:i,filled:o,disabled:r,form:s,buttonAriaLabel:n,title:l,variant:c,type:p}=this,h={[`variant-${c}`]:!0,[`size-${t}`]:!0},v=a.qy`
      <vcdk-system-icon
        exportparts="svg"
        .icon=${i}
        ?filled=${o}
        element-role="presentation"></vcdk-system-icon>
    `;return e?a.qy`
        <a
          part="button"
          title=${(0,b.m)(l)}
          aria-label=${(0,b.m)(n)}
          aria-disabled=${r?"true":a.s6}
          role=${(0,b.m)(this.buttonRole)}
          @click=${this.clickHandler}
          class=${(0,d.H)(h)}
          href=${e}
          download=${(0,b.m)(this.download)}
          hreflang=${(0,b.m)(this.hreflang)}
          ping=${(0,b.m)(this.ping)}
          referrerpolicy=${(0,b.m)(this.referrerPolicy)}
          rel=${(0,b.m)(this.rel)}
          target=${(0,b.m)(this.target)}
          type=${(0,b.m)(p)}
          ?autofocus=${(0,L.J)(this.autofocus)}>
          ${v}
        </a>
      `:a.qy`
      <button
        part="button"
        title=${(0,b.m)(l)}
        role=${(0,b.m)(this.buttonRole)}
        aria-label=${(0,b.m)(n)}
        aria-disabled=${r?"true":a.s6}
        aria-controls=${(0,b.m)(this.buttonAriaControls)}
        aria-expanded=${this.buttonAriaExpanded?"true":a.s6}
        aria-haspopup=${this.buttonAriaHaspopup?"true":a.s6}
        @click=${this.clickHandler}
        class=${(0,d.H)(h)}
        form=${(0,b.m)(s)}
        formaction=${(0,b.m)(this.formaction)}
        formenctype=${(0,b.m)(this.formenctype)}
        formmethod=${(0,b.m)(this.formmethod)}
        ?formnovalidate=${this.formnovalidate}
        formtarget=${(0,b.m)(this.formtarget)}
        name=${(0,b.m)(this.name)}
        type=${p??"button"}
        value=${(0,b.m)(this.value)}
        ?autofocus=${(0,L.J)(this.autofocus)}>
        ${v}
      </button>
    `}};H.styles=[B],j([(0,l.MZ)({type:String})],H.prototype,"icon",void 0),j([(0,l.MZ)({type:String})],H.prototype,"size",void 0),j([(0,l.MZ)({type:String})],H.prototype,"variant",void 0),j([(0,l.MZ)({type:Boolean})],H.prototype,"filled",void 0),j([(0,l.MZ)({type:String})],H.prototype,"download",void 0),j([(0,l.MZ)({type:String})],H.prototype,"href",void 0),j([(0,l.MZ)({type:String})],H.prototype,"hreflang",void 0),j([(0,l.MZ)({type:String})],H.prototype,"ping",void 0),j([(0,l.MZ)({type:String})],H.prototype,"referrerPolicy",void 0),j([(0,l.MZ)({type:String})],H.prototype,"rel",void 0),j([(0,l.MZ)({type:String})],H.prototype,"target",void 0),j([(0,l.MZ)({type:Boolean})],H.prototype,"disabled",void 0),j([(0,l.MZ)({type:String})],H.prototype,"form",void 0),j([(0,l.MZ)({type:String})],H.prototype,"formaction",void 0),j([(0,l.MZ)({type:String})],H.prototype,"formenctype",void 0),j([(0,l.MZ)({type:String})],H.prototype,"formmethod",void 0),j([(0,l.MZ)({type:Boolean})],H.prototype,"formnovalidate",void 0),j([(0,l.MZ)({type:String})],H.prototype,"formtarget",void 0),j([(0,l.MZ)({type:String,reflect:!0})],H.prototype,"name",void 0),j([(0,l.MZ)({type:String})],H.prototype,"type",void 0),j([(0,l.MZ)({type:String})],H.prototype,"value",void 0),j([(0,l.MZ)({attribute:"button-role"})],H.prototype,"buttonRole",void 0),j([(0,l.MZ)({attribute:"button-aria-label"})],H.prototype,"buttonAriaLabel",void 0),j([(0,l.MZ)({attribute:"button-aria-controls"})],H.prototype,"buttonAriaControls",void 0),j([(0,l.MZ)({type:Boolean,attribute:"button-aria-expanded"})],H.prototype,"buttonAriaExpanded",void 0),j([(0,l.MZ)({type:Boolean,attribute:"button-aria-haspopup"})],H.prototype,"buttonAriaHaspopup",void 0),j([(0,l.MZ)({type:Boolean})],H.prototype,"autofocus",void 0),H=j([(0,u.E)("vcdk-icon-button")],H);const F=(e,t)=>a.qy`
  <div
    class="character-counter typography-caption2"
    part="character-counter"
    aria-hidden="true">
    ${`${e} / ${t}`}
  </div>
`,K=a.AH`
  .text-field {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg);
    --vcdk-text-field-border-color: var(--vcdk-color-border);
    --vcdk-text-field-caption-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-cursor: initial;
    --vcdk-text-field-floating-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-text-color: var(--vcdk-color-text);
  }
  .small {
    --vcdk-icon-button-size: 32px;
    --vcdk-system-icon-size: 20px;
    --vcdk-text-field-icon-button-size: 30px;
    --vcdk-text-field-margin-block: 4px;
    --vcdk-text-field-min-height: 32px;
    --vcdk-text-field-padding-block: 5px;
    --vcdk-text-field-padding-inline: 8px;
    --vcdk-text-field-margin-inline-end: 4px;
    --vcdk-text-field-multirow-padding: 8px;
  }
  .medium {
    --vcdk-icon-button-size: 32px;
    --vcdk-text-field-icon-button-size: 40px;
    --vcdk-text-field-margin-block: 4px;
    --vcdk-text-field-min-height: 38px;
    --vcdk-text-field-padding-block: 7px;
    --vcdk-text-field-padding-inline: 12px;
    --vcdk-text-field-margin-inline-end: 4px;
    --vcdk-text-field-multirow-padding: 12px;
  }
  .large {
    --vcdk-icon-button-size: 40px;
    --vcdk-text-field-icon-button-size: 48px;
    --vcdk-text-field-margin-block: 4px;
    --vcdk-text-field-min-height: 46px;
    --vcdk-text-field-padding-block: 11px;
    --vcdk-text-field-padding-inline: 16px;
    --vcdk-text-field-margin-inline-end: 8px;
    --vcdk-text-field-multirow-padding: 16px;
  }
  .readonly {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg-variant-subtle);
    --vcdk-text-field-border-color: var(--vcdk-color-border-subtle);
    --vcdk-text-field-caption-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-cursor: initial;
    --vcdk-text-field-floating-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-text-color: var(--vcdk-color-text-subtle);
  }
  .error {
    --vcdk-text-field-border-color: var(--vcdk-color-border-error);
    --vcdk-text-field-caption-color: var(--vcdk-color-text-error);
    --vcdk-text-field-cursor: initial;
    --vcdk-text-field-floating-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-label-color: var(--vcdk-color-text-error);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-text-color: var(--vcdk-color-text);
  }

  .disabled {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg);
    --vcdk-text-field-border-color: var(--vcdk-color-border-subtle);
    --vcdk-text-field-caption-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-cursor: not-allowed;
    --vcdk-text-field-floating-label-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-label-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-text-color: var(--vcdk-color-text-disabled);
  }

  fieldset {
    position: relative;
    border-width: 0;
    padding: 0;
    min-width: 0;
    max-width: 100%;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input-wrapper {
    align-items: center;
    background: var(--vcdk-text-field-bg-color);
    border-radius: var(--vcdk-radius-default);
    border-width: 1px;
    border-style: solid;
    border-color: var(--vcdk-text-field-border-color);
    display: flex;
    position: relative;
  }

  .text-field:not(.disabled) .input-wrapper:hover {
    border-color: var(--vcdk-color-border-hover);
  }

  .text-field:not(.disabled) .input-wrapper:active {
    border-color: var(--vcdk-color-border-input-active);
  }
  .text-field:not(.disabled) .input-wrapper:focus-within {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--vcdk-color-border-input-active);
    outline-offset: -1px;
  }

  .readonly .input-wrapper:not(:focus-within):hover,
  .readonly .input-wrapper:not(:focus-within):active,
  .error .input-wrapper:not(:focus-within):hover,
  .error .input-wrapper:not(:focus-within):active,
  .disabled .input-wrapper:not(:focus-within):hover,
  .disabled .input-wrapper:not(:focus-within):active {
    border-color: var(--vcdk-text-field-border-color);
  }

  input,
  textarea {
    background: var(--vcdk-text-field-bg-color);
    border-radius: var(--vcdk-radius-default);
    border: none;
    cursor: var(--vcdk-text-field-cursor);
    flex-grow: 1;
    color: var(--vcdk-text-field-text-color);
    -moz-appearance: textfield;
    width: 100%;
  }

  input:focus-within,
  textarea:focus-within,
  input:focus-visible,
  textarea:focus-visible {
    outline: 0;
    border-color: transparent;
  }

  input {
    min-height: var(--vcdk-text-field-min-height);
    padding-block: var(--vcdk-text-field-padding-block);
    padding-inline: var(--vcdk-text-field-padding-inline);
  }

  textarea {
    padding: var(--vcdk-text-field-multirow-padding);
    resize: vertical;
  }

  input::-webkit-outer-spin-button,
  textarea::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button,
  textarea::-webkit-inner-spin-button,
  input::-webkit-search-cancel-button,
  textarea::-webkit-search-cancel-button,
  input::-webkit-search-decoration,
  textarea::-webkit-search-decoration {
    display: none;
  }

  input::placeholder {
    color: var(--vcdk-text-field-placeholder-color);
  }

  label {
    display: block;
    flex: 1;
    color: var(--vcdk-text-field-label-color);
    margin-block-end: var(--vcdk-text-field-margin-block);
  }

  .helper-text {
    display: block;
    text-align: start;
    color: var(--vcdk-text-field-caption-color);
    margin-block-start: var(--vcdk-text-field-margin-block);
  }

  vcdk-icon-button {
    margin-inline-end: var(--vcdk-text-field-margin-inline-end);
  }

  .floating-label label {
    color: var(--vcdk-text-field-floating-label-color);
    margin-inline: calc(var(--vcdk-text-field-padding-inline) - 4px);
    max-width: calc(100% - var(--vcdk-text-field-padding-inline) - 8px);
    overflow: hidden;
    padding-inline: 4px;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    inset-inline-start: 0;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    z-index: var(--vcdk-z-index-over-input);
  }

  .floating-label:focus-within label,
  .floating-label.has-value label {
    background-color: var(--vcdk-color-bg);
    top: 0;
  }

  .floating-label.has-value:not(
      .error,
      .readonly,
      .disabled,
      :focus-within
    ):hover
    label {
    color: var(--vcdk-color-border-hover);
  }

  .floating-label:focus-within label,
  .floating-label.has-value:not(:focus-within):active label {
    color: var(--vcdk-color-border-input-active);
  }

  .error.floating-label:focus-within label,
  .error.floating-label.has-value label {
    color: var(--vcdk-color-text-error);
  }

  .floating-label .container {
    padding-inline: var(--vcdk-text-field-padding-inline);
  }
`;var q=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let U=class extends(m(g(k(x.l)))){constructor(){super(),this.size="medium",this.autocapitalize="none",this.placeholder="",this.spellcheck=!1,this.tabIndex=0,this.type="text",this.value="",this.wrap="soft",this.hasFocus=!1,this.uid=(0,v.A)("vcdk-text-field-"),this.onValueChanged=()=>{this.setValue(this.value??null)},this.eventDispatcher=(e,t)=>{e.stopPropagation();const i={detail:{value:e.target.value,nativeEvent:e},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent(t,i)),this.dispatchEvent(new CustomEvent(`vcdk-${t}`,i)),this.value=e.target.value,this.setValue(this.value)},this.blurHandler=e=>{this.hasFocus=!1,this.eventDispatcher(e,"blur")},this.focusHandler=e=>{this.hasFocus=!0,this.eventDispatcher(e,"focus")},this.clickButtonHandler=()=>{this.dispatchEvent(new CustomEvent("click-button",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("vcdk-click-button",{bubbles:!0,composed:!0}))},this.inputRef=(0,p._)(),this.getInputRef=()=>this.inputRef.value??null,this.inputAriaDescribedBy=this.inputAriaDescribedBy||(0,v.A)("caption-")}willFirstUpdate(e){e.has("defaultValue")&&(this.value=this.defaultValue??"")}formAssociatedCallback(){this.value&&this.setValue(this.value)}resetFormControl(){this.setValue(this.defaultValue??""),this.value=this.defaultValue??""}shouldFormValueUpdate(){return!0}get counterAbove(){return!this.floatingLabel&&this.characterCounter&&this.maxlength}get counterBelow(){return this.floatingLabel&&this.characterCounter&&this.maxlength}render(){const{required:e,label:t,rows:i,helperText:o,icon:r,size:s,disabled:n,floatingLabel:l,value:c,error:v,readonly:u}=this;return a.qy`
      <div
        class=${(0,d.H)({"text-field":1,"floating-label":!!l,"has-value":!!c,disabled:!!n,error:!!v,readonly:!!u,[s]:!!s})}>
        <fieldset part="fieldset">
          <div class="container">
            ${(0,h.z)(t,()=>a.qy`
                <label
                  for=${this.uid}
                  class=${(0,d.H)({"typography-subtitle1":!!this.floatingLabel&&!this.hasFocus&&!this.value,"typography-subtitle2":!this.floatingLabel||this.floatingLabel&&(this.hasFocus||!!this.value)})}
                  part="label">
                  ${t}${e?" *":""}
                </label>
              `)}
            ${(0,h.z)(this.counterAbove,()=>F(this.value?.length,this.maxlength))}
          </div>

          <div class="input-wrapper" part="input-wrapper">
            <slot part="before-input" name="before-input"></slot>

            ${(0,h.z)(i,()=>a.qy`
                <textarea
                  ${(0,p.K)(this.inputRef)}
                  id=${this.uid}
                  aria-invalid=${!!this.error}
                  aria-describedby=${(0,b.m)(this.inputAriaDescribedBy)}
                  part="input"
                  class=${(0,d.H)({"typography-caption1":"small"===this.size,"typography-body":"small"!==this.size})}
                  @blur=${this.blurHandler}
                  @focus=${this.focusHandler}
                  @change=${e=>this.eventDispatcher(e,"change")}
                  @input=${e=>this.eventDispatcher(e,"input")}
                  @keyup=${e=>this.eventDispatcher(e,"keyup")}
                  @keydown=${e=>this.eventDispatcher(e,"keydown")}
                  rows=${(0,b.m)(this.rows)}
                  autocapitalize=${this.autocapitalize}
                  autocomplete=${(0,b.m)(this.autocomplete)}
                  dirname=${(0,b.m)(this.dirname)}
                  ?disabled=${this.disabled}
                  aria-label=${(0,b.m)(this.inputAriaLabel)}
                  max=${(0,L.J)(this.max)}
                  maxlength=${(0,L.J)(this.maxlength)}
                  min=${(0,L.J)(this.min)}
                  minlength=${(0,L.J)(this.minlength)}
                  name=${(0,b.m)(this.name)}
                  placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
                  ?readonly=${this.readonly}
                  ?required=${this.required}
                  tabindex=${(0,L.J)(this.tabIndex)}
                  spellcheck=${this.spellcheck}
                  step=${(0,L.J)(this.step)}
                  wrap=${(0,b.m)(this.wrap)}
                  .value=${this.value}></textarea>
              `,()=>a.qy`
                <input
                  ${(0,p.K)(this.inputRef)}
                  data-testid="input"
                  part="input"
                  id=${this.uid}
                  class=${(0,d.H)({"typography-caption1":"small"===this.size,"typography-body":"small"!==this.size})}
                  aria-invalid=${!!this.error}
                  aria-describedby=${(0,b.m)(this.inputAriaDescribedBy)}
                  aria-label=${(0,b.m)(this.inputAriaLabel)}
                  @blur=${this.blurHandler}
                  @focus=${this.focusHandler}
                  @change=${e=>this.eventDispatcher(e,"change")}
                  @input=${e=>this.eventDispatcher(e,"input")}
                  @keyup=${e=>this.eventDispatcher(e,"keyup")}
                  @keydown=${e=>this.eventDispatcher(e,"keydown")}
                  autocapitalize=${this.autocapitalize}
                  autocomplete=${(0,b.m)(this.autocomplete)}
                  dirname=${(0,b.m)(this.dirname)}
                  ?disabled=${this.disabled}
                  list=${(0,b.m)(this.list)}
                  max=${(0,L.J)(this.max)}
                  maxlength=${(0,L.J)(this.maxlength)}
                  min=${(0,L.J)(this.min)}
                  minlength=${(0,L.J)(this.minlength)}
                  ?multiple=${this.multiple}
                  name=${(0,b.m)(this.name)}
                  pattern=${(0,b.m)(this.pattern)}
                  placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
                  ?readonly=${this.readonly}
                  ?required=${this.required}
                  step=${(0,L.J)(this.step)}
                  tabindex=${(0,L.J)(this.tabIndex)}
                  type=${(0,b.m)(this.type)}
                  .value=${this.value} />
              `)}
            <slot part="after-input" name="after-input">
              ${(0,h.z)(r&&!i,()=>a.qy`
                  <vcdk-icon-button
                    part="icon"
                    tabindex="-1"
                    .buttonAriaLabel=${this.iconAriaLabel}
                    .icon=${r}
                    ?disabled=${n}
                    @click=${this.clickButtonHandler}></vcdk-icon-button>
                `)}
            </slot>
          </div>
        </fieldset>

        <div class="container">
          ${(0,h.z)(o,()=>a.qy`
              <p
                class="helper-text typography-caption2"
                id=${(0,b.m)(this.inputAriaDescribedBy)}>
                ${o}
              </p>
            `)}
          ${(0,h.z)(this.counterBelow,()=>F(this.value?.length,this.maxlength))}
        </div>
      </div>
    `}};U.styles=[K,n.IT.body,n.IT.caption1,n.IT.caption2,n.IT.subtitle1,n.IT.subtitle2],q([(0,l.MZ)({type:String})],U.prototype,"size",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"error",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"floatingLabel",void 0),q([(0,l.MZ)({type:String})],U.prototype,"helperText",void 0),q([(0,l.MZ)({type:String})],U.prototype,"icon",void 0),q([(0,l.MZ)({type:String,attribute:"icon-aria-label"})],U.prototype,"iconAriaLabel",void 0),q([(0,l.MZ)({type:String})],U.prototype,"label",void 0),q([(0,l.MZ)({type:Number})],U.prototype,"rows",void 0),q([(0,l.MZ)({type:String,attribute:"input-aria-describedby"})],U.prototype,"inputAriaDescribedBy",void 0),q([(0,l.MZ)({type:String,attribute:"input-aria-label"})],U.prototype,"inputAriaLabel",void 0),q([(0,l.MZ)({type:String})],U.prototype,"autocapitalize",void 0),q([(0,l.MZ)({type:String})],U.prototype,"autocomplete",void 0),q([(0,l.MZ)({type:String})],U.prototype,"dirname",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"disabled",void 0),q([(0,l.MZ)({type:Object})],U.prototype,"list",void 0),q([(0,l.MZ)({type:String})],U.prototype,"max",void 0),q([(0,l.MZ)({type:Number})],U.prototype,"maxlength",void 0),q([(0,l.MZ)({type:String})],U.prototype,"min",void 0),q([(0,l.MZ)({type:Number})],U.prototype,"minlength",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"multiple",void 0),q([(0,l.MZ)({type:String,reflect:!0})],U.prototype,"name",void 0),q([(0,l.MZ)({type:String})],U.prototype,"pattern",void 0),q([(0,l.MZ)({type:String})],U.prototype,"placeholder",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"readonly",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"required",void 0),q([(0,l.MZ)({type:Boolean})],U.prototype,"spellcheck",void 0),q([(0,l.MZ)({type:String})],U.prototype,"step",void 0),q([(0,l.MZ)({type:Number})],U.prototype,"tabIndex",void 0),q([(0,l.MZ)({type:String})],U.prototype,"type",void 0),q([(0,l.MZ)({type:String})],U.prototype,"value",void 0),q([(0,l.MZ)({attribute:!1})],U.prototype,"defaultValue",void 0),q([(0,l.MZ)({type:String})],U.prototype,"wrap",void 0),q([(0,l.MZ)({type:Boolean,attribute:"character-counter"})],U.prototype,"characterCounter",void 0),q([(0,l.wk)()],U.prototype,"hasFocus",void 0),q([s("value")],U.prototype,"onValueChanged",void 0),U=q([(0,u.E)("vcdk-text-field")],U);var _=i(1926),N=i(1145);const W={arrowLeft:"ArrowLeft",arrowRight:"ArrowRight",arrowUp:"ArrowUp",arrowDown:"ArrowDown",enterKey:"Enter",spaceBar:" ",escapeKey:"Escape",homeKey:"Home",endKey:"End",pageUpKey:"PageUp",pageDownKey:"PageDown",tabKey:"Tab",altKey:"Alt",ctrlKey:"Ctrl",metaKey:"Meta",shiftKey:"Shift"},J=new Set([W.altKey,W.ctrlKey,W.metaKey,W.shiftKey].map(e=>e.toLowerCase())),G={skip:["input","textarea","select"]};function Y(e){return J.has(e)}function Q(e){return"keydown"===e.type}function X(e){return"keyup"===e.type}function ee(e){return!!e&&e.includes("keydownRepeat")}function te(e){const t=function(e){return(Array.isArray(e)?e:[e]).map(e=>e.toLowerCase())}(e);return{keys:t.filter(e=>!Y(e)),modifiers:t.filter(e=>Y(e))}}function ie(e){return"key"in e?e:e.detail.nativeEvent}class oe{get _element(){return this._observedElement?this._observedElement:this._host}observeElement(e){return e.addEventListener("keydown",this),e.addEventListener("keyup",this),this._observedElement=e,{unsubscribe:()=>{this._observedElement?.removeEventListener("keydown",this),this._observedElement?.removeEventListener("keyup",this),this._observedElement=void 0}}}constructor(e,t){this.bindings=new Set,this.pressedKeys=new Set,this._host=e,this._options={...G,...t},e.addController(this)}eventModifiersMatch(e,t){e.options?.preventDefault&&t.preventDefault(),e.options?.stopPropagation&&t.stopPropagation()}keysMatch(e,t){const i=e.modifiers??[];return e.keys.every(e=>this.pressedKeys.has(e))&&i.every(e=>!!t[`${e}Key`])}bindingMatches(e,t){const i=e.options?.triggers??["keydown"];return!!this.keysMatch(e,t)&&(!(!Q(t)||!function(e){return!!e&&(e.includes("keydown")||ee(e))}(i))||!(!X(t)||!function(e){return!!e&&e.includes("keyup")}(i)))}handleEvent(e){const t=ie(e),i=t.key.toLowerCase(),o=t.composedPath();if(this._element&&o.includes(this._element)){Y(i)&&this.pressedKeys.clear(),Q(t)&&!Y(i)&&this.pressedKeys.add(i);for(const e of this.bindings)this.bindingMatches(e,t)&&(this.eventModifiersMatch(e,t),e.handler.call(this._host,t),ee(e.options?.triggers)&&this.pressedKeys.delete(i));X(t)&&!Y(i)&&this.pressedKeys.delete(i)}}set(e,t,i){return this.bindings.add({...te(e),handler:t,options:{...this._options?.bindingDefaults,...i}}),this}hostConnected(){this._host.addEventListener("keyup",this),this._host.addEventListener("keydown",this)}hostDisconnected(){this._host.removeEventListener("keyup",this),this._host.removeEventListener("keydown",this)}}const re=(0,o.q6)("vcdk-dropdown");class se extends CustomEvent{constructor(e,t=""){super(`${t}change`,{detail:e?.map(e=>({value:e.value,label:e.textContent?.trim()??""}))??[],bubbles:!0,composed:!0})}}const ne=e=>e?.text?e.text:e?.getTextContent();class ae extends CustomEvent{constructor(e,t=""){const i=ne(e);super(`${t}change`,{detail:{value:e?.value??i??"",label:i??""},bubbles:!0,composed:!0})}}class le extends CustomEvent{constructor(e){super("vcdk-dropdown-input",{detail:{value:e},bubbles:!0,composed:!0})}}const de=a.AH`
  :host {
    --vcdk-divider-spacing: var(--vcdk-spacing-4);
  }

  .dropdown:not(.disabled) vcdk-text-field::part(input) {
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .dropdown.filter-input vcdk-text-field::part(input) {
    cursor: text;
  }

  .dropdown vcdk-text-field::part(before-input) {
    display: none;
  }

  .dropdown.size-small vcdk-text-field::part(before-input) {
    min-height: 32px;
    margin-inline-start: 8px;
    padding-block-end: 4px;
    padding-block-start: 4px;
  }

  .dropdown.size-medium vcdk-text-field::part(before-input) {
    min-height: 40px;
    margin-inline-start: 12px;
    padding-block-end: 8px;
    padding-block-start: 8px;
  }

  .dropdown.size-large vcdk-text-field::part(before-input) {
    min-height: 48px;
    margin-inline-start: 16px;
    padding-block-end: 12px;
    padding-block-start: 12px;
  }

  .dropdown.multi.has-selected-values vcdk-text-field::part(before-input) {
    display: inline-block;
  }

  .dropdown:not(.disabled) vcdk-text-field::part(input):hover {
    border-color: var(--vcdk-color-border-hover);
  }

  .dropdown.multi vcdk-text-field::part(input-wrapper) {
    flex-wrap: wrap;
  }

  .dropdown:focus-within {
    outline: none;
  }

  .dropdown:not(.disabled):focus-within vcdk-text-field::part(input-wrapper) {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--vcdk-color-border-input-active);
    outline-offset: -1px;
  }

  .dropdown:focus-within vcdk-text-field::part(input) {
    outline: none;
  }

  .dropdown.floating-label:focus-within vcdk-text-field::part(label) {
    transform: translateY(-50%);
    top: 0;
    pointer-events: none;
    ${(0,n.zQ)("subtitle2","small")};
    background-color: var(--vcdk-color-bg);
    @media (min-width: ${O.f.md.from}px) {
      ${(0,n.zQ)("subtitle2","large")}
    }
  }

  .dropdown vcdk-text-field::part(icon) {
    z-index: var(--vcdk-z-index-over-input);
    position: absolute;
    right: 0;
  }

  .dropdown:dir(rtl) vcdk-text-field::part(icon) {
    left: 0;
    right: unset;
  }

  .dropdown:not(.has-selected-values):not(.filter-input).multi
    vcdk-text-field::part(input) {
    position: relative;
  }

  .dropdown vcdk-text-field::part(input) {
    position: absolute;
    max-width: 100%;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    top: 0;
    display: none;
    padding-inline-end: 0;
  }

  .dropdown.filter-input vcdk-text-field::part(input),
  .dropdown:not(.multi) vcdk-text-field::part(input) {
    position: relative;
  }

  .dropdown.has-selected-values.filter-input vcdk-text-field::part(input) {
    top: auto;
  }
  .dropdown.filter-input vcdk-text-field::part(input) {
    min-width: 100px;
  }

  .dropdown.multi.open vcdk-text-field::part(input),
  .dropdown.multi.single-chip vcdk-text-field::part(input),
  .dropdown.multi:not(.has-selected-values) vcdk-text-field::part(input) {
    display: inline-block;
  }

  .dropdown:not(.multi) vcdk-text-field::part(input) {
    display: block;
  }

  .dropdown.multi.has-selected-values vcdk-text-field::part(input) {
    width: min(var(--vcdk-dropdown-search-chars) ch, 100%);
  }

  .dropdown.has-selected-values.filter-input vcdk-text-field::part(input) {
    padding-top: 9px;
    padding-bottom: 9px;
  }

  .dropdown vcdk-text-field::part(input),
  .dropdown vcdk-text-field::part(input-wrapper) {
    background: var(--vcdk-color-bg);
  }

  .dropdown vcdk-text-field::part(input-wrapper) {
    border-color: var(--vcdk-color-border);
    padding-inline-end: 40px;
  }
  .dropdown.error vcdk-text-field::part(input-wrapper) {
    border-color: var(--vcdk-color-border-error);
  }
  .dropdown.disabled vcdk-text-field::part(input-wrapper) {
    border-color: var(--vcdk-color-border-subtle);
  }

  .dropdown.readonly vcdk-text-field::part(input-wrapper) {
    border-color: var(--vcdk-color-border-subtle);
    background-color: var(--vcdk-color-bg-variant-subtle);
  }
  .dropdown.readonly vcdk-text-field::part(input) {
    background-color: var(--vcdk-color-bg-variant-subtle);
  }

  .dropdown:not(.readonly):not(.disabled) vcdk-text-field::part(input) {
    color: var(--vcdk-color-text);
  }

  vcdk-chips {
    z-index: var(--vcdk-z-index-switch-input);
    position: relative;
    display: block;
  }

  .dropdown .option-container {
    width: 100%;
    overflow-y: auto;
    position: relative;
    max-height: 480px;
    margin-top: 4px;
    box-shadow: var(--vcdk-shadow-four);
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--vcdk-color-border) var(--vcdk-color-bg);
    border-radius: var(--vcdk-radius-default);
    border: 1px solid var(--vcdk-color-border-subtle);
    background-color: var(--vcdk-color-bg);
    padding-block: 4px;

    &::-webkit-scrollbar {
      display: block;
      width: 4px;
    }

    @supports not (overflow: overlay) {
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--vcdk-color-border);
      border-radius: var(--vcdk-radius-small);
      height: 72px;
    }
  }

  .dropdown.helper-text .option-container {
    margin-top: calc(
      -1 * var(--vcdk-typography-caption-2-line-height-large-screens)
    );
  }
`,ce=a.AH`
  .small {
    --vcdk-text-field-padding-block: 5px;
    --vcdk-text-field-padding-inline: 8px;
  }
  .medium {
    --vcdk-text-field-padding-block: 8px;
    --vcdk-text-field-padding-inline: 12px;
  }
  .large {
    --vcdk-text-field-padding-block: 8px;
    --vcdk-text-field-padding-inline: 12px;
  }
  .option {
    display: flex;
    appearance: none;
    align-items: center;
    border-radius: 0;
    padding-block: var(--vcdk-text-field-padding-block);
    padding-inline: var(--vcdk-text-field-padding-inline);
    border: 0;
    width: 100%;
    text-align: start;
    min-height: 40px;
    overflow-wrap: anywhere;
    cursor: pointer;
    background-color: var(--vcdk-color-bg);
    color: var(--vcdk-color-text-subtle);
    user-select: none;
    outline: 0;
  }

  .option.small {
    min-height: 32px;
  }

  .option vcdk-checkbox {
    margin-inline-end: 12px;
  }

  .option.small vcdk-checkbox {
    margin-inline-end: 8px;
  }

  .option.hidden {
    display: none;
  }

  .option:focus-visible {
    outline-offset: -2px;
    outline: var(--vcdk-color-border-focus) solid 2px;
  }
`,pe=(a.AH`
  .small {
    --vcdk-system-icon-size: 20px;
  }
  vcdk-system-icon {
    color: var(--vcdk-color-text-subtle);
    margin-left: auto;
    position: absolute;
    inset-inline-end: 16px;
    pointer-events: none;
  }
`,a.AH`
  .option.disabled {
    color: var(--vcdk-color-text-disabled);
    cursor: not-allowed;
  }

  .option:not(.disabled.active):hover,
  .option.active:not(.disabled),
  .option.checked:not(.disabled):hover {
    background-color: var(--vcdk-color-bg-hover);
  }

  .option.selected:not(.disabled):not(.checkbox) {
    color: var(--vcdk-color-text);
    background-color: var(--vcdk-color-bg-selected-subtle);
  }

  .option:not(.checkbox) span[part="content"] {
    flex-grow: 1;
  }
  .option.checkbox span[part="content"] {
    display: flex;
    margin-inline-end: 8px;
  }
`),he=a.AH`
  .divider {
    background-color: var(--vcdk-color-border-subtle);
    height: 1px;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 7px;
    position: relative;
    width: 100%;
  }
`,ve=a.AH`
  .popover {
    display: none;
    position: fixed;
    isolation: isolate;
    z-index: var(--vcdk-z-index-dropdown-popover);
  }

  .popover.open {
    display: block;
  }
`;var ue=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let be=class extends x.l{constructor(){super(...arguments),this.variant="body"}render(){return a.qy`
      <slot
        class=${(0,d.H)({[`typography-${this.variant}`]:1})}
        part="slot"></slot>
    `}};be.styles=[...n.FB,n.gI],ue([(0,l.MZ)({type:String,reflect:!0})],be.prototype,"variant",void 0),be=ue([(0,u.E)("vcdk-typography")],be);var ye=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let fe=class extends x.l{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.selected=!1,this.hidden=!1,this.checkbox=!1,this.dropdownContext=new o.G(this,{context:re,subscribe:!0})}get _contentSlotText(){return this._content.map(e=>this.text||e.textContent?.trim()).join("")}get value(){return this._value??this._contentSlotText}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}getTextContent(){return this._contentSlotText}render(){const e=this.dropdownContext?.value?.size||Ae,t="small"===e;return a.qy`
      <div
        role="option"
        part="option"
        class=${(0,d.H)({option:1,disabled:this.disabled,selected:this.selected,checkbox:this.checkbox,active:this.active,"typography-body":!t,"typography-caption1":t,hidden:this.hidden,[e]:!0})}
        tabindex="0"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        ${(0,h.z)(this.checkbox,()=>a.qy`
            <vcdk-checkbox
              label=""
              size=${t?"small":"medium"}
              tabindex="-1"
              @change=${e=>e.stopPropagation()}
              .disabled=${this.disabled}
              role="presentation"
              .checked=${this.selected}></vcdk-checkbox>
          `)}
        <span part="before-content">
          <slot name="before-content"></slot>
        </span>
        <span part="content">
          <slot>${this.text}</slot>
        </span>
        <span part="after-content">
          <slot name="after-content"></slot>
        </span>
        ${(0,h.z)(this.selected&&!this.checkbox,()=>a.qy`
            <vcdk-system-icon icon="check" part="selected"></vcdk-system-icon>
          `)}
      </div>
    `}};fe.styles=[n.IT.caption1,n.IT.body,ce,pe],ye([(0,l.gZ)({flatten:!0,slot:""})],fe.prototype,"_content",void 0),ye([(0,l.MZ)({type:Boolean,reflect:!0})],fe.prototype,"active",void 0),ye([(0,l.MZ)({type:Boolean,reflect:!0})],fe.prototype,"disabled",void 0),ye([(0,l.MZ)({type:Boolean,reflect:!0})],fe.prototype,"selected",void 0),ye([(0,l.MZ)({type:Boolean,reflect:!0})],fe.prototype,"hidden",void 0),ye([(0,l.MZ)({type:Boolean})],fe.prototype,"checkbox",void 0),ye([(0,l.MZ)({type:String})],fe.prototype,"text",void 0),ye([(0,l.MZ)()],fe.prototype,"value",null),fe=ye([(0,u.E)("vcdk-dropdown-option")],fe);var ge=i(7663),me=i(2871),ke=i(1708);function xe(e){return e.hasAttribute("hidden")||e.hasAttribute("aria-hidden")&&"false"!==e.getAttribute("aria-hidden")||"none"===e.style.display||"0"===e.style.opacity||"hidden"===e.style.visibility||"collapse"===e.style.visibility}function we(e){return"-1"!==e.getAttribute("tabindex")&&!xe(e)&&!function(e){return e.hasAttribute("disabled")||e.hasAttribute("aria-disabled")&&"false"!==e.getAttribute("aria-disabled")}(e)&&(e.hasAttribute("tabindex")||(e instanceof HTMLAnchorElement||e instanceof HTMLAreaElement)&&e.hasAttribute("href")||e instanceof HTMLButtonElement||e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement||"SUMMARY"===e.tagName||e instanceof HTMLIFrameElement)}function $e(e,t,i,o=20,r=0){const s=[];if(r>=o)return s;const n=e=>{const s=e.assignedNodes().filter(e=>1===e.nodeType);if(s.length>0){return $e(s[0].parentElement,t,i,o,r+1)}return[]},a=Array.from(e.children||[]);for(const e of a)t(e)||(i(e)&&s.push(e),null!=e.shadowRoot?s.push(...$e(e.shadowRoot,t,i,o,r+1)):"SLOT"===e.tagName?s.push(...n(e)):s.push(...$e(e,t,i,o,r+1)));return s}var ze=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Me=class extends me.l{getFocusableElements(){return $e(this,xe,we)}constructor(){super(),this.focusedIndex=0,this.inactive=!1,this.focused=!1,this.enableDirectionalKeys=!1,this.$backup=(0,p._)(),this.$start=(0,p._)(),this.$end=(0,p._)(),this.onKeyDown=e=>{const t=this.getFocusableElements();switch(e.key){case"ArrowUp":{e.preventDefault();const i=t[this.focusedIndex-1];i?i.focus():this.focusLastElement();break}case"ArrowDown":{e.preventDefault();const i=t[this.focusedIndex+1];i?i.focus():this.focusFirstElement();break}case"Home":e.preventDefault(),this.focusFirstElement();break;case"End":e.preventDefault(),this.focusLastElement()}},this.focusFirstElement=()=>{this.trapFocus()},this.focusLastElement=()=>{this.trapFocus(!0)},this.updateFocused=(0,ke.A)(e=>{this.dispatchFocusedEvents(e),this.focused=e},0),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}disconnectedCallback(){this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback()}update(e){e.has("focused")&&this.enableDirectionalKeys?this.focused?document.addEventListener("keydown",this.onKeyDown):document.removeEventListener("keydown",this.onKeyDown):e.has("enableDirectionalKeys")&&!this.enableDirectionalKeys&&document.removeEventListener("keydown",this.onKeyDown),super.update(e)}trapFocus(e){if(this.inactive)return;const t=this.getFocusableElements();t.length>0?(e?t[t.length-1].focus():t[0].focus(),this.$backup.value?.setAttribute("tabindex","-1")):(this.$backup.value?.setAttribute("tabindex","0"),this.$backup.value?.focus())}onFocusIn(e){const t=this.getFocusableElements();let i=e.target;i.shadowRoot&&(i=i.shadowRoot.activeElement),this.focusedIndex=t.indexOf(i),this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}dispatchFocusedEvents(e){!this.focused&&e&&this.dispatchEvent(new Event("vcdk-focusin",{bubbles:!0,composed:!0})),this.focused&&!e&&this.dispatchEvent(new Event("vcdk-focusout",{bubbles:!0,composed:!0}))}render(){return a.qy`
      <div
        ${(0,p.K)(this.$start)}
        @focus=${this.focusLastElement}
        tabindex=${!this.focused||this.inactive?"-1":"0"}></div>
      <div ${(0,p.K)(this.$backup)}></div>
      <slot></slot>
      <div
        ${(0,p.K)(this.$end)}
        @focus=${this.focusFirstElement}
        tabindex=${!this.focused||this.inactive?"-1":"0"}></div>
    `}};ze([(0,l.MZ)({type:Boolean,reflect:!0})],Me.prototype,"inactive",void 0),ze([(0,l.MZ)({type:Boolean,reflect:!0})],Me.prototype,"focused",void 0),ze([(0,l.MZ)({type:Boolean,attribute:"enable-directional-keys"})],Me.prototype,"enableDirectionalKeys",void 0),Me=ze([(0,u.E)("vcdk-focus-trap")],Me);var Ee=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Ce=class extends x.l{constructor(){super(...arguments),this.open=!1,this.setPositionStyle=async()=>{if(!this.open||!this.target)return;const{y:e,x:t,strategy:i}=await(0,ge.rD)(this.target,this.container,{placement:this.placement??"bottom-start",middleware:this.createMiddleware(),strategy:"fixed"});Object.assign(this.container.style,{position:i,top:`${e}px`,left:`${t}px`})},this.anchorSlotChange=async()=>{this.anchors.length<1||(this.target=this.anchors[0],await this.updateState())}}async openChange(){await(this.open?this.updatePosition():this.hide())}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this.open&&this.updatePosition()})}disconnectedCallback(){this.hide().then(()=>{super.disconnectedCallback()})}updatePosition(){this.target&&(this.dispose=(0,ge.ll)(this.target,this.container,this.setPositionStyle))}async hide(){return new Promise(e=>{this.dispose?(this.dispose(),this.dispose=void 0,e()):e()})}createMiddleware(){const e=[],t=this.container.style;return e.push((0,ge.BN)({limiter:(0,ge.ER)()})),this.placement||e.push((0,ge.RK)({allowedPlacements:["top","bottom","top-start","bottom-start"]})),e.push((0,ge.Ej)({apply:({rects:e})=>{Object.assign(t,{width:`${e.reference.width}px`})}})),e}async updateState(){this.open&&(await this.hide(),this.updatePosition())}render(){return a.qy`
      <slot name="anchor" @slotchange=${this.anchorSlotChange}></slot>
      <div
        id="container"
        class=${(0,d.H)({popover:1,open:this.open})}>
        <vcdk-focus-trap enable-directional-keys>
          <slot></slot>
        </vcdk-focus-trap>
      </div>
    `}};Ce.styles=[ve],Ee([(0,l.MZ)({type:Boolean,reflect:!0})],Ce.prototype,"open",void 0),Ee([(0,l.MZ)({type:String})],Ce.prototype,"placement",void 0),Ee([(0,l.P)("#container",!0)],Ce.prototype,"container",void 0),Ee([(0,l.KN)({slot:"anchor",flatten:!0})],Ce.prototype,"anchors",void 0),Ee([s("open",{waitUntilFirstUpdate:!0})],Ce.prototype,"openChange",null),Ce=Ee([(0,u.E)("vcdk-dropdown-popover")],Ce);var Se=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const Ae="medium";function Ze(e){return!e.hidden&&!e.disabled}let Oe=class extends(g(x.l)){connectedCallback(){super.connectedCallback(),this.initializeValue(),this.handleMultipleChange()}handleMultipleChange(){this.items.forEach(e=>e.checkbox=Boolean(this.multi))}constructor(){var e,t;super(),this.size=Ae,this.clearable=!1,this.multi=!1,this.open=!1,this.singleChip=!1,this.filterInput=!1,this.selectedItems=[],this.activeItem=null,this.lastKeyTime=0,this.searchTerm=null,this.dropdownContext={size:this.size},this.wrapperRef=(0,p._)(),this.input=(0,p._)(),this.listboxRef=(0,p._)(),this.setSize=()=>{this.dropdownContext={size:this.size}},this.initializeValue=()=>{if(!this.items.length&&!this.selectedItems.length)return;if(this.handleMultipleChange(),null!==this.value&&void 0!==this.value){const e=this.findOptionsByValue(this.value),t=this.findOptionLabels();this.setDropdownSelectedValues(e.length?e:t)}else this.initializeFromSelectedOptions();const e=this.items.some(e=>!e.hidden);this.emptyOptions.forEach(t=>{t.hidden=e});const t=this.value??null;this.setValue(Array.isArray(t)?t.join(", "):t)},this.initializeFromSelectedOptions=()=>{this.setDropdownSelectedValues(this.items.filter(e=>e.selected))},this.getInputRef=()=>this.textField??null,this.selectValue=e=>{e.length<=0?this.value=null:this.multi?this.value=e.map(({value:e})=>e).filter(e=>null!=e):this.value=e.length>0?e[0].value:null},this.onClickOutside=e=>{const t=e.composedPath();this.wrapperRef?.value&&!t.includes(this.wrapperRef.value)&&this.closePopover()},this.toggleOpen=e=>{const t=this.listboxRef?.value&&e.composedPath().includes(this.listboxRef?.value);this.readonly||t||(this.open?this.closePopover():(this.openDropdown(),this.focus()))},this.handleOptionSelected=e=>{const t=e.target instanceof fe;e.target instanceof De&&this.filterOptionsBasedOnSearch(null),t&&!e.target.disabled&&this.selectOption(e.target),this.getDisableOnCloseValue()||(this.closePopover(),this.focus())},this.clearActiveOptions=()=>{this.items.forEach(e=>{e.active=!1}),this.activeItem=null},this.publishChangeEvent=()=>{this.multi?(this.dispatchEvent(new se(this.selectedItems)),this.dispatchEvent(new se(this.selectedItems,"vcdk-dropdown-"))):(this.dispatchEvent(new ae(this.selectedItems[0])),this.dispatchEvent(new ae(this.selectedItems[0],"vcdk-dropdown-")))},this.unselectAllOptions=()=>{const e=this.items.filter(({disabled:e})=>!e);this.setDropdownSelectedValues([]),e.forEach(e=>{e.selected=!1}),this.dropdownOptionSelectAll.forEach(e=>{e.selected="unchecked"})},this.handleSingleChipClick=async e=>{e.preventDefault(),e.stopPropagation(),this.unselectAllOptions(),this.getDisableOnCloseValue()||(this.closePopover(),this.focus()),await this.updateComplete,this.publishChangeEvent()},this.handleSelectAllCLick=async()=>{const e=this.items.filter(({disabled:e})=>!e);this.selectedItems.length>=e.length?this.unselectAllOptions():(this.setDropdownSelectedValues(e),e.forEach(e=>{e.selected=!0}),this.dropdownOptionSelectAll.forEach(e=>{e.selected="checked"})),this.getDisableOnCloseValue()||(this.closePopover(),this.focus()),this.popoverContainer.updatePosition(),await this.updateComplete,this.publishChangeEvent()},this.preventDefaultKeyboardEvent=e=>{ie(e).preventDefault()},this.openDropdown=()=>{this.open||this.disabled||(this.open=!0,!this.activeItem&&this.selectedItems.length&&this.activateItem(this.selectedItems[0]),this.popoverContainer.updatePosition())},this.onSpaceBarKey=e=>{this.open&&this.filterInput||this.preventDefaultKeyboardEvent(e),this.open||this.openDropdown()},this.activateItem=e=>{this.clearActiveOptions(),this.open&&e.scrollIntoView({behavior:"auto",block:"nearest"}),this.activeItem=e,this.activeItem.active=!0},this.onAltUp=()=>{this.activeItem&&this.selectOption(this.activeItem),this.closePopover(),this.focus()},this.onAltDown=()=>{this.open||(this.openDropdown(),this.focus())},this.onEscapeKey=e=>{this.preventDefaultKeyboardEvent(e),this.open&&this.closePopover()},this.setNextActiveElement=(e,t)=>{if(this.readonly)return;const i=this.selectedItems[0]??null,o=this.open?this.activeItem:i,r="start"===e||"end"===e,s=function(e,t,i){const o=function(e,t){if(!t)return-1;if("start"===t)return 0;if("end"===t)return e.length-1;return e.indexOf(t)}(e,t),r=function(e,t,i,o){if("start"===e)return i;if("end"===e)return i;return"forward"===t?i.slice(o+1):i.slice(0,o)}(t,i,e,o);return("forward"===i?r:r.reverse()).find(e=>!e.disabled&&!e.hidden)??e[o]}(this.items,r?e:o,t);this.open?this.activateItem(s):this.selectOption(s)},this.handleSearch=e=>{if(this.filterInput||this.readonly||this.disabled)return;const t=ie(e);if(!/^.$/u.test(t.key))return;t.preventDefault();const i=Date.now();i-this.lastKeyTime>500&&(this.searchTerm=""),this.lastKeyTime=i,this.searchTerm+=t.key.toLocaleLowerCase();const o=this.items.find(e=>null!==this.searchTerm&&e.textContent?.trim().toLocaleLowerCase().startsWith(this.searchTerm));o&&(this.open?this.activateItem(o):this.selectOption(o))},this.onArrowDown=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement(this.activeItem,"forward")},this.onArrowUp=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement(this.activeItem,"backwards")},this.onHomeKey=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement("start","forward")},this.onEndKey=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement("end","backwards")},this.onEnterKey=e=>{this.preventDefaultKeyboardEvent(e),this.readonly||(this.open?this.activeItem&&Ze(this.activeItem)?(this.selectOption(this.activeItem),this.getDisableOnCloseValue()||this.closePopover()):this.filterInput&&this.searchTerm&&this.addOption?.length&&(this.addOption[0].click(),this.filterOptionsBasedOnSearch(null),this.getDisableOnCloseValue()||this.closePopover()):this.openDropdown())},this.getDisableOnCloseValue=()=>this.disableCloseOnSelect??this.multi,this.getTextContent=e=>{if(this.filterInput&&null!==this.searchTerm)return this.searchTerm;if(this.multi)return this.selectedItems.length>0?" ":"";const t=e?.[0];return t?ne(t):""},this.handleSearchInputChange=e=>{if(this.disabled||this.readonly)return;const t=(this.searchTerm?null:e.detail.nativeEvent.data??null)??e.detail.value.trimStart();this.dispatchEvent(new le(t)),this.filterOptionsBasedOnSearch(t),this.popoverContainer.updatePosition(),this.openDropdown()},this.filterOptionsBasedOnSearch=e=>{this.searchTerm=e;const t=[null,void 0,""];let i=!0;this.items.forEach(o=>{if(null===e||t.includes(e))return o.hidden=!1,void(i=!1);this.filterOptions?o.hidden=!this.filterOptions(o):o.hidden=!o.textContent?.toLowerCase().includes(e.toLowerCase()),o.hidden||(i=!1)}),this.emptyOptions.forEach(e=>{e.hidden=!i}),this.activeItem=this.activeItem&&Ze(this.activeItem)?this.activeItem:this.items.find(e=>Ze(e))??null,this.activeItem&&this.activateItem(this.activeItem)},(e=this,t={skip:()=>!!this.disabled,bindingDefaults:{triggers:["keydownRepeat"]}},new oe(e,t)).set([W.altKey,W.arrowDown],this.onAltDown).set([W.altKey,W.arrowUp],this.onAltUp).set(W.arrowDown,this.onArrowDown).set(W.arrowUp,this.onArrowUp).set(W.escapeKey,this.onEscapeKey).set(W.homeKey,this.onHomeKey).set(W.endKey,this.onEndKey).set(W.spaceBar,this.onSpaceBarKey).set(W.enterKey,this.onEnterKey),this.addEventListener("keydown",this.handleSearch)}update(e){e.has("open")&&(this.open?(document.addEventListener("mousedown",this.onClickOutside,{passive:!0}),this.eventCleanup=()=>document.removeEventListener("mousedown",this.onClickOutside)):(this.eventCleanup?.(),this.eventCleanup=void 0)),super.update(e)}disconnectedCallback(){super.disconnectedCallback(),this.eventCleanup?.()}focus(){this.updateComplete.then(()=>{this.getInputRef()?.focus()})}select(){this.getInputRef()?.select()}blur(){this.getInputRef()?.blur()}setDropdownSelectedValues(e){this.selectedItems=e,this.items.forEach(e=>e.selected=!1),e.map(e=>e.selected=!0),this.selectValue(e),this.syncSelectAllOptionCheckboxValue()}findOptionsByValue(e){return this.items.filter(t=>this.multi?e?.includes(t.value):t.value===e)}findOptionLabels(){return this.items.filter(e=>{const t=ne(e);return!!t&&(this.multi?this.value?.includes(t):this.value===t)})}closePopover(){this.dispatchEvent(new R(!1))&&(this.open=!1,this.clearActiveOptions(),this.searchTerm=null,this.filterInput&&(this.filterOptionsBasedOnSearch(null),this.input.value&&(this.input.value.value=this.getTextContent(this.selectedItems)??"")))}async selectOption(e){if(this.disabled)return;const t=this.selectedItems.find(t=>t.value===e.value);this.multi?(e.selected=!e.selected,this.setDropdownSelectedValues(t?this.selectedItems.filter(t=>t.value!==e.value):[...this.selectedItems,e])):(this.items.forEach(e=>e.selected=!1),e.selected=!0,this.clearable&&t?this.setDropdownSelectedValues([]):this.setDropdownSelectedValues([e])),this.popoverContainer.updatePosition(),await this.updateComplete,this.publishChangeEvent()}syncSelectAllOptionCheckboxValue(){const e=this.items.filter(e=>!e.disabled).length,t=this.selectedItems.length;this.dropdownOptionSelectAll.forEach(i=>{i.selected=t===e?"checked":0===t?"unchecked":"indeterminate"})}shouldFormValueUpdate(){return!0}resetFormControl(){this.value=void 0,this.unselectAllOptions(),this.setValue(null)}get cssVariables(){return{"--vcdk-dropdown-search-chars":`${this.searchTerm?.length||1}ch`}}renderInput(){const{label:e,disabled:t,required:i,placeholder:o,name:r,error:s,helperText:n,size:l,filterInput:d,readonly:c}=this,v=this.getTextContent(this.selectedItems),u=this.multi,b=this.selectedItems.length>0,y=u&&b?"":o;return a.qy`
      <vcdk-text-field
        ${(0,p.K)(this.input)}
        exportparts=${"fieldset, label, input-wrapper, input, before-input, after-input, icon"}
        id="anchor"
        slot="anchor"
        autocomplete="off"
        role="combobox"
        aria-controls=${(0,L.J)(this.open?"menu":void 0)}
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-label=${(0,L.J)(e)}
        .floatingLabel=${this.floatingLabel}
        .value=${v}
        .label=${e}
        .inputAriaLabel=${e}
        .disabled=${t}
        .required=${i}
        .placeholder=${y??""}
        .error=${s}
        .helperText=${n}
        .size=${l}
        .name=${r}
        ?readonly=${!d||c}
        .icon=${this.open?"chevron-up":"chevron-down"}
        .iconAriaLabel=${this.open?"Close":"Open"}
        .tabIndex=${this.filterInput?0:-1}
        @input=${this.handleSearchInputChange}>
        ${(0,h.z)(u,()=>a.qy`
            <vcdk-chips slot="before-input">
              ${(0,h.z)(this.singleChip&&this.selectedItems.length>0,()=>a.qy`
                  <vcdk-chip
                    size="small"
                    data-testid="selected-chips"
                    @click=${this.handleSingleChipClick}
                    iconEnd="close">
                    <slot name="single-chip-label">
                      ${this.selectedItems.length}
                    </slot>
                  </vcdk-chip>
                `,()=>(0,_.T)(this.selectedItems,e=>a.qy`
                      <vcdk-chip
                        size="small"
                        data-testid="selected-chips"
                        .value=${e.value}
                        @click=${t=>{t.preventDefault(),t.stopPropagation(),this.selectOption(e)}}
                        iconEnd="close">
                        ${e.getTextContent()}
                      </vcdk-chip>
                    `))}
            </vcdk-chips>
          `)}
      </vcdk-text-field>
    `}render(){const{open:e,placement:t}=this;return a.qy`
      <div
        class=${(0,d.H)({dropdown:1,"helper-text":!!this.helperText,"filter-input":!!this.filterInput,[`size-${this.size}`]:this.size,multi:!!this.multi,disabled:!!this.disabled,readonly:!!this.readonly,open:!!this.open,"floating-label":!!this.floatingLabel,"has-selected-values":!!this.selectedItems.length,"single-chip":!!this.singleChip,error:!!this.error})}
        style=${(0,N.W)(this.cssVariables)}
        @click=${this.toggleOpen}
        tabindex="0"
        data-testid="dropdown"
        ${(0,p.K)(this.wrapperRef)}>
        <vcdk-dropdown-popover ?open=${e} .placement=${t}>
          ${this.renderInput()}

          <div>
            <div
              id="listbox"
              role="listbox"
              aria-expanded=${e?"true":"false"}
              aria-hidden=${e?"false":"true"}
              aria-multiselectable=${this.multi?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="option-container"
              tabindex="-1"
              ${(0,p.K)(this.listboxRef)}
              @click=${this.handleOptionSelected}
              @dropdownselectalloption=${this.handleSelectAllCLick}>
              <slot @slotchange=${this.initializeValue}></slot>
            </div>
          </div>
        </vcdk-dropdown-popover>
      </div>
    `}};Oe.styles=[de],Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"floatingLabel",void 0),Se([(0,l.MZ)({type:String})],Oe.prototype,"placement",void 0),Se([(0,l.MZ)({type:String})],Oe.prototype,"size",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"disableCloseOnSelect",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"disabled",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"readonly",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"clearable",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"error",void 0),Se([(0,l.MZ)({type:String})],Oe.prototype,"helperText",void 0),Se([(0,l.MZ)({type:String})],Oe.prototype,"label",void 0),Se([(0,l.MZ)({type:Object})],Oe.prototype,"multi",void 0),Se([(0,l.MZ)({type:String,reflect:!0})],Oe.prototype,"name",void 0),Se([(0,l.MZ)({type:Boolean,reflect:!0})],Oe.prototype,"open",void 0),Se([(0,l.MZ)({type:String})],Oe.prototype,"placeholder",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"required",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"singleChip",void 0),Se([(0,l.MZ)({type:Boolean})],Oe.prototype,"filterInput",void 0),Se([(0,l.MZ)({attribute:!1})],Oe.prototype,"filterOptions",void 0),Se([(0,l.P)("vcdk-text-field")],Oe.prototype,"textField",void 0),Se([V(null,"vcdk-dropdown-add-option")],Oe.prototype,"addOption",void 0),Se([(0,l.MZ)({type:String,reflect:!0})],Oe.prototype,"value",void 0),Se([(0,l.wk)()],Oe.prototype,"selectedItems",void 0),Se([(0,l.wk)()],Oe.prototype,"activeItem",void 0),Se([(0,l.wk)()],Oe.prototype,"lastKeyTime",void 0),Se([(0,l.wk)()],Oe.prototype,"searchTerm",void 0),Se([V(null,"vcdk-dropdown-option")],Oe.prototype,"items",void 0),Se([V(null,"vcdk-dropdown-empty-option")],Oe.prototype,"emptyOptions",void 0),Se([V(null,"vcdk-dropdown-select-all-option")],Oe.prototype,"dropdownOptionSelectAll",void 0),Se([(0,l.P)("vcdk-dropdown-popover")],Oe.prototype,"popoverContainer",void 0),Se([(0,o.Gt)({context:re})],Oe.prototype,"dropdownContext",void 0),Se([s("size")],Oe.prototype,"setSize",void 0),Se([s("value")],Oe.prototype,"initializeValue",void 0),Se([s("multi")],Oe.prototype,"handleMultipleChange",null),Oe=Se([(0,u.E)("vcdk-dropdown")],Oe);var Ie=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let De=class extends x.l{constructor(){super(...arguments),this.dropdownContext=new o.G(this,{context:re,subscribe:!0}),this.click=()=>{this.dispatchEvent(new MouseEvent("click",{bubbles:!0,composed:!0}))}}render(){const e=this.dropdownContext?.value?.size||Ae;return a.qy`
      <div
        role="option"
        class=${(0,d.H)({option:!0,[e]:!0})}
        tabindex="0">
        <span part="content">
          <slot></slot>
        </span>
        <slot name="icon"></slot>
      </div>
    `}};De.styles=[ce],De=Ie([(0,u.E)("vcdk-dropdown-add-option")],De);var Te=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Re=class extends x.l{firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","separator")}render(){return a.qy`
      <div class="divider" role="separator"></div>
    `}};Re.styles=[he],Re=Te([(0,u.E)("vcdk-dropdown-divider")],Re);var Pe=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Ve=class extends x.l{constructor(){super(...arguments),this.dropdownContext=new o.G(this,{context:re,subscribe:!0})}render(){const e=this.dropdownContext?.value?.size||Ae;return a.qy`
      <div
        class=${(0,d.H)({option:1,"typography-body":1,hidden:this.hidden,[e]:!0})}
        tabindex="-1">
        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};Ve.styles=[ce,n.IT.body],Ve=Pe([(0,u.E)("vcdk-dropdown-empty-option")],Ve);var Le=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Be=class extends x.l{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.selected="unchecked",this.dropdownContext=new o.G(this,{context:re,subscribe:!0}),this.handleClick=()=>{this.disabled||this.dispatchEvent(new CustomEvent("dropdownselectalloption",{bubbles:!0,composed:!0}))},this.getCheckboxValue=()=>"checked"===this.selected||"unchecked"!==this.selected&&void 0}render(){const e=this.dropdownContext?.value?.size||Ae;return a.qy`
      <div
        @click=${this.handleClick}
        role="option"
        class=${(0,d.H)({option:1,disabled:this.disabled,selected:this.selected,active:this.active,"typography-body":!0,hidden:this.hidden,[e]:!0})}
        tabindex="-1"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        <vcdk-checkbox
          label=""
          .disabled=${this.disabled}
          .checked=${this.getCheckboxValue()}></vcdk-checkbox>

        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};Be.styles=[ce,n.IT.body],Le([(0,l.MZ)({type:Boolean,reflect:!0})],Be.prototype,"active",void 0),Le([(0,l.MZ)({type:Boolean,reflect:!0})],Be.prototype,"disabled",void 0),Le([(0,l.MZ)({type:String,reflect:!0})],Be.prototype,"selected",void 0),Be=Le([(0,u.E)("vcdk-dropdown-select-all-option")],Be)},7502:(e,t,i)=>{i.d(t,{m:()=>r});var o=i(2618);const r=e=>"number"==typeof e?e:e||o.s6},7909:(e,t,i)=>{i(2932);var o=i(1669),r=i(2618),s=i(352),n=i(302),a=i(6487),l=i(6260);const d=r.AH`
  :host {
    --vcdk-accordion-summary-padding-inline: var(--vcdk-spacing-6);
  }

  details {
    color: var(--vcdk-color-text-subtle);
    width: 100%;
    max-width: 100%;
    border-bottom: 1px solid var(--vcdk-color-border-subtle);
    display: block;
    background-color: var(--vcdk-color-bg);
  }

  summary {
    display: flex;
    width: 100%;
    gap: var(--vcdk-spacing-5);
    padding-block: var(--vcdk-spacing-7);
    padding-inline: var(--vcdk-accordion-summary-padding-inline);
    align-items: center;
    border-radius: var(--vcdk-radius-default);
    cursor: pointer;
    user-select: none;
  }

  summary:focus-visible {
    outline-width: 3px;
  }

  summary:hover {
    background-color: var(--vcdk-color-bg-hover);
    border-radius: 0;
  }

  summary:active {
    background-color: var(--vcdk-color-bg-pressed);
    border-radius: 0;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .title {
    display: flex;
    flex-grow: 1;
  }

  vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text);
  }

  .chevron {
    transition: transform 240ms;
    color: var(--vcdk-color-text);
    transition-timing-function: cubic-bezier(0.45, 0, 0.125, 1);
    margin-inline-end: var(--vcdk-spacing-3);
  }

  [open] .chevron {
    transform: rotate(-180deg);
  }

  .content {
    display: block;
    padding-inline: var(--vcdk-spacing-6);
    padding-block: var(--vcdk-spacing-4) var(--vcdk-spacing-8);
    color: var(--vcdk-color-text-subtle);
    text-align: start;
  }
`;var c=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};class p extends CustomEvent{constructor(e,t){super(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0})}}let h=class extends l.l{constructor(){super(...arguments),this.headerTitle="",this.open=!1,this.onToggleClick=e=>{e.preventDefault();const t=!this.open,i=new p("toggle",{open:t});this.dispatchEvent(i);const o=new p("vcdk-toggle",{open:t});this.dispatchEvent(o);i.defaultPrevented||o.defaultPrevented||(this.open=t)}}render(){const{headerTitle:e,headerIcon:t}=this;return r.qy`
      <details ?open=${this.open} part="details">
        <summary
          id="accordionID"
          part="summary"
          @click=${this.onToggleClick}
          aria-controls="accordionSectionID"
          aria-expanded=${this.open?"true":"false"}>
          <slot name="summary-start">
            ${(0,n.z)(t,()=>r.qy`
                <vcdk-system-icon
                  size=${24}
                  icon=${t}></vcdk-system-icon>
              `)}
          </slot>
          <slot name="title" class="title typography-subtitle1">
            ${e}
          </slot>
          <slot name="summary-end"></slot>
          <vcdk-system-icon
            class="chevron"
            size=${24}
            icon=${"chevron-down"}></vcdk-system-icon>
        </summary>
        <slot
          part="content"
          class="content"
          role="region"
          id="accordionSectionID"
          aria-labelledby="accordionID"></slot>
      </details>
    `}};h.styles=[o.IT.subtitle1,d],c([(0,s.MZ)({type:String})],h.prototype,"headerTitle",void 0),c([(0,s.MZ)({type:String})],h.prototype,"headerIcon",void 0),c([(0,s.MZ)({type:Boolean,reflect:!0})],h.prototype,"open",void 0),h=c([(0,a.E)("vcdk-accordion")],h)}}]);
//# sourceMappingURL=vcdk.js.map