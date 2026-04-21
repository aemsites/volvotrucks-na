"use strict";(self["webpackChunkvolvotrucks_na"]=self["webpackChunkvolvotrucks_na"]||[]).push([[325],{6487(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:()=>customElement});const customElement=tagName=>(target,context)=>{const initializer=()=>{const existingElement=customElements.get(tagName);if(!existingElement){customElements.define(tagName,target);return}const existingVersion=existingElement.version;const currentVersion=target.version;if(existingVersion&&currentVersion&&existingVersion!==currentVersion){console.warn(`vcdk warning: Attempted to register <${tagName}>v, but <${tagName}>v. was already registered. This could indicate that your application might contain duplicate instances of the same component.`)}};if(context){context.addInitializer(initializer)}else{initializer()}}},4135(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{F:()=>Responsive});var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1089);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6337);var lodash_es__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2326);var _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6260);const breakpointKeys=Object.keys(_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f);const Responsive=superClass=>{class ResponsiveClass extends superClass{static fallbackVariableValue(prefix,prop,fallbacks){if(!fallbacks.length){return""}const current=fallbacks.shift();if(fallbacks.length){return`var(--${prefix}-${prop}-${current}, ${this.fallbackVariableValue(prefix,prop,fallbacks)})`}return`var(--${prefix}-${prop}-${current})`}static responsiveVariables(prefix,props,breakpoint,fallbacks){return props.map(prop=>{const name=(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(prop);if(fallbacks){return`\n    --${prefix}-${name}-fallback: ${this.fallbackVariableValue(prefix,name,[...fallbacks])};\n    --${prefix}-${name}: var(--${prefix}-${name}-${breakpoint}, var(--${prefix}-${name}-fallback));`}return`\n    --${prefix}-${name}: var(--${prefix}-${name}-${breakpoint});`}).join("")}static responsiveStyles(settings){return(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
        :host {
          ${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(this.responsiveVariables(settings.prefix,settings.props,"xs"))}
        }
        @media(min-width: ${_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f.sm.from}px) {
          :host {
            ${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(this.responsiveVariables(settings.prefix,settings.props,"sm",["xs"]))}
          }
        }
        @media (min-width: ${_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f.md.from}px) {
          :host {
            ${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(this.responsiveVariables(settings.prefix,settings.props,"md",["sm","xs"]))}
          }
        }
        @media (min-width: ${_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f.lg.from}px) {
          :host {
            ${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(this.responsiveVariables(settings.prefix,settings.props,"lg",["md","sm","xs"]))}
          }
        }
        @media (min-width: ${_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f.xl.from}px) {
          :host {
            ${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(this.responsiveVariables(settings.prefix,settings.props,"xl",["lg","md","sm","xs"]))}
          }
        }
      }`}static finalizeStyles(styles){if(!this.responsiveProperties){return _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__.l.finalizeStyles(styles)}const alteredStyles=[this.responsiveStyles(this.responsiveProperties)];if(styles&&Array.isArray(styles)){alteredStyles.push(...styles)}else if(styles){alteredStyles.push(styles)}return _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__.l.finalizeStyles(alteredStyles)}connectedCallback(){super.connectedCallback();this.setResponsiveVariables()}update(changedProperties){const responsiveProperties=this.constructor.responsiveProperties;const props=responsiveProperties?.props;if(responsiveProperties&&props.some(prop=>changedProperties.has(prop))){this.setResponsiveVariables()}super.update(changedProperties)}setResponsiveVariables(){const responsiveProperties=this.constructor.responsiveProperties;if(typeof responsiveProperties==="undefined")return;const props=responsiveProperties.props;for(const prop of props){let value=this[prop];if(!value)continue;if(!Array.isArray(value)){value=[value]}for(let i=0;i<value.length;i++){const propName=String(prop);let breakpointValue=value[i];if(responsiveProperties.styleTransform){breakpointValue=responsiveProperties.styleTransform(propName,breakpointKeys[i],breakpointValue)}if(typeof breakpointValue==="undefined"){continue}if(typeof breakpointValue==="number"){breakpointValue=`${breakpointValue}px`}const breakpoint=breakpointKeys[i];this.style.setProperty(`--${responsiveProperties.prefix}-${(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(propName)}-${breakpoint}`,breakpointValue)}}}}return ResponsiveClass}},7909(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var system_icon=__webpack_require__(3018);var typography_styles=__webpack_require__(1669);var lit=__webpack_require__(6337);var decorators=__webpack_require__(352);var class_map=__webpack_require__(3720);var if_defined=__webpack_require__(31);var when=__webpack_require__(302);var custom_element=__webpack_require__(6487);var vcdk_element=__webpack_require__(6260);const accordionStyles=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const summaryTemplate=(headerTitle,size,headerIcon)=>(0,lit.qy)`
  <slot name="summary-start">
    ${(0,when.z)(headerIcon,()=>(0,lit.qy)`
        <vcdk-system-icon icon=${(0,if_defined.J)(headerIcon)}></vcdk-system-icon>
      `)}
  </slot>
  <slot
    name="title"
    class=${(0,class_map.H)({title:true,"typography-subtitle1":size==="large","typography-subtitle2":size==="small"})}>
    ${headerTitle}
  </slot>
  <slot name="summary-end"></slot>
  <vcdk-system-icon class="chevron" icon=${"chevron-down"}></vcdk-system-icon>
`;class AccordionToggleEvent extends CustomEvent{constructor(detail){super(AccordionToggleEvent.eventName,{detail,bubbles:true,composed:true,cancelable:true})}}AccordionToggleEvent.eventName="vcdk-toggle";let Accordion=class Accordion extends vcdk_element.l{constructor(){super(...arguments);this.headerTitle="";this.open=false;this.disabled=false;this.tabIndex=0;this.size="large";this._toggleEvent=e=>{const newOpenState=e.newState==="open";if(newOpenState!==this.open){this.open=newOpenState;this.dispatchEvent(new AccordionToggleEvent({open:newOpenState}))}}}render(){const{headerTitle,headerIcon,size}=this;if(this.disabled){return(0,lit.qy)`
        <div class="details">
          <button disabled class="disabled-button" aria-expanded="false">
            ${summaryTemplate(headerTitle,size,headerIcon)}
          </button>
        </div>
      `}return(0,lit.qy)`
      <details @toggle=${this._toggleEvent} ?open=${this.open} part="details">
        <summary
          id="accordionID"
          part="summary"
          tabindex=${this.tabIndex}
          aria-controls="accordionSectionID"
          aria-expanded=${this.open&&!this.disabled?"true":"false"}>
          ${summaryTemplate(headerTitle,size,headerIcon)}
        </summary>
        <slot
          part="content"
          class=${(0,class_map.H)({content:true,"typography-caption1":size==="small"})}
          role="region"
          id="accordionSectionID"
          aria-labelledby="accordionID"></slot>
      </details>
    `}};Accordion.styles=[typography_styles.IT.subtitle1,typography_styles.IT.subtitle2,typography_styles.IT.caption1,accordionStyles];__decorate([(0,decorators.MZ)({type:String})],Accordion.prototype,"headerTitle",void 0);__decorate([(0,decorators.MZ)({type:String})],Accordion.prototype,"headerIcon",void 0);__decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Accordion.prototype,"open",void 0);__decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Accordion.prototype,"disabled",void 0);__decorate([(0,decorators.MZ)({type:Number})],Accordion.prototype,"tabIndex",void 0);__decorate([(0,decorators.MZ)({type:String,reflect:true})],Accordion.prototype,"size",void 0);Accordion=__decorate([(0,custom_element.E)("vcdk-accordion")],Accordion)},4393(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var responsive_value=__webpack_require__(6591);var lit=__webpack_require__(6337);var decorators=__webpack_require__(352);var style_map=__webpack_require__(1145);var custom_element=__webpack_require__(6487);var responsive=__webpack_require__(4135);var vcdk_element=__webpack_require__(6260);const spinnerStyles=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Spinner=class Spinner extends((0,responsive.F)(vcdk_element.l)){render(){if(typeof this.progress==="undefined"){return(0,lit.JW)`
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
      </svg>`}return(0,lit.JW)`
      <svg
        part="svg"
        viewBox="20 20 40 40"
        role="progressbar"
        aria-busy="true"
        aria-live="polite"
        aria-label="${this.elementAriaLabel}"
        style=${(0,style_map.W)({"--vcdk-spinner-progress":typeof this.progress==="number"?this.progress+"%":undefined})}>
          <circle
            cx="40"
            cy="40"
            r="18"
            fill="none" />     
      </svg>
    `}};Spinner.styles=[spinnerStyles];Spinner.responsiveProperties={prefix:"vcdk-spinner",props:["size"],styleTransform:(name,_,value)=>{if(name==="size"&&typeof value==="string"){switch(value){case"small":return 18;case"large":return 80;default:return 38}}return value}};__decorate([(0,decorators.MZ)({type:Number})],Spinner.prototype,"progress",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Spinner.prototype,"size",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-label"})],Spinner.prototype,"elementAriaLabel",void 0);Spinner=__decorate([(0,custom_element.E)("vcdk-spinner")],Spinner);var system_icon=__webpack_require__(3018);var typography_styles=__webpack_require__(1669);var vcdk_form_button_component=__webpack_require__(4374);var class_map=__webpack_require__(3720);var if_defined=__webpack_require__(31);var ref=__webpack_require__(7832);var when=__webpack_require__(302);var html=__webpack_require__(3380);var static_html=__webpack_require__(6526);const buttonStyles=(0,lit.AH)`
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
`;var button_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Button=class Button extends vcdk_form_button_component.r{constructor(){super(...arguments);this.buttonEl=(0,ref._)();this.ariaLabel="";this.autofocus=false;this.size="medium";this.fullWidth=false;this.loading=false;this.variant="marketing";this.tabIndex=0;this.title=""}render(){const isLink=!!this.href;const tag=isLink?(0,static_html.eu)`a`:(0,static_html.eu)`button`;return(0,static_html.qy)`
      <${tag}
        ${(0,ref.K)(this.buttonEl)}
        class=${(0,class_map.H)({button:true,[`variant-${this.variant}`]:true,[`size-${this.size}`]:true,fullWidth:this.fullWidth?true:false,loading:this.loading?true:false})}
        part="button"
        tabindex=${this.tabIndex}
        title=${(0,if_defined.J)(this.title)}
        ?disabled=${(0,if_defined.J)(isLink?undefined:this.disabled)}
        ?autofocus=${(0,if_defined.J)(isLink?undefined:this.autofocus)}
        aria-label=${(0,if_defined.J)(this.ariaLabel)}
        aria-disabled=${this.disabled?"true":html.s6}
        href=${(0,if_defined.J)(isLink?this.href:undefined)}
        download=${(0,if_defined.J)(isLink?this.download:undefined)}
        hreflang=${(0,if_defined.J)(isLink?this.hreflang:undefined)}
        ping=${(0,if_defined.J)(isLink?this.ping:undefined)}
        referrerpolicy=${(0,if_defined.J)(isLink?this.referrerpolicy:undefined)}
        rel=${(0,if_defined.J)(isLink?this.rel:undefined)}
        target=${(0,if_defined.J)(isLink?this.target:undefined)}
        type=${(0,if_defined.J)(isLink?undefined:this.type)}
        formaction=${(0,if_defined.J)(isLink?undefined:this.formAction)}
        formenctype=${(0,if_defined.J)(isLink?undefined:this.formEnctype)}
        formmethod=${(0,if_defined.J)(isLink?undefined:this.formMethod)}
        ?formnovalidate=${(0,if_defined.J)(isLink?undefined:this.formNoValidate)}
        formtarget=${(0,if_defined.J)(isLink?undefined:this.formTarget)}
        name=${(0,if_defined.J)(isLink?undefined:this.name)}
        value=${(0,if_defined.J)(isLink?undefined:this.value)}
        @click=${(0,if_defined.J)(isLink?undefined:this.onButtonClick)}
      >
        ${(0,when.z)(this.iconStart,icon=>(0,static_html.qy)`
            <vcdk-system-icon .icon=${icon} class="icon"></vcdk-system-icon>
          `)}
        <div class="text typography-button">
          <slot></slot>
        </div>
        ${(0,when.z)(this.iconEnd,icon=>(0,static_html.qy)`
            <vcdk-system-icon .icon=${icon} class="icon"></vcdk-system-icon>
          `)}
        ${(0,when.z)(this.loading,()=>(0,static_html.qy)`
            <vcdk-spinner class="spinner"></vcdk-spinner>
          `)}
      </${tag}>
    `}};Button.styles=[typography_styles.IT.button,buttonStyles];button_component_decorate([(0,decorators.MZ)({type:String,attribute:"aria-label"})],Button.prototype,"ariaLabel",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"autofocus",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"size",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"fullWidth",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"iconEnd",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"iconStart",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"loading",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"variant",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"download",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"href",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"hreflang",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"ping",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"referrerpolicy",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"rel",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"target",void 0);button_component_decorate([(0,decorators.MZ)({type:Number})],Button.prototype,"tabIndex",void 0);button_component_decorate([(0,decorators.MZ)()],Button.prototype,"title",void 0);Button=button_component_decorate([(0,custom_element.E)("vcdk-button")],Button)},3330(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var context=__webpack_require__(767);var floating_ui_dom=__webpack_require__(7663);var lit=__webpack_require__(6337);const tooltipStyles=(0,lit.AH)`
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
`;var typography_styles=__webpack_require__(1669);var vcdk_element=__webpack_require__(6260);var decorators=__webpack_require__(352);var class_map=__webpack_require__(3720);var ref=__webpack_require__(7832);var uniqueId=__webpack_require__(5664);var custom_element=__webpack_require__(6487);var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Tooltip=class Tooltip extends vcdk_element.l{constructor(){super(...arguments);this.disableInteractive=false;this.leaveDelay=300;this.offset=0;this.placement="top";this.reference=null;this.referenceTrigger="hover";this.variant="default";this.isOpen=false;this.containerRef=(0,ref._)();this.arrowRef=(0,ref._)();this.uniqueTooltipId=(0,uniqueId.A)("tooltip-");this.keyDown=e=>{if(e.key==="Escape"){this.hide()}};this.enterTooltip=()=>{window.clearTimeout(this.leaveTimeout)};this.show=()=>{if(!this.containerRef.value){return}this.dispatchEvent(new CustomEvent("vcdk-show"));window.clearTimeout(this.leaveTimeout);this.isOpen=true;this.autoCleanup=(0,floating_ui_dom.ll)(this.getReferenceElement(),this.containerRef.value,this.updatePosition);if(!this.disableInteractive&&this.shouldHandleEvents){this.containerRef.value.addEventListener("mouseenter",this.enterTooltip,{passive:true});this.containerRef.value.addEventListener("mouseleave",this.hideDelayed)}};this.hideDelayed=()=>{this.leaveTimeout=window.setTimeout(()=>{this.hide()},this.leaveDelay)};this.hide=()=>{this.dispatchEvent(new CustomEvent("vcdk-hide"));this.isOpen=false;this.autoCleanup?.();if(!this.disableInteractive){this.containerRef.value?.removeEventListener("mouseenter",this.enterTooltip);this.containerRef.value?.removeEventListener("mouseleave",this.hideDelayed)}};this.getReferenceElement=()=>this.reference||this.parentElement||this;this.updatePosition=()=>{if(!this.containerRef.value||!this.arrowRef.value){return}(0,floating_ui_dom.rD)(this.getReferenceElement(),this.containerRef.value,{placement:this.placement,middleware:[(0,floating_ui_dom.cY)(this.offset),(0,floating_ui_dom.UU)(),(0,floating_ui_dom.BN)(),(0,floating_ui_dom.UE)({element:this.arrowRef.value}),(0,floating_ui_dom.jD)()],strategy:this.strategy??"fixed"}).then(({x,y,placement,strategy,middlewareData})=>{if(!this.containerRef.value){return}Object.assign(this.containerRef.value.style,{position:strategy,display:middlewareData.hide?.referenceHidden?"none":"",top:`${y}px`,left:`${x}px`});const arrowX=middlewareData.arrow?.x;const arrowY=middlewareData.arrow?.y;let arrowPosition;switch(placement){case"left":arrowPosition={left:"100%",top:`${arrowY}px`};break;case"right":arrowPosition={left:"0",top:`${arrowY}px`};break;case"top":arrowPosition={left:`${arrowX}px`,top:"100%"};break;case"top-start":arrowPosition={left:"20px",top:"100%"};break;case"bottom":arrowPosition={left:`${arrowX}px`,top:"0"};break;case"bottom-start":arrowPosition={left:"20px",top:"0"};break;default:arrowPosition={left:"",top:""};break}if(this.arrowRef.value){Object.assign(this.arrowRef.value?.style,arrowPosition)}}).catch(console.error)}}connectedCallback(){super.connectedCallback();if(this.shouldHandleEvents){this.eventsCleanup=this.bindEvents()}this.isOpen=!!this.open}disconnectedCallback(){this.eventsCleanup?.();this.autoCleanup?.();super.disconnectedCallback()}update(_changedProperties){super.update(_changedProperties);const props=["open","reference","referenceTrigger"];if(props.some(prop=>_changedProperties.has(prop))){this.eventsCleanup?.();if(this.shouldHandleEvents){this.eventsCleanup=this.bindEvents()}else if(this.open){this.show()}else{this.hide()}}}get shouldHandleEvents(){return this.referenceTrigger==="hover"&&typeof this.open==="undefined"}bindEvents(){document.addEventListener("keydown",this.keyDown,{passive:true});this.reference?.addEventListener("mouseenter",this.show,{passive:true});this.reference?.addEventListener("mouseleave",this.hideDelayed,{passive:true});this.reference?.addEventListener("focusin",this.show,{passive:true});this.reference?.addEventListener("focusout",this.hide,{passive:true});return()=>{document.removeEventListener("keydown",this.keyDown);this.reference?.removeEventListener("mouseenter",this.show);this.reference?.removeEventListener("mouseleave",this.hideDelayed);this.reference?.removeEventListener("focusin",this.show);this.reference?.removeEventListener("focusout",this.hide)}}render(){const{isOpen,disabled}=this;const tooltipId=this.id||this.uniqueTooltipId;return(0,lit.qy)`
      <div
        ${(0,ref.K)(this.containerRef)}
        id=${tooltipId}
        class=${(0,class_map.H)({disabled:!!disabled,container:true,open:isOpen,[`variant-${this.variant}`]:!!this.variant})}
        part="tooltip"
        role="tooltip">
        <slot
          class=${(0,class_map.H)({disabled:!!disabled,tooltip:true,"typography-caption2":true})}
          part="tooltip-slot"></slot>
        <div
          ${(0,ref.K)(this.arrowRef)}
          part="tooltip-arrow"
          class=${(0,class_map.H)({disabled:!!disabled,arrow:true})}></div>
      </div>
    `}};Tooltip.styles=[typography_styles.IT.caption2,tooltipStyles];__decorate([(0,decorators.MZ)({type:Boolean})],Tooltip.prototype,"disableInteractive",void 0);__decorate([(0,decorators.MZ)({type:Number})],Tooltip.prototype,"leaveDelay",void 0);__decorate([(0,decorators.MZ)({type:Number})],Tooltip.prototype,"offset",void 0);__decorate([(0,decorators.MZ)({type:String})],Tooltip.prototype,"placement",void 0);__decorate([(0,decorators.MZ)({type:Boolean})],Tooltip.prototype,"disabled",void 0);__decorate([(0,decorators.MZ)({type:Boolean})],Tooltip.prototype,"open",void 0);__decorate([(0,decorators.MZ)({type:Object})],Tooltip.prototype,"reference",void 0);__decorate([(0,decorators.MZ)({type:String})],Tooltip.prototype,"referenceTrigger",void 0);__decorate([(0,decorators.MZ)({type:String})],Tooltip.prototype,"variant",void 0);__decorate([(0,decorators.MZ)({type:String})],Tooltip.prototype,"strategy",void 0);__decorate([(0,decorators.wk)()],Tooltip.prototype,"isOpen",void 0);Tooltip=__decorate([(0,custom_element.E)("vcdk-tooltip")],Tooltip);var lit_localize=__webpack_require__(5006);const checkboxGroupContext=(0,context.q6)("vcdk-checkbox-group");const CustomErrorValidator=()=>({observedProperties:["customError"],checkValidity(element){const validity={message:"",isValid:true,invalidKeys:[]};if(typeof element.customError==="string"&&element.customError.length>0){validity.message=element.customError;validity.isValid=false;validity.invalidKeys=["customError"]}return validity}});var vcdk_element_vcdk_element=__webpack_require__(1322);class VcdkInvalidEvent extends Event{constructor(){super(VcdkInvalidEvent.eventName,{bubbles:true,composed:true,cancelable:false})}}VcdkInvalidEvent.eventName="vcdk-invalid";class TouchedEvent extends Event{constructor(){super(TouchedEvent.eventName,{bubbles:true,composed:true,cancelable:false})}}TouchedEvent.eventName="vcdk-touched";const formElementStyles=(0,lit.AH)`
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
`;var vcdk_form_element_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const cssStateProperties=["error","disabled","readOnly","hasInteracted","formNoValidate"];class VcdkFormElement extends vcdk_element_vcdk_element.l{static get validators(){return[CustomErrorValidator()]}static defaultValidationMessages(control){return{}}finalValidationMessages(){return Object.assign({},this.constructor.defaultValidationMessages(this),typeof this.validationMessages==="function"?this.validationMessages(this):this.validationMessages)}get currentInteractionTriggers(){if(this.interactionTriggers?.length){return this.interactionTriggers}return this.constructor.interactionTriggers}constructor(){super();this.validators=[];this.interactionsReceived=[];this.onFormSubmit=()=>{this.hasInteracted=true};this.hasInteracted=false;this.formNoValidate=false;this.customError="";this.name="";this.required=false;this.disabled=false;this.readOnly=false;this.error=false;this.defaultValue="";this.skipValidation=false;this.customStates={set:(customState,active)=>{if(!this.internals?.states){return}if(active){this.internals.states.add(customState)}else{this.internals.states.delete(customState)}},has:customState=>{if(!this.internals?.states)return false;return this.internals.states.has(customState)}};this.wiredEvents=[];this.onInteraction=event=>{if(!this.interactionsReceived.includes(event.type)){this.interactionsReceived.push(event.type)}if(!this.hasInteracted&&this.currentInteractionTriggers.every(trigger=>this.interactionsReceived.includes(trigger))){this.hasInteracted=true}};this.onInvalid=event=>{if(event.target!==this){return}event.preventDefault();this.hasInteracted=true;this.updateValidity()};this.submitOnEnter=e=>{if(e.key!=="Enter"){return}if(!this.form||this.disabled||this.readOnly){return}e.preventDefault();const submitter=this.form.querySelector('[type="submit"]:not([disabled])');if(submitter){submitter.click()}else{this.form.requestSubmit()}};try{this.internals=this.attachInternals()}catch{console.warn("ElementInternals API is not supported in this browser. A polyfill may be required.")}}disconnectedCallback(){super.disconnectedCallback();if(!lit.S$){this.noValidateObserver?.disconnect();this.wiredEvents.forEach(event=>{this.removeEventListener(event,this.onInteraction)});this.removeEventListener("invalid",this.onInvalid);this.form?.removeEventListener("submit",this.onFormSubmit)}}formAssociatedCallback(form){if(!lit.S$&&form){if(this.noValidateObserver){this.noValidateObserver.disconnect()}this.noValidateObserver=new MutationObserver(()=>{this.formNoValidate=form.hasAttribute("novalidate");this.updateValidity()});this.noValidateObserver.observe(form,{attributes:true,attributeFilter:["novalidate"]});this.formNoValidate=form.hasAttribute("novalidate");form.addEventListener("submit",this.onFormSubmit)}}get hint(){if(this.error&&this.helperText){return this.helperText}if(this.states.has("invalid-visible")){return this.validationMessage}return this.helperText}get allValidators(){const staticValidators=this.constructor.validators;return[...staticValidators,...this.validators]}get allObservedProperties(){const validators=this.allValidators;const props=new Set;props.add("validationMessages");validators.forEach(validator=>{validator.observedProperties.forEach(prop=>props.add(prop))});return Array.from(props)}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}get willValidate(){return this.internals.willValidate}get form(){return this.internals.form}get states(){return this.internals.states}get labels(){return this.internals.labels}get validationTarget(){return this.input||undefined}checkValidity(){this.updateValidity();return this.internals.checkValidity()}reportValidity(){this.updateValidity();this.hasInteracted=true;return this.internals.reportValidity()}updateValidity(){if(this.disabled||!this.willValidate||this.skipValidation){this.resetValidity();return}const validators=this.allValidators;if(!validators.length){return}const flags={};const formControl=this.validationTarget||this.input||undefined;let finalMessage="";for(const validator of validators){const{isValid,message,invalidKeys}=validator.checkValidity(this);if(isValid){continue}if(!finalMessage){finalMessage=message}if(invalidKeys?.length){invalidKeys.forEach(str=>flags[str]=true)}}if(!finalMessage){finalMessage=this.validationMessage}this.setValidity(flags,finalMessage,formControl)}firstUpdated(changedProperties){if(this.wiredEvents.length===0){this.wireInteractionEvents()}this.addEventListener("invalid",this.onInvalid);super.firstUpdated(changedProperties)}update(changedProperties){super.update(changedProperties);if(changedProperties.has("interactionTriggers")){this.wireInteractionEvents()}if(changedProperties.has("validity")&&!this.validity.valid&&this.hasInteracted){this.dispatchEvent(new VcdkInvalidEvent)}if(changedProperties.has("hasInteracted")&&this.hasInteracted){this.dispatchEvent(new TouchedEvent)}if(changedProperties.has("value")&&this.name){this.setFormValue(this.value)}}setFormValue(value){this.internals.setFormValue(value)}setValidity(state,validationMessage,anchor){if(!anchor){anchor=this.validationTarget}this.internals.setValidity(state,validationMessage,anchor);this.requestUpdate("validity");this.setCustomStates()}setCustomStates(){const isValid=this.internals.validity.valid;const userInvalid=!isValid&&this.hasInteracted||this.error;const invalidVisible=userInvalid&&!this.formNoValidate||this.error;this.customStates.set("required",this.required);this.customStates.set("disabled",this.disabled);this.customStates.set("readonly",this.readOnly);this.customStates.set("optional",!this.required);this.customStates.set("invalid",!isValid);this.customStates.set("valid",isValid);this.customStates.set("user-invalid",userInvalid);this.customStates.set("user-valid",isValid&&this.hasInteracted);this.customStates.set("invalid-visible",invalidVisible)}setCustomValidity(message){if(!message){this.customError="";this.setValidity({});return}this.customError=message;this.setValidity({customError:true},message,this.validationTarget)}formResetCallback(){this.onResetValue();this.resetValidity();this.hasInteracted=false;this.interactionsReceived=[];this.updateValidity()}onResetValue(){this.value=this.defaultValue}formDisabledCallback(isDisabled){this.disabled=isDisabled;this.updateValidity()}formStateRestoreCallback(state,reason){this.value=state;if(reason==="restore"){this.resetValidity()}this.updateValidity()}resetValidity(){this.setCustomValidity("");this.setValidity({});this.setCustomStates()}willUpdate(changedProperties){if(!this.hasUpdated&&changedProperties.has("defaultValue")&&!this.value){this.value=this.defaultValue}if(this.allObservedProperties.some(prop=>changedProperties.has(prop))){this.updateValidity()}else if(cssStateProperties.some(prop=>changedProperties.has(prop))){this.setCustomStates()}super.willUpdate(changedProperties)}wireInteractionEvents(){if(lit.S$){return}this.wiredEvents.forEach(event=>{this.removeEventListener(event,this.onInteraction)});this.currentInteractionTriggers.forEach(event=>{this.wiredEvents.push(event);this.addEventListener(event,this.onInteraction)})}}VcdkFormElement.shadowRootOptions={...vcdk_element_vcdk_element.l.shadowRootOptions,delegatesFocus:true};VcdkFormElement.styles=[formElementStyles];VcdkFormElement.formAssociated=true;VcdkFormElement.interactionTriggers=["input","focusout"];vcdk_form_element_component_decorate([(0,decorators.MZ)({attribute:false})],VcdkFormElement.prototype,"validationMessages",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Array,attribute:"interaction-triggers",converter(value){return value?.split(" ").map(str=>str.trim()).filter(str=>!!str)}})],VcdkFormElement.prototype,"interactionTriggers",void 0);vcdk_form_element_component_decorate([(0,decorators.wk)()],VcdkFormElement.prototype,"hasInteracted",void 0);vcdk_form_element_component_decorate([(0,decorators.wk)()],VcdkFormElement.prototype,"formNoValidate",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:String,attribute:"custom-error"})],VcdkFormElement.prototype,"customError",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:String})],VcdkFormElement.prototype,"helperText",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({reflect:true})],VcdkFormElement.prototype,"name",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],VcdkFormElement.prototype,"required",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Boolean})],VcdkFormElement.prototype,"disabled",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true,attribute:"readonly"})],VcdkFormElement.prototype,"readOnly",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],VcdkFormElement.prototype,"error",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({attribute:false})],VcdkFormElement.prototype,"defaultValue",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"skip-validation"})],VcdkFormElement.prototype,"skipValidation",void 0);vcdk_form_element_component_decorate([(0,decorators.MZ)({attribute:false,state:true,type:Object})],VcdkFormElement.prototype,"validity",null);var if_defined=__webpack_require__(31);var live=__webpack_require__(538);var when=__webpack_require__(302);class HasSlotController{constructor(host,...slotNames){this.slotNames=[];this.handleSlotChange=event=>{const slot=event.target;if(this.slotNames.includes("[default]")&&!slot.name||slot.name&&this.slotNames.includes(slot.name)){this.host.requestUpdate()}};(this.host=host).addController(this);this.slotNames=slotNames}hasDefaultSlot(){return[...this.host.childNodes].some(node=>{if(node.nodeType===node.TEXT_NODE&&node.textContent.trim()!==""){return true}if(node.nodeType===node.ELEMENT_NODE){const el=node;if(!el.hasAttribute("slot")){return true}}return false})}hasNamedSlot(name){return this.host.querySelector(`:scope > [slot="${name}"]`)!==null}test(slotName){return slotName==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(slotName)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}}const RequiredValidator=(options={})=>{let{validationElement,validationProperty}=options;if(!validationElement){validationElement=Object.assign(document.createElement("input"),{required:true})}if(!validationProperty){validationProperty="value"}const obj={observedProperties:[validationProperty,"required"],checkValidity(element){const validity={message:"",isValid:true,invalidKeys:[]};if(!element.required){return validity}const value=element[validationProperty];const isEmpty=!value;if(isEmpty){const validationMessages=element.finalValidationMessages();let message=validationMessages?.valueMissing;if(!message){message=validationElement.validationMessage||"Please fill out this field."}validity.message=message;validity.isValid=false;validity.invalidKeys.push("valueMissing")}return validity}};return obj};const checkboxStyles=(0,lit.AH)`
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
`;class CheckboxChangeEvent extends CustomEvent{constructor(checked,value,nativeEvent){super(CheckboxChangeEvent.type,{detail:{checked,value,nativeEvent},bubbles:true,composed:true,cancelable:true})}}CheckboxChangeEvent.type="vcdk-checkbox-change";var checkbox_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const checkedIcon=()=>(0,lit.qy)`
  <svg viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 13.42L3 8.42L4.41 7.01L8 10.59L15.59 3L17 4.42L8 13.42Z" />
  </svg>
`;const intermediateIcon=()=>(0,lit.qy)`
  <svg viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H13V5H3V3Z" />
  </svg>
`;let Checkbox=class Checkbox extends VcdkFormElement{constructor(){super(...arguments);this.tooltipRef=(0,ref._)();this.hasSlotContent=new HasSlotController(this,"[default]");this.title="";this.label="";this.checked=false;this.defaultChecked=false;this.value="on";this.intermediate=false;this.indeterminate=false;this.floatingHelperText=false;this.size="medium";this.tabIndex=0;this.defaultValue="";this.onChange=event=>{if(this.readOnly){event.preventDefault();return}const prevIndeterminate=this.indeterminate;this.checked=!this.checked;this.indeterminate=false;this.hasInteracted=true;if(!this.dispatchEvent(new CheckboxChangeEvent(this.checked,this.value))){this.checked=!this.checked;this.indeterminate=prevIndeterminate}}}static get validators(){return[...VcdkFormElement.validators,RequiredValidator({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:true})})]}static defaultValidationMessages(){return{valueMissing:(0,lit_localize.ab)("",{id:"vcdk-checkbox.valueMissing",desc:"Validation message for required checkbox. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(value){this.readOnly=value}willUpdate(changedProperties){if(changedProperties.has("intermediate")&&this.intermediate){this.indeterminate=this.intermediate}if(changedProperties.has("groupContext")){const{disabled,error,size}=this.groupContext||{};this.disabled=typeof disabled==="boolean"?disabled:this.disabled;this.error=typeof error==="boolean"?error:this.error;this.size=typeof size==="string"?size:this.size}if(changedProperties.has("checked")){if(typeof this.checked==="undefined"){this.indeterminate=true}this.setFormValue(this.checked?this.value:null);this.customStates.set("checked",this.checked)}if(changedProperties.has("defaultChecked")){if(!this.hasInteracted&&this.defaultChecked){this.checked=this.defaultChecked;this.customStates.set("checked",this.checked)}}if(changedProperties.has("indeterminate")){this.customStates.set("indeterminate",this.indeterminate)}super.willUpdate(changedProperties)}updated(changedProperties){super.updated(changedProperties);if(this.floatingHelperText&&this.hint&&this.tooltipRef.value){this.tooltipRef.value.reference=this.input}}setFormValue(value){super.setFormValue(this.checked?value:null)}onResetValue(){this.checked=this.defaultChecked}render(){const size=this.groupContext?.size||this.size;let ariaChecked=this.checked?"true":"false";if(this.indeterminate){ariaChecked="mixed"}return(0,lit.qy)`
      <label class=${(0,class_map.H)({[`size-${size}`]:!!size})}>
        <input
          title=${this.title}
          type="checkbox"
          role="checkbox"
          ?required=${(0,if_defined.J)(this.required)}
          @change=${this.onChange}
          .checked=${(0,live.V)(this.checked)}
          .indeterminate=${(0,live.V)(this.indeterminate)}
          .disabled=${this.groupContext?.disabled||this.disabled}
          .value=${this.value}
          aria-describedby=${(0,if_defined.J)(this.hint?"hint":undefined)}
          aria-checked=${ariaChecked}
          aria-invalid=${this.states.has("user-invalid")?"true":"false"}
          aria-label=${(0,if_defined.J)(this.ariaLabel)}
          name=${this.name}
          ?readonly=${(0,if_defined.J)(this.readOnly)}
          tabindex=${this.tabIndex} />

        ${(0,when.z)(!this.indeterminate&&this.checked,checkedIcon)}
        ${(0,when.z)(this.indeterminate,intermediateIcon)}
        ${(0,when.z)(this.hasSlotContent.test("[default]")||this.label,()=>(0,lit.qy)`
            <span class="text-container">
              ${(0,when.z)(this.label,()=>(0,lit.qy)`
                  <span
                    part="label"
                    class=${(0,class_map.H)({text:true,"typography-body":this.size==="medium","typography-caption1":this.size==="small"})}>
                    ${this.label}${(0,when.z)(this.required,()=>(0,lit.qy)`<span aria-hidden="true">*</span>`)}
                  </span>
                `)}

              <slot
                part="label"
                class=${(0,class_map.H)({text:true,"typography-body":this.size==="medium","typography-caption1":this.size==="small"})}></slot>

              ${(0,when.z)(this.hint&&!this.floatingHelperText,()=>(0,lit.qy)`
                  <span id="hint" class="hint typography-caption2">
                    ${this.hint}
                  </span>
                `)}
            </span>
          `)}
      </label>
      ${(0,when.z)(this.hint&&this.floatingHelperText,()=>(0,lit.qy)`
          <vcdk-tooltip
            ${(0,ref.K)(this.tooltipRef)}
            id="hint"
            strategy="absolute"
            placement="bottom"
            ?disabled=${this.disabled}
            .offset=${8}
            open>
            ${this.hint}
          </vcdk-tooltip>
        `)}
    `}};Checkbox.interactionTriggers=["input"];Checkbox.styles=[...VcdkFormElement.styles,checkboxStyles,typography_styles.IT.caption1,typography_styles.IT.caption2,typography_styles.IT.body];checkbox_component_decorate([(0,decorators.MZ)({attribute:false})],Checkbox.prototype,"validationMessages",void 0);checkbox_component_decorate([(0,decorators.MZ)()],Checkbox.prototype,"title",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"label",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Checkbox.prototype,"checked",void 0);checkbox_component_decorate([(0,decorators.MZ)({attribute:false})],Checkbox.prototype,"defaultChecked",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"value",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:Boolean})],Checkbox.prototype,"intermediate",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:Boolean})],Checkbox.prototype,"indeterminate",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"floating-helper-text"})],Checkbox.prototype,"floatingHelperText",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"size",void 0);checkbox_component_decorate([(0,decorators.MZ)({type:Number})],Checkbox.prototype,"tabIndex",void 0);checkbox_component_decorate([(0,decorators.P)("input[type='checkbox']")],Checkbox.prototype,"input",void 0);checkbox_component_decorate([(0,context.Fg)({context:checkboxGroupContext,subscribe:true}),(0,decorators.wk)()],Checkbox.prototype,"groupContext",void 0);Checkbox=checkbox_component_decorate([(0,custom_element.E)("vcdk-checkbox"),(0,lit_localize.cc)()],Checkbox);var system_icon=__webpack_require__(3018);const ifDefinedOrStringEmpty=value=>{if(typeof value==="number"){return value}return value?value:lit.s6};class ChipClickEvent extends CustomEvent{constructor(selected){super("vcdk-chip-click",{detail:{source:"chip",selected},bubbles:true,composed:true})}}class ChipRemoveEvent extends CustomEvent{constructor(){super("vcdk-chip-remove",{detail:{source:"close-button"},bubbles:true,composed:true})}}class ChipEnterEvent extends CustomEvent{constructor(reference,value){super("vcdk-chip-enter",{detail:{reference,value},bubbles:true,composed:true})}}class ChipLeaveEvent extends CustomEvent{constructor(reference,value){super("vcdk-chip-leave",{detail:{reference,value},bubbles:true,composed:true})}}const chipStyles=(0,lit.AH)`
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
`;var chip_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Chip=class Chip extends vcdk_element.l{constructor(){super(...arguments);this.selected=false;this.removable=false;this.removeAriaLabel="";this.tabIndex=0;this.handleChipClick=()=>{this.dispatchEvent(new ChipClickEvent(this.selected??false))};this.handleRemoveClick=()=>{this.dispatchEvent(new ChipRemoveEvent)};this.handleKeyDown=event=>{if(event.key==="Enter"||event.code==="Space"){this.handleRemoveClick()}};this.onEnter=()=>{this.dispatchEvent(new ChipEnterEvent(this,this.value))};this.onLeave=()=>{this.dispatchEvent(new ChipLeaveEvent(this,this.value))}}connectedCallback(){super.connectedCallback();this.addEventListener("mouseenter",this.onEnter,{passive:true});this.addEventListener("mouseleave",this.onLeave,{passive:true});this.addEventListener("focusin",this.onEnter,{passive:true});this.addEventListener("focusout",this.onLeave,{passive:true})}disconnectedCallback(){this.removeEventListener("mouseenter",this.onEnter);this.removeEventListener("mouseleave",this.onLeave);this.removeEventListener("focusin",this.onEnter);this.removeEventListener("focusout",this.onLeave);super.disconnectedCallback()}render(){const{selected,iconStart,iconEnd,removable,removeAriaLabel,disabled,form,formaction,formenctype,formmethod,formnovalidate,formtarget,name,type,value,size}=this;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({"chip-wrapper":true,"typography-caption1":size==="small","typography-caption2":size!=="small","size-small":size==="small",selected:!!selected,disabled:!!disabled})}>
        <button
          class=${(0,class_map.H)({"chip-button":true})}
          tabindex=${this.tabIndex}
          @click=${this.handleChipClick}
          form=${ifDefinedOrStringEmpty(form)}
          ?disabled=${disabled}
          ?selected=${selected}
          formaction=${ifDefinedOrStringEmpty(formaction)}
          formenctype=${ifDefinedOrStringEmpty(formenctype)}
          formmethod=${ifDefinedOrStringEmpty(formmethod)}
          ?formnovalidate=${formnovalidate}
          formtarget=${ifDefinedOrStringEmpty(formtarget)}
          name=${ifDefinedOrStringEmpty(name)}
          type=${type??"button"}
          value=${ifDefinedOrStringEmpty(value)}>
          ${iconStart&&(0,lit.qy)`
            <vcdk-system-icon .icon=${iconStart}></vcdk-system-icon>
          `}
          <slot
            class=${(0,class_map.H)({text:1})}></slot>
          ${iconEnd&&(0,lit.qy)`
            <vcdk-system-icon .icon=${iconEnd}></vcdk-system-icon>
          `}
        </button>
        ${(0,when.z)(removable,()=>(0,lit.qy)`
            <vcdk-icon-button
              class=${(0,class_map.H)({"chip-button-close":true,selected:!!selected,disabled:!!disabled})}
              ?disabled=${disabled}
              @click=${this.handleRemoveClick}
              @keydown=${this.handleKeyDown}
              aria-label=${ifDefinedOrStringEmpty(removeAriaLabel)}
              size="extra-small"
              icon="close"></vcdk-icon-button>
          `)}
      </div>
    `}};Chip.shadowRootOptions={...vcdk_element.l.shadowRootOptions,delegatesFocus:true};Chip.styles=[chipStyles,typography_styles.IT.caption1,typography_styles.IT.caption2];chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"selected",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"iconEnd",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"iconStart",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"size",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"removable",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"removeAriaLabel",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"disabled",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"form",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formaction",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formenctype",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formmethod",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"formnovalidate",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formtarget",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"name",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"type",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"value",void 0);chip_component_decorate([(0,decorators.MZ)({type:Number})],Chip.prototype,"tabIndex",void 0);Chip=chip_component_decorate([(0,custom_element.E)("vcdk-chip")],Chip);var breakpoints=__webpack_require__(1089);const chipsStyles=(0,lit.AH)`
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

  @media (min-width: ${breakpoints.f.md.from}px) {
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
`;var chips_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Chips=class Chips extends vcdk_element.l{constructor(){super(...arguments);this.size="default"}render(){return(0,lit.qy)`
      <slot
        class=${(0,class_map.H)({[`size-${this.size}`]:true})}></slot>
    `}};Chips.styles=[chipsStyles];chips_component_decorate([(0,decorators.MZ)({type:String})],Chips.prototype,"size",void 0);Chips=chips_component_decorate([(0,custom_element.E)("vcdk-chips")],Chips);var vcdk_form_button_component=__webpack_require__(4374);var static_html=__webpack_require__(6526);const iconButtonStyles=(0,lit.AH)`
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
`;var icon_button_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let IconButton=class IconButton extends vcdk_form_button_component.r{constructor(){super(...arguments);this.buttonEl=(0,ref._)();this.icon="home";this.size="medium";this.variant="tertiary";this.tabIndex=0;this.buttonAriaExpanded=false;this.buttonAriaHaspopup=false;this.autofocus=false;this.title=""}render(){const isLink=!!this.href;const tag=isLink?(0,static_html.eu)`a`:(0,static_html.eu)`button`;return(0,static_html.qy)`
      <${tag}
        ${(0,ref.K)(this.buttonEl)}
        part="button"
        class=${(0,class_map.H)({[`variant-${this.variant}`]:true,[`size-${this.size}`]:true})}
        ?autofocus=${this.autofocus}
        tabindex=${this.tabIndex}
        title=${ifDefinedOrStringEmpty(this.title)}
        href=${(0,if_defined.J)(isLink?this.href:undefined)}
        hreflang=${ifDefinedOrStringEmpty(isLink?this.hreflang:undefined)}
        ping=${ifDefinedOrStringEmpty(isLink?this.ping:undefined)}
        referrerpolicy=${ifDefinedOrStringEmpty(isLink?this.referrerPolicy:undefined)}
        rel=${ifDefinedOrStringEmpty(isLink?this.rel:undefined)}
        target=${ifDefinedOrStringEmpty(isLink?this.target:undefined)}
        download=${ifDefinedOrStringEmpty(isLink?this.download:undefined)}
        aria-label=${ifDefinedOrStringEmpty(this.buttonAriaLabel)}
        name=${ifDefinedOrStringEmpty(isLink?undefined:this.name)}
        value=${ifDefinedOrStringEmpty(isLink?undefined:this.value)}
        aria-disabled=${this.disabled?"true":lit.s6}
        aria-controls=${ifDefinedOrStringEmpty(isLink?undefined:this.buttonAriaControls)}
        aria-expanded=${ifDefinedOrStringEmpty(isLink?undefined:this.buttonAriaExpanded?"true":undefined)}
        aria-haspopup=${ifDefinedOrStringEmpty(isLink?undefined:this.buttonAriaHaspopup?"true":undefined)}
        formaction=${(0,if_defined.J)(isLink?undefined:this.formAction)}
        formenctype=${(0,if_defined.J)(isLink?undefined:this.formEnctype)}
        formmethod=${(0,if_defined.J)(isLink?undefined:this.formMethod)}
        ?formnovalidate=${(0,if_defined.J)(isLink?undefined:this.formNoValidate)}
        formtarget=${(0,if_defined.J)(isLink?undefined:this.formTarget)}
        role=${ifDefinedOrStringEmpty(this.buttonRole)}
        @click=${(0,if_defined.J)(isLink?undefined:this.onButtonClick)}
      >
        <vcdk-system-icon
          exportparts="svg"
          .icon=${this.icon}
          ?filled=${this.filled}
          element-role="presentation"></vcdk-system-icon>
      </${tag}>
    `}};IconButton.styles=[iconButtonStyles];icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"icon",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"size",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"variant",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"filled",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"download",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"href",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"hreflang",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"ping",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"referrerPolicy",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"rel",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"target",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Number})],IconButton.prototype,"tabIndex",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-role"})],IconButton.prototype,"buttonRole",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-aria-label"})],IconButton.prototype,"buttonAriaLabel",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-aria-controls"})],IconButton.prototype,"buttonAriaControls",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"button-aria-expanded"})],IconButton.prototype,"buttonAriaExpanded",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"button-aria-haspopup"})],IconButton.prototype,"buttonAriaHaspopup",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"autofocus",void 0);icon_button_component_decorate([(0,decorators.MZ)()],IconButton.prototype,"title",void 0);IconButton=icon_button_component_decorate([(0,custom_element.E)("vcdk-icon-button")],IconButton);const MaxLengthValidator=(options={})=>{let{validationProperty}=options;if(!validationProperty){validationProperty="value"}const obj={observedProperties:[validationProperty,"maxLength"],checkValidity(element){const validity={message:"",isValid:true,invalidKeys:[]};if(element.maxLength===undefined||element.maxLength===null||element.maxLength<0){return validity}const value=element[validationProperty];if(!value||typeof value!=="string"){return validity}const isValid=value.length<=element.maxLength;if(!isValid){const validationMessages=element.finalValidationMessages();validity.message=validationMessages?.tooLong??"Too long";validity.isValid=false;validity.invalidKeys.push("tooLong")}return validity}};return obj};const MinLengthValidator=(options={})=>{let{validationProperty}=options;if(!validationProperty){validationProperty="value"}const obj={observedProperties:[validationProperty,"minLength"],checkValidity(element){const validity={message:"",isValid:true,invalidKeys:[]};if(element.minLength===undefined||element.minLength<0){return validity}const value=element[validationProperty];if(!value||typeof value!=="string"){return validity}const isValid=value.length>=element.minLength;if(!isValid){const validationMessages=element.finalValidationMessages();validity.message=validationMessages?.tooShort??"Too short";validity.isValid=false;validity.invalidKeys.push("tooShort")}return validity}};return obj};const NativeValidator=(options={})=>{let{validationProperty,mirroredProperties,validationElement}=options;if(!validationElement){validationElement=document.createElement("input")}if(!validationProperty){validationProperty="value"}if(!mirroredProperties){mirroredProperties=["type","pattern","required","min","max"]}return{observedProperties:[validationProperty,...mirroredProperties],checkValidity(element){const validity={message:"",isValid:true,invalidKeys:[]};for(const key of mirroredProperties){const attributeValue=element[key];if(!attributeValue){validationElement.removeAttribute(key);continue}if(typeof attributeValue==="boolean"){validationElement.setAttribute(key,"")}else if(typeof attributeValue==="string"){validationElement.setAttribute(key,attributeValue)}else if(typeof attributeValue==="number"){validationElement.setAttribute(key,attributeValue.toString())}}const value=element[validationProperty];if(typeof value!=="string"){throw new Error("value is not a string")}validationElement.value=value;const isValid=validationElement.checkValidity();const nativeValidity=validationElement.validity;if(!isValid){const messages=element.finalValidationMessages();let message;for(const key in nativeValidity){if(key!=="valid"&&nativeValidity[key]){message=messages?.[key];validity.invalidKeys.push(key)}}if(!message){message=validationElement.validationMessage}validity.isValid=false;validity.message=message}return validity}}};const characterCounter=(currentLength,maxLength)=>(0,lit.qy)`
  <div
    class="character-counter typography-caption2"
    part="character-counter"
    aria-hidden="true">
    ${`${currentLength} / ${maxLength}`}
  </div>
