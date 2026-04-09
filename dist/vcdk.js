"use strict";(self.webpackChunkvolvotrucks_na=self.webpackChunkvolvotrucks_na||[]).push([[325],{1089:(e,t,i)=>{i.d(t,{f:()=>o});const o={xs:{from:0,to:599.98},sm:{from:600,to:904.98},md:{from:905,to:1239.98},lg:{from:1240,to:1439.98},xl:{from:1440,to:15360}}},1322:(e,t,i)=>{i.d(t,{l:()=>p});var o=i(767);const r=["volvo","mack","renault"];var s=i(6337),n=i(352),a=i(2302);const d=(0,o.q6)(Symbol("vcdk-theme"));if("undefined"!=typeof document){const e=new o.aU,t=()=>e.attach(document.body);document.body?t():document.addEventListener("DOMContentLoaded",t)}const l=s.AH`
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
`;var c=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};class p extends s.WF{constructor(){super(...arguments),this.isThemeProvider=!1,this.themeProvider=void 0,this.themeConsumer=new o.G(this,{context:d,subscribe:!0,callback:()=>{this.handleTheming()}})}static get defaultLocale(){return"undefined"!=typeof document&&document.documentElement.lang?document.documentElement.lang:"undefined"!=typeof window?window.navigator.language:"en-US"}get currentTheme(){let e=this.themeId??this.contextTheme??p.defaultTheme;return this.invertTheme&&(e=function(e){return e.includes("light")?e.replace("light","dark"):e.replace("dark","light")}(e)),e}get contextTheme(){return this.themeConsumer?.value?.themeId}get contextIconSet(){return this.themeConsumer?.value?.iconSet}get currentIconSet(){return void 0!==this.iconSet&&"auto"!==this.iconSet?this.iconSet:void 0!==this.contextIconSet?this.contextIconSet:this.brandId}get brandId(){return this.currentTheme?.split("-")[0]}get colorSchemeId(){return this.currentTheme?.split("-")[1]}themeChanged(){(0,a.A)()}update(e){(e.has("themeId")||e.has("invertTheme")||e.has("iconSet"))&&this.handleTheming(),super.update(e)}handleTheming(){const e=this.currentTheme!==this.contextTheme,t=void 0!==this.iconSet&&"auto"!==this.iconSet;if(e||t){const e=void 0!==this.iconSet&&"auto"!==this.iconSet?this.iconSet:this.contextIconSet;return this.isThemeProvider?this.themeProvider?.setValue({themeId:this.currentTheme,iconSet:e}):(this.isThemeProvider=!0,this.themeProvider=new o.DT(this,{context:d,initialValue:{themeId:this.currentTheme,iconSet:e}})),this.setThemeCssClasses(),void this.themeChanged()}this.isThemeProvider&&this.themeProvider&&(this.isThemeProvider=!1,this.removeController(this.themeProvider),this.themeProvider=void 0,this.setThemeCssClasses(),this.themeChanged())}setThemeCssClasses(){const e=this.currentTheme!==this.contextTheme;for(const t of r)this.classList.toggle(`vcdk-theme-${t}`,e&&this.brandId===t);this.classList.toggle("vcdk-mode-dark",e&&"dark"===this.colorSchemeId)}static finalizeStyles(e){return e?Array.isArray(e)?(e.unshift(l),s.WF.finalizeStyles(e)):s.WF.finalizeStyles([l,e]):s.WF.finalizeStyles(l)}}p.version="10.14.0",p.defaultTheme="volvo-light",c([(0,n.MZ)({type:String,reflect:!0})],p.prototype,"themeId",void 0),c([(0,n.MZ)({type:Boolean,attribute:"invert-theme",reflect:!0})],p.prototype,"invertTheme",void 0),c([(0,n.MZ)({type:String,attribute:"icon-set"})],p.prototype,"iconSet",void 0)},1669:(e,t,i)=>{i.d(t,{FB:()=>l,IT:()=>d,UN:()=>c,gI:()=>n,zQ:()=>a});var o=i(1089),r=i(6337),s=i(2326);const n=r.AH`
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
  `},d=["display-statement","display1","display2","heading1","heading2","heading3","heading4","subtitle1","subtitle2","large-body","body","button","caption1","caption2"].reduce((e,t)=>(e[t]=r.AH`
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
    `,e),{}),l=Object.values(d),c=(e,t)=>{const i="font-size"===t?"size":t,o=(0,s.A)(e);return[`var(--vcdk-typography-${o}-${i}-small-screens)`,`var(--vcdk-typography-${o}-${i}-large-screens)`]}},3018:(e,t,i)=>{var o=i(1669),r=i(6591),s=i(1089),n=i(6337),a=i(9703),d=i(2049);const l=Object.keys(s.f),c=e=>(0,a.A)(e)?e:`${e}px`,p=(e,t)=>{if(t)return(0,d.A)(t)?t.reduce((t,i,o)=>{const r=l[o];return{...t,[`${e}-${r}`]:c(i)}},{}):{[e]:c(t)}},h=Object.entries(s.f),v=(e,t)=>{const i=`\n  ${e} {\n    ${t}: var(${t}-xs);\n  }`,o=Object.entries(s.f).splice(1).map(([i,o],r)=>{const s=h[r+2],n=s?`, var(${t}-${s[0]})`:"";return`\n    @media(min-width: ${o.from}px) {\n      ${e} {\n        ${t}: var(${t}-${i} ${n});\n      } \n    }`});return(0,n.iz)([i,o].join(""))};var u=i(352),b=i(3720),y=i(1145),f=i(302),g=i(6487),m=i(4135),k=i(6260);const x=n.AH`
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

  ${v(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-line-height")}
  ${v(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-font-size")}

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
`;var w=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let $=class extends((0,m.F)(k.l)){constructor(){super(...arguments),this.disableAnimation=!1,this.typographyVariant="body",this.variant="typography",this.elementAriaDescription=null}get cssVariables(){return{...this.typographyVariant&&p("--vcdk-skeleton-line-height",(0,o.UN)(this.typographyVariant,"line-height")),...this.typographyVariant&&p("--vcdk-skeleton-font-size",(0,o.UN)(this.typographyVariant,"font-size"))}}render(){return n.qy`
      <div
        class=${(0,b.H)({skeleton:1,"disable-animation":!!this.disableAnimation,"aspect-ratio":!!this.aspectRatio,[`typography-${this.typographyVariant}`]:!!this.typographyVariant,[`variant-${this.variant}`]:1})}
        style=${(0,y.W)(this.cssVariables)}>
        ${(0,f.z)(this.elementAriaDescription,()=>n.qy`
            <div class="hidden">${this.elementAriaDescription}</div>
          `)}
        <slot aria-hidden="true"></slot>
      </div>
    `}};$.styles=[x,...o.FB],$.responsiveProperties={prefix:"vcdk-skeleton",props:["width","height","size","aspectRatio"]},w([(0,u.MZ)({attribute:"aspect-ratio",converter:r.g})],$.prototype,"aspectRatio",void 0),w([(0,u.MZ)({type:Boolean,attribute:"disable-animation"})],$.prototype,"disableAnimation",void 0),w([(0,u.MZ)({converter:r.g})],$.prototype,"height",void 0),w([(0,u.MZ)({converter:r.g})],$.prototype,"size",void 0),w([(0,u.MZ)({type:String,attribute:"typography-variant"})],$.prototype,"typographyVariant",void 0),w([(0,u.MZ)({converter:r.g})],$.prototype,"width",void 0),w([(0,u.MZ)({type:String})],$.prototype,"variant",void 0),w([(0,u.MZ)({type:String,attribute:"element-aria-description"})],$.prototype,"elementAriaDescription",void 0),$=w([(0,g.E)("vcdk-skeleton")],$);var E=i(7093),C=i(31),M=i(8776),z=i(5664);const S=n.AH`
  .svg {
    max-width: 100%;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    color: var(--vcdk-color-icon, inherit);
    width: var(--vcdk-system-icon-size, 1.5rem);
    height: var(--vcdk-system-icon-size, 1.5rem);
    min-width: var(--vcdk-system-icon-size, 1.5rem);
    min-height: var(--vcdk-system-icon-size, 1.5rem);
  }
`;var I=i(582),O=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Z=class extends k.l{constructor(){var e,t;super(...arguments),this.elementRole="presentation",this.elementAriaHidden=null,this.loading=E.W0.loading,this.assetsTask=(e=this,t=()=>[this.icon,this.filled,this.currentIconSet,this.loading],new I.YZ(e,{task:async([t,i,o,r])=>{if(!t)return"";"lazy"===r&&await new Promise(t=>{const i=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(i.disconnect(),t())});i.observe(e)});const s=(0,E.QK)({type:i?"filled":"lined",brand:o,iconId:t});try{return await(0,E.Dc)(s)}catch(e){throw console.error(`Failed when loading icon id: "${String(t)}". ${String(e)}`),e}},args:t}))}get sizeUnit(){return this.size?this.size+"px":"var(--vcdk-system-icon-size, 24px)"}render(){return this.assetsTask.render({pending:()=>n.qy`
        <div style="width:${this.sizeUnit};height:${this.sizeUnit}"></div>
      `,complete:e=>this.svgTemplate(e),error:()=>n.qy`
        <div style="width:${this.sizeUnit};height:${this.sizeUnit}"></div>
      `})}svgTemplate(e){const t=this.elementTitle?this.elementAriaLabelledBy||(0,z.A)("svg-title-"):void 0,i=this.description?this.elementAriaDescribedBy||(0,z.A)("svg-description-"):void 0;return n.JW`
      <svg
        class="svg"
        part="svg"
        focusable="false"
        role=${(0,C.J)(this.elementRole)}
        aria-labelledby=${(0,C.J)(t)}
        aria-describedby=${(0,C.J)(i)}
        aria-hidden=${(0,C.J)(this.elementAriaHidden)}
        style=${(0,C.J)(this.size?`--vcdk-system-icon-size: ${this.size}px;`:n.s6)}>
        ${this.elementTitle?n.JW`<title id="${t}">${this.elementTitle}</title>`:n.s6}
        ${this.description?n.JW`<desc id="${i}">${this.description}</desc>`:n.s6}
        ${(0,M.T)(e)}
      </svg>
    `}};Z.styles=[S],O([(0,u.MZ)({type:Boolean})],Z.prototype,"filled",void 0),O([(0,u.MZ)({type:String})],Z.prototype,"icon",void 0),O([(0,u.MZ)({type:Number})],Z.prototype,"size",void 0),O([(0,u.MZ)({type:String,attribute:"element-aria-labelledby"})],Z.prototype,"elementAriaLabelledBy",void 0),O([(0,u.MZ)({type:String,attribute:"element-title"})],Z.prototype,"elementTitle",void 0),O([(0,u.MZ)({type:String,attribute:"element-aria-describedby"})],Z.prototype,"elementAriaDescribedBy",void 0),O([(0,u.MZ)({type:String})],Z.prototype,"description",void 0),O([(0,u.MZ)({type:String,attribute:"element-role"})],Z.prototype,"elementRole",void 0),O([(0,u.MZ)({type:String,attribute:"element-aria-hidden"})],Z.prototype,"elementAriaHidden",void 0),O([(0,u.MZ)({type:String})],Z.prototype,"loading",void 0),Z=O([(0,g.E)("vcdk-system-icon")],Z)},3330:(e,t,i)=>{var o=i(767),r=i(7663),s=i(6337);const n=s.AH`
  .variant-default {
    --vcdk-tooltip-background: var(--vcdk-color-bg-inverse);
    --vcdk-tooltip-color: var(--vcdk-color-text-on-inverse);
  }

  .variant-subtle {
    --vcdk-tooltip-background: var(--vcdk-color-bg);
    --vcdk-tooltip-color: var(--vcdk-color-text);
  }

  .variant-highlight {
    --vcdk-tooltip-background: var(--vcdk-color-bg-highlight);
    --vcdk-tooltip-color: var(--vcdk-color-text-on-inverse);
  }

  .variant-error {
    --vcdk-tooltip-background: var(--vcdk-color-bg-error);
    --vcdk-tooltip-color: var(--vcdk-color-text-on-error);
  }

  .disabled {
    --vcdk-tooltip-background: var(--vcdk-color-bg-disabled);
    --vcdk-tooltip-color: var(--vcdk-color-text-disabled);
  }

  .container {
    z-index: var(--vcdk-z-index-tooltip);
    position: fixed;
    box-shadow: var(--vcdk-shadow-two);
    border-radius: var(--vcdk-radius-default);
    width: max-content;
    max-width: 300px;
    display: none;
    background: var(--vcdk-tooltip-background);
    color: var(--vcdk-tooltip-color);
  }

  .container.disabled {
    box-shadow: none;
    cursor: not-allowed;
  }

  .container.open {
    display: block;
  }

  .arrow {
    position: absolute;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2));
  }

  .arrow::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    margin: -5px;
    transform: rotate(45deg);
    box-shadow: var(--vcdk-shadow-two);
    background: var(--vcdk-tooltip-background);
  }

  .arrow.disabled {
    filter: none;
  }

  .arrow.disabled::before {
    box-shadow: none;
  }

  .tooltip {
    position: relative;
    z-index: var(--vcdk-z-index-over-input);
    border-radius: var(--vcdk-radius-default);
    padding-block: 4px;
    padding-inline: 8px;
    display: block;
    background: inherit;
    color: inherit;
  }
`;var a=i(1669),d=i(6260),l=i(352),c=i(3720),p=i(7832),h=i(5664),v=i(6487),u=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let b=class extends d.l{constructor(){super(...arguments),this.disableInteractive=!1,this.leaveDelay=300,this.offset=0,this.placement="top",this.reference=null,this.referenceTrigger="hover",this.variant="default",this.isOpen=!1,this.containerRef=(0,p._)(),this.arrowRef=(0,p._)(),this.uniqueTooltipId=(0,h.A)("tooltip-"),this.keyDown=e=>{"Escape"===e.key&&this.hide()},this.enterTooltip=()=>{window.clearTimeout(this.leaveTimeout)},this.show=()=>{this.containerRef.value&&(this.dispatchEvent(new CustomEvent("vcdk-show")),window.clearTimeout(this.leaveTimeout),this.isOpen=!0,this.autoCleanup=(0,r.ll)(this.getReferenceElement(),this.containerRef.value,this.updatePosition),!this.disableInteractive&&this.shouldHandleEvents&&(this.containerRef.value.addEventListener("mouseenter",this.enterTooltip,{passive:!0}),this.containerRef.value.addEventListener("mouseleave",this.hideDelayed)))},this.hideDelayed=()=>{this.leaveTimeout=window.setTimeout(()=>{this.hide()},this.leaveDelay)},this.hide=()=>{this.dispatchEvent(new CustomEvent("vcdk-hide")),this.isOpen=!1,this.autoCleanup?.(),this.disableInteractive||(this.containerRef.value?.removeEventListener("mouseenter",this.enterTooltip),this.containerRef.value?.removeEventListener("mouseleave",this.hideDelayed))},this.getReferenceElement=()=>this.reference||this.parentElement||this,this.updatePosition=()=>{this.containerRef.value&&this.arrowRef.value&&(0,r.rD)(this.getReferenceElement(),this.containerRef.value,{placement:this.placement,middleware:[(0,r.cY)(this.offset),(0,r.UU)(),(0,r.BN)(),(0,r.UE)({element:this.arrowRef.value}),(0,r.jD)()],strategy:this.strategy??"fixed"}).then(({x:e,y:t,placement:i,strategy:o,middlewareData:r})=>{if(!this.containerRef.value)return;Object.assign(this.containerRef.value.style,{position:o,display:r.hide?.referenceHidden?"none":"",top:`${t}px`,left:`${e}px`});const s=r.arrow?.x,n=r.arrow?.y;let a;switch(i){case"left":a={left:"100%",top:`${n}px`};break;case"right":a={left:"0",top:`${n}px`};break;case"top":a={left:`${s}px`,top:"100%"};break;case"top-start":a={left:"20px",top:"100%"};break;case"bottom":a={left:`${s}px`,top:"0"};break;case"bottom-start":a={left:"20px",top:"0"};break;default:a={left:"",top:""}}this.arrowRef.value&&Object.assign(this.arrowRef.value?.style,a)}).catch(console.error)}}connectedCallback(){super.connectedCallback(),this.shouldHandleEvents&&(this.eventsCleanup=this.bindEvents()),this.isOpen=!!this.open}disconnectedCallback(){this.eventsCleanup?.(),this.autoCleanup?.(),super.disconnectedCallback()}update(e){super.update(e),["open","reference","referenceTrigger"].some(t=>e.has(t))&&(this.eventsCleanup?.(),this.shouldHandleEvents?this.eventsCleanup=this.bindEvents():this.open?this.show():this.hide())}get shouldHandleEvents(){return"hover"===this.referenceTrigger&&void 0===this.open}bindEvents(){return document.addEventListener("keydown",this.keyDown,{passive:!0}),this.reference?.addEventListener("mouseenter",this.show,{passive:!0}),this.reference?.addEventListener("mouseleave",this.hideDelayed,{passive:!0}),this.reference?.addEventListener("focusin",this.show,{passive:!0}),this.reference?.addEventListener("focusout",this.hide,{passive:!0}),()=>{document.removeEventListener("keydown",this.keyDown),this.reference?.removeEventListener("mouseenter",this.show),this.reference?.removeEventListener("mouseleave",this.hideDelayed),this.reference?.removeEventListener("focusin",this.show),this.reference?.removeEventListener("focusout",this.hide)}}render(){const{isOpen:e,disabled:t}=this,i=this.id||this.uniqueTooltipId;return s.qy`
      <div
        ${(0,p.K)(this.containerRef)}
        id=${i}
        class=${(0,c.H)({disabled:!!t,container:!0,open:e,[`variant-${this.variant}`]:!!this.variant})}
        part="tooltip"
        role="tooltip">
        <slot
          class=${(0,c.H)({disabled:!!t,tooltip:!0,"typography-caption2":!0})}
          part="tooltip-slot"></slot>
        <div
          ${(0,p.K)(this.arrowRef)}
          part="tooltip-arrow"
          class=${(0,c.H)({disabled:!!t,arrow:!0})}></div>
      </div>
    `}};b.styles=[a.IT.caption2,n],u([(0,l.MZ)({type:Boolean})],b.prototype,"disableInteractive",void 0),u([(0,l.MZ)({type:Number})],b.prototype,"leaveDelay",void 0),u([(0,l.MZ)({type:Number})],b.prototype,"offset",void 0),u([(0,l.MZ)({type:String})],b.prototype,"placement",void 0),u([(0,l.MZ)({type:Boolean})],b.prototype,"disabled",void 0),u([(0,l.MZ)({type:Boolean})],b.prototype,"open",void 0),u([(0,l.MZ)({type:Object})],b.prototype,"reference",void 0),u([(0,l.MZ)({type:String})],b.prototype,"referenceTrigger",void 0),u([(0,l.MZ)({type:String})],b.prototype,"variant",void 0),u([(0,l.MZ)({type:String})],b.prototype,"strategy",void 0),u([(0,l.wk)()],b.prototype,"isOpen",void 0),b=u([(0,v.E)("vcdk-tooltip")],b);var y=i(5006);const f=(0,o.q6)("vcdk-checkbox-group");var g=i(1322);class m extends Event{constructor(){super(m.eventName,{bubbles:!0,composed:!0,cancelable:!1})}}m.eventName="vcdk-invalid";class k extends Event{constructor(){super(k.eventName,{bubbles:!0,composed:!0,cancelable:!1})}}k.eventName="vcdk-touched";const x=s.AH`
  :host {
    --vcdk-form-cursor: pointer;
    --vcdk-form-hint-color: var(--vcdk-color-text-subtle);
    --vcdk-form-label-color: var(--vcdk-color-text-subtle);
    --vcdk-form-outline-color: var(--vcdk-color-border-input-active);
  }

  :host(:state(invalid-visible)) {
    --vcdk-form-hint-color: var(--vcdk-color-text-error);
    --vcdk-form-outline-color: var(--vcdk-color-border-error);
  }

  :host(:state(disabled)) {
    --vcdk-form-cursor: not-allowed;
    --vcdk-form-hint-color: var(--vcdk-color-text-disabled);
    --vcdk-form-label-color: var(--vcdk-color-text-disabled);
  }

  :host(:state(readonly)) {
    --vcdk-form-cursor: not-allowed;
    --vcdk-form-hint-color: var(--vcdk-color-text-subtlest);
  }

  .text {
    color: var(--vcdk-form-label-color);
    cursor: var(--vcdk-form-cursor);
  }

  .hint {
    color: var(--vcdk-form-hint-color);
  }
`;var w=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const $=["error","disabled","readOnly","hasInteracted","formNoValidate"];class E extends g.l{static get validators(){return[{observedProperties:["customError"],checkValidity(e){const t={message:"",isValid:!0,invalidKeys:[]};return"string"==typeof e.customError&&e.customError.length>0&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}]}static defaultValidationMessages(e){return{}}finalValidationMessages(){return Object.assign({},this.constructor.defaultValidationMessages(this),"function"==typeof this.validationMessages?this.validationMessages(this):this.validationMessages)}get currentInteractionTriggers(){return this.interactionTriggers?.length?this.interactionTriggers:this.constructor.interactionTriggers}constructor(){super(),this.validators=[],this.interactionsReceived=[],this.onFormSubmit=()=>{this.hasInteracted=!0},this.hasInteracted=!1,this.formNoValidate=!1,this.customError="",this.name="",this.required=!1,this.disabled=!1,this.readOnly=!1,this.error=!1,this.defaultValue="",this.skipValidation=!1,this.customStates={set:(e,t)=>{this.internals?.states&&(t?this.internals.states.add(e):this.internals.states.delete(e))},has:e=>!!this.internals?.states&&this.internals.states.has(e)},this.wiredEvents=[],this.onInteraction=e=>{this.interactionsReceived.includes(e.type)||this.interactionsReceived.push(e.type),!this.hasInteracted&&this.currentInteractionTriggers.every(e=>this.interactionsReceived.includes(e))&&(this.hasInteracted=!0)},this.onInvalid=e=>{e.target===this&&(e.preventDefault(),this.hasInteracted=!0,this.updateValidity())},this.submitOnEnter=e=>{if("Enter"!==e.key)return;if(!this.form||this.disabled||this.readOnly)return;e.preventDefault();const t=this.form.querySelector('[type="submit"]:not([disabled])');t?t.click():this.form.requestSubmit()};try{this.internals=this.attachInternals()}catch{console.warn("ElementInternals API is not supported in this browser. A polyfill may be required.")}}disconnectedCallback(){super.disconnectedCallback(),s.S$||(this.noValidateObserver?.disconnect(),this.wiredEvents.forEach(e=>{this.removeEventListener(e,this.onInteraction)}),this.removeEventListener("invalid",this.onInvalid),this.form?.removeEventListener("submit",this.onFormSubmit))}formAssociatedCallback(e){!s.S$&&e&&(this.noValidateObserver&&this.noValidateObserver.disconnect(),this.noValidateObserver=new MutationObserver(()=>{this.formNoValidate=e.hasAttribute("novalidate"),this.updateValidity()}),this.noValidateObserver.observe(e,{attributes:!0,attributeFilter:["novalidate"]}),this.formNoValidate=e.hasAttribute("novalidate"),e.addEventListener("submit",this.onFormSubmit))}get hint(){return this.error&&this.helperText?this.helperText:this.states.has("invalid-visible")?this.validationMessage:this.helperText}get allValidators(){return[...this.constructor.validators,...this.validators]}get allObservedProperties(){const e=this.allValidators,t=new Set;return t.add("validationMessages"),e.forEach(e=>{e.observedProperties.forEach(e=>t.add(e))}),Array.from(t)}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}get willValidate(){return this.internals.willValidate}get form(){return this.internals.form}get states(){return this.internals.states}get labels(){return this.internals.labels}get validationTarget(){return this.input||void 0}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}updateValidity(){if(this.disabled||!this.willValidate||this.skipValidation)return void this.resetValidity();const e=this.allValidators;if(!e.length)return;const t={},i=this.validationTarget||this.input||void 0;let o="";for(const i of e){const{isValid:e,message:r,invalidKeys:s}=i.checkValidity(this);e||(o||(o=r),s?.length&&s.forEach(e=>t[e]=!0))}o||(o=this.validationMessage),this.setValidity(t,o,i)}firstUpdated(e){0===this.wiredEvents.length&&this.wireInteractionEvents(),this.addEventListener("invalid",this.onInvalid),super.firstUpdated(e)}update(e){super.update(e),e.has("interactionTriggers")&&this.wireInteractionEvents(),e.has("validity")&&!this.validity.valid&&this.hasInteracted&&this.dispatchEvent(new m),e.has("hasInteracted")&&this.hasInteracted&&this.dispatchEvent(new k),e.has("value")&&this.name&&this.setFormValue(this.value)}setFormValue(e){this.internals.setFormValue(e)}setValidity(e,t,i){i||(i=this.validationTarget),this.internals.setValidity(e,t,i),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const e=this.internals.validity.valid,t=!e&&this.hasInteracted||this.error,i=t&&!this.formNoValidate||this.error;this.customStates.set("required",this.required),this.customStates.set("disabled",this.disabled),this.customStates.set("readonly",this.readOnly),this.customStates.set("optional",!this.required),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",t),this.customStates.set("user-valid",e&&this.hasInteracted),this.customStates.set("invalid-visible",i)}setCustomValidity(e){if(!e)return this.customError="",void this.setValidity({});this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.onResetValue(),this.resetValidity(),this.hasInteracted=!1,this.interactionsReceived=[],this.updateValidity()}onResetValue(){this.value=this.defaultValue}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,"restore"===t&&this.resetValidity(),this.updateValidity()}resetValidity(){this.setCustomValidity(""),this.setValidity({}),this.setCustomStates()}willUpdate(e){this.hasUpdated||!e.has("defaultValue")||this.value||(this.value=this.defaultValue),this.allObservedProperties.some(t=>e.has(t))?this.updateValidity():$.some(t=>e.has(t))&&this.setCustomStates(),super.willUpdate(e)}wireInteractionEvents(){s.S$||(this.wiredEvents.forEach(e=>{this.removeEventListener(e,this.onInteraction)}),this.currentInteractionTriggers.forEach(e=>{this.wiredEvents.push(e),this.addEventListener(e,this.onInteraction)}))}}E.shadowRootOptions={...g.l.shadowRootOptions,delegatesFocus:!0},E.styles=[x],E.formAssociated=!0,E.interactionTriggers=["input","focusout"],w([(0,l.MZ)({attribute:!1})],E.prototype,"validationMessages",void 0),w([(0,l.MZ)({type:Array,attribute:"interaction-triggers",converter:e=>e?.split(" ").map(e=>e.trim()).filter(e=>!!e)})],E.prototype,"interactionTriggers",void 0),w([(0,l.wk)()],E.prototype,"hasInteracted",void 0),w([(0,l.wk)()],E.prototype,"formNoValidate",void 0),w([(0,l.MZ)({type:String,attribute:"custom-error"})],E.prototype,"customError",void 0),w([(0,l.MZ)({type:String})],E.prototype,"helperText",void 0),w([(0,l.MZ)({reflect:!0})],E.prototype,"name",void 0),w([(0,l.MZ)({type:Boolean,reflect:!0})],E.prototype,"required",void 0),w([(0,l.MZ)({type:Boolean})],E.prototype,"disabled",void 0),w([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"readonly"})],E.prototype,"readOnly",void 0),w([(0,l.MZ)({type:Boolean,reflect:!0})],E.prototype,"error",void 0),w([(0,l.MZ)({attribute:!1})],E.prototype,"defaultValue",void 0),w([(0,l.MZ)({type:Boolean,attribute:"skip-validation"})],E.prototype,"skipValidation",void 0),w([(0,l.MZ)({attribute:!1,state:!0,type:Object})],E.prototype,"validity",null);var C=i(31),M=i(538),z=i(302);class S{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{const t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>e.nodeType===e.TEXT_NODE&&""!==e.textContent.trim()||e.nodeType===e.ELEMENT_NODE&&!e.hasAttribute("slot"))}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}}const I=(e={})=>{let{validationElement:t,validationProperty:i}=e;return t||(t=Object.assign(document.createElement("input"),{required:!0})),i||(i="value"),{observedProperties:[i,"required"],checkValidity(e){const o={message:"",isValid:!0,invalidKeys:[]};if(!e.required)return o;if(!e[i]){const i=e.finalValidationMessages();let r=i?.valueMissing;r||(r=t.validationMessage||"Please fill out this field."),o.message=r,o.isValid=!1,o.invalidKeys.push("valueMissing")}return o}}},O=s.AH`
  :host {
    --vcdk-checkbox-border: var(--vcdk-color-border);
    --vcdk-checkbox-background: transparent;
    --vcdk-checkbox-input-margin: 0.1875rem;
    --vcdk-checkbox-text: var(--vcdk-color-text);
    --vcdk-checkbox-hover-background: var(--vcdk-color-bg-selected);
    --vcdk-checkbox-hint-color: var(--vcdk-color-text-subtle);
  }

  :host(:state(checked)),
  :host(:state(indeterminate)) {
    --vcdk-checkbox-background: var(--vcdk-color-bg-selected);
    --vcdk-checkbox-border: var(--vcdk-color-border-selected);
  }

  :host(:state(readonly)) {
    --vcdk-checkbox-border: var(--vcdk-color-border-subtle);
    --vcdk-checkbox-cursor: not-allowed;
    --vcdk-checkbox-hover-background: none;
  }

  :host(:state(readonly):state(checked)),
  :host(:state(readonly):state(indeterminate)) {
    --vcdk-checkbox-background: var(--vcdk-color-bg-selected-disabled);
    --vcdk-checkbox-border: var(--vcdk-color-bg-selected-disabled);
  }

  :host(:state(invalid-visible)) {
    --vcdk-checkbox-border: var(--vcdk-color-border-error);
    --vcdk-checkbox-hint-color: var(--vcdk-color-text-error);
  }

  :host(:state(invalid-visible):state(checked)),
  :host(:state(invalid-visible):state(indeterminate)) {
    --vcdk-checkbox-background: var(--vcdk-color-bg-error);
  }

  :host(:state(disabled)) {
    --vcdk-checkbox-border: var(--vcdk-color-border-subtle);
    --vcdk-checkbox-text: var(--vcdk-color-text-disabled);
    --vcdk-checkbox-cursor: not-allowed;
    --vcdk-checkbox-hover-background: none;
    --vcdk-checkbox-hint-color: var(--vcdk-color-text-disabled);
  }

  :host(:state(disabled):state(checked)),
  :host(:state(disabled):state(indeterminate)) {
    --vcdk-checkbox-background: var(--vcdk-color-bg-selected-disabled);
    --vcdk-checkbox-border: var(--vcdk-color-bg-selected-disabled);
  }

  .size-small {
    --vcdk-checkbox-size: 1rem;
    --vcdk-checkbox-padding: var(--vcdk-spacing-3);
    --vcdk-checkbox-hover-circle: 2rem;
    --vcdk-checkbox-hover-adjust: 0.1875rem;
  }

  .size-medium {
    --vcdk-checkbox-size: 1.125rem;
    --vcdk-checkbox-hover-circle: 2.5rem;
    --vcdk-checkbox-hover-adjust: 0.0625rem;
  }

  label {
    align-items: flex-start;
    color: var(--vcdk-color-text);
    display: flex;
    position: relative;
    user-select: none;
    cursor: var(--vcdk-checkbox-cursor, pointer);
  }

  label:hover:after {
    background-color: var(--vcdk-checkbox-hover-background);
    border-radius: var(--vcdk-radius-circular);
    content: "";
    height: var(--vcdk-checkbox-hover-circle);
    width: var(--vcdk-checkbox-hover-circle);
    margin: var(--vcdk-checkbox-hover-adjust);
    inset-block-start: calc(var(--vcdk-checkbox-size) / -2);
    inset-inline-start: calc(var(--vcdk-checkbox-size) / -2);
    position: absolute;
    z-index: var(--vcdk-z-index-zero);
    opacity: 0.05;
  }

  label:active:after {
    opacity: 0.1;
  }

  input {
    cursor: var(--vcdk-checkbox-cursor, pointer);
    appearance: none;
    background-color: var(--vcdk-checkbox-background);
    border: 0.125rem solid var(--vcdk-checkbox-border);
    border-radius: var(--vcdk-radius-small);
    margin: var(--vcdk-checkbox-input-margin);
    height: var(--vcdk-checkbox-size);
    width: var(--vcdk-checkbox-size);
    position: relative;
    z-index: var(--vcdk-z-index-over-input);
    flex-shrink: 0;
  }

  input:focus-visible {
    outline-offset: 2px;
    outline-width: 3px;
    outline-color: var(--vcdk-form-outline-color);
  }

  .text-container {
    display: flex;
    flex-direction: column;
    padding-inline: var(--vcdk-checkbox-padding, var(--vcdk-spacing-4));
  }

  .text {
    display: inline-flex;
    color: var(--vcdk-checkbox-text);
  }

  svg {
    cursor: var(--vcdk-checkbox-cursor, pointer);
    pointer-events: none;
    position: absolute;
    width: var(--vcdk-checkbox-size);
    height: var(--vcdk-checkbox-size);
    z-index: var(--vcdk-z-index-over-input);
    fill: var(--vcdk-color-text-on-inverse);
    inset-inline-start: var(--vcdk-checkbox-input-margin);
    inset-block-start: var(--vcdk-checkbox-input-margin);
  }
`;class Z extends CustomEvent{constructor(e,t,i){super(Z.type,{detail:{checked:e,value:t,nativeEvent:i},bubbles:!0,composed:!0,cancelable:!0})}}Z.type="vcdk-checkbox-change";var A=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const V=()=>s.qy`
  <svg viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 13.42L3 8.42L4.41 7.01L8 10.59L15.59 3L17 4.42L8 13.42Z" />
  </svg>
`,T=()=>s.qy`
  <svg viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H13V5H3V3Z" />
  </svg>
`;let L=class extends E{constructor(){super(...arguments),this.tooltipRef=(0,p._)(),this.hasSlotContent=new S(this,"[default]"),this.title="",this.label="",this.checked=!1,this.defaultChecked=!1,this.value="on",this.intermediate=!1,this.indeterminate=!1,this.floatingHelperText=!1,this.size="medium",this.tabIndex=0,this.defaultValue="",this.onChange=e=>{if(this.readOnly)return void e.preventDefault();const t=this.indeterminate;this.checked=!this.checked,this.indeterminate=!1,this.hasInteracted=!0,this.dispatchEvent(new Z(this.checked,this.value))||(this.checked=!this.checked,this.indeterminate=t)}}static get validators(){return[...E.validators,I({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})]}static defaultValidationMessages(){return{valueMissing:(0,y.ab)("",{id:"vcdk-checkbox.valueMissing",desc:"Validation message for required checkbox. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(e){this.readOnly=e}willUpdate(e){if(e.has("intermediate")&&this.intermediate&&(this.indeterminate=this.intermediate),e.has("groupContext")){const{disabled:e,error:t,size:i}=this.groupContext||{};this.disabled="boolean"==typeof e?e:this.disabled,this.error="boolean"==typeof t?t:this.error,this.size="string"==typeof i?i:this.size}e.has("checked")&&(void 0===this.checked&&(this.indeterminate=!0),this.setFormValue(this.checked?this.value:null),this.customStates.set("checked",this.checked)),e.has("defaultChecked")&&!this.hasInteracted&&this.defaultChecked&&(this.checked=this.defaultChecked,this.customStates.set("checked",this.checked)),e.has("indeterminate")&&this.customStates.set("indeterminate",this.indeterminate),super.willUpdate(e)}updated(e){super.updated(e),this.floatingHelperText&&this.hint&&this.tooltipRef.value&&(this.tooltipRef.value.reference=this.input)}setFormValue(e){super.setFormValue(this.checked?e:null)}onResetValue(){this.checked=this.defaultChecked}render(){const e=this.groupContext?.size||this.size;let t=this.checked?"true":"false";return this.indeterminate&&(t="mixed"),s.qy`
      <label class=${(0,c.H)({[`size-${e}`]:!!e})}>
        <input
          title=${this.title}
          type="checkbox"
          role="checkbox"
          ?required=${(0,C.J)(this.required)}
          @change=${this.onChange}
          .checked=${(0,M.V)(this.checked)}
          .indeterminate=${(0,M.V)(this.indeterminate)}
          .disabled=${this.groupContext?.disabled||this.disabled}
          .value=${this.value}
          aria-describedby=${(0,C.J)(this.hint?"hint":void 0)}
          aria-checked=${t}
          aria-invalid=${this.states.has("user-invalid")?"true":"false"}
          aria-label=${(0,C.J)(this.ariaLabel)}
          name=${this.name}
          ?readonly=${(0,C.J)(this.readOnly)}
          tabindex=${this.tabIndex} />

        ${(0,z.z)(!this.indeterminate&&this.checked,V)}
        ${(0,z.z)(this.indeterminate,T)}
        ${(0,z.z)(this.hasSlotContent.test("[default]")||this.label,()=>s.qy`
            <span class="text-container">
              ${(0,z.z)(this.label,()=>s.qy`
                  <span
                    part="label"
                    class=${(0,c.H)({text:!0,"typography-body":"medium"===this.size,"typography-caption1":"small"===this.size})}>
                    ${this.label}${(0,z.z)(this.required,()=>s.qy`<span aria-hidden="true">*</span>`)}
                  </span>
                `)}

              <slot
                part="label"
                class=${(0,c.H)({text:!0,"typography-body":"medium"===this.size,"typography-caption1":"small"===this.size})}></slot>

              ${(0,z.z)(this.hint&&!this.floatingHelperText,()=>s.qy`
                  <span id="hint" class="hint typography-caption2">
                    ${this.hint}
                  </span>
                `)}
            </span>
          `)}
      </label>
      ${(0,z.z)(this.hint&&this.floatingHelperText,()=>s.qy`
          <vcdk-tooltip
            ${(0,p.K)(this.tooltipRef)}
            id="hint"
            strategy="absolute"
            placement="bottom"
            ?disabled=${this.disabled}
            .offset=${8}
            open>
            ${this.hint}
          </vcdk-tooltip>
        `)}
    `}};L.interactionTriggers=["input"],L.styles=[...E.styles,O,a.IT.caption1,a.IT.caption2,a.IT.body],A([(0,l.MZ)({attribute:!1})],L.prototype,"validationMessages",void 0),A([(0,l.MZ)()],L.prototype,"title",void 0),A([(0,l.MZ)({type:String})],L.prototype,"label",void 0),A([(0,l.MZ)({type:Boolean,reflect:!0})],L.prototype,"checked",void 0),A([(0,l.MZ)({attribute:!1})],L.prototype,"defaultChecked",void 0),A([(0,l.MZ)({type:String})],L.prototype,"value",void 0),A([(0,l.MZ)({type:Boolean})],L.prototype,"intermediate",void 0),A([(0,l.MZ)({type:Boolean})],L.prototype,"indeterminate",void 0),A([(0,l.MZ)({type:Boolean,attribute:"floating-helper-text"})],L.prototype,"floatingHelperText",void 0),A([(0,l.MZ)({type:String})],L.prototype,"size",void 0),A([(0,l.MZ)({type:Number})],L.prototype,"tabIndex",void 0),A([(0,l.P)("input[type='checkbox']")],L.prototype,"input",void 0),A([(0,o.Fg)({context:f,subscribe:!0}),(0,l.wk)()],L.prototype,"groupContext",void 0),L=A([(0,v.E)("vcdk-checkbox"),(0,y.cc)()],L),i(3018);const R=e=>"number"==typeof e?e:e||s.s6;class D extends CustomEvent{constructor(e){super("vcdk-chip-click",{detail:{source:"chip",selected:e},bubbles:!0,composed:!0})}}class P extends CustomEvent{constructor(){super("vcdk-chip-remove",{detail:{source:"close-button"},bubbles:!0,composed:!0})}}class B extends CustomEvent{constructor(e,t){super("vcdk-chip-enter",{detail:{reference:e,value:t},bubbles:!0,composed:!0})}}class j extends CustomEvent{constructor(e,t){super("vcdk-chip-leave",{detail:{reference:e,value:t},bubbles:!0,composed:!0})}}const q=s.AH`
  :host {
    max-width: 100%;
  }

  button {
    appearance: none;
    background: none;
    border: 0;
  }

  .chip-wrapper {
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
    min-height: var(--vcdk-chip-height, 1.5rem);
    text-align: center;
    text-decoration: none;
    user-select: none;
    gap: var(--vcdk-chip-gap, 4px);
  }

  .size-small {
    --vcdk-system-icon-size: 1rem;
    --vcdk-chip-gap: var(--vcdk-spacing-2);
    --vcdk-chip-padding-block: 0;
    --vcdk-chip-padding-inline: var(--vcdk-spacing-4);
  }

  .chip-wrapper:not(.disabled):hover {
    @media (pointer: fine) {
      background-color: var(--vcdk-color-bg-hover);
    }
  }

  .chip-wrapper:not(.disabled):active {
    background-color: var(--vcdk-color-bg-pressed);
  }

  .chip-wrapper:not(.disabled):focus-within:has(.chip-button:focus-visible) {
    outline: 3px solid var(--vcdk-color-border-focus);
    outline-offset: 2px;
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
    max-width: 100%;
    padding-block: var(--vcdk-chip-padding-block, 4px);
    padding-inline-start: var(--vcdk-chip-padding-inline, 12px);
    padding-inline-end: 0;
    align-items: center;
    cursor: pointer;
    color: var(--vcdk-color-text);
    display: flex;
    gap: var(--vcdk-chip-gap, 4px);
    &:focus-visible {
      outline: none;
    }
    &:last-child {
      padding-inline-end: var(--vcdk-chip-padding-inline, 12px);
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

  .chip-button-close {
    padding-inline-end: var(--vcdk-chip-padding-inline, 12px);
  }
`;var H=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let K=class extends d.l{constructor(){super(...arguments),this.selected=!1,this.removable=!1,this.removeAriaLabel="",this.tabIndex=0,this.handleChipClick=()=>{this.dispatchEvent(new D(this.selected??!1))},this.handleRemoveClick=()=>{this.dispatchEvent(new P)},this.handleKeyDown=e=>{"Enter"!==e.key&&"Space"!==e.code||this.handleRemoveClick()},this.onEnter=()=>{this.dispatchEvent(new B(this,this.value))},this.onLeave=()=>{this.dispatchEvent(new j(this,this.value))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.onEnter,{passive:!0}),this.addEventListener("mouseleave",this.onLeave,{passive:!0}),this.addEventListener("focusin",this.onEnter,{passive:!0}),this.addEventListener("focusout",this.onLeave,{passive:!0})}disconnectedCallback(){this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave),this.removeEventListener("focusin",this.onEnter),this.removeEventListener("focusout",this.onLeave),super.disconnectedCallback()}render(){const{selected:e,iconStart:t,iconEnd:i,removable:o,removeAriaLabel:r,disabled:n,form:a,formaction:d,formenctype:l,formmethod:p,formnovalidate:h,formtarget:v,name:u,type:b,value:y,size:f}=this;return s.qy`
      <div
        class=${(0,c.H)({"chip-wrapper":!0,"typography-caption1":"small"===f,"typography-caption2":"small"!==f,"size-small":"small"===f,selected:!!e,disabled:!!n})}>
        <button
          class=${(0,c.H)({"chip-button":!0})}
          tabindex=${this.tabIndex}
          @click=${this.handleChipClick}
          form=${R(a)}
          ?disabled=${n}
          ?selected=${e}
          formaction=${R(d)}
          formenctype=${R(l)}
          formmethod=${R(p)}
          ?formnovalidate=${h}
          formtarget=${R(v)}
          name=${R(u)}
          type=${b??"button"}
          value=${R(y)}>
          ${t&&s.qy`
            <vcdk-system-icon .icon=${t}></vcdk-system-icon>
          `}
          <slot
            class=${(0,c.H)({text:1})}></slot>
          ${i&&s.qy`
            <vcdk-system-icon .icon=${i}></vcdk-system-icon>
          `}
        </button>
        ${(0,z.z)(o,()=>s.qy`
            <vcdk-icon-button
              class=${(0,c.H)({"chip-button-close":!0,selected:!!e,disabled:!!n})}
              ?disabled=${n}
              @click=${this.handleRemoveClick}
              @keydown=${this.handleKeyDown}
              aria-label=${R(r)}
              size="extra-small"
              icon="close"></vcdk-icon-button>
          `)}
      </div>
    `}};K.shadowRootOptions={...d.l.shadowRootOptions,delegatesFocus:!0},K.styles=[q,a.IT.caption1,a.IT.caption2],H([(0,l.MZ)({type:Boolean})],K.prototype,"selected",void 0),H([(0,l.MZ)({type:String})],K.prototype,"iconEnd",void 0),H([(0,l.MZ)({type:String})],K.prototype,"iconStart",void 0),H([(0,l.MZ)({type:String})],K.prototype,"size",void 0),H([(0,l.MZ)({type:Boolean})],K.prototype,"removable",void 0),H([(0,l.MZ)({type:String})],K.prototype,"removeAriaLabel",void 0),H([(0,l.MZ)({type:Boolean})],K.prototype,"disabled",void 0),H([(0,l.MZ)({type:String})],K.prototype,"form",void 0),H([(0,l.MZ)({type:String})],K.prototype,"formaction",void 0),H([(0,l.MZ)({type:String})],K.prototype,"formenctype",void 0),H([(0,l.MZ)({type:String})],K.prototype,"formmethod",void 0),H([(0,l.MZ)({type:Boolean})],K.prototype,"formnovalidate",void 0),H([(0,l.MZ)({type:String})],K.prototype,"formtarget",void 0),H([(0,l.MZ)({type:String})],K.prototype,"name",void 0),H([(0,l.MZ)({type:String})],K.prototype,"type",void 0),H([(0,l.MZ)({type:String})],K.prototype,"value",void 0),H([(0,l.MZ)({type:Number})],K.prototype,"tabIndex",void 0),K=H([(0,v.E)("vcdk-chip")],K);var F=i(1089);const N=s.AH`
  slot {
    display: var(--vcdk-chips-display, flex);
    flex-direction: row;
    flex-wrap: var(--vcdk-chips-flex-wrap, wrap);
    gap: var(--vcdk-spacing-4);
  }
  .size-default {
    --vcdk-system-icon-size: 1.25rem;
    --vcdk-chip-gap: var(--vcdk-spacing-2);
    --vcdk-chip-padding-block: var(--vcdk-spacing-2);
    --vcdk-chip-padding-inline: var(--vcdk-spacing-5);
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
    --vcdk-system-icon-size: 1rem;
    --vcdk-chip-gap: var(--vcdk-spacing-2);
    --vcdk-chip-padding-block: 0;
    --vcdk-chip-padding-inline: var(--vcdk-spacing-4);
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

  .size-extra-small {
    --vcdk-system-icon-size: 0.875rem;
    --vcdk-chip-gap: var(--vcdk-spacing-1);
    --vcdk-chip-padding-block: 0;
    --vcdk-chip-padding-inline: var(--vcdk-spacing-3);
    --vcdk-chip-font-size: var(--vcdk-typography-caption-2-size-small-screens);
    --vcdk-chip-line-height: var(
      --vcdk-typography-caption-2-line-height-small-screens
    );
    --vcdk-chip-height: 1.5rem;
  }

  @media (min-width: ${F.f.md.from}px) {
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
`;var J=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let U=class extends d.l{constructor(){super(...arguments),this.size="default"}render(){return s.qy`
      <slot
        class=${(0,c.H)({[`size-${this.size}`]:!0})}></slot>
    `}};U.styles=[N],J([(0,l.MZ)({type:String})],U.prototype,"size",void 0),U=J([(0,v.E)("vcdk-chips")],U);var _=i(4374),W=i(6526);const G=s.AH`
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
    height: var(--vcdk-icon-button-size, 1.5rem);
    width: var(--vcdk-icon-button-size, 1.5rem);
    --vcdk-system-icon-size: 1rem;
  }

  .size-small {
    height: var(--vcdk-icon-button-size, 2rem);
    width: var(--vcdk-icon-button-size, 2rem);
  }

  .size-medium {
    height: var(--vcdk-icon-button-size, 2.5rem);
    width: var(--vcdk-icon-button-size, 2.5rem);
  }

  .size-large {
    height: var(--vcdk-icon-button-size, 3rem);
    width: var(--vcdk-icon-button-size, 3rem);
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
`;var Y=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Q=class extends _.r{constructor(){super(...arguments),this.buttonEl=(0,p._)(),this.icon="home",this.size="medium",this.variant="tertiary",this.tabIndex=0,this.buttonAriaExpanded=!1,this.buttonAriaHaspopup=!1,this.autofocus=!1,this.title=""}render(){const e=!!this.href,t=e?W.eu`a`:W.eu`button`;return W.qy`
      <${t}
        ${(0,p.K)(this.buttonEl)}
        part="button"
        class=${(0,c.H)({[`variant-${this.variant}`]:!0,[`size-${this.size}`]:!0})}
        ?autofocus=${this.autofocus}
        tabindex=${this.tabIndex}
        title=${R(this.title)}
        href=${(0,C.J)(e?this.href:void 0)}
        hreflang=${R(e?this.hreflang:void 0)}
        ping=${R(e?this.ping:void 0)}
        referrerpolicy=${R(e?this.referrerPolicy:void 0)}
        rel=${R(e?this.rel:void 0)}
        target=${R(e?this.target:void 0)}
        download=${R(e?this.download:void 0)}
        aria-label=${R(this.buttonAriaLabel)}
        name=${R(e?void 0:this.name)}
        value=${R(e?void 0:this.value)}
        aria-disabled=${this.disabled?"true":s.s6}
        aria-controls=${R(e?void 0:this.buttonAriaControls)}
        aria-expanded=${R(e?void 0:this.buttonAriaExpanded?"true":void 0)}
        aria-haspopup=${R(e?void 0:this.buttonAriaHaspopup?"true":void 0)}
        formaction=${(0,C.J)(e?void 0:this.formAction)}
        formenctype=${(0,C.J)(e?void 0:this.formEnctype)}
        formmethod=${(0,C.J)(e?void 0:this.formMethod)}
        ?formnovalidate=${(0,C.J)(e?void 0:this.formNoValidate)}
        formtarget=${(0,C.J)(e?void 0:this.formTarget)}
        role=${R(this.buttonRole)}
        @click=${(0,C.J)(e?void 0:this.onButtonClick)}
      >
        <vcdk-system-icon
          exportparts="svg"
          .icon=${this.icon}
          ?filled=${this.filled}
          element-role="presentation"></vcdk-system-icon>
      </${t}>
    `}};Q.styles=[G],Y([(0,l.MZ)({type:String})],Q.prototype,"icon",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"size",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"variant",void 0),Y([(0,l.MZ)({type:Boolean})],Q.prototype,"filled",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"download",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"href",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"hreflang",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"ping",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"referrerPolicy",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"rel",void 0),Y([(0,l.MZ)({type:String})],Q.prototype,"target",void 0),Y([(0,l.MZ)({type:Number})],Q.prototype,"tabIndex",void 0),Y([(0,l.MZ)({attribute:"button-role"})],Q.prototype,"buttonRole",void 0),Y([(0,l.MZ)({attribute:"button-aria-label"})],Q.prototype,"buttonAriaLabel",void 0),Y([(0,l.MZ)({attribute:"button-aria-controls"})],Q.prototype,"buttonAriaControls",void 0),Y([(0,l.MZ)({type:Boolean,attribute:"button-aria-expanded"})],Q.prototype,"buttonAriaExpanded",void 0),Y([(0,l.MZ)({type:Boolean,attribute:"button-aria-haspopup"})],Q.prototype,"buttonAriaHaspopup",void 0),Y([(0,l.MZ)({type:Boolean})],Q.prototype,"autofocus",void 0),Y([(0,l.MZ)()],Q.prototype,"title",void 0),Q=Y([(0,v.E)("vcdk-icon-button")],Q);const X=(e={})=>{let{validationProperty:t}=e;return t||(t="value"),{observedProperties:[t,"maxLength"],checkValidity(e){const i={message:"",isValid:!0,invalidKeys:[]};if(void 0===e.maxLength||null===e.maxLength||e.maxLength<0)return i;const o=e[t];if(!o||"string"!=typeof o)return i;if(!(o.length<=e.maxLength)){const t=e.finalValidationMessages();i.message=t?.tooLong??"Too long",i.isValid=!1,i.invalidKeys.push("tooLong")}return i}}},ee=(e={})=>{let{validationProperty:t}=e;return t||(t="value"),{observedProperties:[t,"minLength"],checkValidity(e){const i={message:"",isValid:!0,invalidKeys:[]};if(void 0===e.minLength||e.minLength<0)return i;const o=e[t];if(!o||"string"!=typeof o)return i;if(!(o.length>=e.minLength)){const t=e.finalValidationMessages();i.message=t?.tooShort??"Too short",i.isValid=!1,i.invalidKeys.push("tooShort")}return i}}},te=(e={})=>{let{validationProperty:t,mirroredProperties:i,validationElement:o}=e;return o||(o=document.createElement("input")),t||(t="value"),i||(i=["type","pattern","required","min","max"]),{observedProperties:[t,...i],checkValidity(e){const r={message:"",isValid:!0,invalidKeys:[]};for(const t of i){const i=e[t];i?"boolean"==typeof i?o.setAttribute(t,""):"string"==typeof i?o.setAttribute(t,i):"number"==typeof i&&o.setAttribute(t,i.toString()):o.removeAttribute(t)}const s=e[t];if("string"!=typeof s)throw new Error("value is not a string");o.value=s;const n=o.checkValidity(),a=o.validity;if(!n){const t=e.finalValidationMessages();let i;for(const e in a)"valid"!==e&&a[e]&&(i=t?.[e],r.invalidKeys.push(e));i||(i=o.validationMessage),r.isValid=!1,r.message=i}return r}}},ie=(e,t)=>s.qy`
  <div
    class="character-counter typography-caption2"
    part="character-counter"
    aria-hidden="true">
    ${`${e} / ${t}`}
  </div>
`,oe=s.AH`
  :host {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg);
    --vcdk-text-field-border-color: var(--vcdk-color-border);
    --vcdk-text-field-border-hover-color: var(--vcdk-color-border-hover);
    --vcdk-text-field-border-active-color: var(
      --vcdk-color-border-input-active
    );
    --vcdk-text-field-outline-color: var(--vcdk-color-border-input-active);
    --vcdk-text-field-label-color: var(--vcdk-color-text-subtle);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-text-color: var(--vcdk-color-text);
    --vcdk-text-field-margin-block: var(--vcdk-spacing-2);
    --vcdk-form-cursor: text;
  }

  :host(:state(readonly)),
  :host(:state(disabled)) {
    --vcdk-text-field-border-color: var(--vcdk-color-border-subtle);
    --vcdk-text-field-border-hover-color: var(--vcdk-color-border-subtle);
  }

  :host(:state(readonly)) {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg-variant-subtle);
    --vcdk-text-field-text-color: var(--vcdk-color-text-subtle);
  }

  :host(:state(disabled)) {
    --vcdk-text-field-bg-color: var(--vcdk-color-bg);
    --vcdk-text-field-border-color: var(--vcdk-color-border-subtle);
    --vcdk-text-field-border-hover-color: var(--vcdk-text-field-border-color);
    --vcdk-text-field-border-active-color: var(--vcdk-text-field-border-color);
    --vcdk-text-field-label-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-disabled);
    --vcdk-text-field-text-color: var(--vcdk-color-text-disabled);
  }

  :host(:state(invalid-visible)) {
    --vcdk-text-field-border-color: var(--vcdk-color-border-error);
    --vcdk-text-field-outline-color: var(--vcdk-color-border-error);
    --vcdk-text-field-border-hover-color: var(--vcdk-color-border-error);
    --vcdk-text-field-placeholder-color: var(--vcdk-color-text-subtlest);
    --vcdk-text-field-text-color: var(--vcdk-color-text);
  }

  :host(:state(readonly):state(invalid-visible)) {
    --vcdk-text-field-text-color: var(--vcdk-color-text-subtle);
  }

  :host([floatinglabel]:focus-within) {
    --vcdk-text-field-label-color: var(--vcdk-color-border-hover);
  }

  :host([floatinglabel]:state(invalid-visible):not(:state(blank))),
  :host([floatinglabel]:state(invalid-visible):focus-within) {
    --vcdk-text-field-label-color: var(--vcdk-color-border-error);
  }

  .size-small {
    --vcdk-icon-button-size: 2rem;
    --vcdk-system-icon-size: 1.25rem;
    --vcdk-text-field-padding-inline-start: var(--vcdk-spacing-4);
    --vcdk-text-field-padding-inline-end: var(--vcdk-spacing-2);
    --vcdk-text-field-padding-block: var(--vcdk-spacing-2);
    --vcdk-text-field-padding-inline: var(--vcdk-spacing-4);
    --vcdk-text-field-margin-inline-end: var(--vcdk-spacing-2);
    --vcdk-text-field-multirow-padding: var(--vcdk-spacing-4);
  }

  .size-medium {
    --vcdk-icon-button-size: 2rem;
    --vcdk-text-field-margin-block: var(--vcdk-spacing-2);
    --vcdk-text-field-padding-block: var(--vcdk-spacing-4);
    --vcdk-text-field-padding-inline-start: var(--vcdk-spacing-5);
    --vcdk-text-field-padding-inline-end: var(--vcdk-spacing-4);
    --vcdk-text-field-margin-inline-end: var(--vcdk-spacing-2);
    --vcdk-text-field-multirow-padding: var(--vcdk-spacing-5);
  }

  .size-large {
    --vcdk-icon-button-size: 2.5rem;
    --vcdk-text-field-margin-block: var(--vcdk-spacing-2);
    --vcdk-text-field-padding-block: var(--vcdk-spacing-5);
    --vcdk-text-field-padding-inline-start: var(--vcdk-spacing-6);
    --vcdk-text-field-padding-inline-end: var(--vcdk-spacing-4);
    --vcdk-text-field-margin-inline-end: var(--vcdk-spacing-4);
    --vcdk-text-field-multirow-padding: var(--vcdk-spacing-6);
  }

  .text-field {
    position: relative;
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
    gap: var(--vcdk-text-field-padding-inline-end);
    padding-inline-start: var(--vcdk-text-field-padding-inline-start);
    padding-inline-end: var(--vcdk-text-field-padding-inline-end);
  }

  .input-wrapper:hover {
    border-color: var(--vcdk-text-field-border-hover-color);
  }

  .input-wrapper:active {
    border-color: var(--vcdk-text-field-border-active-color);
  }

  .size-small .input-wrapper {
    min-height: 2rem;
  }

  .size-medium .input-wrapper {
    min-height: 2rem;
  }

  .size-large .input-wrapper {
    min-height: 2.5rem;
  }

  .input-wrapper:has(input:focus-within),
  .input-wrapper:has(textarea:focus-within) {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--vcdk-text-field-outline-color);
    outline-offset: -1px;
  }

  input,
  textarea {
    background: var(--vcdk-text-field-bg-color);
    border-radius: var(--vcdk-radius-default);
    border: none;
    cursor: var(--vcdk-form-cursor);
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
    padding-block: calc(var(--vcdk-text-field-padding-block) - 1px);
    padding-inline: 0;
  }

  textarea {
    padding-block: var(--vcdk-text-field-multirow-padding);
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

  .hint {
    display: block;
    text-align: start;
    margin-block-start: var(--vcdk-text-field-margin-block);
  }

  .floating-label label {
    margin-inline: calc(
      var(--vcdk-text-field-padding-inline-start) - var(--vcdk-spacing-2)
    );
    max-width: calc(
      100% - var(--vcdk-text-field-padding-inline-start) - var(
          --vcdk-text-field-padding-inline-end
        )
    );
    overflow: hidden;
    padding-inline: var(--vcdk-spacing-2);
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

  .floating-label .container {
    padding-inline: var(--vcdk-text-field-padding-inline);
  }

  .character-counter {
    margin-block: var(--vcdk-text-field-margin-block);
  }

  vcdk-tooltip::part(tooltip) {
    max-width: 100%;
    z-index: calc(var(--vcdk-z-index-over-input, 1) + 1);
  }

  /** 
   * To get a good consistency with clickable elements, we need to move icon buttons slightly since they 
   * contain whilespace.
   */
  slot[name="after-input"]::slotted(vcdk-icon-button),
  slot[name="after-input"]::slotted(vcdk-button) {
    margin-inline-end: calc(var(--vcdk-spacing-2) * -1) !important;
  }

  slot[name="before-input"]::slotted(vcdk-icon-button),
  slot[name="before-input"]::slotted(vcdk-button) {
    margin-inline-start: calc(var(--vcdk-spacing-2) * -1) !important;
  }
`;var re=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let se=class extends E{static get validators(){return[...E.validators,te(),ee(),X()]}static defaultValidationMessages(e){return{badInput:(0,y.ab)("",{id:"vcdk-text-field.badInput",desc:"Validation message for bad input in text field. If left empty, the default browser message will be used"}),rangeOverflow:(0,y.ab)("",{id:"vcdk-text-field.rangeOverflow",desc:"Validation message for range overflow in text field. If left empty, the default browser message will be used"}),rangeUnderflow:(0,y.ab)("",{id:"vcdk-text-field.rangeUnderflow",desc:"Validation message for range underflow in text field. If left empty, the default browser message will be used"}),typeMismatch:(0,y.ab)("",{id:"vcdk-text-field.typeMismatch",desc:"Validation message for type mismatch in text field. If left empty, the default browser message will be used"}),valueMissing:(0,y.ab)("",{id:"vcdk-text-field.valueMissing",desc:"Validation message for required text field. If left empty, the default browser message will be used"}),patternMismatch:(0,y.ab)("",{id:"vcdk-text-field.patternMismatch",desc:"Validation message for pattern mismatch in text field. If left empty, the default browser message will be used"}),tooLong:(0,y.ab)(y.gx`Please shorten this text to ${e.maxLength} characters or less (you are currently using ${e.value.length} characters).`,{id:"vcdk-text-field.tooLong",desc:"Validation message for too long value in text field. Note: Due to browser limitations, we cannot fetch browser default message here."}),tooShort:(0,y.ab)(y.gx`Please lengthen this text to ${e.minLength} characters or more (you are currently using ${e.value.length} characters).`,{id:"vcdk-text-field.tooShort",desc:"Validation message for too short value in text field. Note: Due to browser limitations, we cannot fetch browser default message here."}),stepMismatch:(0,y.ab)("",{id:"vcdk-text-field.stepMismatch",desc:"Validation message for step mismatch in text field. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(e){this.readOnly=e}get minlength(){return this.minLength}set minlength(e){this.minLength=e}get maxlength(){return this.maxLength}set maxlength(e){this.maxLength=e}constructor(){super(),this.size="medium",this.floatingLabel=!1,this.floatingHelperText=!1,this.autocapitalize="none",this.autocomplete="",this.dirname="",this.list=null,this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.multiple=!1,this.pattern="",this.placeholder="",this.spellcheck=!1,this.step="",this.tabIndex=0,this.type="text",this.value="",this.wrap="soft",this.characterCounter=!1,this.inputMode="",this.hasFocus=!1,this.uid=(0,h.A)("vcdk-text-field-"),this.getEventDictionary=e=>({detail:{value:e.target.value,nativeEvent:e},bubbles:!0,composed:!0}),this.eventDispatcher=(e,t)=>{this.value=e.target.value,this.updateValidity(),this.dispatchEvent(new CustomEvent(`vcdk-${t}`,this.getEventDictionary(e)))},this.onKeydown=e=>{this.rows||this.submitOnEnter(e),this.dispatchEvent(new CustomEvent("vcdk-keydown",this.getEventDictionary(e)))},this.deprecatedKeyupHandler=e=>{this.dispatchEvent(new CustomEvent("vcdk-keyup",this.getEventDictionary(e)))},this.blurHandler=e=>{this.hasFocus=!1,this.eventDispatcher(e,"blur")},this.focusHandler=e=>{this.hasFocus=!0,this.eventDispatcher(e,"focus")},this.clickButtonHandler=()=>{this.dispatchEvent(new CustomEvent("vcdk-click-button",{bubbles:!0,composed:!0}))},this.stopEnter=e=>{"Enter"===e.key&&e.stopPropagation()},this.inputAriaDescribedBy=this.inputAriaDescribedBy||(0,h.A)("caption-")}get formControlElement(){return this.input??null}get counterAbove(){return!this.floatingLabel&&this.characterCounter&&this.maxLength}get counterBelow(){return this.floatingLabel&&this.characterCounter&&this.maxLength}willUpdate(e){e.has("value")&&this.customStates.set("blank",!this.value),super.willUpdate(e)}select(){(async()=>{await this.updateComplete,this.input?.select()})()}setSelectionRange(e,t,i){this.input?.setSelectionRange(e,t,i)}stepUp(e=1){this.input instanceof HTMLInputElement&&"number"===this.input.type&&(this.input.stepUp(e),this.value!==this.input.value&&(this.value=this.input.value))}stepDown(e=1){this.input instanceof HTMLInputElement&&"number"===this.input.type&&(this.input.stepDown(e),this.value!==this.input.value&&(this.value=this.input.value))}render(){const e=!this.rows,t=e?W.eu`input`:W.eu`textarea`;return W.qy`
      <div
        class=${(0,c.H)({"text-field":1,"floating-label":!!this.floatingLabel,"has-value":!!this.value,[`size-${this.size}`]:!!this.size})}>
        <fieldset part="fieldset">
          <div class="container">
            ${(0,z.z)(this.label,()=>W.qy`
                <label
                  for=${this.uid}
                  class=${(0,c.H)({"typography-subtitle1":!!this.floatingLabel&&!this.hasFocus&&!this.value,"typography-subtitle2":!this.floatingLabel||this.floatingLabel&&(this.hasFocus||!!this.value)})}
                  part="label">
                  ${this.label}${(0,z.z)(this.required,()=>W.qy`<span aria-hidden="true">*</span>`)}
                </label>
              `)}
            ${(0,z.z)(this.counterAbove,()=>ie(this.value?.length,this.maxLength))}
          </div>

          <div class="input-wrapper" part="input-wrapper">
            ${(0,z.z)(!this.floatingLabel||this.hasFocus||this.value,()=>W.qy`
                <slot
                  part="before-input"
                  name="before-input"
                  @keydown=${this.stopEnter}></slot>
              `)}
            <${t}
              part="input"
              .value=${(0,M.V)(this.value)}
              ?disabled=${this.disabled}
              ?multiple=${(0,C.J)(e?this.multiple:void 0)}
              ?readonly=${this.readOnly}
              ?required=${this.required}
              @blur=${this.blurHandler}
              @focus=${this.focusHandler}
              @change=${e=>this.eventDispatcher(e,"change")}
              @input=${e=>this.eventDispatcher(e,"input")}
              @keydown=${this.onKeydown}
              @keyup=${this.deprecatedKeyupHandler}
              aria-invalid=${this.states.has("invalid-visible")}
              aria-describedby=${R(this.inputAriaDescribedBy)}
              aria-label=${R(this.inputAriaLabel)}
              autocapitalize=${this.autocapitalize}
              autocomplete=${R(this.autocomplete)}
              class=${(0,c.H)({"typography-caption1":"small"===this.size,"typography-body":"small"!==this.size})}
              data-testid="input"
              dirname=${R(this.dirname)}
              id=${this.uid}
              inputmode=${R(this.inputMode)}
              list=${(0,C.J)(e?this.list:void 0)}
              max=${R(e?this.max:void 0)}
              min=${R(e?this.min:void 0)}
              maxlength=${(0,C.J)(~this.maxLength?this.maxLength:void 0)}
              minlength=${(0,C.J)(~this.minLength?this.minLength:void 0)}
              name=${R(this.name)}
              pattern=${R(e?this.pattern:void 0)}
              placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
              rows=${(0,C.J)(e?void 0:this.rows)}
              step=${(0,C.J)(e?this.step:void 0)}
              spellcheck=${(0,C.J)(e?void 0:this.spellcheck)}
              tabindex=${this.tabIndex}
              type=${R(e?this.type:void 0)}
              wrap=${R(e?void 0:this.wrap)}
            >
            </${t}>
            <slot part="after-input" name="after-input" @keydown=${this.stopEnter}>
              ${(0,z.z)(this.icon&&!this.rows,()=>W.qy`
                  <vcdk-icon-button
                    part="icon"
                    tabindex="-1"
                    .buttonAriaLabel=${this.iconAriaLabel}
                    .icon=${this.icon}
                    ?disabled=${this.disabled}
                    @click=${this.clickButtonHandler}></vcdk-icon-button>
                `)}
            </slot>
          </div>
        </fieldset>

        <div class="container">
          ${(0,z.z)(this.hint,()=>W.qy`
              ${(0,z.z)(this.floatingHelperText,()=>W.qy`
                  <vcdk-tooltip
                    id=${(0,C.J)(this.inputAriaDescribedBy)}
                    strategy="absolute"
                    placement="bottom-start"
                    ?disabled=${this.disabled}
                    .offset=${8}
                    .reference=${this.input}
                    variant=${this.states.has("user-invalid")?"error":"default"}
                    open>
                    ${this.hint}
                  </vcdk-tooltip>
                `,()=>W.qy`
                  <p
                    id=${(0,C.J)(this.inputAriaDescribedBy)}
                    class="hint typography-caption2">
                    ${this.hint}
                  </p>
                `)}
            `)}
          ${(0,z.z)(this.counterBelow,()=>ie(this.value?.length,this.maxLength))}
        </div>
      </div>
    `}};se.styles=[...E.styles,oe,a.IT.body,a.IT.caption1,a.IT.caption2,a.IT.subtitle1,a.IT.subtitle2],re([(0,l.MZ)({attribute:!1})],se.prototype,"validationMessages",void 0),re([(0,l.MZ)({type:String})],se.prototype,"size",void 0),re([(0,l.MZ)({type:Boolean,reflect:!0})],se.prototype,"floatingLabel",void 0),re([(0,l.MZ)({type:Boolean,attribute:"floating-helper-text"})],se.prototype,"floatingHelperText",void 0),re([(0,l.MZ)({type:String})],se.prototype,"icon",void 0),re([(0,l.MZ)({type:String,attribute:"icon-aria-label"})],se.prototype,"iconAriaLabel",void 0),re([(0,l.MZ)({type:String})],se.prototype,"label",void 0),re([(0,l.MZ)({type:Number})],se.prototype,"rows",void 0),re([(0,l.MZ)({type:String,attribute:"input-aria-describedby"})],se.prototype,"inputAriaDescribedBy",void 0),re([(0,l.MZ)({type:String,attribute:"input-aria-label"})],se.prototype,"inputAriaLabel",void 0),re([(0,l.MZ)({type:String})],se.prototype,"autocapitalize",void 0),re([(0,l.MZ)({type:String})],se.prototype,"autocomplete",void 0),re([(0,l.MZ)({type:String})],se.prototype,"dirname",void 0),re([(0,l.MZ)({type:Object})],se.prototype,"list",void 0),re([(0,l.MZ)({type:String})],se.prototype,"max",void 0),re([(0,l.MZ)({type:Number,attribute:"maxlength"})],se.prototype,"maxLength",void 0),re([(0,l.MZ)({type:String})],se.prototype,"min",void 0),re([(0,l.MZ)({type:Number,attribute:"minlength"})],se.prototype,"minLength",void 0),re([(0,l.MZ)({type:Boolean})],se.prototype,"multiple",void 0),re([(0,l.MZ)({type:String})],se.prototype,"pattern",void 0),re([(0,l.MZ)({type:String})],se.prototype,"placeholder",void 0),re([(0,l.MZ)({type:Boolean})],se.prototype,"spellcheck",void 0),re([(0,l.MZ)({type:String})],se.prototype,"step",void 0),re([(0,l.MZ)({type:Number})],se.prototype,"tabIndex",void 0),re([(0,l.MZ)({type:String})],se.prototype,"type",void 0),re([(0,l.MZ)({type:String})],se.prototype,"value",void 0),re([(0,l.MZ)({type:String})],se.prototype,"wrap",void 0),re([(0,l.MZ)({type:Boolean,attribute:"character-counter"})],se.prototype,"characterCounter",void 0),re([(0,l.MZ)({type:String,attribute:"inputmode"})],se.prototype,"inputMode",void 0),re([(0,l.P)("input,textarea")],se.prototype,"input",void 0),re([(0,l.wk)()],se.prototype,"hasFocus",void 0),se=re([(0,v.E)("vcdk-text-field")],se);var ne=i(2223);function ae(e){return e.hasAttribute("hidden")||e.hasAttribute("aria-hidden")&&"false"!==e.getAttribute("aria-hidden")||"none"===e.style.display||"0"===e.style.opacity||"hidden"===e.style.visibility||"collapse"===e.style.visibility}function de(e){return!("-1"===e.getAttribute("tabindex")||e.shadowRoot?.delegatesFocus||ae(e)||function(e){return e.hasAttribute("disabled")||e.hasAttribute("aria-disabled")&&"false"!==e.getAttribute("aria-disabled")}(e))&&(e.hasAttribute("tabindex")||(e instanceof HTMLAnchorElement||e instanceof HTMLAreaElement)&&e.hasAttribute("href")||e instanceof HTMLButtonElement||e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement||"SUMMARY"===e.tagName||e instanceof HTMLIFrameElement)}function le(e,t,i,o=20,r=0){const s=[];if(r>=o)return s;const n=e=>{const s=e.assignedNodes().filter(e=>1===e.nodeType);return s.length>0?le(s[0].parentElement,t,i,o,r+1):[]},a=Array.from(e.children||[]);for(const e of a)t(e)||(i(e)&&s.push(e),null!=e.shadowRoot?s.push(...le(e.shadowRoot,t,i,o,r+1)):"SLOT"===e.tagName?s.push(...n(e)):s.push(...le(e,t,i,o,r+1)));return s}var ce=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let pe=class extends g.l{getFocusableElements(){return le(this,ae,de)}constructor(){super(),this.focusedIndex=0,this.inactive=!1,this.focused=!1,this.enableDirectionalKeys=!1,this.$backup=(0,p._)(),this.$start=(0,p._)(),this.$end=(0,p._)(),this.onKeyDown=e=>{const t=this.getFocusableElements();switch(e.key){case"ArrowUp":{e.preventDefault();const i=t[this.focusedIndex-1];i?i.focus():this.focusLastElement();break}case"ArrowDown":{e.preventDefault();const i=t[this.focusedIndex+1];i?i.focus():this.focusFirstElement();break}case"Home":e.preventDefault(),this.focusFirstElement();break;case"End":e.preventDefault(),this.focusLastElement()}},this.focusFirstElement=()=>{this.trapFocus()},this.focusLastElement=()=>{this.trapFocus(!0)},this.updateFocused=(0,ne.A)(e=>{this.dispatchFocusedEvents(e),this.focused=e},0),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}disconnectedCallback(){this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback()}update(e){e.has("focused")&&this.enableDirectionalKeys?this.focused?document.addEventListener("keydown",this.onKeyDown):document.removeEventListener("keydown",this.onKeyDown):e.has("enableDirectionalKeys")&&!this.enableDirectionalKeys&&document.removeEventListener("keydown",this.onKeyDown),super.update(e)}trapFocus(e){if(this.inactive)return;const t=this.getFocusableElements();t.length>0?(e?t[t.length-1].focus():t[0].focus(),this.$backup.value?.setAttribute("tabindex","-1")):(this.$backup.value?.setAttribute("tabindex","0"),this.$backup.value?.focus())}onFocusIn(e){const t=this.getFocusableElements();let i=e.target;i.shadowRoot&&(i=i.shadowRoot.activeElement),this.focusedIndex=t.indexOf(i),this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}dispatchFocusedEvents(e){!this.focused&&e&&this.dispatchEvent(new Event("vcdk-focusin",{bubbles:!0,composed:!0})),this.focused&&!e&&this.dispatchEvent(new Event("vcdk-focusout",{bubbles:!0,composed:!0}))}render(){return s.qy`
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
    `}};function he(e,t){const i={waitUntilFirstUpdate:!1,...t};return(t,o)=>{const{update:r}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{const r=t;if(e.has(r)){const t=e.get(r),s=this[r];t!==s&&(i.waitUntilFirstUpdate&&!this.hasUpdated||this[o](t,s))}}),r.call(this,e)}}}ce([(0,l.MZ)({type:Boolean,reflect:!0})],pe.prototype,"inactive",void 0),ce([(0,l.MZ)({type:Boolean,reflect:!0})],pe.prototype,"focused",void 0),ce([(0,l.MZ)({type:Boolean,attribute:"enable-directional-keys"})],pe.prototype,"enableDirectionalKeys",void 0),pe=ce([(0,v.E)("vcdk-focus-trap")],pe);const ve=s.AH`
  :host {
    --vcdk-divider-spacing: var(--vcdk-spacing-4);
    display: contents;
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
    padding-block-end: 1px;
    padding-block-start: 1px;
  }

  .dropdown.size-medium vcdk-text-field::part(before-input) {
    min-height: 40px;
    padding-block-end: 8px;
    padding-block-start: 8px;
  }

  .dropdown.size-large vcdk-text-field::part(before-input) {
    padding-block-end: 11px;
    padding-block-start: 11px;
  }

  .dropdown.multi.has-selected-values.single-chip
    vcdk-text-field::part(before-input) {
    display: inline-flex;
    max-width: 100%;
  }

  /* Wrap mode: collapse before-input box so chips become direct flex children
     of input-wrapper, allowing the input to sit inline after the last chip. */
  .dropdown.multi.has-selected-values:not(.single-chip)
    vcdk-text-field::part(before-input) {
    display: contents;
  }

  .dropdown:not(.disabled) vcdk-text-field::part(input):hover {
    border-color: var(--vcdk-color-border-hover);
  }

  .dropdown.multi vcdk-text-field::part(input-wrapper) {
    flex-wrap: wrap;
  }

  /* Wrap mode: input-wrapper becomes the single flex container for chips + input.
     Provide gap (matching vcdk-chips gap) and inline padding for chip spacing. */
  .dropdown.multi:not(.single-chip).has-selected-values
    vcdk-text-field::part(input-wrapper) {
    column-gap: var(--vcdk-spacing-4);
    row-gap: var(--vcdk-spacing-3);
  }

  .dropdown.multi:not(.single-chip).has-selected-values.size-small
    vcdk-text-field::part(input-wrapper) {
    padding-inline-start: 8px;
    padding-block: 1px;
  }

  .dropdown.multi:not(.single-chip).has-selected-values.size-medium
    vcdk-text-field::part(input-wrapper) {
    padding-inline-start: 12px;
    padding-block: 8px;
  }

  .dropdown.multi:not(.single-chip).has-selected-values.size-large
    vcdk-text-field::part(input-wrapper) {
    padding-inline-start: 16px;
    padding-block: 11px;
  }

  .dropdown.multi.chips-no-wrap vcdk-text-field::part(input-wrapper) {
    flex-wrap: nowrap;
  }

  .dropdown.multi.chips-no-wrap vcdk-text-field::part(before-input) {
    overflow: hidden;
    flex-shrink: 1;
    flex-grow: 0;
    min-width: 0;
  }

  .dropdown.multi.chips-no-wrap vcdk-chips {
    --vcdk-chips-flex-wrap: nowrap;
    overflow: visible;
    flex-shrink: 1;
    min-width: 0;
  }

  .dropdown.multi.chips-no-wrap vcdk-chip {
    flex-shrink: 0;
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
    ${(0,a.zQ)("subtitle2","small")};
    background-color: var(--vcdk-color-bg);
    @media (min-width: ${F.f.md.from}px) {
      ${(0,a.zQ)("subtitle2","large")}
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

  /* Multi-select: input joins flex flow as a natural sibling to chips */
  .dropdown.multi vcdk-text-field::part(input) {
    position: relative;
    height: auto;
    top: auto;
    width: auto;
    flex: 1 1 auto;
    min-width: 100px;
  }

  .dropdown:not(.multi) vcdk-text-field::part(input) {
    position: relative;
  }

  .dropdown.filter-input vcdk-text-field::part(input) {
    min-width: 100px;
  }

  .dropdown.multi.open.filter-input vcdk-text-field::part(input),
  .dropdown.multi.single-chip vcdk-text-field::part(input),
  .dropdown.multi:not(.has-selected-values) vcdk-text-field::part(input) {
    display: inline-block;
  }

  /* Remove input block padding in multi-select so it doesn't add extra height;
     the input-wrapper already provides the necessary block padding. */
  .dropdown.multi vcdk-text-field::part(input) {
    padding-block: 0;
  }

  .dropdown:not(.multi) vcdk-text-field::part(input) {
    display: block;
  }

  .dropdown.multi.has-selected-values vcdk-text-field::part(input) {
    width: min(var(--vcdk-dropdown-search-chars), 100%);
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
  .dropdown:not(.filter-input) vcdk-text-field::part(input) {
    caret-color: transparent;
    pointer: none;
  }
  .dropdown:not(.readonly):not(.disabled) vcdk-text-field::part(input) {
    color: var(--vcdk-color-text);
  }

  vcdk-chips {
    z-index: var(--vcdk-z-index-switch-input);
    position: relative;
    display: block;
  }

  /* Wrap mode: collapse vcdk-chips box and its inner slot so individual
     vcdk-chip elements participate in input-wrapper's flex flow. */
  .dropdown.multi:not(.single-chip) vcdk-chips {
    display: contents;
    --vcdk-chips-display: contents;
  }

  .dropdown .option-container {
    height: 100%;
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
`,ue=s.AH`
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
    pointer-events: none;
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
`,be=(s.AH`
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
`,s.AH`
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
`),ye=(s.AH`
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
`,s.AH`
  :host {
    display: contents;
  }

  .popover {
    display: none;
    position: fixed;
    isolation: isolate;
    z-index: var(--vcdk-z-index-dropdown-popover);
    min-height: 45px;
  }

  .popover.open {
    display: block;
  }
`);var fe=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let ge=class extends d.l{constructor(){super(...arguments),this.open=!1,this.setPositionStyle=async()=>{if(!this.open||!this.target)return;const{y:e,x:t,strategy:i}=await(0,r.rD)(this.target,this.container,{placement:this.placement??"bottom-start",middleware:this.createMiddleware(),strategy:"fixed"});Object.assign(this.container.style,{position:i,top:`${e}px`,left:`${t}px`})},this.anchorSlotChange=async()=>{this.anchors.length<1||(this.target=this.anchors[0],await this.updateState())}}async openChange(){await(this.open?this.updatePosition():this.hide())}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this.open&&this.updatePosition()})}disconnectedCallback(){this.hide().then(()=>{super.disconnectedCallback()})}updatePosition(){this.target&&(this.container.style.height="auto",this.dispose=(0,r.ll)(this.target,this.container,this.setPositionStyle))}async hide(){return new Promise(e=>{this.dispose?(this.dispose(),this.dispose=void 0,this.container.style.height="",this.container.style.maxHeight="",e()):e()})}createMiddleware(){const e=[],t=this.container.style;e.push((0,r.BN)({altBoundary:this.altBoundary,limiter:(0,r.ER)()})),this.placement||e.push((0,r.RK)({allowedPlacements:["top","bottom","top-start","bottom-start"]}));const i=(0,r.Ej)({apply:({rects:e,availableHeight:i})=>{t.height="auto",Object.assign(t,{width:`${e.reference.width}px`,maxHeight:i-10+"px",height:`${e.floating.height}px`})},boundary:this.altBoundary?"clippingAncestors":void 0,rootBoundary:"viewport",padding:10});return e.push(i),e}async updateState(){this.open&&(await this.hide(),this.updatePosition())}render(){return s.qy`
      <slot name="anchor" @slotchange=${this.anchorSlotChange}></slot>
      <vcdk-focus-trap enable-directional-keys>
        <div
          id="container"
          class=${(0,c.H)({popover:1,open:this.open})}>
          <slot></slot>
        </div>
      </vcdk-focus-trap>
    `}};ge.styles=[ye],fe([(0,l.MZ)({type:Boolean,reflect:!0})],ge.prototype,"open",void 0),fe([(0,l.MZ)({type:String})],ge.prototype,"placement",void 0),fe([(0,l.MZ)({type:Boolean,attribute:"alt-boundary"})],ge.prototype,"altBoundary",void 0),fe([(0,l.P)("#container",!0)],ge.prototype,"container",void 0),fe([(0,l.KN)({slot:"anchor",flatten:!0})],ge.prototype,"anchors",void 0),fe([he("open",{waitUntilFirstUpdate:!0})],ge.prototype,"openChange",null),ge=fe([(0,v.E)("vcdk-dropdown-popover")],ge);class me extends CustomEvent{constructor(e=!0){super(me.eventName,{bubbles:e,composed:!0,cancelable:!0})}}me.eventName="vcdk-close";const ke=Symbol("vcdk-handled");function xe(e){e[ke]=!0}var we=i(7935);function $e(e,t){return(i,o)=>{const r="slot"+(e?`[name=${e}]`:":not([name])");Object.defineProperty(i,o,{get(){const e=this.renderRoot?.querySelector(r),i=e?.assignedElements({flatten:!0})??[];return[...i.filter(e=>e.matches(t)),...(0,we.A)(i.filter(e=>e instanceof HTMLElement).map(e=>Array.from(e.querySelectorAll(t))))]}})}}var Ee=i(1145);const Ce={arrowLeft:"ArrowLeft",arrowRight:"ArrowRight",arrowUp:"ArrowUp",arrowDown:"ArrowDown",enterKey:"Enter",spaceBar:" ",escapeKey:"Escape",homeKey:"Home",endKey:"End",pageUpKey:"PageUp",pageDownKey:"PageDown",tabKey:"Tab",altKey:"Alt",ctrlKey:"Ctrl",metaKey:"Meta",shiftKey:"Shift"},Me=new Set([Ce.altKey,Ce.ctrlKey,Ce.metaKey,Ce.shiftKey].map(e=>e.toLowerCase())),ze={skip:["input","textarea","select"]};function Se(e){return Me.has(e)}function Ie(e){return"keydown"===e.type}function Oe(e){return"keyup"===e.type}function Ze(e){return!!e&&e.includes("keydownRepeat")}function Ae(e){const t=function(e){return(Array.isArray(e)?e:[e]).map(e=>e.toLowerCase())}(e);return{keys:t.filter(e=>!Se(e)),modifiers:t.filter(e=>Se(e))}}function Ve(e){return"key"in e?e:e.detail.nativeEvent}class Te{get _element(){return this._observedElement?this._observedElement:this._host}observeElement(e){return e.addEventListener("keydown",this),e.addEventListener("keyup",this),this._observedElement=e,{unsubscribe:()=>{this._observedElement?.removeEventListener("keydown",this),this._observedElement?.removeEventListener("keyup",this),this._observedElement=void 0}}}constructor(e,t){this.bindings=new Set,this.pressedKeys=new Set,this._host=e,this._options={...ze,...t},e.addController(this)}eventModifiersMatch(e,t){e.options?.preventDefault&&t.preventDefault(),e.options?.stopPropagation&&t.stopPropagation()}keysMatch(e,t){const i=e.modifiers??[];return e.keys.every(e=>this.pressedKeys.has(e))&&i.every(e=>!!t[`${e}Key`])}bindingMatches(e,t){const i=e.options?.triggers??["keydown"];return!!(this.keysMatch(e,t)&&(Ie(t)&&function(e){return!!e&&(e.includes("keydown")||Ze(e))}(i)||Oe(t)&&function(e){return!!e&&e.includes("keyup")}(i)))}handleEvent(e){const t=Ve(e),i=t.key.toLowerCase(),o=t.composedPath();if(this._element&&o.includes(this._element)){Se(i)&&this.pressedKeys.clear(),Ie(t)&&!Se(i)&&this.pressedKeys.add(i);for(const e of this.bindings)this.bindingMatches(e,t)&&(this.eventModifiersMatch(e,t),e.handler.call(this._host,t),Ze(e.options?.triggers)&&this.pressedKeys.delete(i));Oe(t)&&!Se(i)&&this.pressedKeys.delete(i)}}set(e,t,i){return this.bindings.add({...Ae(e),handler:t,options:{...this._options?.bindingDefaults,...i}}),this}hostConnected(){this._host.addEventListener("keyup",this),this._host.addEventListener("keydown",this)}hostDisconnected(){this._host.removeEventListener("keyup",this),this._host.removeEventListener("keydown",this)}}var Le=i(1926);class Re{constructor(e){this.containerRef=(0,p._)(),this.visibleChipCount=-1,this.handleCollapseChipClick=async e=>{if(e.preventDefault(),e.stopPropagation(),!this.host.isInteractive())return;const t=this.getCollapsedItems(),i=this.host.selectedItems.filter((e,t)=>t<this.visibleChipCount);this.host.setDropdownSelectedValues([...i,...t.filter(e=>e.disabled)]),await this.host.updateComplete,this.host.publishChangeEvent()},this.handleSingleChipClick=async e=>{e.preventDefault(),e.stopPropagation(),this.host.isInteractive()&&(this.host.unselectAllOptions(),this.host.getDisableOnCloseValue()||(this.host.closePopover(),this.host.focus()),await this.host.updateComplete,this.host.publishChangeEvent())},this.host=e,e.addController(this)}hostConnected(){this.resizeObserver=new ResizeObserver(()=>{"no-wrap"===this.host.chips&&this.calculateVisibleChips()})}hostDisconnected(){this.resizeObserver?.disconnect(),this.observedElement=void 0,this.visibleChipCount=-1}hostUpdated(){if("no-wrap"===this.host.chips){const e=this.containerRef.value;e&&e!==this.observedElement&&(this.resizeObserver?.disconnect(),this.resizeObserver?.observe(e),this.observedElement=e),requestAnimationFrame(()=>this.calculateVisibleChips())}else this.observedElement&&(this.resizeObserver?.disconnect(),this.observedElement=void 0),-1!==this.visibleChipCount&&(this.visibleChipCount=-1,this.host.requestUpdate())}calculateVisibleChips(){const e=this.containerRef.value;if(!e)return;const t=Array.from(e.querySelectorAll("vcdk-chip[data-collapse-chip]"));if(0===t.length)return void(-1!==this.visibleChipCount&&(this.visibleChipCount=-1,this.host.requestUpdate()));const i=e.clientWidth,o=getComputedStyle(e),r=parseFloat(o.gap)||4,s=e.querySelector("vcdk-chip[data-testid='collapse-chip']"),n=s?s.offsetWidth:56;let a=0,d=0;for(let e=0;e<t.length;e++){const o=t[e].offsetWidth,s=d>0?r:0;if(!(a+o+s+(t.length-d-1>0?n+r:0)<=i))break;a+=o+s,d++}const l=d===t.length?-1:Math.max(0,d);this.visibleChipCount!==l&&(this.visibleChipCount=l,this.host.requestUpdate())}getCollapsedItems(){return this.visibleChipCount<0?[]:this.host.selectedItems.slice(this.visibleChipCount)}get chipSize(){return"small"===this.host.size?"extra-small":"small"}render(){const e=this.host.chips,t=this.host.selectedItems.length>0;return s.qy`
      <vcdk-chips
        slot="before-input"
        size=${this.chipSize}
        ${(0,p.K)(this.containerRef)}>
        ${(0,z.z)("single"===e&&t,()=>this.renderSingleChip(),()=>(0,z.z)("no-wrap"===e&&t,()=>this.renderNoWrapChips(),()=>this.renderWrapChips()))}
      </vcdk-chips>
    `}renderWrapChips(){return s.qy`
      ${(0,Le.T)(this.host.selectedItems,e=>s.qy`
          <vcdk-chip
            size="small"
            data-testid="selected-chips"
            .value=${e.value}
            @click=${t=>{this.host.handleChipClick(t,e)}}
            iconEnd=${(0,C.J)(e.disabled?void 0:"close")}>
            ${e.getTextContent()}
          </vcdk-chip>
        `)}
    `}renderNoWrapChips(){const e=this.visibleChipCount<0?0:this.host.selectedItems.length-this.visibleChipCount;return s.qy`
      ${(0,Le.T)(this.host.selectedItems,(e,t)=>{const i=this.visibleChipCount>=0&&t>=this.visibleChipCount;return s.qy`
          <vcdk-chip
            size="small"
            data-testid="selected-chips"
            data-collapse-chip
            ?data-collapsed=${i}
            .value=${e.value}
            style=${(0,Ee.W)({order:i?"2":"0",visibility:i?"hidden":"visible",position:i?"absolute":"static",pointerEvents:i?"none":"auto"})}
            @click=${t=>{this.host.handleChipClick(t,e)}}
            iconEnd=${(0,C.J)(e.disabled?void 0:"close")}>
            ${e.getTextContent()}
          </vcdk-chip>
        `})}
      ${(0,z.z)(e>0,()=>s.qy`
          <vcdk-chip
            size="small"
            data-testid="collapse-chip"
            aria-label="${e} more items selected"
            style=${(0,Ee.W)({order:"1",flexShrink:"0"})}
            @click=${this.handleCollapseChipClick}
            iconEnd=${(0,C.J)(this.host.isInteractive()?"close":void 0)}>
            +${e}
          </vcdk-chip>
        `)}
    `}renderSingleChip(){return s.qy`
      <vcdk-chip
        size="small"
        data-testid="selected-chips"
        @click=${this.handleSingleChipClick}
        iconEnd="close">
        <slot name="single-chip-label">${this.host.selectedItems.length}</slot>
      </vcdk-chip>
    `}}const De=(0,o.q6)("vcdk-dropdown");class Pe extends CustomEvent{constructor(e,t=""){super(`${t}change`,{detail:e?.map(e=>({value:e.value,label:e.textContent?.trim()??""}))??[],bubbles:!0,composed:!0})}}const Be=e=>e?.text?e.text:e?.getTextContent();class je extends CustomEvent{constructor(e,t=""){const i=Be(e);super(`${t}change`,{detail:{value:e?.value??i??"",label:i??""},bubbles:!0,composed:!0})}}class qe extends CustomEvent{constructor(e){super("vcdk-dropdown-input",{detail:{value:e},bubbles:!0,composed:!0})}}class He extends CustomEvent{constructor(e){super("vcdk-dropdown-option-focused",{bubbles:!0,composed:!0,detail:e})}}var Ke=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Fe=class extends d.l{constructor(){super(...arguments),this.variant="body"}render(){return s.qy`
      <slot
        class=${(0,c.H)({[`typography-${this.variant}`]:1})}
        part="slot"></slot>
    `}};Fe.styles=[...a.FB,a.gI],Ke([(0,l.MZ)({type:String,reflect:!0})],Fe.prototype,"variant",void 0),Fe=Ke([(0,v.E)("vcdk-typography")],Fe);var Ne=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let Je=class extends d.l{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.selected=!1,this.hidden=!1,this.checkbox=!1,this.dropdownContext=new o.G(this,{context:De,subscribe:!0}),this.handleFocus=()=>{this.dispatchEvent(new He(this))}}get _contentSlotText(){return this._content.map(e=>this.text||e.textContent?.trim()).join("")}get value(){return this._value??this._contentSlotText}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}getTextContent(){return this._contentSlotText}connectedCallback(){super.connectedCallback(),this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}focus(){this.disabled||this.hidden||(super.focus(),this.renderRoot.querySelector("[role='option']")?.focus())}render(){const e=this.dropdownContext?.value?.size||_e,t="small"===e;return s.qy`
      <div
        role="option"
        part="option"
        class=${(0,c.H)({option:1,disabled:this.disabled,selected:this.selected,checkbox:this.checkbox,active:this.active,"typography-body":!t,"typography-caption1":t,hidden:this.hidden,[e]:!0})}
        tabindex=${this.disabled||this.hidden?-1:0}
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        ${(0,z.z)(this.checkbox,()=>s.qy`
            <vcdk-checkbox
              label=""
              size=${t?"small":"medium"}
              tabindex="-1"
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
        ${(0,z.z)(this.selected&&!this.checkbox,()=>s.qy`
            <vcdk-system-icon icon="check" part="selected"></vcdk-system-icon>
          `)}
      </div>
    `}};Je.styles=[a.IT.caption1,a.IT.body,ue,be],Ne([(0,l.gZ)({flatten:!0,slot:""})],Je.prototype,"_content",void 0),Ne([(0,l.MZ)({type:Boolean,reflect:!0})],Je.prototype,"active",void 0),Ne([(0,l.MZ)({type:Boolean,reflect:!0})],Je.prototype,"disabled",void 0),Ne([(0,l.MZ)({type:Boolean,reflect:!0})],Je.prototype,"selected",void 0),Ne([(0,l.MZ)({type:Boolean,reflect:!0})],Je.prototype,"hidden",void 0),Ne([(0,l.MZ)({type:Boolean})],Je.prototype,"checkbox",void 0),Ne([(0,l.MZ)({type:String})],Je.prototype,"text",void 0),Ne([(0,l.MZ)()],Je.prototype,"value",null),Je=Ne([(0,v.E)("vcdk-dropdown-option")],Je);var Ue=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const _e="medium";function We(e){return!e.hidden&&!e.disabled}let Ge=class extends E{static get validators(){return[...E.validators,I({validationProperty:"value",validationElement:Object.assign(document.createElement("select"),{required:!0})})]}static defaultValidationMessages(){return{valueMissing:(0,y.ab)("",{id:"vcdk-dropdown.valueMissing",desc:"Validation message for required dropdown. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(e){this.readOnly=e}setFormValue(e){super.setFormValue(Array.isArray(this.value)?this.value.join(", "):e)}willUpdate(e){super.willUpdate(e),this.textFieldError=this.error||!this.validity.valid&&this.hasInteracted}async getUpdateComplete(){const e=await super.getUpdateComplete();return await(this.textField?.updateComplete),e}connectedCallback(){super.connectedCallback(),this.initializeValue(),this.handleMultipleChange()}handleMultipleChange(){this.items.forEach(e=>e.checkbox=Boolean(this.multi))}focus(e){(async()=>{await this.updateComplete;const t=this.inputRef?.value;t?.focus(e);const i=t?.input;if(i instanceof HTMLInputElement){const e=i.value.length;i.setSelectionRange(e,e)}})()}constructor(){var e;super(),this.size=_e,this.clearable=!1,this.multi=!1,this.open=!1,this.chips="wrap",this.singleChip=!1,this.filterInput=!1,this.tabIndex=0,this.selectedItems=[],this.activeItem=null,this.lastKeyTime=0,this.searchTerm=null,this.dropdownContext={size:this.size},this.wrapperRef=(0,p._)(),this.inputRef=(0,p._)(),this.listboxRef=(0,p._)(),this.textFieldError=!1,this.chipsController=new Re(this),this.setSize=()=>{this.dropdownContext={size:this.size}},this.initializeValue=()=>{if(!this.items.length&&!this.selectedItems.length)return;if(this.handleMultipleChange(),null!==this.value&&void 0!==this.value){const e=this.findOptionsByValue(this.value),t=this.findOptionLabels();this.setDropdownSelectedValues(e.length?e:t)}else this.initializeFromSelectedOptions();const e=this.items.some(e=>!e.hidden);this.emptyOptions.forEach(t=>{t.hidden=e})},this.handleSingleChipDeprecation=e=>{this.singleChip?(console.warn("[vcdk-dropdown] The 'singleChip' property is deprecated. Use chips=\"single\" instead."),this.chips="single"):!0===e&&"single"===this.chips&&(this.chips="wrap")},this.initializeFromSelectedOptions=()=>{this.setDropdownSelectedValues(this.items.filter(e=>e.selected))},this.selectValue=e=>{e.length<=0?this.value=null:this.multi?this.value=e.map(({value:e})=>e).filter(e=>null!=e):this.value=e.length>0?e[0].value:null},this.onClickOutside=e=>{const t=e.composedPath();this.wrapperRef?.value&&!t.includes(this.wrapperRef.value)&&(xe(e),document.addEventListener("click",e=>xe(e),{once:!0,capture:!0}),this.closePopover())},this.toggleOpen=e=>{const t=this.listboxRef?.value&&e.composedPath().includes(this.listboxRef?.value);if(this.isInteractive()&&!t)if(this.open){const t=this.filterInput&&this.textField?.input;t&&e.composedPath().includes(t)||this.closePopover()}else this.openDropdown(),this.focus()},this.handleOptionSelected=e=>{const t=e.target instanceof Je;e.target instanceof Qe&&this.filterOptionsBasedOnSearch(null),t&&!e.target.disabled&&this.selectOption(e.target),this.getDisableOnCloseValue()||(this.closePopover(),this.focus())},this.handleOptionFocused=e=>{const t=e.detail;!t||t.disabled||t.hidden||this.activateItem(t)},this.clearActiveOptions=()=>{this.items.forEach(e=>{e.active=!1}),this.activeItem=null},this.publishChangeEvent=()=>{this.multi?this.dispatchEvent(new Pe(this.selectedItems,"vcdk-dropdown-")):this.dispatchEvent(new je(this.selectedItems[0],"vcdk-dropdown-"))},this.unselectAllOptions=()=>{const e=this.selectedItems.filter(e=>e.selected&&e.disabled);this.setDropdownSelectedValues(e)},this.handleSelectAllCLick=async()=>{const e=this.items.filter(({disabled:e})=>!e);if(this.selectedItems.filter(({disabled:e})=>!e).length>=e.length)this.unselectAllOptions();else{const t=this.selectedItems.filter(e=>e.selected&&e.disabled);this.setDropdownSelectedValues([...t,...e])}this.getDisableOnCloseValue()||(this.closePopover(),this.focus()),this.popoverContainer.updatePosition(),await this.updateComplete,this.publishChangeEvent()},this.preventDefaultKeyboardEvent=e=>{Ve(e).preventDefault()},this.openDropdown=()=>{if(!this.open&&this.isInteractive()){if(this.open=!0,!this.activeItem){const e=this.selectedItems[0]??this.items.find(e=>!e.disabled&&!e.hidden);e&&this.activateItem(e)}this.popoverContainer.updatePosition()}},this.onSpaceBarKey=e=>{this.open&&this.filterInput||this.preventDefaultKeyboardEvent(e),this.open||(this.openDropdown(),this.focusActiveItem())},this.activateItem=e=>{this.clearActiveOptions(),this.open&&"function"==typeof e.scrollIntoView&&e.scrollIntoView({behavior:"auto",block:"nearest"});const t=this.items.indexOf(e);e.id||(e.id=`vcdk-dropdown-option-${t}`),this.activeItem=e,this.activeItem.active=!0},this.onAltUp=()=>{this.activeItem&&this.selectOption(this.activeItem),this.closePopover(),this.focus()},this.onAltDown=()=>{this.open||(this.openDropdown(),this.focus())},this.onEscapeKey=e=>{this.preventDefaultKeyboardEvent(e),this.open&&this.closePopover()},this.setNextActiveElement=(e,t)=>{if(!this.isInteractive())return;const i=this.selectedItems[0]??null,o=this.open?this.activeItem:i,r="start"===e||"end"===e,s=Ye(this.items,r?e:o,t);this.open?(this.activateItem(s),this.focusActiveItem()):this.selectOption(s)},this.handleSearch=e=>{if(this.filterInput||!this.isInteractive())return;const t=Ve(e);if("Backspace"===t.key||"Delete"===t.key)return void t.preventDefault();if(!/^.$/u.test(t.key))return;t.preventDefault();const i=Date.now();i-this.lastKeyTime>500&&(this.searchTerm=""),this.lastKeyTime=i,this.searchTerm+=t.key.toLocaleLowerCase();const o=this.items.find(e=>null!==this.searchTerm&&e.textContent?.trim().toLocaleLowerCase().startsWith(this.searchTerm));o&&(this.open?this.activateItem(o):this.selectOption(o))},this.onArrowDown=e=>{if(this.preventDefaultKeyboardEvent(e),this.isInteractive())if(this.open)this.setNextActiveElement(this.activeItem,"forward");else{if(this.openDropdown(),this.selectedItems.length>0)this.activateItem(this.selectedItems[0]);else{const e=this.items.find(We);e&&this.activateItem(e)}this.focusActiveItem()}},this.onArrowUp=e=>{if(this.preventDefaultKeyboardEvent(e),this.isInteractive())if(this.open)this.setNextActiveElement(this.activeItem,"backwards");else{if(this.openDropdown(),this.selectedItems.length>0)this.activateItem(this.selectedItems[this.selectedItems.length-1]);else{const e=[...this.items].reverse().find(We);e&&this.activateItem(e)}this.focusActiveItem()}},this.onHomeKey=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement("start","forward")},this.onEndKey=e=>{this.preventDefaultKeyboardEvent(e),this.setNextActiveElement("end","backwards")},this.onEnterKey=e=>{this.preventDefaultKeyboardEvent(e),this.isInteractive()&&(this.open?this.activeItem&&We(this.activeItem)?(this.selectOption(this.activeItem),this.focusActiveItem(),this.getDisableOnCloseValue()||this.closePopover()):this.filterInput&&this.searchTerm&&this.addOption?.length&&(this.addOption[0].click(),this.focusActiveItem(),this.filterOptionsBasedOnSearch(null),this.getDisableOnCloseValue()||this.closePopover()):(this.openDropdown(),this.focusActiveItem()))},this.getDisableOnCloseValue=()=>this.disableCloseOnSelect??this.multi,this.getTextContent=e=>{if(this.filterInput&&null!==this.searchTerm)return this.searchTerm;if(this.multi)return this.selectedItems.length>0?" ":"";const t=e?.[0];return t?Be(t):""},this.handleSearchInputChange=e=>{if(!this.isInteractive())return;const t=(this.searchTerm?null:e.detail.nativeEvent.data??null)??e.detail.value.trimStart();this.dispatchEvent(new qe(t)),this.filterOptionsBasedOnSearch(t),this.popoverContainer.updatePosition(),this.openDropdown()},this.filterOptionsBasedOnSearch=e=>{this.searchTerm=e;const t=[null,void 0,""];let i=!0;this.items.forEach(o=>{if(null===e||t.includes(e))return o.hidden=!1,void(i=!1);this.filterOptions?o.hidden=!this.filterOptions(o):o.hidden=!o.textContent?.toLowerCase().includes(e.toLowerCase()),o.hidden||(i=!1)}),this.emptyOptions.forEach(e=>{e.hidden=!i}),this.activeItem=this.activeItem&&We(this.activeItem)?this.activeItem:this.items.find(e=>We(e))??null,this.activeItem&&this.activateItem(this.activeItem)},this.handleChipClick=(e,t)=>{e.preventDefault(),e.stopPropagation(),this.isInteractive()&&!t.disabled&&this.selectOption(t)},(e={skip:()=>!!this.disabled,bindingDefaults:{triggers:["keydownRepeat"]}},new Te(this,e)).set([Ce.altKey,Ce.arrowDown],this.onAltDown).set([Ce.altKey,Ce.arrowUp],this.onAltUp).set(Ce.arrowDown,this.onArrowDown).set(Ce.arrowUp,this.onArrowUp).set(Ce.escapeKey,this.onEscapeKey).set(Ce.homeKey,this.onHomeKey).set(Ce.endKey,this.onEndKey).set(Ce.spaceBar,this.onSpaceBarKey).set(Ce.enterKey,this.onEnterKey),this.addEventListener("keydown",this.handleSearch)}update(e){e.has("open")&&(this.open?(document.addEventListener("mousedown",this.onClickOutside,{passive:!0}),this.eventCleanup=()=>document.removeEventListener("mousedown",this.onClickOutside)):(this.eventCleanup?.(),this.eventCleanup=void 0)),super.update(e)}disconnectedCallback(){super.disconnectedCallback(),this.eventCleanup?.()}setDropdownSelectedValues(e){this.selectedItems=e,this.items.forEach(e=>e.selected=!1),e.map(e=>e.selected=!0),this.selectValue(e),this.syncSelectAllOptionCheckboxValue()}findOptionsByValue(e){return this.items.filter(t=>this.multi?e?.includes?.(t.value):t.value===e)}findOptionLabels(){return this.items.filter(e=>{const t=Be(e);return!!t&&(this.multi?this.value?.includes?.(t):this.value===t)})}closePopover(){this.dispatchEvent(new me(!1))&&(this.open=!1,this.clearActiveOptions(),this.searchTerm=null,this.filterInput&&(this.filterOptionsBasedOnSearch(null),this.inputRef.value&&(this.inputRef.value.value=this.getTextContent(this.selectedItems)??"")))}async selectOption(e){if(!this.isInteractive())return;const t=this.selectedItems.find(t=>t.value===e.value);this.multi?(e.selected=!e.selected,this.setDropdownSelectedValues(t?this.selectedItems.filter(t=>t.value!==e.value):[...this.selectedItems,e])):(this.items.forEach(e=>e.selected=!1),e.selected=!0,this.clearable&&t?this.setDropdownSelectedValues([]):this.setDropdownSelectedValues([e])),this.popoverContainer.updatePosition(),await this.updateComplete,this.publishChangeEvent()}syncSelectAllOptionCheckboxValue(){const e=this.items.filter(e=>!e.disabled).length,t=this.selectedItems.filter(e=>!e.disabled).length;this.dropdownOptionSelectAll.forEach(i=>{i.selected=t===e?"checked":0===t?"unchecked":"indeterminate"})}focusActiveItem(){setTimeout(()=>{this.activeItem?.focus()},0)}isInteractive(){return!this.disabled&&!this.readonly}onResetValue(){(Array.isArray(this.defaultValue)?this.defaultValue.length>0:Boolean(this.defaultValue))?this.value=this.multi&&"string"==typeof this.defaultValue?this.defaultValue.split(", ").filter(Boolean):this.defaultValue:(this.value=null,this.unselectAllOptions())}formStateRestoreCallback(e,t){this.multi&&"string"==typeof e?this.value=e.split(", ").filter(Boolean):this.value=e,"restore"===t&&this.resetValidity(),this.updateValidity()}get cssVariables(){return{"--vcdk-dropdown-search-chars":`${this.searchTerm?.length||1}ch`}}renderInput(){const{label:e,disabled:t,required:i,placeholder:o,name:r,size:n,readonly:a}=this,d=this.getTextContent(this.selectedItems),l=this.multi,c=this.selectedItems.length>0,h=l&&c?"":o;return s.qy`
      <vcdk-text-field
        ${(0,p.K)(this.inputRef)}
        exportparts=${"fieldset, label, input-wrapper, input, before-input, after-input, icon"}
        id="anchor"
        slot="anchor"
        autocomplete="off"
        role="combobox"
        inputmode=${this.filterInput?"text":"none"}
        aria-controls=${(0,C.J)(this.open?"menu":void 0)}
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-label=${(0,C.J)(e)}
        .skipValidation=${!0}
        .floatingLabel=${this.floatingLabel}
        .value=${d}
        .label=${e}
        .inputAriaLabel=${e}
        .disabled=${t}
        ?required=${i}
        .placeholder=${h??""}
        .error=${this.textFieldError}
        .helperText=${this.hint}
        .size=${n}
        .name=${r}
        ?readonly=${a}
        .icon=${this.open?"chevron-up":"chevron-down"}
        .iconAriaLabel=${this.open?"Close":"Open"}
        .tabIndex=${this.filterInput?0:-1}
        @vcdk-input=${this.handleSearchInputChange}>
        ${(0,z.z)(l,()=>this.chipsController.render())}
      </vcdk-text-field>
    `}render(){const{open:e,placement:t}=this;return s.qy`
      <div
        class=${(0,c.H)({dropdown:1,"helper-text":!!this.helperText,"filter-input":!!this.filterInput,[`size-${this.size}`]:this.size,multi:!!this.multi,disabled:!!this.disabled,readonly:!!this.readonly,open:!!this.open,"floating-label":!!this.floatingLabel,"has-selected-values":!!this.selectedItems.length,error:!!this.textFieldError,"single-chip":"single"===this.chips||"no-wrap"===this.chips,"chips-no-wrap":"no-wrap"===this.chips})}
        style=${(0,Ee.W)(this.cssVariables)}
        @click=${this.toggleOpen}
        tabindex=${this.tabIndex}
        data-testid="dropdown"
        ${(0,p.K)(this.wrapperRef)}>
        <vcdk-dropdown-popover
          ?open=${e}
          .placement=${t}
          ?alt-boundary=${this.altBoundary}>
          ${this.renderInput()}

          <div
            id="listbox"
            role="listbox"
            aria-expanded=${e?"true":"false"}
            aria-hidden=${e?"false":"true"}
            aria-multiselectable=${this.multi?"true":"false"}
            aria-labelledby="label"
            aria-activedescendant=${(0,C.J)(this.activeItem&&this.open&&this.activeItem.id?this.activeItem.id:void 0)}
            part="listbox"
            class="option-container"
            tabindex="-1"
            ${(0,p.K)(this.listboxRef)}
            @click=${this.handleOptionSelected}
            @dropdownselectalloption=${this.handleSelectAllCLick}
            @vcdk-dropdown-option-focused=${this.handleOptionFocused}>
            <slot @slotchange=${this.initializeValue}></slot>
          </div>
        </vcdk-dropdown-popover>
      </div>
    `}};function Ye(e,t,i){const o=function(e,t){return t?"start"===t?0:"end"===t?e.length-1:e.indexOf(t):-1}(e,t);if(-1===o)return Ye(e,"forward"===i?"start":"end",i);const r=function(e,t,i,o){return"start"===e||"end"===e?i:"forward"===t?i.slice(o+1):i.slice(0,o)}(t,i,e,o);return("forward"===i?r:r.reverse()).find(e=>!e.disabled&&!e.hidden)??e[o]}Ge.styles=[ve],Ge.interactionTriggers=["vcdk-dropdown-change","focusout"],Ue([(0,l.MZ)({attribute:!1})],Ge.prototype,"validationMessages",void 0),Ue([(0,l.MZ)({type:Boolean})],Ge.prototype,"floatingLabel",void 0),Ue([(0,l.MZ)({type:String})],Ge.prototype,"placement",void 0),Ue([(0,l.MZ)({type:String})],Ge.prototype,"size",void 0),Ue([(0,l.MZ)({type:Boolean})],Ge.prototype,"disableCloseOnSelect",void 0),Ue([(0,l.MZ)({type:Boolean})],Ge.prototype,"clearable",void 0),Ue([(0,l.MZ)({type:String})],Ge.prototype,"label",void 0),Ue([(0,l.MZ)({type:Object})],Ge.prototype,"multi",void 0),Ue([(0,l.MZ)({type:Boolean,reflect:!0})],Ge.prototype,"open",void 0),Ue([(0,l.MZ)({type:String})],Ge.prototype,"placeholder",void 0),Ue([(0,l.MZ)({type:String})],Ge.prototype,"chips",void 0),Ue([(0,l.MZ)({type:Boolean})],Ge.prototype,"singleChip",void 0),Ue([(0,l.MZ)({type:Boolean})],Ge.prototype,"filterInput",void 0),Ue([(0,l.MZ)({type:Boolean,attribute:"alt-boundary"})],Ge.prototype,"altBoundary",void 0),Ue([(0,l.MZ)({attribute:!1})],Ge.prototype,"filterOptions",void 0),Ue([(0,l.MZ)({type:Number})],Ge.prototype,"tabIndex",void 0),Ue([(0,l.P)("vcdk-text-field")],Ge.prototype,"textField",void 0),Ue([$e(null,"vcdk-dropdown-add-option")],Ge.prototype,"addOption",void 0),Ue([(0,l.MZ)({type:String,reflect:!0})],Ge.prototype,"value",void 0),Ue([(0,l.MZ)({type:String,attribute:!1})],Ge.prototype,"defaultValue",void 0),Ue([(0,l.wk)()],Ge.prototype,"selectedItems",void 0),Ue([(0,l.wk)()],Ge.prototype,"activeItem",void 0),Ue([(0,l.wk)()],Ge.prototype,"lastKeyTime",void 0),Ue([(0,l.wk)()],Ge.prototype,"searchTerm",void 0),Ue([$e(null,"vcdk-dropdown-option")],Ge.prototype,"items",void 0),Ue([$e(null,"vcdk-dropdown-empty-option")],Ge.prototype,"emptyOptions",void 0),Ue([$e(null,"vcdk-dropdown-select-all-option")],Ge.prototype,"dropdownOptionSelectAll",void 0),Ue([(0,l.P)("vcdk-dropdown-popover")],Ge.prototype,"popoverContainer",void 0),Ue([(0,o.Gt)({context:De})],Ge.prototype,"dropdownContext",void 0),Ue([he("size")],Ge.prototype,"setSize",void 0),Ue([he("value")],Ge.prototype,"initializeValue",void 0),Ue([he("multi")],Ge.prototype,"handleMultipleChange",null),Ue([he("singleChip")],Ge.prototype,"handleSingleChipDeprecation",void 0),Ge=Ue([(0,v.E)("vcdk-dropdown")],Ge);let Qe=class extends d.l{constructor(){super(...arguments),this.dropdownContext=new o.G(this,{context:De,subscribe:!0}),this.click=()=>{this.dispatchEvent(new MouseEvent("click",{bubbles:!0,composed:!0}))}}render(){const e=this.dropdownContext?.value?.size||_e;return s.qy`
      <div
        role="option"
        class=${(0,c.H)({option:!0,[e]:!0})}
        tabindex="0">
        <span part="content">
          <slot></slot>
        </span>
        <slot name="icon"></slot>
      </div>
    `}};Qe.styles=[ue],Qe=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}([(0,v.E)("vcdk-dropdown-add-option")],Qe);let Xe=class extends d.l{constructor(){super(...arguments),this.dropdownContext=new o.G(this,{context:De,subscribe:!0}),this.handleFocus=()=>{this.dispatchEvent(new He(this))}}connectedCallback(){super.connectedCallback(),this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this.handleFocus)}focus(){this.hidden||(super.focus(),this.renderRoot.querySelector("[role='option']")?.focus())}render(){const e=this.dropdownContext?.value?.size||_e;return s.qy`
      <div
        class=${(0,c.H)({option:1,"typography-body":1,hidden:this.hidden,[e]:!0})}
        role="option"
        tabindex="-1">
        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};Xe.styles=[ue,a.IT.body],Xe=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}([(0,v.E)("vcdk-dropdown-empty-option")],Xe);var et=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let tt=class extends d.l{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.selected="unchecked",this.dropdownContext=new o.G(this,{context:De,subscribe:!0}),this.handleClick=()=>{this.disabled||this.dispatchEvent(new CustomEvent("dropdownselectalloption",{bubbles:!0,composed:!0}))}}render(){const e=this.dropdownContext?.value?.size||_e;return s.qy`
      <div
        @click=${this.handleClick}
        role="option"
        class=${(0,c.H)({option:1,disabled:this.disabled,selected:this.selected,active:this.active,"typography-body":!0,hidden:this.hidden,[e]:!0})}
        tabindex="-1"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        <vcdk-checkbox
          label=""
          .disabled=${this.disabled}
          .checked=${"checked"===this.selected}
          .indeterminate=${"indeterminate"===this.selected}></vcdk-checkbox>

        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};tt.styles=[ue,a.IT.body],et([(0,l.MZ)({type:Boolean,reflect:!0})],tt.prototype,"active",void 0),et([(0,l.MZ)({type:Boolean,reflect:!0})],tt.prototype,"disabled",void 0),et([(0,l.MZ)({type:String,reflect:!0})],tt.prototype,"selected",void 0),tt=et([(0,v.E)("vcdk-dropdown-select-all-option")],tt)},4135:(e,t,i)=>{i.d(t,{F:()=>d});var o=i(1089),r=i(6337),s=i(2326),n=i(6260);const a=Object.keys(o.f),d=e=>class extends e{static fallbackVariableValue(e,t,i){if(!i.length)return"";const o=i.shift();return i.length?`var(--${e}-${t}-${o}, ${this.fallbackVariableValue(e,t,i)})`:`var(--${e}-${t}-${o})`}static responsiveVariables(e,t,i,o){return t.map(t=>{const r=(0,s.A)(t);return o?`\n    --${e}-${r}-fallback: ${this.fallbackVariableValue(e,r,[...o])};\n    --${e}-${r}: var(--${e}-${r}-${i}, var(--${e}-${r}-fallback));`:`\n    --${e}-${r}: var(--${e}-${r}-${i});`}).join("")}static responsiveStyles(e){return r.AH`
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
      }`}static finalizeStyles(e){if(!this.responsiveProperties)return n.l.finalizeStyles(e);const t=[this.responsiveStyles(this.responsiveProperties)];return e&&Array.isArray(e)?t.push(...e):e&&t.push(e),n.l.finalizeStyles(t)}connectedCallback(){super.connectedCallback(),this.setResponsiveVariables()}update(e){const t=this.constructor.responsiveProperties,i=t?.props;t&&i.some(t=>e.has(t))&&this.setResponsiveVariables(),super.update(e)}setResponsiveVariables(){const e=this.constructor.responsiveProperties;if(void 0===e)return;const t=e.props;for(const i of t){let t=this[i];if(t){Array.isArray(t)||(t=[t]);for(let o=0;o<t.length;o++){const r=String(i);let n=t[o];if(e.styleTransform&&(n=e.styleTransform(r,a[o],n)),void 0===n)continue;"number"==typeof n&&(n=`${n}px`);const d=a[o];this.style.setProperty(`--${e.prefix}-${(0,s.A)(r)}-${d}`,n)}}}}}},4374:(e,t,i)=>{i.d(t,{r:()=>a});var o=i(352),r=i(9746),s=i(6260),n=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};class a extends s.l{constructor(){super(),this.type="button",this.formNoValidate=!1,this.disabled=!1,this.customStates={set:(e,t)=>{this.internals?.states&&(t?this.internals.states.add(e):this.internals.states.delete(e))},has:e=>!!this.internals?.states&&this.internals.states.has(e)},this.onButtonClick=e=>{if(this.disabled)return e.preventDefault(),void e.stopPropagation();this.internals&&setTimeout(()=>{if(!e.defaultPrevented&&this.internals&&("submit"===this.type&&this.name&&this.internals.setFormValue(this.value??null),"submit"===this.type||"reset"===this.type)){const e=(e=>{const t=document.createElement("button"),i=["type","formAction","formEnctype","formMethod","formNoValidate","formTarget"];return Object.assign(t,(0,r.A)(e,(e,t)=>!!i.includes(t)&&void 0!==e)),Object.assign(t.style,{position:"absolute !important",width:"0 !important",height:"0 !important",clipPath:"inset(50%) !important",overflow:"hidden !important",whiteSpace:"nowrap !important"}),t})(this);try{this.internals.form?.appendChild(e),e.click()}finally{e.remove(),"submit"===this.type&&this.name&&this.internals.setFormValue(null)}}},0)};try{this.internals=this.attachInternals()}catch{console.warn("ElementInternals API is not supported in this browser. A polyfill may be required.")}}update(e){super.update(e),this.setCustomStates()}setCustomStates(){this.customStates.set("disabled",this.disabled)}formDisabledCallback(e){this.disabled=e}formResetCallback(){}formAssociatedCallback(){}click(){this.buttonEl.value?.click()}}a.shadowRootOptions={...s.l.shadowRootOptions,delegatesFocus:!0},a.formAssociated=!0,n([(0,o.MZ)({type:String,reflect:!0})],a.prototype,"type",void 0),n([(0,o.MZ)({type:String,reflect:!0})],a.prototype,"name",void 0),n([(0,o.MZ)({type:String})],a.prototype,"value",void 0),n([(0,o.MZ)({type:String})],a.prototype,"form",void 0),n([(0,o.MZ)({type:String})],a.prototype,"formAction",void 0),n([(0,o.MZ)({type:String,attribute:"formenctype"})],a.prototype,"formEnctype",void 0),n([(0,o.MZ)({type:String,attribute:"formmethod"})],a.prototype,"formMethod",void 0),n([(0,o.MZ)({type:Boolean,attribute:"formnovalidate"})],a.prototype,"formNoValidate",void 0),n([(0,o.MZ)({type:String,attribute:"formtarget"})],a.prototype,"formTarget",void 0),n([(0,o.MZ)({type:Boolean})],a.prototype,"disabled",void 0)},4393:(e,t,i)=>{var o=i(6591),r=i(6337),s=i(352),n=i(1145),a=i(6487),d=i(4135),l=i(6260);const c=r.AH`
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

  .loader {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }

    100% {
      rotate: 360deg;
    }
  }

  .indefinite.active {
    stroke: var(--vcdk-spinner-stroke, var(--vcdk-color-bg-selected));
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: active-animation 8s ease-in-out infinite;
  }

  @keyframes active-animation {
    0% {
      stroke-dasharray: 0 0 0 360 0 360;
    }
    12.5% {
      stroke-dasharray: 0 0 270 90 270 90;
    }
    25% {
      stroke-dasharray: 0 270 0 360 0 360;
    }
    37.5% {
      stroke-dasharray: 0 270 270 90 270 90;
    }
    50% {
      stroke-dasharray: 0 540 0 360 0 360;
    }
    50.001% {
      stroke-dasharray: 0 180 0 360 0 360;
    }
    62.5% {
      stroke-dasharray: 0 180 270 90 270 90;
    }
    75% {
      stroke-dasharray: 0 450 0 360 0 360;
    }
    87.5% {
      stroke-dasharray: 0 450 270 90 270 90;
    }
    87.501% {
      stroke-dasharray: 0 90 270 90 270 90;
    }
    100% {
      stroke-dasharray: 0 360 1 360 0 360;
    }
  }

  .indefinite.track {
    stroke: var(--vcdk-spinner-stroke-track, var(--vcdk-color-bg-disabled));
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: track-animation 8s ease-in-out infinite;
  }

  @keyframes track-animation {
    0% {
      stroke-dasharray: 0 20 320 40 320 40;
    }
    12.5% {
      stroke-dasharray: 0 290 50 310 50 310;
    }
    25% {
      stroke-dasharray: 0 290 320 40 320 40;
    }
    37.5% {
      stroke-dasharray: 0 560 50 310 50 310;
    }
    37.501% {
      stroke-dasharray: 0 200 50 310 50 310;
    }
    50% {
      stroke-dasharray: 0 200 320 40 320 40;
    }
    62.5% {
      stroke-dasharray: 0 470 50 310 50 310;
    }
    62.501% {
      stroke-dasharray: 0 110 50 310 50 310;
    }
    75% {
      stroke-dasharray: 0 110 320 40 320 40;
    }
    87.5% {
      stroke-dasharray: 0 380 50 310 50 310;
    }
    100% {
      stroke-dasharray: 0 380 320 40 320 40;
    }
  }
`;var p=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let h=class extends((0,d.F)(l.l)){render(){return void 0===this.progress?r.JW`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader" role="progressbar"
      aria-busy="true"
      aria-live="polite"
      aria-label="${this.elementAriaLabel}">
        <circle
          r="176"
          cy="192"
          cx="192"
          stroke-width="32"
          fill="transparent"
          pathLength="360"
          class="indefinite active"
        ></circle>
        <circle
          r="176"
          cy="192"
          cx="192"
          stroke-width="32"
          fill="transparent"
          pathLength="360"
          class="indefinite track"
        ></circle>
      </svg>`:r.JW`
      <svg
        part="svg"
        viewBox="20 20 40 40"
        role="progressbar"
        aria-busy="true"
        aria-live="polite"
        aria-label="${this.elementAriaLabel}"
        style=${(0,n.W)({"--vcdk-spinner-progress":"number"==typeof this.progress?this.progress+"%":void 0})}>
          <circle
            cx="40"
            cy="40"
            r="18"
            fill="none" />     
      </svg>
    `}};h.styles=[c],h.responsiveProperties={prefix:"vcdk-spinner",props:["size"],styleTransform:(e,t,i)=>{if("size"===e&&"string"==typeof i)switch(i){case"small":return 18;case"large":return 80;default:return 38}return i}},p([(0,s.MZ)({type:Number})],h.prototype,"progress",void 0),p([(0,s.MZ)({converter:o.g})],h.prototype,"size",void 0),p([(0,s.MZ)({type:String,attribute:"element-aria-label"})],h.prototype,"elementAriaLabel",void 0),h=p([(0,a.E)("vcdk-spinner")],h),i(3018);var v=i(1669),u=i(4374),b=i(3720),y=i(31),f=i(7832),g=i(302),m=i(3380),k=i(6526);const x=r.AH`
  .button {
    --vcdk-system-icon-size: 1.5rem;
    --vcdk-button-border-width: 0px;
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
      backdrop-filter: blur(calc(var(--vcdk-blur-secondary-button, 0) / 2));
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
      --vcdk-system-icon-size: 1.25rem;
      min-height: 2rem;
      padding-inline: var(--vcdk-spacing-4);
    }

    &.size-medium {
      min-height: 2.5rem;
      padding-inline: var(--vcdk-spacing-5);
      .text {
        padding-block: var(--vcdk-spacing-1);
      }
    }

    &.size-large {
      min-height: 3rem;
      padding-inline: var(--vcdk-spacing-6);
      .text {
        padding-block: var(--vcdk-spacing-1);
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
    margin-inline: var(--vcdk-spacing-4);
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
`;var w=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let $=class extends u.r{constructor(){super(...arguments),this.buttonEl=(0,f._)(),this.ariaLabel="",this.autofocus=!1,this.size="medium",this.fullWidth=!1,this.loading=!1,this.variant="marketing",this.tabIndex=0,this.title=""}render(){const e=!!this.href,t=e?k.eu`a`:k.eu`button`;return k.qy`
      <${t}
        ${(0,f.K)(this.buttonEl)}
        class=${(0,b.H)({button:!0,[`variant-${this.variant}`]:!0,[`size-${this.size}`]:!0,fullWidth:!!this.fullWidth,loading:!!this.loading})}
        part="button"
        tabindex=${this.tabIndex}
        title=${(0,y.J)(this.title)}
        ?disabled=${(0,y.J)(e?void 0:this.disabled)}
        ?autofocus=${(0,y.J)(e?void 0:this.autofocus)}
        aria-label=${(0,y.J)(this.ariaLabel)}
        aria-disabled=${this.disabled?"true":m.s6}
        href=${(0,y.J)(e?this.href:void 0)}
        download=${(0,y.J)(e?this.download:void 0)}
        hreflang=${(0,y.J)(e?this.hreflang:void 0)}
        ping=${(0,y.J)(e?this.ping:void 0)}
        referrerpolicy=${(0,y.J)(e?this.referrerpolicy:void 0)}
        rel=${(0,y.J)(e?this.rel:void 0)}
        target=${(0,y.J)(e?this.target:void 0)}
        type=${(0,y.J)(e?void 0:this.type)}
        formaction=${(0,y.J)(e?void 0:this.formAction)}
        formenctype=${(0,y.J)(e?void 0:this.formEnctype)}
        formmethod=${(0,y.J)(e?void 0:this.formMethod)}
        ?formnovalidate=${(0,y.J)(e?void 0:this.formNoValidate)}
        formtarget=${(0,y.J)(e?void 0:this.formTarget)}
        name=${(0,y.J)(e?void 0:this.name)}
        value=${(0,y.J)(e?void 0:this.value)}
        @click=${(0,y.J)(e?void 0:this.onButtonClick)}
      >
        ${(0,g.z)(this.iconStart,e=>k.qy`
            <vcdk-system-icon .icon=${e} class="icon"></vcdk-system-icon>
          `)}
        <div class="text typography-button">
          <slot></slot>
        </div>
        ${(0,g.z)(this.iconEnd,e=>k.qy`
            <vcdk-system-icon .icon=${e} class="icon"></vcdk-system-icon>
          `)}
        ${(0,g.z)(this.loading,()=>k.qy`
            <vcdk-spinner class="spinner"></vcdk-spinner>
          `)}
      </${t}>
    `}};$.styles=[v.IT.button,x],w([(0,s.MZ)({type:String,attribute:"aria-label"})],$.prototype,"ariaLabel",void 0),w([(0,s.MZ)({type:Boolean})],$.prototype,"autofocus",void 0),w([(0,s.MZ)({type:String})],$.prototype,"size",void 0),w([(0,s.MZ)({type:Boolean})],$.prototype,"fullWidth",void 0),w([(0,s.MZ)({type:String})],$.prototype,"iconEnd",void 0),w([(0,s.MZ)({type:String})],$.prototype,"iconStart",void 0),w([(0,s.MZ)({type:Boolean})],$.prototype,"loading",void 0),w([(0,s.MZ)({type:String})],$.prototype,"variant",void 0),w([(0,s.MZ)({type:String})],$.prototype,"download",void 0),w([(0,s.MZ)({type:String})],$.prototype,"href",void 0),w([(0,s.MZ)({type:String})],$.prototype,"hreflang",void 0),w([(0,s.MZ)({type:String})],$.prototype,"ping",void 0),w([(0,s.MZ)({type:String})],$.prototype,"referrerpolicy",void 0),w([(0,s.MZ)({type:String})],$.prototype,"rel",void 0),w([(0,s.MZ)({type:String})],$.prototype,"target",void 0),w([(0,s.MZ)({type:Number})],$.prototype,"tabIndex",void 0),w([(0,s.MZ)()],$.prototype,"title",void 0),$=w([(0,a.E)("vcdk-button")],$)},6260:(e,t,i)=>{i.d(t,{l:()=>o.l});var o=i(1322)},6487:(e,t,i)=>{i.d(t,{E:()=>o});const o=e=>(t,i)=>{const o=()=>{const i=customElements.get(e);if(!i)return void customElements.define(e,t);const o=i.version,r=t.version;o&&r&&o!==r&&console.warn(`vcdk warning: Attempted to register <${e}>v, but <${e}>v. was already registered. This could indicate that your application might contain duplicate instances of the same component.`)};i?i.addInitializer(o):o()}},6591:(e,t,i)=>{i.d(t,{g:()=>r}),i(1089);var o=i(6337);const r={fromAttribute(e,t){if(!e)return null;if(e.startsWith("[")&&e.endsWith("]"))return JSON.parse(e);if(void 0===t){const t=Number(e);if(!Number.isNaN(t))return t}return o.W3.fromAttribute?.(e,t)},toAttribute:(e,t)=>Array.isArray(e)?o.W3.toAttribute?.(e,Array):o.W3.toAttribute?.(e,t)}},7909:(e,t,i)=>{i(3018);var o=i(1669),r=i(6337),s=i(352),n=i(3720),a=i(31),d=i(302),l=i(6487),c=i(6260);const p=r.AH`
  :host {
    --vcdk-accordion-summary-padding-inline: var(--vcdk-spacing-8);
    --vcdk-accordion-padding-inline: var(
      --vcdk-accordion-summary-padding-inline,
      var(--vcdk-spacing-8)
    );
  }

  /* Small size variant */
  :host([size="small"]) summary,
  :host([size="small"]) .disabled-button {
    --vcdk-system-icon-size: 1.25rem;
  }

  details,
  .details {
    color: var(--vcdk-color-text-subtle);
    width: 100%;
    max-width: 100%;
    border-bottom: 1px solid var(--vcdk-color-border-subtle);
    display: block;
    background-color: var(--vcdk-color-bg);
  }

  summary,
  .disabled-button {
    --vcdk-system-icon-size: 1.5rem;
    align-items: center;
    border-radius: var(--vcdk-radius-default);
    cursor: pointer;
    display: flex;
    gap: var(--vcdk-spacing-5);
    padding-block: var(--vcdk-spacing-6);
    padding-inline: var(--vcdk-accordion-padding-inline);
    user-select: none;
    width: 100%;
  }

  .disabled-button {
    appearance: none;
    background: none;
    border: none;
    color: var(--vcdk-color-text-disabled);
    cursor: not-allowed;
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

  .disabled-button vcdk-system-icon::part(svg) {
    color: var(--vcdk-color-text-disabled);
  }

  .chevron {
    color: var(--vcdk-color-text);
    transition-property: transform;
    transition-duration: var(--vcdk-motion-duration-small);
    transition-timing-function: var(--vcdk-motion-easing-exit);
  }

  .disabled-button .chevron {
    color: var(--vcdk-color-text-disabled);
  }

  [open] .chevron {
    transform: rotate(-180deg);
    transition-timing-function: var(--vcdk-motion-easing-entrance);
  }

  .content {
    display: block;
    padding-inline: var(--vcdk-accordion-padding-inline);
    padding-block: var(--vcdk-spacing-4) var(--vcdk-spacing-8);
    color: var(--vcdk-color-text-subtle);
    text-align: start;
  }
`;var h=function(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const v=(e,t,i)=>r.qy`
  <slot name="summary-start">
    ${(0,d.z)(i,()=>r.qy`
        <vcdk-system-icon icon=${(0,a.J)(i)}></vcdk-system-icon>
      `)}
  </slot>
  <slot
    name="title"
    class=${(0,n.H)({title:!0,"typography-subtitle1":"large"===t,"typography-subtitle2":"small"===t})}>
    ${e}
  </slot>
  <slot name="summary-end"></slot>
  <vcdk-system-icon class="chevron" icon=${"chevron-down"}></vcdk-system-icon>
`;class u extends CustomEvent{constructor(e){super(u.eventName,{detail:e,bubbles:!0,composed:!0,cancelable:!0})}}u.eventName="vcdk-toggle";let b=class extends c.l{constructor(){super(...arguments),this.headerTitle="",this.open=!1,this.disabled=!1,this.tabIndex=0,this.size="large",this._toggleEvent=e=>{const t="open"===e.newState;t!==this.open&&(this.open=t,this.dispatchEvent(new u({open:t})))}}render(){const{headerTitle:e,headerIcon:t,size:i}=this;return this.disabled?r.qy`
        <div class="details">
          <button disabled class="disabled-button" aria-expanded="false">
            ${v(e,i,t)}
          </button>
        </div>
      `:r.qy`
      <details @toggle=${this._toggleEvent} ?open=${this.open} part="details">
        <summary
          id="accordionID"
          part="summary"
          tabindex=${this.tabIndex}
          aria-controls="accordionSectionID"
          aria-expanded=${this.open&&!this.disabled?"true":"false"}>
          ${v(e,i,t)}
        </summary>
        <slot
          part="content"
          class=${(0,n.H)({content:!0,"typography-caption1":"small"===i})}
          role="region"
          id="accordionSectionID"
          aria-labelledby="accordionID"></slot>
      </details>
    `}};b.styles=[o.IT.subtitle1,o.IT.subtitle2,o.IT.caption1,p],h([(0,s.MZ)({type:String})],b.prototype,"headerTitle",void 0),h([(0,s.MZ)({type:String})],b.prototype,"headerIcon",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"open",void 0),h([(0,s.MZ)({type:Boolean,reflect:!0})],b.prototype,"disabled",void 0),h([(0,s.MZ)({type:Number})],b.prototype,"tabIndex",void 0),h([(0,s.MZ)({type:String,reflect:!0})],b.prototype,"size",void 0),b=h([(0,l.E)("vcdk-accordion")],b)}}]);