`;const textFieldStyles=(0,lit.AH)`
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
`;var text_field_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const exportparts="fieldset, label, input-wrapper, input, before-input, after-input, icon";let TextField=class TextField extends VcdkFormElement{static get validators(){return[...VcdkFormElement.validators,NativeValidator(),MinLengthValidator(),MaxLengthValidator()]}static defaultValidationMessages(textField){return{badInput:(0,lit_localize.ab)("",{id:"vcdk-text-field.badInput",desc:"Validation message for bad input in text field. If left empty, the default browser message will be used"}),rangeOverflow:(0,lit_localize.ab)("",{id:"vcdk-text-field.rangeOverflow",desc:"Validation message for range overflow in text field. If left empty, the default browser message will be used"}),rangeUnderflow:(0,lit_localize.ab)("",{id:"vcdk-text-field.rangeUnderflow",desc:"Validation message for range underflow in text field. If left empty, the default browser message will be used"}),typeMismatch:(0,lit_localize.ab)("",{id:"vcdk-text-field.typeMismatch",desc:"Validation message for type mismatch in text field. If left empty, the default browser message will be used"}),valueMissing:(0,lit_localize.ab)("",{id:"vcdk-text-field.valueMissing",desc:"Validation message for required text field. If left empty, the default browser message will be used"}),patternMismatch:(0,lit_localize.ab)("",{id:"vcdk-text-field.patternMismatch",desc:"Validation message for pattern mismatch in text field. If left empty, the default browser message will be used"}),tooLong:(0,lit_localize.ab)((0,lit_localize.gx)`Please shorten this text to ${textField.maxLength} characters or less (you are currently using ${textField.value.length} characters).`,{id:"vcdk-text-field.tooLong",desc:"Validation message for too long value in text field. Note: Due to browser limitations, we cannot fetch browser default message here."}),tooShort:(0,lit_localize.ab)((0,lit_localize.gx)`Please lengthen this text to ${textField.minLength} characters or more (you are currently using ${textField.value.length} characters).`,{id:"vcdk-text-field.tooShort",desc:"Validation message for too short value in text field. Note: Due to browser limitations, we cannot fetch browser default message here."}),stepMismatch:(0,lit_localize.ab)("",{id:"vcdk-text-field.stepMismatch",desc:"Validation message for step mismatch in text field. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(value){this.readOnly=value}get minlength(){return this.minLength}set minlength(value){this.minLength=value}get maxlength(){return this.maxLength}set maxlength(value){this.maxLength=value}constructor(){super();this.size="medium";this.floatingLabel=false;this.floatingHelperText=false;this.autocapitalize="none";this.autocomplete="";this.dirname="";this.list=null;this.max="";this.maxLength=-1;this.min="";this.minLength=-1;this.multiple=false;this.pattern="";this.placeholder="";this.spellcheck=false;this.step="";this.tabIndex=0;this.type="text";this.value="";this.wrap="soft";this.characterCounter=false;this.inputMode="";this.hasFocus=false;this.uid=(0,uniqueId.A)("vcdk-text-field-");this.getEventDictionary=e=>({detail:{value:e.target.value,nativeEvent:e},bubbles:true,composed:true});this.eventDispatcher=(e,type)=>{this.value=e.target.value;this.updateValidity();this.dispatchEvent(new CustomEvent(`vcdk-${type}`,this.getEventDictionary(e)))};this.onKeydown=e=>{if(!this.rows){this.submitOnEnter(e)}this.dispatchEvent(new CustomEvent("vcdk-keydown",this.getEventDictionary(e)))};this.deprecatedKeyupHandler=e=>{this.dispatchEvent(new CustomEvent("vcdk-keyup",this.getEventDictionary(e)))};this.blurHandler=e=>{this.hasFocus=false;this.eventDispatcher(e,"blur")};this.focusHandler=e=>{this.hasFocus=true;this.eventDispatcher(e,"focus")};this.clickButtonHandler=()=>{this.dispatchEvent(new CustomEvent("vcdk-click-button",{bubbles:true,composed:true}))};this.stopEnter=e=>{if(e.key==="Enter"){e.stopPropagation()}};this.inputAriaDescribedBy=this.inputAriaDescribedBy||(0,uniqueId.A)("caption-")}get formControlElement(){return this.input??null}get counterAbove(){return!this.floatingLabel&&this.characterCounter&&this.maxLength}get counterBelow(){return this.floatingLabel&&this.characterCounter&&this.maxLength}willUpdate(changedProperties){if(changedProperties.has("value")){this.customStates.set("blank",!this.value)}super.willUpdate(changedProperties)}select(){void(async()=>{await this.updateComplete;this.input?.select()})()}setSelectionRange(start,end,direction){this.input?.setSelectionRange(start,end,direction)}stepUp(stepIncrement=1){if(this.input instanceof HTMLInputElement&&this.input.type==="number"){this.input.stepUp(stepIncrement);if(this.value!==this.input.value){this.value=this.input.value}}}stepDown(stepDecrement=1){if(this.input instanceof HTMLInputElement&&this.input.type==="number"){this.input.stepDown(stepDecrement);if(this.value!==this.input.value){this.value=this.input.value}}}render(){const isInput=!this.rows;const tag=isInput?(0,static_html.eu)`input`:(0,static_html.eu)`textarea`;return(0,static_html.qy)`
      <div
        class=${(0,class_map.H)({"text-field":1,"floating-label":!!this.floatingLabel,"has-value":!!this.value,[`size-${this.size}`]:!!this.size})}>
        <fieldset part="fieldset">
          <div class="container">
            ${(0,when.z)(this.label,()=>(0,static_html.qy)`
                <label
                  for=${this.uid}
                  class=${(0,class_map.H)({"typography-subtitle1":!!this.floatingLabel&&!this.hasFocus&&!this.value,"typography-subtitle2":!this.floatingLabel||this.floatingLabel&&(this.hasFocus||!!this.value)})}
                  part="label">
                  ${this.label}${(0,when.z)(this.required,()=>(0,static_html.qy)`<span aria-hidden="true">*</span>`)}
                </label>
              `)}
            ${(0,when.z)(this.counterAbove,()=>characterCounter(this.value?.length,this.maxLength))}
          </div>

          <div class="input-wrapper" part="input-wrapper">
            ${(0,when.z)(!this.floatingLabel||this.hasFocus||this.value,()=>(0,static_html.qy)`
                <slot
                  part="before-input"
                  name="before-input"
                  @keydown=${this.stopEnter}></slot>
              `)}
            <${tag}
              part="input"
              .value=${(0,live.V)(this.value)}
              ?disabled=${this.disabled}
              ?multiple=${(0,if_defined.J)(isInput?this.multiple:undefined)}
              ?readonly=${this.readOnly}
              ?required=${this.required}
              @blur=${this.blurHandler}
              @focus=${this.focusHandler}
              @change=${e=>this.eventDispatcher(e,"change")}
              @input=${e=>this.eventDispatcher(e,"input")}
              @keydown=${this.onKeydown}
              @keyup=${this.deprecatedKeyupHandler}
              aria-invalid=${this.states.has("invalid-visible")}
              aria-describedby=${ifDefinedOrStringEmpty(this.inputAriaDescribedBy)}
              aria-label=${ifDefinedOrStringEmpty(this.inputAriaLabel)}
              autocapitalize=${this.autocapitalize}
              autocomplete=${ifDefinedOrStringEmpty(this.autocomplete)}
              class=${(0,class_map.H)({"typography-caption1":this.size==="small","typography-body":this.size!=="small"})}
              data-testid="input"
              dirname=${ifDefinedOrStringEmpty(this.dirname)}
              id=${this.uid}
              inputmode=${ifDefinedOrStringEmpty(this.inputMode)}
              list=${(0,if_defined.J)(isInput?this.list:undefined)}
              max=${ifDefinedOrStringEmpty(isInput?this.max:undefined)}
              min=${ifDefinedOrStringEmpty(isInput?this.min:undefined)}
              maxlength=${(0,if_defined.J)(~this.maxLength?this.maxLength:undefined)}
              minlength=${(0,if_defined.J)(~this.minLength?this.minLength:undefined)}
              name=${ifDefinedOrStringEmpty(this.name)}
              pattern=${ifDefinedOrStringEmpty(isInput?this.pattern:undefined)}
              placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
              rows=${(0,if_defined.J)(isInput?undefined:this.rows)}
              step=${(0,if_defined.J)(isInput?this.step:undefined)}
              spellcheck=${(0,if_defined.J)(isInput?undefined:this.spellcheck)}
              tabindex=${this.tabIndex}
              type=${ifDefinedOrStringEmpty(isInput?this.type:undefined)}
              wrap=${ifDefinedOrStringEmpty(isInput?undefined:this.wrap)}
            >
            </${tag}>
            <slot part="after-input" name="after-input" @keydown=${this.stopEnter}>
              ${(0,when.z)(this.icon&&!this.rows,()=>(0,static_html.qy)`
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
          ${(0,when.z)(this.hint,()=>(0,static_html.qy)`
              ${(0,when.z)(this.floatingHelperText,()=>(0,static_html.qy)`
                  <vcdk-tooltip
                    id=${(0,if_defined.J)(this.inputAriaDescribedBy)}
                    strategy="absolute"
                    placement="bottom-start"
                    ?disabled=${this.disabled}
                    .offset=${8}
                    .reference=${this.input}
                    variant=${this.states.has("user-invalid")?"error":"default"}
                    open>
                    ${this.hint}
                  </vcdk-tooltip>
                `,()=>(0,static_html.qy)`
                  <p
                    id=${(0,if_defined.J)(this.inputAriaDescribedBy)}
                    class="hint typography-caption2">
                    ${this.hint}
                  </p>
                `)}
            `)}
          ${(0,when.z)(this.counterBelow,()=>characterCounter(this.value?.length,this.maxLength))}
        </div>
      </div>
    `}};TextField.styles=[...VcdkFormElement.styles,textFieldStyles,typography_styles.IT.body,typography_styles.IT.caption1,typography_styles.IT.caption2,typography_styles.IT.subtitle1,typography_styles.IT.subtitle2];text_field_component_decorate([(0,decorators.MZ)({attribute:false})],TextField.prototype,"validationMessages",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"size",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],TextField.prototype,"floatingLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"floating-helper-text"})],TextField.prototype,"floatingHelperText",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"icon",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"icon-aria-label"})],TextField.prototype,"iconAriaLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"label",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"rows",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"input-aria-describedby"})],TextField.prototype,"inputAriaDescribedBy",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"input-aria-label"})],TextField.prototype,"inputAriaLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"autocapitalize",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"autocomplete",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"dirname",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Object})],TextField.prototype,"list",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"max",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number,attribute:"maxlength"})],TextField.prototype,"maxLength",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"min",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number,attribute:"minlength"})],TextField.prototype,"minLength",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"multiple",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"pattern",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"placeholder",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"spellcheck",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"step",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"tabIndex",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"type",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"value",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"wrap",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"character-counter"})],TextField.prototype,"characterCounter",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"inputmode"})],TextField.prototype,"inputMode",void 0);text_field_component_decorate([(0,decorators.P)("input,textarea")],TextField.prototype,"input",void 0);text_field_component_decorate([(0,decorators.wk)()],TextField.prototype,"hasFocus",void 0);TextField=text_field_component_decorate([(0,custom_element.E)("vcdk-text-field")],TextField);var debounce=__webpack_require__(2223);function isHidden($elem){return $elem.hasAttribute("hidden")||$elem.hasAttribute("aria-hidden")&&$elem.getAttribute("aria-hidden")!=="false"||$elem.style.display===`none`||$elem.style.opacity===`0`||$elem.style.visibility===`hidden`||$elem.style.visibility===`collapse`}function isDisabled($elem){return $elem.hasAttribute("disabled")||$elem.hasAttribute("aria-disabled")&&$elem.getAttribute("aria-disabled")!=="false"}function isFocusable($elem){if($elem.getAttribute("tabindex")==="-1"||$elem.shadowRoot?.delegatesFocus||isHidden($elem)||isDisabled($elem)){return false}return $elem.hasAttribute("tabindex")||($elem instanceof HTMLAnchorElement||$elem instanceof HTMLAreaElement)&&$elem.hasAttribute("href")||$elem instanceof HTMLButtonElement||$elem instanceof HTMLInputElement||$elem instanceof HTMLTextAreaElement||$elem instanceof HTMLSelectElement||$elem.tagName==="SUMMARY"||$elem instanceof HTMLIFrameElement}function queryShadowRoot(root,skipNode,isMatch,maxDepth=20,depth=0){const matches=[];if(depth>=maxDepth){return matches}const traverseSlot=$slot=>{const assignedNodes=$slot.assignedNodes().filter(node=>node.nodeType===1);if(assignedNodes.length>0){const $slotParent=assignedNodes[0].parentElement;return queryShadowRoot($slotParent,skipNode,isMatch,maxDepth,depth+1)}return[]};const children=Array.from(root.children||[]);for(const $child of children){if(skipNode($child)){continue}if(isMatch($child)){matches.push($child)}if($child.shadowRoot!=null){matches.push(...queryShadowRoot($child.shadowRoot,skipNode,isMatch,maxDepth,depth+1))}else if($child.tagName==="SLOT"){matches.push(...traverseSlot($child))}else{matches.push(...queryShadowRoot($child,skipNode,isMatch,maxDepth,depth+1))}}return matches}var focus_trap_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let FocusTrap=class FocusTrap extends vcdk_element_vcdk_element.l{getFocusableElements(){return queryShadowRoot(this,isHidden,isFocusable)}constructor(){super();this.focusedIndex=0;this.inactive=false;this.focused=false;this.enableDirectionalKeys=false;this.$backup=(0,ref._)();this.$start=(0,ref._)();this.$end=(0,ref._)();this.onKeyDown=event=>{const focusableElements=this.getFocusableElements();switch(event.key){case"ArrowUp":{event.preventDefault();const element=focusableElements[this.focusedIndex-1];if(element){element.focus()}else{this.focusLastElement()}break}case"ArrowDown":{event.preventDefault();const element=focusableElements[this.focusedIndex+1];if(element){element.focus()}else{this.focusFirstElement()}break}case"Home":event.preventDefault();this.focusFirstElement();break;case"End":event.preventDefault();this.focusLastElement();break}};this.focusFirstElement=()=>{this.trapFocus()};this.focusLastElement=()=>{this.trapFocus(true)};this.updateFocused=(0,debounce.A)(value=>{this.dispatchFocusedEvents(value);this.focused=value},0);this.onFocusIn=this.onFocusIn.bind(this);this.onFocusOut=this.onFocusOut.bind(this)}connectedCallback(){super.connectedCallback();this.addEventListener("focusin",this.onFocusIn);this.addEventListener("focusout",this.onFocusOut)}disconnectedCallback(){this.removeEventListener("focusin",this.onFocusIn);this.removeEventListener("focusout",this.onFocusOut);super.disconnectedCallback()}update(changedProperties){if(changedProperties.has("focused")&&this.enableDirectionalKeys){if(this.focused){document.addEventListener("keydown",this.onKeyDown)}else{document.removeEventListener("keydown",this.onKeyDown)}}else if(changedProperties.has("enableDirectionalKeys")&&!this.enableDirectionalKeys){document.removeEventListener("keydown",this.onKeyDown)}super.update(changedProperties)}trapFocus(trapToEnd){if(this.inactive)return;const focusableElements=this.getFocusableElements();if(focusableElements.length>0){if(trapToEnd){focusableElements[focusableElements.length-1].focus()}else{focusableElements[0].focus()}this.$backup.value?.setAttribute("tabindex","-1")}else{this.$backup.value?.setAttribute("tabindex","0");this.$backup.value?.focus()}}onFocusIn(event){const focusableElements=this.getFocusableElements();let target=event.target;if(target.shadowRoot){target=target.shadowRoot.activeElement}this.focusedIndex=focusableElements.indexOf(target);this.updateFocused(true)}onFocusOut(){this.updateFocused(false)}dispatchFocusedEvents(value){if(!this.focused&&value){this.dispatchEvent(new Event("vcdk-focusin",{bubbles:true,composed:true}))}if(this.focused&&!value){this.dispatchEvent(new Event("vcdk-focusout",{bubbles:true,composed:true}))}}render(){return(0,lit.qy)`
      <div
        ${(0,ref.K)(this.$start)}
        @focus=${this.focusLastElement}
        tabindex=${!this.focused||this.inactive?`-1`:`0`}></div>
      <div ${(0,ref.K)(this.$backup)}></div>
      <slot></slot>
      <div
        ${(0,ref.K)(this.$end)}
        @focus=${this.focusFirstElement}
        tabindex=${!this.focused||this.inactive?`-1`:`0`}></div>
    `}};focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],FocusTrap.prototype,"inactive",void 0);focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],FocusTrap.prototype,"focused",void 0);focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"enable-directional-keys"})],FocusTrap.prototype,"enableDirectionalKeys",void 0);FocusTrap=focus_trap_component_decorate([(0,custom_element.E)("vcdk-focus-trap")],FocusTrap);function watch(propertyName,options){const resolvedOptions={waitUntilFirstUpdate:false,...options};return(proto,decoratedFnName)=>{const{update}=proto;const watchedProperties=Array.isArray(propertyName)?propertyName:[propertyName];proto.update=function(changedProps){watchedProperties.forEach(property=>{const key=property;if(changedProps.has(key)){const oldValue=changedProps.get(key);const newValue=this[key];if(oldValue!==newValue){if(!resolvedOptions.waitUntilFirstUpdate||this.hasUpdated){this[decoratedFnName](oldValue,newValue)}}}});update.call(this,changedProps)}}}const dropdownStyles=(0,lit.AH)`
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
    ${(0,typography_styles.zQ)("subtitle2","small")};
    background-color: var(--vcdk-color-bg);
    @media (min-width: ${breakpoints.f.md.from}px) {
      ${(0,typography_styles.zQ)("subtitle2","large")}
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
`;const optionStyles=(0,lit.AH)`
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
`;const iconStyles=(0,lit.AH)`
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
`;const optionButtonStyle=(0,lit.AH)`
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
`;const dividerStyles=(0,lit.AH)`
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
`;const popoverStyles=(0,lit.AH)`
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
`;var popover_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let PopoverComponent=class PopoverComponent extends vcdk_element.l{constructor(){super(...arguments);this.open=false;this.setPositionStyle=async()=>{if(!this.open||!this.target){return}const{y,x,strategy}=await(0,floating_ui_dom.rD)(this.target,this.container,{placement:this.placement??"bottom-start",middleware:this.createMiddleware(),strategy:"fixed"});Object.assign(this.container.style,{position:strategy,top:`${y}px`,left:`${x}px`})};this.anchorSlotChange=async()=>{if(this.anchors.length<1)return;this.target=this.anchors[0];await this.updateState()}}async openChange(){await(this.open?this.updatePosition():this.hide())}connectedCallback(){super.connectedCallback();void this.updateComplete.then(()=>{if(this.open){this.updatePosition()}})}disconnectedCallback(){void this.hide().then(()=>{super.disconnectedCallback()})}updatePosition(){if(!this.target)return;this.container.style.height="auto";this.dispose=(0,floating_ui_dom.ll)(this.target,this.container,this.setPositionStyle)}async hide(){return new Promise(resolve=>{if(this.dispose){this.dispose();this.dispose=undefined;this.container.style.height="";this.container.style.maxHeight="";resolve()}else{resolve()}})}createMiddleware(){const middleware=[];const styles=this.container.style;middleware.push((0,floating_ui_dom.BN)({altBoundary:this.altBoundary,limiter:(0,floating_ui_dom.ER)()}));if(!this.placement){middleware.push((0,floating_ui_dom.RK)({allowedPlacements:["top","bottom","top-start","bottom-start"]}))}const sizeMiddleware=(0,floating_ui_dom.Ej)({apply:({rects,availableHeight})=>{styles.height="auto";Object.assign(styles,{width:`${rects.reference.width}px`,maxHeight:`${availableHeight-10}px`,height:`${rects.floating.height}px`})},boundary:this.altBoundary?"clippingAncestors":undefined,rootBoundary:"viewport",padding:10});middleware.push(sizeMiddleware);return middleware}async updateState(){if(this.open){await this.hide();this.updatePosition()}}render(){return(0,lit.qy)`
      <slot name="anchor" @slotchange=${this.anchorSlotChange}></slot>
      <vcdk-focus-trap enable-directional-keys>
        <div
          id="container"
          class=${(0,class_map.H)({popover:1,open:this.open})}>
          <slot></slot>
        </div>
      </vcdk-focus-trap>
    `}};PopoverComponent.styles=[popoverStyles];popover_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],PopoverComponent.prototype,"open",void 0);popover_component_decorate([(0,decorators.MZ)({type:String})],PopoverComponent.prototype,"placement",void 0);popover_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"alt-boundary"})],PopoverComponent.prototype,"altBoundary",void 0);popover_component_decorate([(0,decorators.P)("#container",true)],PopoverComponent.prototype,"container",void 0);popover_component_decorate([(0,decorators.KN)({slot:"anchor",flatten:true})],PopoverComponent.prototype,"anchors",void 0);popover_component_decorate([watch("open",{waitUntilFirstUpdate:true})],PopoverComponent.prototype,"openChange",null);PopoverComponent=popover_component_decorate([(0,custom_element.E)("vcdk-dropdown-popover")],PopoverComponent);const popover_component=null&&PopoverComponent;class CloseEvent extends CustomEvent{constructor(bubbles=true){super(CloseEvent.eventName,{bubbles,composed:true,cancelable:true})}}CloseEvent.eventName="vcdk-close";const VCDK_HANDLED=Symbol("vcdk-handled");function markHandled(event){event[VCDK_HANDLED]=true}function isHandled(event){return event[VCDK_HANDLED]===true}var flatten=__webpack_require__(7935);function querySlot(slotName,selector){return(target,propertyKey)=>{const slotSelector="slot"+(slotName?`[name=${slotName}]`:":not([name])");Object.defineProperty(target,propertyKey,{get(){const slot=this.renderRoot?.querySelector(slotSelector);const elements=slot?.assignedElements({flatten:true})??[];const firstLevelDeepElements=elements.filter(node=>node.matches(selector));const nestedFilteredElements=(0,flatten.A)(elements.filter(t=>t instanceof HTMLElement).map(element=>Array.from(element.querySelectorAll(selector))));return[...firstLevelDeepElements,...nestedFilteredElements]}})}}var style_map=__webpack_require__(1145);const commonKeys={arrowLeft:"ArrowLeft",arrowRight:"ArrowRight",arrowUp:"ArrowUp",arrowDown:"ArrowDown",enterKey:"Enter",spaceBar:" ",escapeKey:"Escape",homeKey:"Home",endKey:"End",pageUpKey:"PageUp",pageDownKey:"PageDown",tabKey:"Tab",altKey:"Alt",ctrlKey:"Ctrl",metaKey:"Meta",shiftKey:"Shift"};const __modifiers=new Set([commonKeys.altKey,commonKeys.ctrlKey,commonKeys.metaKey,commonKeys.shiftKey].map(key=>key.toLowerCase()));const defaultOptions={skip:["input","textarea","select"]};function normalizeKeys(keys){return(Array.isArray(keys)?keys:[keys]).map(key=>key.toLowerCase())}function isModifier(key){return __modifiers.has(key)}function isKeydown(event){return event.type==="keydown"}function isKeyup(event){return event.type==="keyup"}function isKeydownTrigger(triggers){return triggers?triggers.includes("keydown")||isKeydownRepeatTrigger(triggers):false}function isKeyupTrigger(triggers){return triggers?triggers.includes("keyup"):false}function isKeydownRepeatTrigger(triggers){return triggers?triggers.includes("keydownRepeat"):false}function parseKeys(keys){const parsed=normalizeKeys(keys);return{keys:parsed.filter(key=>!isModifier(key)),modifiers:parsed.filter(key=>isModifier(key))}}function getEvent(event){return"key"in event?event:event.detail.nativeEvent}class KeyBindingController{get _element(){if(this._observedElement){return this._observedElement}return this._host}observeElement(element){element.addEventListener("keydown",this);element.addEventListener("keyup",this);this._observedElement=element;return{unsubscribe:()=>{this._observedElement?.removeEventListener("keydown",this);this._observedElement?.removeEventListener("keyup",this);this._observedElement=undefined}}}constructor(host,options){this.bindings=new Set;this.pressedKeys=new Set;this._host=host;this._options={...defaultOptions,...options};host.addController(this)}eventModifiersMatch(binding,event){if(binding.options?.preventDefault){event.preventDefault()}if(binding.options?.stopPropagation){event.stopPropagation()}}keysMatch(binding,event){const modifiers=binding.modifiers??[];return binding.keys.every(key=>this.pressedKeys.has(key))&&modifiers.every(mod=>!!event[`${mod}Key`])}bindingMatches(binding,event){const triggers=binding.options?.triggers??["keydown"];if(!this.keysMatch(binding,event)){return false}if(isKeydown(event)&&isKeydownTrigger(triggers)){return true}if(isKeyup(event)&&isKeyupTrigger(triggers)){return true}return false}handleEvent(customEvent){const event=getEvent(customEvent);const key=event.key.toLowerCase();const path=event.composedPath();if(!this._element||!path.includes(this._element)){return}if(isModifier(key)){this.pressedKeys.clear()}if(isKeydown(event)&&!isModifier(key)){this.pressedKeys.add(key)}for(const binding of this.bindings){if(this.bindingMatches(binding,event)){this.eventModifiersMatch(binding,event);binding.handler.call(this._host,event);if(isKeydownRepeatTrigger(binding.options?.triggers)){this.pressedKeys.delete(key)}}}if(isKeyup(event)&&!isModifier(key)){this.pressedKeys.delete(key)}}set(key,fn,options){this.bindings.add({...parseKeys(key),handler:fn,options:{...this._options?.bindingDefaults,...options}});return this}hostConnected(){this._host.addEventListener("keyup",this);this._host.addEventListener("keydown",this)}hostDisconnected(){this._host.removeEventListener("keyup",this);this._host.removeEventListener("keydown",this)}}function addKeybindings(element,options){return new KeyBindingController(element,options)}var map=__webpack_require__(1926);class ChipsController{constructor(host){this.containerRef=(0,ref._)();this.visibleChipCount=-1;this.handleCollapseChipClick=async event=>{event.preventDefault();event.stopPropagation();if(!this.host.isInteractive()){return}const collapsedItems=this.getCollapsedItems();const remainingSelected=this.host.selectedItems.filter((_,index)=>index<this.visibleChipCount);this.host.setDropdownSelectedValues([...remainingSelected,...collapsedItems.filter(item=>item.disabled)]);await this.host.updateComplete;this.host.publishChangeEvent()};this.handleSingleChipClick=async event=>{event.preventDefault();event.stopPropagation();if(!this.host.isInteractive()){return}this.host.unselectAllOptions();if(!this.host.getDisableOnCloseValue()){this.host.closePopover();this.host.focus()}await this.host.updateComplete;this.host.publishChangeEvent()};this.host=host;host.addController(this)}hostConnected(){this.resizeObserver=new ResizeObserver(()=>{if(this.host.chips==="no-wrap"){this.calculateVisibleChips()}})}hostDisconnected(){this.resizeObserver?.disconnect();this.observedElement=undefined;this.visibleChipCount=-1}hostUpdated(){if(this.host.chips==="no-wrap"){const container=this.containerRef.value;if(container&&container!==this.observedElement){this.resizeObserver?.disconnect();this.resizeObserver?.observe(container);this.observedElement=container}requestAnimationFrame(()=>this.calculateVisibleChips())}else{if(this.observedElement){this.resizeObserver?.disconnect();this.observedElement=undefined}if(this.visibleChipCount!==-1){this.visibleChipCount=-1;this.host.requestUpdate()}}}calculateVisibleChips(){const chipsContainer=this.containerRef.value;if(!chipsContainer)return;const chips=Array.from(chipsContainer.querySelectorAll("vcdk-chip[data-collapse-chip]"));if(chips.length===0){if(this.visibleChipCount!==-1){this.visibleChipCount=-1;this.host.requestUpdate()}return}const containerWidth=chipsContainer.clientWidth;const computedStyle=getComputedStyle(chipsContainer);const gap=parseFloat(computedStyle.gap)||4;const countChipEl=chipsContainer.querySelector("vcdk-chip[data-testid='collapse-chip']");const countChipWidth=countChipEl?countChipEl.offsetWidth:56;let totalWidth=0;let visibleCount=0;for(let i=0;i<chips.length;i++){const chip=chips[i];const chipWidth=chip.offsetWidth;const gapWidth=visibleCount>0?gap:0;const remainingChips=chips.length-visibleCount-1;const reservedWidth=remainingChips>0?countChipWidth+gap:0;if(totalWidth+chipWidth+gapWidth+reservedWidth<=containerWidth){totalWidth+=chipWidth+gapWidth;visibleCount++}else{break}}const newCount=visibleCount===chips.length?-1:Math.max(0,visibleCount);if(this.visibleChipCount!==newCount){this.visibleChipCount=newCount;this.host.requestUpdate()}}getCollapsedItems(){if(this.visibleChipCount<0)return[];return this.host.selectedItems.slice(this.visibleChipCount)}get chipSize(){return this.host.size==="small"?"extra-small":"small"}render(){const mode=this.host.chips;const hasSelection=this.host.selectedItems.length>0;return(0,lit.qy)`
      <vcdk-chips
        slot="before-input"
        size=${this.chipSize}
        ${(0,ref.K)(this.containerRef)}>
        ${(0,when.z)(mode==="single"&&hasSelection,()=>this.renderSingleChip(),()=>(0,when.z)(mode==="no-wrap"&&hasSelection,()=>this.renderNoWrapChips(),()=>this.renderWrapChips()))}
      </vcdk-chips>
    `}renderWrapChips(){return(0,lit.qy)`
      ${(0,map.T)(this.host.selectedItems,item=>(0,lit.qy)`
          <vcdk-chip
            size="small"
            data-testid="selected-chips"
            .value=${item.value}
            @click=${event=>{this.host.handleChipClick(event,item)}}
            iconEnd=${(0,if_defined.J)(item.disabled?undefined:"close")}>
            ${item.getTextContent()}
          </vcdk-chip>
        `)}
    `}renderNoWrapChips(){const collapsedCount=this.visibleChipCount<0?0:this.host.selectedItems.length-this.visibleChipCount;return(0,lit.qy)`
      ${(0,map.T)(this.host.selectedItems,(item,index)=>{const isCollapsed=this.visibleChipCount>=0&&index>=this.visibleChipCount;return(0,lit.qy)`
          <vcdk-chip
            size="small"
            data-testid="selected-chips"
            data-collapse-chip
            ?data-collapsed=${isCollapsed}
            .value=${item.value}
            style=${(0,style_map.W)({order:isCollapsed?"2":"0",visibility:isCollapsed?"hidden":"visible",position:isCollapsed?"absolute":"static",pointerEvents:isCollapsed?"none":"auto"})}
            @click=${event=>{this.host.handleChipClick(event,item)}}
            iconEnd=${(0,if_defined.J)(item.disabled?undefined:"close")}>
            ${item.getTextContent()}
          </vcdk-chip>
        `})}
      ${(0,when.z)(collapsedCount>0,()=>(0,lit.qy)`
          <vcdk-chip
            size="small"
            data-testid="collapse-chip"
            aria-label="${collapsedCount} more items selected"
            style=${(0,style_map.W)({order:"1",flexShrink:"0"})}
            @click=${this.handleCollapseChipClick}
            iconEnd=${(0,if_defined.J)(this.host.isInteractive()?"close":undefined)}>
            +${collapsedCount}
          </vcdk-chip>
        `)}
    `}renderSingleChip(){return(0,lit.qy)`
      <vcdk-chip
        size="small"
        data-testid="selected-chips"
        @click=${this.handleSingleChipClick}
        iconEnd="close">
        <slot name="single-chip-label">${this.host.selectedItems.length}</slot>
      </vcdk-chip>
    `}}const dropdownContext=(0,context.q6)("vcdk-dropdown");class MultiDropdownChangeEvent extends CustomEvent{constructor(options,prefix=""){super(`${prefix}change`,{detail:options?.map(option=>({value:option.value,label:option.textContent?.trim()??""}))??[],bubbles:true,composed:true})}}const getDropdownOptionTextContent=option=>{if(option?.text)return option.text;return option?.getTextContent()};class DropdownChangeEvent extends CustomEvent{constructor(option,prefix=""){const text=getDropdownOptionTextContent(option);super(`${prefix}change`,{detail:{value:option?.value??text??"",label:text??""},bubbles:true,composed:true})}}class DropdownInputEvent extends CustomEvent{constructor(value){super("vcdk-dropdown-input",{detail:{value},bubbles:true,composed:true})}}class DropdownOptionFocusEvent extends CustomEvent{constructor(option){super("vcdk-dropdown-option-focused",{bubbles:true,composed:true,detail:option})}}var typography_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Typography=class Typography extends vcdk_element.l{constructor(){super(...arguments);this.variant="body"}render(){return(0,lit.qy)`
      <slot
        class=${(0,class_map.H)({[`typography-${this.variant}`]:1})}
        part="slot"></slot>
    `}};Typography.styles=[...typography_styles.FB,typography_styles.gI];typography_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Typography.prototype,"variant",void 0);Typography=typography_component_decorate([(0,custom_element.E)("vcdk-typography")],Typography);var option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownOption=class DropdownOption extends vcdk_element.l{constructor(){super(...arguments);this.active=false;this.disabled=false;this.selected=false;this.hidden=false;this.checkbox=false;this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.handleFocus=()=>{this.dispatchEvent(new DropdownOptionFocusEvent(this))}}get _contentSlotText(){return this._content.map(node=>this.text||node.textContent?.trim()).join("")}get value(){return this._value??this._contentSlotText}set value(value){const old=this._value;this._value=value;this.requestUpdate("value",old)}getTextContent(){return this._contentSlotText}connectedCallback(){super.connectedCallback();this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback();this.removeEventListener("focus",this.handleFocus)}focus(){if(this.disabled||this.hidden){return}super.focus();this.renderRoot.querySelector("[role='option']")?.focus()}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;const isSmallSize=size==="small";return(0,lit.qy)`
      <div
        role="option"
        part="option"
        class=${(0,class_map.H)({option:1,disabled:this.disabled,selected:this.selected,checkbox:this.checkbox,active:this.active,"typography-body":!isSmallSize,"typography-caption1":isSmallSize,hidden:this.hidden,[size]:true})}
        tabindex=${this.disabled||this.hidden?-1:0}
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        ${(0,when.z)(this.checkbox,()=>(0,lit.qy)`
            <vcdk-checkbox
              label=""
              size=${isSmallSize?"small":"medium"}
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
        ${(0,when.z)(this.selected&&!this.checkbox,()=>(0,lit.qy)`
            <vcdk-system-icon icon="check" part="selected"></vcdk-system-icon>
          `)}
      </div>
    `}};DropdownOption.styles=[typography_styles.IT.caption1,typography_styles.IT.body,optionStyles,optionButtonStyle];option_component_decorate([(0,decorators.gZ)({flatten:true,slot:""})],DropdownOption.prototype,"_content",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"active",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"disabled",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"selected",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"hidden",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean})],DropdownOption.prototype,"checkbox",void 0);option_component_decorate([(0,decorators.MZ)({type:String})],DropdownOption.prototype,"text",void 0);option_component_decorate([(0,decorators.MZ)()],DropdownOption.prototype,"value",null);DropdownOption=option_component_decorate([(0,custom_element.E)("vcdk-dropdown-option")],DropdownOption);var dropdown_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const DROPDOWN_DEFAULT_SIZE="medium";function isOptionSelectable(item){return!item.hidden&&!item.disabled}let Dropdown=class Dropdown extends VcdkFormElement{static get validators(){return[...VcdkFormElement.validators,RequiredValidator({validationProperty:"value",validationElement:Object.assign(document.createElement("select"),{required:true})})]}static defaultValidationMessages(){return{valueMissing:(0,lit_localize.ab)("",{id:"vcdk-dropdown.valueMissing",desc:"Validation message for required dropdown. If left empty, the default browser message will be used"})}}get readonly(){return this.readOnly}set readonly(value){this.readOnly=value}setFormValue(value){super.setFormValue(Array.isArray(this.value)?this.value.join(", "):value)}willUpdate(changedProperties){super.willUpdate(changedProperties);this.textFieldError=this.error||!this.validity.valid&&this.hasInteracted}async getUpdateComplete(){const result=await super.getUpdateComplete();await(this.textField?.updateComplete);return result}connectedCallback(){super.connectedCallback();this.initializeValue();this.handleMultipleChange()}handleMultipleChange(){this.items.forEach(item=>item.checkbox=Boolean(this.multi))}focus(options){void(async()=>{await this.updateComplete;const textField=this.inputRef?.value;textField?.focus(options);const input=textField?.input;if(input instanceof HTMLInputElement){const len=input.value.length;input.setSelectionRange(len,len)}})()}constructor(){super();this.size=DROPDOWN_DEFAULT_SIZE;this.clearable=false;this.multi=false;this.open=false;this.chips="wrap";this.singleChip=false;this.filterInput=false;this.tabIndex=0;this.selectedItems=[];this.activeItem=null;this.lastKeyTime=0;this.searchTerm=null;this.dropdownContext={size:this.size};this.wrapperRef=(0,ref._)();this.inputRef=(0,ref._)();this.listboxRef=(0,ref._)();this.textFieldError=false;this.chipsController=new ChipsController(this);this.setSize=()=>{this.dropdownContext={size:this.size}};this.initializeValue=()=>{if(!this.items.length&&!this.selectedItems.length){return}this.handleMultipleChange();if(this.value!==null&&this.value!==undefined){const selectedOptionsBasedOnValue=this.findOptionsByValue(this.value);const selectedOptionsBasedOnLabel=this.findOptionLabels();this.setDropdownSelectedValues(selectedOptionsBasedOnValue.length?selectedOptionsBasedOnValue:selectedOptionsBasedOnLabel)}else{this.initializeFromSelectedOptions()}const isAnyVisible=this.items.some(item=>!item.hidden);this.emptyOptions.forEach(emptyOption=>{emptyOption.hidden=isAnyVisible})};this.handleSingleChipDeprecation=prev=>{if(this.singleChip){console.warn("[vcdk-dropdown] The 'singleChip' property is deprecated. Use chips=\"single\" instead.");this.chips="single"}else if(prev===true&&this.chips==="single"){this.chips="wrap"}};this.initializeFromSelectedOptions=()=>{this.setDropdownSelectedValues(this.items.filter(option=>option.selected))};this.selectValue=optionsToSelect=>{if(optionsToSelect.length<=0){this.value=null;return}if(this.multi){this.value=optionsToSelect.map(({value})=>value).filter(value=>value!==undefined&&value!==null)}else{this.value=optionsToSelect.length>0?optionsToSelect[0].value:null}};this.onClickOutside=e=>{const path=e.composedPath();if(this.wrapperRef?.value&&!path.includes(this.wrapperRef.value)){markHandled(e);document.addEventListener("click",clickEvent=>markHandled(clickEvent),{once:true,capture:true});this.closePopover()}};this.toggleOpen=event=>{const isFromListbox=this.listboxRef?.value&&event.composedPath().includes(this.listboxRef?.value);if(!this.isInteractive()||isFromListbox){return}if(!this.open){this.openDropdown();this.focus()}else{const nativeInput=this.filterInput&&this.textField?.input;const isFromNativeInput=nativeInput&&event.composedPath().includes(nativeInput);if(!isFromNativeInput){this.closePopover()}}};this.handleOptionSelected=event=>{const isOption=event.target instanceof DropdownOption;const isAddOption=event.target instanceof DropdownAddOption;if(isAddOption){this.filterOptionsBasedOnSearch(null)}if(isOption&&!event.target.disabled){void this.selectOption(event.target)}if(!this.getDisableOnCloseValue()){this.closePopover();this.focus()}};this.handleOptionFocused=event=>{const option=event.detail;if(option&&!option.disabled&&!option.hidden){this.activateItem(option)}};this.clearActiveOptions=()=>{this.items.forEach(item=>{item.active=false});this.activeItem=null};this.publishChangeEvent=()=>{if(this.multi){this.dispatchEvent(new MultiDropdownChangeEvent(this.selectedItems,"vcdk-dropdown-"))}else{this.dispatchEvent(new DropdownChangeEvent(this.selectedItems[0],"vcdk-dropdown-"))}};this.unselectAllOptions=()=>{const disabledAndSelected=this.selectedItems.filter(item=>item.selected&&item.disabled);this.setDropdownSelectedValues(disabledAndSelected)};this.handleSelectAllCLick=async()=>{const notDisabledItems=this.items.filter(({disabled})=>!disabled);const selectedNonDisabledCount=this.selectedItems.filter(({disabled})=>!disabled).length;if(selectedNonDisabledCount>=notDisabledItems.length){this.unselectAllOptions()}else{const disabledAndSelected=this.selectedItems.filter(item=>item.selected&&item.disabled);this.setDropdownSelectedValues([...disabledAndSelected,...notDisabledItems])}if(!this.getDisableOnCloseValue()){this.closePopover();this.focus()}this.popoverContainer.updatePosition();await this.updateComplete;this.publishChangeEvent()};this.preventDefaultKeyboardEvent=customEvent=>{const event=getEvent(customEvent);event.preventDefault()};this.openDropdown=()=>{const isAlreadyOpen=this.open;if(isAlreadyOpen){return}if(!this.isInteractive()){return}this.open=true;if(!this.activeItem){const itemToActivate=this.selectedItems[0]??this.items.find(item=>!item.disabled&&!item.hidden);if(itemToActivate){this.activateItem(itemToActivate)}}this.popoverContainer.updatePosition()};this.onSpaceBarKey=customEvent=>{if(!this.open||!this.filterInput){this.preventDefaultKeyboardEvent(customEvent)}if(!this.open){this.openDropdown();this.focusActiveItem()}};this.activateItem=item=>{this.clearActiveOptions();if(this.open&&typeof item.scrollIntoView==="function"){item.scrollIntoView({behavior:"auto",block:"nearest"})}const index=this.items.indexOf(item);if(!item.id){item.id=`vcdk-dropdown-option-${index}`}this.activeItem=item;this.activeItem.active=true};this.onAltUp=()=>{if(this.activeItem){void this.selectOption(this.activeItem)}this.closePopover();this.focus()};this.onAltDown=()=>{if(this.open){return}this.openDropdown();this.focus()};this.onEscapeKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(this.open){this.closePopover()}};this.setNextActiveElement=(startOption,type)=>{if(!this.isInteractive()){return}const firstSelectedOption=this.selectedItems[0]??null;const initialOptionToStartSearching=this.open?this.activeItem:firstSelectedOption;const isGotoStartOrEnd=startOption==="start"||startOption==="end";const item=getNextActiveItem(this.items,isGotoStartOrEnd?startOption:initialOptionToStartSearching,type);if(this.open){this.activateItem(item);this.focusActiveItem()}else{void this.selectOption(item)}};this.handleSearch=customEvent=>{if(this.filterInput||!this.isInteractive()){return}const event=getEvent(customEvent);if(event.key==="Backspace"||event.key==="Delete"){event.preventDefault();return}if(!/^.$/u.test(event.key)){return}event.preventDefault();const now=Date.now();if(now-this.lastKeyTime>500){this.searchTerm=""}this.lastKeyTime=now;this.searchTerm+=event.key.toLocaleLowerCase();const item=this.items.find(item=>{if(this.searchTerm===null){return false}return item.textContent?.trim().toLocaleLowerCase().startsWith(this.searchTerm)});if(item){this.open?this.activateItem(item):void this.selectOption(item)}};this.onArrowDown=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(!this.isInteractive()){return}if(!this.open){this.openDropdown();if(this.selectedItems.length>0){this.activateItem(this.selectedItems[0])}else{const firstOption=this.items.find(isOptionSelectable);if(firstOption){this.activateItem(firstOption)}}this.focusActiveItem()}else{this.setNextActiveElement(this.activeItem,"forward")}};this.onArrowUp=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(!this.isInteractive()){return}if(!this.open){this.openDropdown();if(this.selectedItems.length>0){this.activateItem(this.selectedItems[this.selectedItems.length-1])}else{const lastOption=[...this.items].reverse().find(isOptionSelectable);if(lastOption){this.activateItem(lastOption)}}this.focusActiveItem()}else{this.setNextActiveElement(this.activeItem,"backwards")}};this.onHomeKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement("start","forward")};this.onEndKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement("end","backwards")};this.onEnterKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(!this.isInteractive()){return}if(this.open){if(this.activeItem&&isOptionSelectable(this.activeItem)){void this.selectOption(this.activeItem);this.focusActiveItem();if(!this.getDisableOnCloseValue()){this.closePopover()}}else{if(this.filterInput&&this.searchTerm&&this.addOption?.length){this.addOption[0].click();this.focusActiveItem();this.filterOptionsBasedOnSearch(null);if(!this.getDisableOnCloseValue()){this.closePopover()}}}}else{this.openDropdown();this.focusActiveItem()}};this.getDisableOnCloseValue=()=>this.disableCloseOnSelect??this.multi;this.getTextContent=options=>{if(this.filterInput&&this.searchTerm!==null){return this.searchTerm}if(this.multi){return this.selectedItems.length>0?" ":""}const firstOption=options?.[0];return firstOption?getDropdownOptionTextContent(firstOption):""};this.handleSearchInputChange=event=>{if(!this.isInteractive()){return}const nativeEventData=!this.searchTerm?event.detail.nativeEvent.data??null:null;const value=nativeEventData??event.detail.value.trimStart();this.dispatchEvent(new DropdownInputEvent(value));this.filterOptionsBasedOnSearch(value);this.popoverContainer.updatePosition();this.openDropdown()};this.filterOptionsBasedOnSearch=value=>{this.searchTerm=value;const nullishValue=[null,undefined,""];let shouldShowEmptyOption=true;this.items.forEach(item=>{if(value===null||nullishValue.includes(value)){item.hidden=false;shouldShowEmptyOption=false;return}if(this.filterOptions){item.hidden=!this.filterOptions(item)}else{item.hidden=!item.textContent?.toLowerCase().includes(value.toLowerCase())}if(!item.hidden){shouldShowEmptyOption=false}});this.emptyOptions.forEach(emptyOption=>{emptyOption.hidden=!shouldShowEmptyOption});this.activeItem=this.activeItem&&isOptionSelectable(this.activeItem)?this.activeItem:this.items.find(item=>isOptionSelectable(item))??null;if(this.activeItem){this.activateItem(this.activeItem)}};this.handleChipClick=(event,item)=>{event.preventDefault();event.stopPropagation();if(!this.isInteractive()||item.disabled){return}void this.selectOption(item)};addKeybindings(this,{skip:()=>!!this.disabled,bindingDefaults:{triggers:["keydownRepeat"]}}).set([commonKeys.altKey,commonKeys.arrowDown],this.onAltDown).set([commonKeys.altKey,commonKeys.arrowUp],this.onAltUp).set(commonKeys.arrowDown,this.onArrowDown).set(commonKeys.arrowUp,this.onArrowUp).set(commonKeys.escapeKey,this.onEscapeKey).set(commonKeys.homeKey,this.onHomeKey).set(commonKeys.endKey,this.onEndKey).set(commonKeys.spaceBar,this.onSpaceBarKey).set(commonKeys.enterKey,this.onEnterKey);this.addEventListener("keydown",this.handleSearch)}update(changedProperties){if(changedProperties.has("open")){if(this.open){document.addEventListener("mousedown",this.onClickOutside,{passive:true});this.eventCleanup=()=>document.removeEventListener("mousedown",this.onClickOutside)}else{this.eventCleanup?.();this.eventCleanup=undefined}}super.update(changedProperties)}disconnectedCallback(){super.disconnectedCallback();this.eventCleanup?.()}setDropdownSelectedValues(optionsToSelect){this.selectedItems=optionsToSelect;this.items.forEach(item=>item.selected=false);optionsToSelect.map(option=>option.selected=true);this.selectValue(optionsToSelect);this.syncSelectAllOptionCheckboxValue()}findOptionsByValue(value){return this.items.filter(item=>{if(this.multi){return value?.includes?.(item.value)}else{return item.value===value}})}findOptionLabels(){return this.items.filter(item=>{const label=getDropdownOptionTextContent(item);if(!label){return false}if(this.multi){return this.value?.includes?.(label)}else{return this.value===label}})}closePopover(){const shouldCloseDropdown=this.dispatchEvent(new CloseEvent(false));if(!shouldCloseDropdown){return}this.open=false;this.clearActiveOptions();this.searchTerm=null;if(this.filterInput){this.filterOptionsBasedOnSearch(null);if(this.inputRef.value){this.inputRef.value.value=this.getTextContent(this.selectedItems)??""}}}async selectOption(target){if(!this.isInteractive()){return}const isAlreadySelected=this.selectedItems.find(item=>item.value===target.value);if(this.multi){target.selected=!target.selected;this.setDropdownSelectedValues(isAlreadySelected?this.selectedItems.filter(item=>item.value!==target.value):[...this.selectedItems,target])}else{this.items.forEach(item=>item.selected=false);target.selected=true;if(this.clearable&&isAlreadySelected){this.setDropdownSelectedValues([])}else{this.setDropdownSelectedValues([target])}}this.popoverContainer.updatePosition();await this.updateComplete;this.publishChangeEvent()}syncSelectAllOptionCheckboxValue(){const allAvailableOptions=this.items.filter(item=>!item.disabled).length;const numberOfSelectedNonDisabledOptions=this.selectedItems.filter(item=>!item.disabled).length;this.dropdownOptionSelectAll.forEach(option=>{option.selected=numberOfSelectedNonDisabledOptions===allAvailableOptions?"checked":numberOfSelectedNonDisabledOptions===0?"unchecked":"indeterminate"})}focusActiveItem(){setTimeout(()=>{this.activeItem?.focus()},0)}isInteractive(){return!this.disabled&&!this.readonly}onResetValue(){const hasDefault=Array.isArray(this.defaultValue)?this.defaultValue.length>0:Boolean(this.defaultValue);if(hasDefault){this.value=this.multi&&typeof this.defaultValue==="string"?this.defaultValue.split(", ").filter(Boolean):this.defaultValue}else{this.value=null;this.unselectAllOptions()}}formStateRestoreCallback(state,reason){if(this.multi&&typeof state==="string"){this.value=state.split(", ").filter(Boolean)}else{this.value=state}if(reason==="restore"){this.resetValidity()}this.updateValidity()}get cssVariables(){return{"--vcdk-dropdown-search-chars":`${this.searchTerm?.length||1}ch`}}renderInput(){const{label,disabled,required,placeholder,name,size,readonly}=this;const value=this.getTextContent(this.selectedItems);const isMultiWithChips=this.multi;const hasSelectedItems=this.selectedItems.length>0;const placeholderText=isMultiWithChips&&hasSelectedItems?"":placeholder;return(0,lit.qy)`
      <vcdk-text-field
        ${(0,ref.K)(this.inputRef)}
        exportparts=${exportparts}
        id="anchor"
        slot="anchor"
        autocomplete="off"
        role="combobox"
        inputmode=${this.filterInput?"text":"none"}
        aria-controls=${(0,if_defined.J)(this.open?"menu":undefined)}
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-label=${(0,if_defined.J)(label)}
        .skipValidation=${true}
        .floatingLabel=${this.floatingLabel}
        .value=${value}
        .label=${label}
        .inputAriaLabel=${label}
        .disabled=${disabled}
        ?required=${required}
        .placeholder=${placeholderText??""}
        .error=${this.textFieldError}
        .helperText=${this.hint}
        .size=${size}
        .name=${name}
        ?readonly=${readonly}
        .icon=${this.open?"chevron-up":"chevron-down"}
        .iconAriaLabel=${this.open?"Close":"Open"}
        .tabIndex=${this.filterInput?0:-1}
        @vcdk-input=${this.handleSearchInputChange}>
        ${(0,when.z)(isMultiWithChips,()=>this.chipsController.render())}
      </vcdk-text-field>
    `}render(){const{open,placement}=this;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({dropdown:1,"helper-text":!!this.helperText,"filter-input":!!this.filterInput,[`size-${this.size}`]:this.size,multi:!!this.multi,disabled:!!this.disabled,readonly:!!this.readonly,open:!!this.open,"floating-label":!!this.floatingLabel,"has-selected-values":!!this.selectedItems.length,error:!!this.textFieldError,"single-chip":this.chips==="single"||this.chips==="no-wrap","chips-no-wrap":this.chips==="no-wrap"})}
        style=${(0,style_map.W)(this.cssVariables)}
        @click=${this.toggleOpen}
        tabindex=${this.tabIndex}
        data-testid="dropdown"
        ${(0,ref.K)(this.wrapperRef)}>
        <vcdk-dropdown-popover
          ?open=${open}
          .placement=${placement}
          ?alt-boundary=${this.altBoundary}>
          ${this.renderInput()}

          <div
            id="listbox"
            role="listbox"
            aria-expanded=${open?"true":"false"}
            aria-hidden=${open?"false":"true"}
            aria-multiselectable=${this.multi?"true":"false"}
            aria-labelledby="label"
            aria-activedescendant=${(0,if_defined.J)(this.activeItem&&this.open&&this.activeItem.id?this.activeItem.id:undefined)}
            part="listbox"
            class="option-container"
            tabindex="-1"
            ${(0,ref.K)(this.listboxRef)}
            @click=${this.handleOptionSelected}
            @dropdownselectalloption=${this.handleSelectAllCLick}
            @vcdk-dropdown-option-focused=${this.handleOptionFocused}>
            <slot @slotchange=${this.initializeValue}></slot>
          </div>
        </vcdk-dropdown-popover>
      </div>
    `}};Dropdown.styles=[dropdownStyles];Dropdown.interactionTriggers=["vcdk-dropdown-change","focusout"];dropdown_component_decorate([(0,decorators.MZ)({attribute:false})],Dropdown.prototype,"validationMessages",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"floatingLabel",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"placement",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"size",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"disableCloseOnSelect",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"clearable",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"label",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Object})],Dropdown.prototype,"multi",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Dropdown.prototype,"open",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"placeholder",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"chips",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"singleChip",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"filterInput",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"alt-boundary"})],Dropdown.prototype,"altBoundary",void 0);dropdown_component_decorate([(0,decorators.MZ)({attribute:false})],Dropdown.prototype,"filterOptions",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Number})],Dropdown.prototype,"tabIndex",void 0);dropdown_component_decorate([(0,decorators.P)("vcdk-text-field")],Dropdown.prototype,"textField",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-add-option")],Dropdown.prototype,"addOption",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Dropdown.prototype,"value",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String,attribute:false})],Dropdown.prototype,"defaultValue",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"selectedItems",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"activeItem",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"lastKeyTime",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"searchTerm",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-option")],Dropdown.prototype,"items",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-empty-option")],Dropdown.prototype,"emptyOptions",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-select-all-option")],Dropdown.prototype,"dropdownOptionSelectAll",void 0);dropdown_component_decorate([(0,decorators.P)("vcdk-dropdown-popover")],Dropdown.prototype,"popoverContainer",void 0);dropdown_component_decorate([(0,context.Gt)({context:dropdownContext})],Dropdown.prototype,"dropdownContext",void 0);dropdown_component_decorate([watch("size")],Dropdown.prototype,"setSize",void 0);dropdown_component_decorate([watch("value")],Dropdown.prototype,"initializeValue",void 0);dropdown_component_decorate([watch("multi")],Dropdown.prototype,"handleMultipleChange",null);dropdown_component_decorate([watch("singleChip")],Dropdown.prototype,"handleSingleChipDeprecation",void 0);Dropdown=dropdown_component_decorate([(0,custom_element.E)("vcdk-dropdown")],Dropdown);function getStartIndex(items,from){if(!from){return-1}if(from==="start"){return 0}if(from==="end"){return items.length-1}return items.indexOf(from)}function getOptionsToIterate(from,direction,items,current){if(from==="start"){return items}if(from==="end"){return items}return direction==="forward"?items.slice(current+1):items.slice(0,current)}function getNextActiveItem(items,from,direction){const current=getStartIndex(items,from);if(current===-1){const startFrom=direction==="forward"?"start":"end";return getNextActiveItem(items,startFrom,direction)}const optionsToIterate=getOptionsToIterate(from,direction,items,current);const allOptions=direction==="forward"?optionsToIterate:optionsToIterate.reverse();return allOptions.find(option=>!option.disabled&&!option.hidden)??items[current]}var add_option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownAddOption=class DropdownAddOption extends vcdk_element.l{constructor(){super(...arguments);this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.click=()=>{this.dispatchEvent(new MouseEvent("click",{bubbles:true,composed:true}))}}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
      <div
        role="option"
        class=${(0,class_map.H)({option:true,[size]:true})}
        tabindex="0">
        <span part="content">
          <slot></slot>
        </span>
        <slot name="icon"></slot>
      </div>
    `}};DropdownAddOption.styles=[optionStyles];DropdownAddOption=add_option_component_decorate([(0,custom_element.E)("vcdk-dropdown-add-option")],DropdownAddOption);var empty_option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownEmptyOption=class DropdownEmptyOption extends vcdk_element.l{constructor(){super(...arguments);this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.handleFocus=()=>{this.dispatchEvent(new DropdownOptionFocusEvent(this))}}connectedCallback(){super.connectedCallback();this.addEventListener("focus",this.handleFocus)}disconnectedCallback(){super.disconnectedCallback();this.removeEventListener("focus",this.handleFocus)}focus(){if(this.hidden){return}super.focus();this.renderRoot.querySelector("[role='option']")?.focus()}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({option:1,[`typography-body`]:1,hidden:this.hidden,[size]:true})}
        role="option"
        tabindex="-1">
        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};DropdownEmptyOption.styles=[optionStyles,typography_styles.IT.body];DropdownEmptyOption=empty_option_component_decorate([(0,custom_element.E)("vcdk-dropdown-empty-option")],DropdownEmptyOption);var select_all_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownSelectAllOption=class DropdownSelectAllOption extends vcdk_element.l{constructor(){super(...arguments);this.active=false;this.disabled=false;this.selected="unchecked";this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.handleClick=()=>{if(this.disabled)return;this.dispatchEvent(new CustomEvent("dropdownselectalloption",{bubbles:true,composed:true}))}}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
      <div
        @click=${this.handleClick}
        role="option"
        class=${(0,class_map.H)({option:1,disabled:this.disabled,selected:this.selected,active:this.active,"typography-body":true,hidden:this.hidden,[size]:true})}
        tabindex="-1"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        <vcdk-checkbox
          label=""
          .disabled=${this.disabled}
          .checked=${this.selected==="checked"}
          .indeterminate=${this.selected==="indeterminate"}></vcdk-checkbox>

        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};DropdownSelectAllOption.styles=[optionStyles,typography_styles.IT.body];select_all_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownSelectAllOption.prototype,"active",void 0);select_all_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownSelectAllOption.prototype,"disabled",void 0);select_all_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],DropdownSelectAllOption.prototype,"selected",void 0);DropdownSelectAllOption=select_all_component_decorate([(0,custom_element.E)("vcdk-dropdown-select-all-option")],DropdownSelectAllOption)},3018(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var typography_styles=__webpack_require__(1669);var responsive_value=__webpack_require__(6591);var breakpoints=__webpack_require__(1089);var lit=__webpack_require__(6337);var isString=__webpack_require__(9703);var isArray=__webpack_require__(2049);const breakpointKeys=Object.keys(breakpoints.f);const suffixWithPxIfUnitless=value=>{if((0,isString.A)(value))return value;return`${value}px`};const toCssVariables=(name,values)=>{if(!values)return;if(!(0,isArray.A)(values)){return{[name]:suffixWithPxIfUnitless(values)}}return values.reduce((current,next,currentIndex)=>{const breakpointKey=breakpointKeys[currentIndex];return{...current,[`${name}-${breakpointKey}`]:suffixWithPxIfUnitless(next)}},{})};const breakpointEntries=Object.entries(breakpoints.f);const responsiveValueToCssVariable=(selector,variableName)=>{const primaryVariable=`\n  ${selector} {\n    ${variableName}: var(${variableName}-xs);\n  }`;const responsiveVariables=Object.entries(breakpoints.f).splice(1).map(([breakpointKey,breakpoint],index)=>{const nextBreakpoint=breakpointEntries[index+2];const fallback=nextBreakpoint?`, var(${variableName}-${nextBreakpoint[0]})`:``;return`\n    @media(min-width: ${breakpoint.from}px) {\n      ${selector} {\n        ${variableName}: var(${variableName}-${breakpointKey} ${fallback});\n      } \n    }`});return(0,lit.iz)([primaryVariable,responsiveVariables].join(""))};var decorators=__webpack_require__(352);var class_map=__webpack_require__(3720);var style_map=__webpack_require__(1145);var when=__webpack_require__(302);var custom_element=__webpack_require__(6487);var responsive=__webpack_require__(4135);var vcdk_element=__webpack_require__(6260);const skeletonStyles=(0,lit.AH)`
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

  ${responsiveValueToCssVariable(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-line-height")}
  ${responsiveValueToCssVariable(".skeleton[class*='typography-'].variant-typography","--vcdk-skeleton-font-size")}

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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Skeleton=class Skeleton extends((0,responsive.F)(vcdk_element.l)){constructor(){super(...arguments);this.disableAnimation=false;this.typographyVariant="body";this.variant="typography";this.elementAriaDescription=null}get cssVariables(){return{...this.typographyVariant&&toCssVariables("--vcdk-skeleton-line-height",(0,typography_styles.UN)(this.typographyVariant,"line-height")),...this.typographyVariant&&toCssVariables("--vcdk-skeleton-font-size",(0,typography_styles.UN)(this.typographyVariant,"font-size"))}}render(){return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({skeleton:1,"disable-animation":!!this.disableAnimation,"aspect-ratio":!!this.aspectRatio,[`typography-${this.typographyVariant}`]:!!this.typographyVariant,[`variant-${this.variant}`]:1})}
        style=${(0,style_map.W)(this.cssVariables)}>
        ${(0,when.z)(this.elementAriaDescription,()=>(0,lit.qy)`
            <div class="hidden">${this.elementAriaDescription}</div>
          `)}
        <slot aria-hidden="true"></slot>
      </div>
    `}};Skeleton.styles=[skeletonStyles,...typography_styles.FB];Skeleton.responsiveProperties={prefix:"vcdk-skeleton",props:["width","height","size","aspectRatio"]};__decorate([(0,decorators.MZ)({attribute:"aspect-ratio",converter:responsive_value.g})],Skeleton.prototype,"aspectRatio",void 0);__decorate([(0,decorators.MZ)({type:Boolean,attribute:"disable-animation"})],Skeleton.prototype,"disableAnimation",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"height",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"size",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"typography-variant"})],Skeleton.prototype,"typographyVariant",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"width",void 0);__decorate([(0,decorators.MZ)({type:String})],Skeleton.prototype,"variant",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-description"})],Skeleton.prototype,"elementAriaDescription",void 0);Skeleton=__decorate([(0,custom_element.E)("vcdk-skeleton")],Skeleton);var dist=__webpack_require__(7093);var if_defined=__webpack_require__(31);var unsafe_svg=__webpack_require__(8776);var uniqueId=__webpack_require__(5664);const systemIconStyles=(0,lit.AH)`
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
`;var task=__webpack_require__(582);function createSvgAssetIconTask(host,getArgs){return new task.YZ(host,{task:async([icon,filled,brand,loading])=>{if(!icon)return"";if(loading==="lazy"){await new Promise(resolve=>{const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();resolve()}});observer.observe(host)})}const url=(0,dist.QK)({type:filled?"filled":"lined",brand,iconId:icon});try{return await(0,dist.Dc)(url)}catch(error){console.error(`Failed when loading icon id: "${String(icon)}". ${String(error)}`);throw error}},args:getArgs})}var system_icon_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let SystemIcon=class SystemIcon extends vcdk_element.l{constructor(){super(...arguments);this.elementRole="presentation";this.elementAriaHidden=null;this.loading=dist.W0.loading;this.assetsTask=createSvgAssetIconTask(this,()=>[this.icon,this.filled,this.currentIconSet,this.loading])}get sizeUnit(){return`${this.size?this.size+"px":"var(--vcdk-system-icon-size, 24px)"}`}render(){return this.assetsTask.render({pending:()=>(0,lit.qy)`
        <div style="width:${this.sizeUnit};height:${this.sizeUnit}"></div>
      `,complete:markup=>this.svgTemplate(markup),error:()=>(0,lit.qy)`
        <div style="width:${this.sizeUnit};height:${this.sizeUnit}"></div>
      `})}svgTemplate(svgContent){const titleId=this.elementTitle?this.elementAriaLabelledBy||(0,uniqueId.A)("svg-title-"):undefined;const descId=this.description?this.elementAriaDescribedBy||(0,uniqueId.A)("svg-description-"):undefined;return(0,lit.JW)`
      <svg
        class="svg"
        part="svg"
        focusable="false"
        role=${(0,if_defined.J)(this.elementRole)}
        aria-labelledby=${(0,if_defined.J)(titleId)}
        aria-describedby=${(0,if_defined.J)(descId)}
        aria-hidden=${(0,if_defined.J)(this.elementAriaHidden)}
        style=${(0,if_defined.J)(this.size?`--vcdk-system-icon-size: ${this.size}px;`:lit.s6)}>
        ${this.elementTitle?(0,lit.JW)`<title id="${titleId}">${this.elementTitle}</title>`:lit.s6}
        ${this.description?(0,lit.JW)`<desc id="${descId}">${this.description}</desc>`:lit.s6}
        ${(0,unsafe_svg.T)(svgContent)}
      </svg>
    `}};SystemIcon.styles=[systemIconStyles];system_icon_component_decorate([(0,decorators.MZ)({type:Boolean})],SystemIcon.prototype,"filled",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String})],SystemIcon.prototype,"icon",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:Number})],SystemIcon.prototype,"size",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-labelledby"})],SystemIcon.prototype,"elementAriaLabelledBy",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-title"})],SystemIcon.prototype,"elementTitle",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-describedby"})],SystemIcon.prototype,"elementAriaDescribedBy",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String})],SystemIcon.prototype,"description",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-role"})],SystemIcon.prototype,"elementRole",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-hidden"})],SystemIcon.prototype,"elementAriaHidden",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String})],SystemIcon.prototype,"loading",void 0);SystemIcon=system_icon_component_decorate([(0,custom_element.E)("vcdk-system-icon")],SystemIcon)},1669(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{FB:()=>allTypographyClasses,IT:()=>typographyClasses,UN:()=>getTypographyValues,gI:()=>typographyStyles,zQ:()=>typographyVariantStyles});var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1089);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6337);var lodash_es__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2326);const typographyStyles=(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
  slot {
    display: inline;
    font-synthesis: none;
    margin: 0;
  }

  ::slotted(*) {
    font-synthesis: none;
    margin: 0;
  }
`;const typographyVariants=["display-statement","display1","display2","heading1","heading2","heading3","heading4","subtitle1","subtitle2","large-body","body","button","caption1","caption2"];const typographyVariantStyles=(variant,screenSize="small")=>{const kebabVariant=(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(variant);return(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
    font-family: var(
      --vcdk-typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(kebabVariant)}-font-family-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(screenSize)}-screens
    );
    font-size: var(
      --vcdk-typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(kebabVariant)}-size-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(screenSize)}-screens
    );
    line-height: var(
      --vcdk-typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(kebabVariant)}-line-height-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(screenSize)}-screens
    );
    letter-spacing: var(
      --vcdk-typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(kebabVariant)}-letter-spacing-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(screenSize)}-screens
    );
    font-weight: var(
      --vcdk-typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(kebabVariant)}-weight-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(screenSize)}-screens
    );
  `};const typographyClasses=typographyVariants.reduce((classes,variant)=>{classes[variant]=(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
      .typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(variant)},
        .typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(variant)}
        ::slotted(*) {
        ${typographyVariantStyles(variant,"small")}
      }
      @media (min-width: ${_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f.md.from}px) {
        .typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(variant)},
          .typography-${(0,lit__WEBPACK_IMPORTED_MODULE_1__.iz)(variant)}
          ::slotted(*) {
          ${typographyVariantStyles(variant,"large")}
        }
      }
    `;return classes},{});const allTypographyClasses=Object.values(typographyClasses);const getTypographyValues=(variant,property)=>{const tokenProperty=property==="font-size"?"size":property;const kebabVariant=(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(variant);return[`var(--vcdk-typography-${kebabVariant}-${tokenProperty}-small-screens)`,`var(--vcdk-typography-${kebabVariant}-${tokenProperty}-large-screens)`]}},6591(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{g:()=>responsiveValueConverter});var breakpoints;var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1089);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6337);const responsiveValueConverter={fromAttribute(value,type){if(!value){return null}if(value.startsWith("[")&&value.endsWith("]")){return JSON.parse(value)}if(typeof type==="undefined"){const number=Number(value);if(!Number.isNaN(number)){return number}}return lit__WEBPACK_IMPORTED_MODULE_1__.W3.fromAttribute?.(value,type)},toAttribute(value,type){if(Array.isArray(value)){return lit__WEBPACK_IMPORTED_MODULE_1__.W3.toAttribute?.(value,Array)}return lit__WEBPACK_IMPORTED_MODULE_1__.W3.toAttribute?.(value,type)}};const valueInBreakpoint=(value,breakpoint)=>{const values=Array.isArray(value)?value:[value];const breakpointIndex=Object.keys(breakpoints).indexOf(breakpoint);const currentValueIndex=Math.min(values.length-1,breakpointIndex);return values[currentValueIndex]}},6260(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>_vcdk_element_js__WEBPACK_IMPORTED_MODULE_0__.l});var _vcdk_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1322)},1322(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>VcdkElement});var context=__webpack_require__(767);const themes=null&&["volvo-light","volvo-dark","mack-light","mack-dark","renault-light","renault-dark"];const brands=["volvo","mack","renault"];const iconSets=null&&["volvo","mack","renault","generic","vtna","prevost"];const colorSchemes=null&&["light","dark"];function reverseTheme(themeId){if(themeId.includes("light")){return themeId.replace("light","dark")}return themeId.replace("dark","light")}function darkTheme(themeId){if(themeId.includes("dark")){return themeId}return reverseTheme(themeId)}var lit=__webpack_require__(6337);var decorators=__webpack_require__(352);var noop=__webpack_require__(2302);const themeContext=(0,context.q6)(Symbol("vcdk-theme"));if(typeof document!=="undefined"){const root=new context.aU;const attach=()=>root.attach(document.body);if(document.body){attach()}else{document.addEventListener("DOMContentLoaded",attach)}}const normalize=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};class VcdkElement extends lit.WF{constructor(){super(...arguments);this.isThemeProvider=false;this.themeProvider=undefined;this.themeConsumer=new context.G(this,{context:themeContext,subscribe:true,callback:()=>{this.handleTheming()}})}static get defaultLocale(){if(typeof document!=="undefined"&&document.documentElement.lang){return document.documentElement.lang}if(typeof window!=="undefined"){return window.navigator.language}return"en-US"}get currentTheme(){let themeId=this.themeId??this.contextTheme??VcdkElement.defaultTheme;if(this.invertTheme){themeId=reverseTheme(themeId)}return themeId}get contextTheme(){return this.themeConsumer?.value?.themeId}get contextIconSet(){return this.themeConsumer?.value?.iconSet}get currentIconSet(){if(this.iconSet!==undefined&&this.iconSet!=="auto"){return this.iconSet}if(this.contextIconSet!==undefined){return this.contextIconSet}return this.brandId}get brandId(){return this.currentTheme?.split("-")[0]}get colorSchemeId(){return this.currentTheme?.split("-")[1]}themeChanged(){(0,noop.A)()}update(changedProperties){if(changedProperties.has("themeId")||changedProperties.has("invertTheme")||changedProperties.has("iconSet")){this.handleTheming()}super.update(changedProperties)}handleTheming(){const hasThemeChange=this.currentTheme!==this.contextTheme;const shouldProvideIconSet=this.iconSet!==undefined&&this.iconSet!=="auto";if(hasThemeChange||shouldProvideIconSet){const effectiveIconSet=this.iconSet!==undefined&&this.iconSet!=="auto"?this.iconSet:this.contextIconSet;if(!this.isThemeProvider){this.isThemeProvider=true;this.themeProvider=new context.DT(this,{context:themeContext,initialValue:{themeId:this.currentTheme,iconSet:effectiveIconSet}})}else{this.themeProvider?.setValue({themeId:this.currentTheme,iconSet:effectiveIconSet})}this.setThemeCssClasses();this.themeChanged();return}if(this.isThemeProvider&&this.themeProvider){this.isThemeProvider=false;this.removeController(this.themeProvider);this.themeProvider=undefined;this.setThemeCssClasses();this.themeChanged()}}setThemeCssClasses(){const isDifferentTheme=this.currentTheme!==this.contextTheme;for(const brand of brands){this.classList.toggle(`vcdk-theme-${brand}`,isDifferentTheme&&this.brandId===brand)}this.classList.toggle("vcdk-mode-dark",isDifferentTheme&&this.colorSchemeId==="dark")}static finalizeStyles(styles){if(!styles){return lit.WF.finalizeStyles(normalize)}if(Array.isArray(styles)){styles.unshift(normalize);return lit.WF.finalizeStyles(styles)}return lit.WF.finalizeStyles([normalize,styles])}}VcdkElement.version="10.14.0";VcdkElement.defaultTheme="volvo-light";__decorate([(0,decorators.MZ)({type:String,reflect:true})],VcdkElement.prototype,"themeId",void 0);__decorate([(0,decorators.MZ)({type:Boolean,attribute:"invert-theme",reflect:true})],VcdkElement.prototype,"invertTheme",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"icon-set"})],VcdkElement.prototype,"iconSet",void 0)},4374(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:()=>VcdkFormButton});var lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(352);var lodash_es__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9746);var _vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6260);var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const createProxyButton=button=>{const proxyButton=document.createElement("button");const transferrableProps=["type","formAction","formEnctype","formMethod","formNoValidate","formTarget"];Object.assign(proxyButton,(0,lodash_es__WEBPACK_IMPORTED_MODULE_1__.A)(button,(value,key)=>{if(!transferrableProps.includes(key))return false;return typeof value!=="undefined"}));Object.assign(proxyButton.style,{position:"absolute !important",width:"0 !important",height:"0 !important",clipPath:"inset(50%) !important",overflow:"hidden !important",whiteSpace:"nowrap !important"});return proxyButton};class VcdkFormButton extends _vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_2__.l{constructor(){super();this.type="button";this.formNoValidate=false;this.disabled=false;this.customStates={set:(customState,active)=>{if(!this.internals?.states){return}if(active){this.internals.states.add(customState)}else{this.internals.states.delete(customState)}},has:customState=>{if(!this.internals?.states)return false;return this.internals.states.has(customState)}};this.onButtonClick=e=>{if(this.disabled){e.preventDefault();e.stopPropagation();return}if(!this.internals){return}setTimeout(()=>{if(e.defaultPrevented){return}if(!this.internals){return}if(this.type==="submit"&&this.name){this.internals.setFormValue(this.value??null)}if(this.type==="submit"||this.type==="reset"){const proxy=createProxyButton(this);try{this.internals.form?.appendChild(proxy);proxy.click()}finally{proxy.remove();if(this.type==="submit"&&this.name){this.internals.setFormValue(null)}}}},0)};try{this.internals=this.attachInternals()}catch{console.warn("ElementInternals API is not supported in this browser. A polyfill may be required.")}}update(changedProperties){super.update(changedProperties);this.setCustomStates()}setCustomStates(){this.customStates.set("disabled",this.disabled)}formDisabledCallback(isDisabled){this.disabled=isDisabled}formResetCallback(){}formAssociatedCallback(){}click(){this.buttonEl.value?.click()}}VcdkFormButton.shadowRootOptions={..._vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_2__.l.shadowRootOptions,delegatesFocus:true};VcdkFormButton.formAssociated=true;__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String,reflect:true})],VcdkFormButton.prototype,"type",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String,reflect:true})],VcdkFormButton.prototype,"name",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String})],VcdkFormButton.prototype,"value",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String})],VcdkFormButton.prototype,"form",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String})],VcdkFormButton.prototype,"formAction",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String,attribute:"formenctype"})],VcdkFormButton.prototype,"formEnctype",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String,attribute:"formmethod"})],VcdkFormButton.prototype,"formMethod",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:Boolean,attribute:"formnovalidate"})],VcdkFormButton.prototype,"formNoValidate",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:String,attribute:"formtarget"})],VcdkFormButton.prototype,"formTarget",void 0);__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.MZ)({type:Boolean})],VcdkFormButton.prototype,"disabled",void 0)},1089(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{f:()=>breakpoints});const breakpoints={xs:{from:0,to:599.98},sm:{from:600,to:904.98},md:{from:905,to:1239.98},lg:{from:1240,to:1439.98},xl:{from:1440,to:15360}}}}]);
//# sourceMappingURL=vcdk.js.map