"use strict";(self["webpackChunkvolvotrucks_na"]=self["webpackChunkvolvotrucks_na"]||[]).push([[325],{6487(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:()=>customElement});const customElement=tagName=>(target,context)=>{const initializer=()=>{const existingElement=customElements.get(tagName);if(!existingElement){customElements.define(tagName,target);return}const existingVersion=existingElement.version;const currentVersion=target.version;if(existingVersion&&currentVersion&&existingVersion!==currentVersion){console.warn(`vcdk warning: Attempted to register <${tagName}>v, but <${tagName}>v. was already registered. This could indicate that your application might contain duplicate instances of the same component.`)}};if(context){context.addInitializer(initializer)}else{initializer()}}},7502(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:()=>ifDefinedOrStringEmpty});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2618);const ifDefinedOrStringEmpty=value=>{if(typeof value==="number"){return value}return value?value:lit__WEBPACK_IMPORTED_MODULE_0__.s6}},4135(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{F:()=>Responsive});var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8128);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2618);var lodash_es__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2326);var _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6260);const breakpointKeys=Object.keys(_volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__.f);const Responsive=superClass=>{class ResponsiveClass extends superClass{static fallbackVariableValue(prefix,prop,fallbacks){if(!fallbacks.length){return""}const current=fallbacks.shift();if(fallbacks.length){return`var(--${prefix}-${prop}-${current}, ${this.fallbackVariableValue(prefix,prop,fallbacks)})`}return`var(--${prefix}-${prop}-${current})`}static responsiveVariables(prefix,props,breakpoint,fallbacks){return props.map(prop=>{const name=(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(prop);if(fallbacks){return`\n    --${prefix}-${name}-fallback: ${this.fallbackVariableValue(prefix,name,[...fallbacks])};\n    --${prefix}-${name}: var(--${prefix}-${name}-${breakpoint}, var(--${prefix}-${name}-fallback));`}return`\n    --${prefix}-${name}: var(--${prefix}-${name}-${breakpoint});`}).join("")}static responsiveStyles(settings){return(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
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
      }`}static finalizeStyles(styles){if(!this.responsiveProperties){return _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__.l.finalizeStyles(styles)}const alteredStyles=[this.responsiveStyles(this.responsiveProperties)];if(styles&&Array.isArray(styles)){alteredStyles.push(...styles)}else if(styles){alteredStyles.push(styles)}return _web_components_vcdk_element_index_js__WEBPACK_IMPORTED_MODULE_3__.l.finalizeStyles(alteredStyles)}connectedCallback(){super.connectedCallback();this.setResponsiveVariables()}update(changedProperties){const responsiveProperties=this.constructor.responsiveProperties;const props=responsiveProperties?.props;if(responsiveProperties&&props.some(prop=>changedProperties.has(prop))){this.setResponsiveVariables()}super.update(changedProperties)}setResponsiveVariables(){const responsiveProperties=this.constructor.responsiveProperties;if(typeof responsiveProperties==="undefined")return;const props=responsiveProperties.props;for(const prop of props){let value=this[prop];if(!value)continue;if(!Array.isArray(value)){value=[value]}for(let i=0;i<value.length;i++){const propName=String(prop);let breakpointValue=value[i];if(responsiveProperties.styleTransform){breakpointValue=responsiveProperties.styleTransform(propName,breakpointKeys[i],breakpointValue)}if(typeof breakpointValue==="undefined"){continue}if(typeof breakpointValue==="number"){breakpointValue=`${breakpointValue}px`}const breakpoint=breakpointKeys[i];this.style.setProperty(`--${responsiveProperties.prefix}-${(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(propName)}-${breakpoint}`,breakpointValue)}}}}return ResponsiveClass}},7909(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var system_icon=__webpack_require__(2932);var typography_styles=__webpack_require__(1669);var lit=__webpack_require__(2618);var decorators=__webpack_require__(352);var when=__webpack_require__(302);var custom_element=__webpack_require__(6487);var vcdk_element=__webpack_require__(6260);const accordionStyles=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};class AccordionToggleEvent extends CustomEvent{constructor(type,detail){super(type,{detail,bubbles:true,composed:true,cancelable:true})}}let Accordion=class Accordion extends vcdk_element.l{constructor(){super(...arguments);this.headerTitle="";this.open=false;this.onToggleClick=e=>{e.preventDefault();const newState=!this.open;const deprecatedEvent=new AccordionToggleEvent("toggle",{open:newState});this.dispatchEvent(deprecatedEvent);const event=new AccordionToggleEvent("vcdk-toggle",{open:newState});this.dispatchEvent(event);const defaultPrevented=deprecatedEvent.defaultPrevented||event.defaultPrevented;if(!defaultPrevented){this.open=newState}}}render(){const{headerTitle,headerIcon}=this;return(0,lit.qy)`
      <details ?open=${this.open} part="details">
        <summary
          id="accordionID"
          part="summary"
          @click=${this.onToggleClick}
          aria-controls="accordionSectionID"
          aria-expanded=${this.open?"true":"false"}>
          <slot name="summary-start">
            ${(0,when.z)(headerIcon,()=>(0,lit.qy)`
                <vcdk-system-icon
                  size=${24}
                  icon=${headerIcon}></vcdk-system-icon>
              `)}
          </slot>
          <slot name="title" class="title typography-subtitle1">
            ${headerTitle}
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
    `}};Accordion.styles=[typography_styles.IT.subtitle1,accordionStyles];__decorate([(0,decorators.MZ)({type:String})],Accordion.prototype,"headerTitle",void 0);__decorate([(0,decorators.MZ)({type:String})],Accordion.prototype,"headerIcon",void 0);__decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Accordion.prototype,"open",void 0);Accordion=__decorate([(0,custom_element.E)("vcdk-accordion")],Accordion)},3254(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var responsive_value=__webpack_require__(6591);var lit=__webpack_require__(2618);var decorators=__webpack_require__(352);var class_map=__webpack_require__(3720);var style_map=__webpack_require__(1145);var custom_element=__webpack_require__(6487);var responsive=__webpack_require__(4135);var vcdk_element=__webpack_require__(6260);const spinnerStyles=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Spinner=class Spinner extends((0,responsive.F)(vcdk_element.l)){render(){return(0,lit.JW)`
    <svg
      class=${(0,class_map.H)({indefinite:typeof this.progress==="undefined"})}
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
    `}};Spinner.styles=[spinnerStyles];Spinner.responsiveProperties={prefix:"vcdk-spinner",props:["size"],styleTransform:(name,_,value)=>{if(name==="size"&&typeof value==="string"){switch(value){case"small":return 18;case"large":return 80;default:return 38}}return value}};__decorate([(0,decorators.MZ)({type:Number})],Spinner.prototype,"progress",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Spinner.prototype,"size",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-label"})],Spinner.prototype,"elementAriaLabel",void 0);Spinner=__decorate([(0,custom_element.E)("vcdk-spinner")],Spinner);var system_icon=__webpack_require__(2932);var typography_styles=__webpack_require__(1669);var when=__webpack_require__(302);var if_defined_or_string_empty=__webpack_require__(7502);const buttonStyles=(0,lit.AH)`
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
`;var button_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Button=class Button extends vcdk_element.l{constructor(){super(...arguments);this.ariaLabel="";this.autofocus=false;this.size="medium";this.variant="marketing";this.clickHandler=e=>{if(this.href)return;if(this.disabled){e.preventDefault();e.stopPropagation();return}if(this.type==="submit"&&!e.defaultPrevented){this.closest("form")?.requestSubmit()}}}render(){const{href,variant="primary",size,loading,iconStart,iconEnd,disabled,fullWidth,ariaLabel,title,type}=this;const buttonClasses={button:true,[`variant-${variant}`]:true,[`size-${size}`]:true,fullWidth:fullWidth?true:false,loading:loading?true:false};const textClasses={text:true,["typography-button"]:true};const template=(0,lit.qy)`
      ${(0,when.z)(iconStart,()=>(0,lit.qy)`
          <vcdk-system-icon
            .size=${24}
            .icon=${iconStart}
            class="icon"></vcdk-system-icon>
        `)}
      <div class=${(0,class_map.H)(textClasses)}>
        <slot></slot>
      </div>
      ${(0,when.z)(iconEnd,()=>(0,lit.qy)`
          <vcdk-system-icon
            .size=${24}
            .icon=${iconEnd}
            class="icon"></vcdk-system-icon>
        `)}
      ${(0,when.z)(loading,()=>(0,lit.qy)`
          <vcdk-spinner class="spinner"></vcdk-spinner>
        `)}
    `;if(href)return(0,lit.qy)`
        <a
          part="button"
          class=${(0,class_map.H)(buttonClasses)}
          title=${(0,if_defined_or_string_empty.m)(title)}
          aria-label=${(0,if_defined_or_string_empty.m)(ariaLabel)}
          aria-disabled=${disabled?"true":lit.s6}
          href=${href}
          download=${(0,if_defined_or_string_empty.m)(this.download)}
          hreflang=${(0,if_defined_or_string_empty.m)(this.hreflang)}
          ping=${(0,if_defined_or_string_empty.m)(this.ping)}
          referrerpolicy=${(0,if_defined_or_string_empty.m)(this.referrerpolicy)}
          rel=${(0,if_defined_or_string_empty.m)(this.rel)}
          target=${(0,if_defined_or_string_empty.m)(this.target)}
          type=${(0,if_defined_or_string_empty.m)(type)}>
          ${template}
        </a>
      `;return(0,lit.qy)`
      <button
        part="button"
        title=${(0,if_defined_or_string_empty.m)(title)}
        aria-label=${(0,if_defined_or_string_empty.m)(ariaLabel)}
        aria-disabled=${disabled?"true":lit.s6}
        @click=${this.clickHandler}
        ?autofocus=${this.autofocus}
        formaction=${(0,if_defined_or_string_empty.m)(this.formaction)}
        formenctype=${(0,if_defined_or_string_empty.m)(this.formenctype)}
        formmethod=${(0,if_defined_or_string_empty.m)(this.formmethod)}
        ?formnovalidate=${this.formnovalidate}
        formtarget=${(0,if_defined_or_string_empty.m)(this.formtarget)}
        name=${(0,if_defined_or_string_empty.m)(this.name)}
        type=${type??"button"}
        value=${(0,if_defined_or_string_empty.m)(this.value)}
        class=${(0,class_map.H)(buttonClasses)}>
        ${template}
      </button>
    `}};Button.styles=[typography_styles.IT.button,buttonStyles];button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"ariaLabel",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"autofocus",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"size",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"fullWidth",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"iconEnd",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"iconStart",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"loading",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"variant",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"download",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"href",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"hreflang",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"ping",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"referrerpolicy",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"rel",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"target",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"disabled",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"form",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"formaction",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"formenctype",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"formmethod",void 0);button_component_decorate([(0,decorators.MZ)({type:Boolean})],Button.prototype,"formnovalidate",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"formtarget",void 0);button_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Button.prototype,"name",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"type",void 0);button_component_decorate([(0,decorators.MZ)({type:String})],Button.prototype,"value",void 0);Button=button_component_decorate([(0,custom_element.E)("vcdk-button")],Button)},7118(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var context=__webpack_require__(767);const checkboxGroupContext=(0,context.q6)("vcdk-checkbox-group");function watch(propertyName,options){const resolvedOptions={waitUntilFirstUpdate:false,...options};return(proto,decoratedFnName)=>{const{update}=proto;const watchedProperties=Array.isArray(propertyName)?propertyName:[propertyName];proto.update=function(changedProps){watchedProperties.forEach(property=>{const key=property;if(changedProps.has(key)){const oldValue=changedProps.get(key);const newValue=this[key];if(oldValue!==newValue){if(!resolvedOptions.waitUntilFirstUpdate||this.hasUpdated){this[decoratedFnName](oldValue,newValue)}}}});update.call(this,changedProps)}}}var typography_styles=__webpack_require__(1669);var lit=__webpack_require__(2618);var decorators=__webpack_require__(352);var class_map=__webpack_require__(3720);var live=__webpack_require__(538);var ref=__webpack_require__(7832);var when=__webpack_require__(302);var uniqueId=__webpack_require__(5664);var custom_element=__webpack_require__(6487);var if_defined_or_string_empty=__webpack_require__(7502);var __classPrivateFieldGet=undefined&&undefined.__classPrivateFieldGet||function(receiver,state,kind,f){if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a getter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return kind==="m"?f:kind==="a"?f.call(receiver):f?f.value:state.get(receiver)};var __classPrivateFieldSet=undefined&&undefined.__classPrivateFieldSet||function(receiver,state,value,kind,f){if(kind==="m")throw new TypeError("Private method is not writable");if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a setter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return kind==="a"?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value};function FormControlMixin(SuperClass){var _FormControl_instances,_a,_FormControl_focused,_FormControl_forceError,_FormControl_touched,_FormControl_abortController,_FormControl_previousAbortController,_FormControl_awaitingValidationTarget,_FormControl_formValidationGroup_get,_FormControl_value,_FormControl_onFocus,_FormControl_onBlur,_FormControl_onInvalid,_FormControl_validationCompleteResolver,_FormControl_isValidationPending,_FormControl_validationComplete,_FormControl_shouldShowError,_FormControl_runValidators,_FormControl_setValidityWithOptionalTarget,_FormControl_getValidatorMessageForValue;class FormControl extends SuperClass{static get formAssociated(){return true}static get validators(){return this.formControlValidators||[]}static get observedAttributes(){const validatorAttributes=this.validators.map(validator=>validator.attribute).flat();const observedAttributes=super.observedAttributes||[];const attributeSet=new Set([...observedAttributes,...validatorAttributes]);return[...attributeSet]}static getValidator(attribute){return this.validators.find(validator=>validator.attribute===attribute)||null}static getValidators(attribute){return this.validators.filter(validator=>{if(validator.attribute===attribute||validator.attribute?.includes(attribute)){return true}})}get form(){return this.internals.form}get showError(){return __classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this)}checkValidity(){return this.internals.checkValidity()}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}constructor(...args){super(...args);_FormControl_instances.add(this);this.internals=this.attachInternals();_FormControl_focused.set(this,false);_FormControl_forceError.set(this,false);_FormControl_touched.set(this,false);_FormControl_abortController.set(this,void 0);_FormControl_previousAbortController.set(this,void 0);_FormControl_awaitingValidationTarget.set(this,true);_FormControl_value.set(this,"");_FormControl_onFocus.set(this,()=>{__classPrivateFieldSet(this,_FormControl_touched,true,"f");__classPrivateFieldSet(this,_FormControl_focused,true,"f");__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this)});_FormControl_onBlur.set(this,()=>{__classPrivateFieldSet(this,_FormControl_focused,false,"f");__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_runValidators).call(this,this.shouldFormValueUpdate()?__classPrivateFieldGet(this,_FormControl_value,"f"):"");if(!this.validity.valid&&__classPrivateFieldGet(this,_FormControl_touched,"f")){__classPrivateFieldSet(this,_FormControl_forceError,true,"f")}const showError=__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this);if(this.validationMessageCallback){this.validationMessageCallback(showError?this.internals.validationMessage:"")}});_FormControl_onInvalid.set(this,()=>{if(__classPrivateFieldGet(this,_FormControl_awaitingValidationTarget,"f")&&this.validationTarget){this.internals.setValidity(this.validity,this.validationMessage,this.validationTarget);__classPrivateFieldSet(this,_FormControl_awaitingValidationTarget,false,"f")}__classPrivateFieldSet(this,_FormControl_touched,true,"f");__classPrivateFieldSet(this,_FormControl_forceError,true,"f");__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this);this?.validationMessageCallback?.(this.showError?this.internals.validationMessage:"")});_FormControl_validationCompleteResolver.set(this,void 0);_FormControl_isValidationPending.set(this,false);_FormControl_validationComplete.set(this,Promise.resolve());this.addEventListener?.("focus",__classPrivateFieldGet(this,_FormControl_onFocus,"f"));this.addEventListener?.("blur",__classPrivateFieldGet(this,_FormControl_onBlur,"f"));this.addEventListener?.("invalid",__classPrivateFieldGet(this,_FormControl_onInvalid,"f"));this.setValue(null)}attributeChangedCallback(name,oldValue,newValue){super.attributeChangedCallback?.(name,oldValue,newValue);const proto=this.constructor;const validators=proto.getValidators(name);if(validators?.length&&this.validationTarget){this.setValue(__classPrivateFieldGet(this,_FormControl_value,"f"))}}setValue(value){__classPrivateFieldSet(this,_FormControl_forceError,false,"f");this.validationMessageCallback?.("");__classPrivateFieldSet(this,_FormControl_value,value,"f");const valueShouldUpdate=this.shouldFormValueUpdate();const valueToUpdate=valueShouldUpdate?value:null;this.internals.setFormValue(valueToUpdate);__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_runValidators).call(this,valueToUpdate);if(this.valueChangedCallback){this.valueChangedCallback(valueToUpdate)}__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this)}shouldFormValueUpdate(){return true}get validationComplete(){return new Promise(resolve=>resolve(__classPrivateFieldGet(this,_FormControl_validationComplete,"f")))}formResetCallback(){__classPrivateFieldSet(this,_FormControl_touched,false,"f");__classPrivateFieldSet(this,_FormControl_forceError,false,"f");__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this);this.resetFormControl?.();this.validationMessageCallback?.(__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_shouldShowError).call(this)?this.validationMessage:"")}}_a=FormControl,_FormControl_focused=new WeakMap,_FormControl_forceError=new WeakMap,_FormControl_touched=new WeakMap,_FormControl_abortController=new WeakMap,_FormControl_previousAbortController=new WeakMap,_FormControl_awaitingValidationTarget=new WeakMap,_FormControl_value=new WeakMap,_FormControl_onFocus=new WeakMap,_FormControl_onBlur=new WeakMap,_FormControl_onInvalid=new WeakMap,_FormControl_validationCompleteResolver=new WeakMap,_FormControl_isValidationPending=new WeakMap,_FormControl_validationComplete=new WeakMap,_FormControl_instances=new WeakSet,_FormControl_formValidationGroup_get=function _FormControl_formValidationGroup_get(){const rootNode=this.getRootNode();const selector=`${this.localName}[name="${this.getAttribute("name")}"]`;return rootNode.querySelectorAll(selector)},_FormControl_shouldShowError=function _FormControl_shouldShowError(){if(this.hasAttribute("disabled")){return false}const showError=__classPrivateFieldGet(this,_FormControl_forceError,"f")||__classPrivateFieldGet(this,_FormControl_touched,"f")&&!this.validity.valid&&!__classPrivateFieldGet(this,_FormControl_focused,"f");if(showError&&this.internals.states){this.internals.states.add("--show-error")}else if(this.internals.states){this.internals.states.delete("--show-error")}return showError},_FormControl_runValidators=function _FormControl_runValidators(value){const proto=this.constructor;const validity={};const validators=proto.validators;const asyncValidators=[];const hasAsyncValidators=validators.some(validator=>validator.isValid instanceof Promise);if(!__classPrivateFieldGet(this,_FormControl_isValidationPending,"f")){__classPrivateFieldSet(this,_FormControl_validationComplete,new Promise(resolve=>{__classPrivateFieldSet(this,_FormControl_validationCompleteResolver,resolve,"f")}),"f");__classPrivateFieldSet(this,_FormControl_isValidationPending,true,"f")}if(__classPrivateFieldGet(this,_FormControl_abortController,"f")){__classPrivateFieldGet(this,_FormControl_abortController,"f").abort();__classPrivateFieldSet(this,_FormControl_previousAbortController,__classPrivateFieldGet(this,_FormControl_abortController,"f"),"f")}const abortController=new AbortController;__classPrivateFieldSet(this,_FormControl_abortController,abortController,"f");let validationMessage=undefined;let hasChange=false;if(!validators.length){return}validators.forEach(validator=>{const key=validator.key||"customError";const isValid=validator.isValid(this,value,abortController.signal);const isAsyncValidator=isValid instanceof Promise;if(isAsyncValidator){asyncValidators.push(isValid);isValid.then(isValidatorValid=>{if(isValidatorValid===undefined||isValidatorValid===null){return}validity[key]=!isValidatorValid;validationMessage=__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_getValidatorMessageForValue).call(this,validator,value);__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_setValidityWithOptionalTarget).call(this,validity,validationMessage)})}else{validity[key]=!isValid;if(this.validity[key]!==!isValid){hasChange=true}if(!isValid&&!validationMessage){validationMessage=__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_getValidatorMessageForValue).call(this,validator,value)}}});Promise.allSettled(asyncValidators).then(()=>{if(!abortController?.signal.aborted){__classPrivateFieldSet(this,_FormControl_isValidationPending,false,"f");__classPrivateFieldGet(this,_FormControl_validationCompleteResolver,"f")?.call(this)}});if(hasChange||!hasAsyncValidators){__classPrivateFieldGet(this,_FormControl_instances,"m",_FormControl_setValidityWithOptionalTarget).call(this,validity,validationMessage)}},_FormControl_setValidityWithOptionalTarget=function _FormControl_setValidityWithOptionalTarget(validity,validationMessage){if(this.validationTarget){this.internals.setValidity(validity,validationMessage,this.validationTarget);__classPrivateFieldSet(this,_FormControl_awaitingValidationTarget,false,"f")}else{this.internals.setValidity(validity,validationMessage);if(this.internals.validity.valid){return}__classPrivateFieldSet(this,_FormControl_awaitingValidationTarget,true,"f")}},_FormControl_getValidatorMessageForValue=function _FormControl_getValidatorMessageForValue(validator,value){if(this.validityCallback){const message=this.validityCallback(validator.key||"customError");if(message){return message}}if(validator.message instanceof Function){return validator.message(this,value)}else{return validator.message}};return FormControl}const FormMethodsMixin=superClass=>{class FocusMethodsMixinClass extends superClass{focus(options){this.getInputRef()?.focus(options)}blur(){this.getInputRef()?.blur()}select(){const inputRef=this.getInputRef();if(inputRef&&"select"in inputRef){inputRef?.select?.()}else{throw new Error("Element is not selectable.")}}}return FocusMethodsMixinClass};const HasFirstUpdate=superClass=>{class HasFirstUpdateClass extends superClass{constructor(){super(...arguments);this.hasFirstUpdateRun=false}willUpdate(changedProperties){if(!this.hasFirstUpdateRun){this.willFirstUpdate(changedProperties)}super.willUpdate(changedProperties)}update(changedProperties){if(!this.hasFirstUpdateRun){this.firstUpdate(changedProperties)}super.update(changedProperties)}updated(changedProperties){if(!this.hasFirstUpdateRun){this.hasFirstUpdateRun=true}super.updated(changedProperties)}firstUpdate(changedProperties){}willFirstUpdate(changedProperties){}}return HasFirstUpdateClass};var vcdk_element=__webpack_require__(6260);const checkboxStyles=(0,lit.AH)`
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
`;class CheckboxChangeEvent extends CustomEvent{constructor(checked,value,nativeEvent){super("vcdk-checkbox-change",{detail:{checked,value,nativeEvent},bubbles:true,composed:true,cancelable:true})}}var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Checkbox=class Checkbox extends(FormMethodsMixin(FormControlMixin(HasFirstUpdate(vcdk_element.l)))){constructor(){super(...arguments);this.label="";this.checked=false;this.size="medium";this.uniqueCheckboxId=(0,uniqueId.A)("vcdk-checkbox-");this.input=(0,ref._)();this.groupContext=new context.G(this,{context:checkboxGroupContext,subscribe:true});this.checkedChanged=()=>{this.setFormValue(this.checked)};this.changeHandler=async e=>{const target=e.target;await this.setCheckedValue(target.checked,e)};this.getInputRef=()=>this.shadowRoot?.querySelector("input")??null}setFormValue(checked){const checkboxFormValue=this.getCheckboxFormValue(checked);this.setValue(checkboxFormValue)}willFirstUpdate(changedProperties){if(changedProperties.has("defaultChecked")){this.checked=this.defaultChecked}}shouldFormValueUpdate(){return true}resetFormControl(){void this.setCheckedValue(this.defaultChecked??false);if(this.input.value){this.input.value.checked=this.defaultChecked??false}}async setCheckedValue(checked,e){this.setFormValue(checked);if(checked===this.checked){return}this.checked=checked;await this.updateComplete;this.dispatchEvent(new CustomEvent("change",{detail:{checked,value:this.value,nativeEvent:e},bubbles:true,composed:true}));this.dispatchEvent(new CheckboxChangeEvent(checked,checked.toString(),e))}getCheckboxFormValue(checked){return checked?this.value||"on":null}render(){const hasError=this.error||this.groupContext.value?.error;const isDisabled=this.disabled||this.groupContext.value?.disabled;const size=this.groupContext.value?.size||this.size;const{label,checked,changeHandler,intermediate}=this;const isIntermediate=Boolean(intermediate||checked===undefined);const ariaChecked=isIntermediate?"mixed":checked?"true":"false";const checkboxId=this.id||this.uniqueCheckboxId;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({checkbox:true,"is-disabled":!!isDisabled,"has-error":!!hasError,"is-intermediate":isIntermediate,[`size-${size}`]:!!size})}>
        <input
          ${(0,ref.K)(this.input)}
          id=${checkboxId}
          type="checkbox"
          role="checkbox"
          @change=${changeHandler}
          .checked=${isIntermediate?undefined:(0,live.V)(checked)}
          ?disabled=${isDisabled}
          .value=${isIntermediate?undefined:this.value}
          aria-checked=${ariaChecked}
          aria-label=${(0,if_defined_or_string_empty.m)(this.ariaLabel)}
          name=${(0,if_defined_or_string_empty.m)(this.name||checkboxId)}
          ?readonly=${(0,if_defined_or_string_empty.m)(this.readonly)}
          tabindex=${(0,if_defined_or_string_empty.m)(this.tabindex)} />

        ${(0,when.z)(!isIntermediate&&this.checked,()=>(0,lit.qy)`
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
        ${(0,when.z)(isIntermediate,()=>(0,lit.qy)`
            <svg
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="state-icon intermediate">
              <path d="M3 3H13V5H3V3Z" />
            </svg>
          `)}
        ${(0,when.z)(label,()=>(0,lit.qy)`
            <label
              part="label"
              for=${checkboxId}
              class=${(0,class_map.H)({"typography-body":this.size==="medium","typography-caption1":this.size==="small"})}>
              ${label}
            </label>
          `)}
      </div>
    `}};Checkbox.styles=[checkboxStyles,typography_styles.IT.caption1,typography_styles.IT.body];__decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"label",void 0);__decorate([(0,decorators.MZ)({type:Boolean})],Checkbox.prototype,"error",void 0);__decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Checkbox.prototype,"checked",void 0);__decorate([(0,decorators.MZ)({attribute:false})],Checkbox.prototype,"defaultChecked",void 0);__decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Checkbox.prototype,"disabled",void 0);__decorate([(0,decorators.MZ)({type:String,reflect:true})],Checkbox.prototype,"name",void 0);__decorate([(0,decorators.MZ)({type:Boolean})],Checkbox.prototype,"readonly",void 0);__decorate([(0,decorators.MZ)({type:Number})],Checkbox.prototype,"tabindex",void 0);__decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"value",void 0);__decorate([(0,decorators.MZ)({type:Boolean})],Checkbox.prototype,"intermediate",void 0);__decorate([(0,decorators.MZ)({type:String})],Checkbox.prototype,"size",void 0);__decorate([watch("checked")],Checkbox.prototype,"checkedChanged",void 0);Checkbox=__decorate([(0,custom_element.E)("vcdk-checkbox")],Checkbox);var system_icon=__webpack_require__(2932);class ChipClickEvent extends CustomEvent{constructor(selected){super("vcdk-chip-click",{detail:{source:"chip",selected},bubbles:true,composed:true})}}class ChipRemoveEvent extends CustomEvent{constructor(){super("vcdk-chip-remove",{detail:{source:"close-button"},bubbles:true,composed:true})}}const chipStyles=(0,lit.AH)`
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
`;var chip_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Chip=class Chip extends vcdk_element.l{constructor(){super(...arguments);this.selected=false;this.removable=false;this.removeAriaLabel="";this.handleChipClick=()=>{this.dispatchEvent(new ChipClickEvent(this.selected??false))};this.handleRemoveClick=()=>{this.dispatchEvent(new ChipRemoveEvent)};this.handleKeyDown=event=>{if(event.key==="Enter"||event.code==="Space"){this.handleRemoveClick()}}}render(){const{selected,iconStart,iconEnd,removable,removeAriaLabel,disabled,form,formaction,formenctype,formmethod,formnovalidate,formtarget,name,type,value,size}=this;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({"chip-wrapper":true,"typography-caption1":size==="small","typography-caption2":size!=="small","size-small":size==="small",selected:!!selected,disabled:!!disabled})}>
        <button
          class=${(0,class_map.H)({"chip-button":true})}
          @click=${this.handleChipClick}
          form=${(0,if_defined_or_string_empty.m)(form)}
          ?disabled=${disabled}
          ?selected=${selected}
          formaction=${(0,if_defined_or_string_empty.m)(formaction)}
          formenctype=${(0,if_defined_or_string_empty.m)(formenctype)}
          formmethod=${(0,if_defined_or_string_empty.m)(formmethod)}
          ?formnovalidate=${formnovalidate}
          formtarget=${(0,if_defined_or_string_empty.m)(formtarget)}
          name=${(0,if_defined_or_string_empty.m)(name)}
          type=${type??"button"}
          value=${(0,if_defined_or_string_empty.m)(value)}>
          ${iconStart&&(0,lit.qy)`
            <vcdk-system-icon .size=${16} .icon=${iconStart}></vcdk-system-icon>
          `}
          <slot
            class=${(0,class_map.H)({text:1})}></slot>
          ${iconEnd&&(0,lit.qy)`
            <vcdk-system-icon .size=${16} .icon=${iconEnd}></vcdk-system-icon>
          `}
        </button>
        ${(0,when.z)(removable,()=>(0,lit.qy)`
            <vcdk-icon-button
              class=${(0,class_map.H)({"chip-button-close":true,selected:!!selected,disabled:!!disabled})}
              ?disabled=${disabled}
              @click=${this.handleRemoveClick}
              @keydown=${this.handleKeyDown}
              aria-label=${(0,if_defined_or_string_empty.m)(removeAriaLabel)}
              size="extra-small"
              icon="close"></vcdk-icon-button>
          `)}
      </div>
    `}};Chip.styles=[chipStyles,typography_styles.IT.caption1,typography_styles.IT.caption2];chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"selected",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"iconEnd",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"iconStart",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"size",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"removable",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"removeAriaLabel",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"disabled",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"form",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formaction",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formenctype",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formmethod",void 0);chip_component_decorate([(0,decorators.MZ)({type:Boolean})],Chip.prototype,"formnovalidate",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"formtarget",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"name",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"type",void 0);chip_component_decorate([(0,decorators.MZ)({type:String})],Chip.prototype,"value",void 0);Chip=chip_component_decorate([(0,custom_element.E)("vcdk-chip")],Chip);var breakpoints=__webpack_require__(8128);const chipsStyles=(0,lit.AH)`
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
    `}};Chips.styles=[chipsStyles];chips_component_decorate([(0,decorators.MZ)({type:String})],Chips.prototype,"size",void 0);Chips=chips_component_decorate([(0,custom_element.E)("vcdk-chips")],Chips);class CloseEvent extends CustomEvent{constructor(bubbles=true){super("vcdk-close",{bubbles,composed:true,cancelable:true})}}var flatten=__webpack_require__(663);function querySlot(slotName,selector){return(target,propertyKey)=>{const slotSelector="slot"+(slotName?`[name=${slotName}]`:":not([name])");Object.defineProperty(target,propertyKey,{get(){const slot=this.renderRoot?.querySelector(slotSelector);const elements=slot?.assignedElements({flatten:true})??[];const firstLevelDeepElements=elements.filter(node=>node.matches(selector));const nestedFilteredElements=(0,flatten.A)(elements.filter(t=>t instanceof HTMLElement).map(element=>Array.from(element.querySelectorAll(selector))));return[...firstLevelDeepElements,...nestedFilteredElements]}})}}var if_defined=__webpack_require__(31);const iconButtonStyles=(0,lit.AH)`
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
`;var icon_button_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let IconButton=class IconButton extends vcdk_element.l{constructor(){super(...arguments);this.icon="home";this.size="medium";this.variant="tertiary";this.buttonAriaExpanded=false;this.buttonAriaHaspopup=false;this.autofocus=false;this.clickHandler=e=>{if(this.disabled){e.preventDefault();e.stopPropagation();return}}}render(){const{href,size,icon,filled,disabled,form,buttonAriaLabel,title,variant,type}=this;const buttonClasses={[`variant-${variant}`]:true,[`size-${size}`]:true};const template=(0,lit.qy)`
      <vcdk-system-icon
        exportparts="svg"
        .icon=${icon}
        ?filled=${filled}
        element-role="presentation"></vcdk-system-icon>
    `;if(href)return(0,lit.qy)`
        <a
          part="button"
          title=${(0,if_defined_or_string_empty.m)(title)}
          aria-label=${(0,if_defined_or_string_empty.m)(buttonAriaLabel)}
          aria-disabled=${disabled?"true":lit.s6}
          role=${(0,if_defined_or_string_empty.m)(this.buttonRole)}
          @click=${this.clickHandler}
          class=${(0,class_map.H)(buttonClasses)}
          href=${href}
          download=${(0,if_defined_or_string_empty.m)(this.download)}
          hreflang=${(0,if_defined_or_string_empty.m)(this.hreflang)}
          ping=${(0,if_defined_or_string_empty.m)(this.ping)}
          referrerpolicy=${(0,if_defined_or_string_empty.m)(this.referrerPolicy)}
          rel=${(0,if_defined_or_string_empty.m)(this.rel)}
          target=${(0,if_defined_or_string_empty.m)(this.target)}
          type=${(0,if_defined_or_string_empty.m)(type)}
          ?autofocus=${(0,if_defined.J)(this.autofocus)}>
          ${template}
        </a>
      `;return(0,lit.qy)`
      <button
        part="button"
        title=${(0,if_defined_or_string_empty.m)(title)}
        role=${(0,if_defined_or_string_empty.m)(this.buttonRole)}
        aria-label=${(0,if_defined_or_string_empty.m)(buttonAriaLabel)}
        aria-disabled=${disabled?"true":lit.s6}
        aria-controls=${(0,if_defined_or_string_empty.m)(this.buttonAriaControls)}
        aria-expanded=${this.buttonAriaExpanded?"true":lit.s6}
        aria-haspopup=${this.buttonAriaHaspopup?"true":lit.s6}
        @click=${this.clickHandler}
        class=${(0,class_map.H)(buttonClasses)}
        form=${(0,if_defined_or_string_empty.m)(form)}
        formaction=${(0,if_defined_or_string_empty.m)(this.formaction)}
        formenctype=${(0,if_defined_or_string_empty.m)(this.formenctype)}
        formmethod=${(0,if_defined_or_string_empty.m)(this.formmethod)}
        ?formnovalidate=${this.formnovalidate}
        formtarget=${(0,if_defined_or_string_empty.m)(this.formtarget)}
        name=${(0,if_defined_or_string_empty.m)(this.name)}
        type=${type??"button"}
        value=${(0,if_defined_or_string_empty.m)(this.value)}
        ?autofocus=${(0,if_defined.J)(this.autofocus)}>
        ${template}
      </button>
    `}};IconButton.styles=[iconButtonStyles];icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"icon",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"size",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"variant",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"filled",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"download",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"href",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"hreflang",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"ping",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"referrerPolicy",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"rel",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"target",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"disabled",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"form",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"formaction",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"formenctype",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"formmethod",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"formnovalidate",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"formtarget",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],IconButton.prototype,"name",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"type",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:String})],IconButton.prototype,"value",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-role"})],IconButton.prototype,"buttonRole",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-aria-label"})],IconButton.prototype,"buttonAriaLabel",void 0);icon_button_component_decorate([(0,decorators.MZ)({attribute:"button-aria-controls"})],IconButton.prototype,"buttonAriaControls",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"button-aria-expanded"})],IconButton.prototype,"buttonAriaExpanded",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"button-aria-haspopup"})],IconButton.prototype,"buttonAriaHaspopup",void 0);icon_button_component_decorate([(0,decorators.MZ)({type:Boolean})],IconButton.prototype,"autofocus",void 0);IconButton=icon_button_component_decorate([(0,custom_element.E)("vcdk-icon-button")],IconButton);const characterCounter=(currentLength,maxLength)=>(0,lit.qy)`
  <div
    class="character-counter typography-caption2"
    part="character-counter"
    aria-hidden="true">
    ${`${currentLength} / ${maxLength}`}
  </div>
`;const textFieldStyles=(0,lit.AH)`
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
`;var text_field_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const exportparts="fieldset, label, input-wrapper, input, before-input, after-input, icon";let TextField=class TextField extends(FormMethodsMixin(FormControlMixin(HasFirstUpdate(vcdk_element.l)))){constructor(){super();this.size="medium";this.autocapitalize="none";this.placeholder="";this.spellcheck=false;this.tabIndex=0;this.type="text";this.value="";this.wrap="soft";this.hasFocus=false;this.uid=(0,uniqueId.A)("vcdk-text-field-");this.onValueChanged=()=>{this.setValue(this.value??null)};this.eventDispatcher=(e,type)=>{e.stopPropagation();const eventInitDict={detail:{value:e.target.value,nativeEvent:e},bubbles:true,composed:true};this.dispatchEvent(new CustomEvent(type,eventInitDict));this.dispatchEvent(new CustomEvent(`vcdk-${type}`,eventInitDict));this.value=e.target.value;this.setValue(this.value)};this.blurHandler=e=>{this.hasFocus=false;this.eventDispatcher(e,"blur")};this.focusHandler=e=>{this.hasFocus=true;this.eventDispatcher(e,"focus")};this.clickButtonHandler=()=>{this.dispatchEvent(new CustomEvent("click-button",{bubbles:true,composed:true}));this.dispatchEvent(new CustomEvent("vcdk-click-button",{bubbles:true,composed:true}))};this.inputRef=(0,ref._)();this.getInputRef=()=>this.inputRef.value??null;this.inputAriaDescribedBy=this.inputAriaDescribedBy||(0,uniqueId.A)("caption-")}willFirstUpdate(changedProperties){if(changedProperties.has("defaultValue")){this.value=this.defaultValue??""}}formAssociatedCallback(){if(this.value){this.setValue(this.value)}}resetFormControl(){this.setValue(this.defaultValue??"");this.value=this.defaultValue??""}shouldFormValueUpdate(){return true}get counterAbove(){return!this.floatingLabel&&this.characterCounter&&this.maxlength}get counterBelow(){return this.floatingLabel&&this.characterCounter&&this.maxlength}render(){const{required,label,rows,helperText,icon,size,disabled,floatingLabel,value,error,readonly}=this;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({"text-field":1,"floating-label":!!floatingLabel,"has-value":!!value,disabled:!!disabled,error:!!error,readonly:!!readonly,[size]:!!size})}>
        <fieldset part="fieldset">
          <div class="container">
            ${(0,when.z)(label,()=>(0,lit.qy)`
                <label
                  for=${this.uid}
                  class=${(0,class_map.H)({"typography-subtitle1":!!this.floatingLabel&&!this.hasFocus&&!this.value,"typography-subtitle2":!this.floatingLabel||this.floatingLabel&&(this.hasFocus||!!this.value)})}
                  part="label">
                  ${label}${required?" *":""}
                </label>
              `)}
            ${(0,when.z)(this.counterAbove,()=>characterCounter(this.value?.length,this.maxlength))}
          </div>

          <div class="input-wrapper" part="input-wrapper">
            <slot part="before-input" name="before-input"></slot>

            ${(0,when.z)(rows,()=>(0,lit.qy)`
                <textarea
                  ${(0,ref.K)(this.inputRef)}
                  id=${this.uid}
                  aria-invalid=${this.error?true:false}
                  aria-describedby=${(0,if_defined_or_string_empty.m)(this.inputAriaDescribedBy)}
                  part="input"
                  class=${(0,class_map.H)({"typography-caption1":this.size==="small","typography-body":this.size!=="small"})}
                  @blur=${this.blurHandler}
                  @focus=${this.focusHandler}
                  @change=${e=>this.eventDispatcher(e,"change")}
                  @input=${e=>this.eventDispatcher(e,"input")}
                  @keyup=${e=>this.eventDispatcher(e,"keyup")}
                  @keydown=${e=>this.eventDispatcher(e,"keydown")}
                  rows=${(0,if_defined_or_string_empty.m)(this.rows)}
                  autocapitalize=${this.autocapitalize}
                  autocomplete=${(0,if_defined_or_string_empty.m)(this.autocomplete)}
                  dirname=${(0,if_defined_or_string_empty.m)(this.dirname)}
                  ?disabled=${this.disabled}
                  aria-label=${(0,if_defined_or_string_empty.m)(this.inputAriaLabel)}
                  max=${(0,if_defined.J)(this.max)}
                  maxlength=${(0,if_defined.J)(this.maxlength)}
                  min=${(0,if_defined.J)(this.min)}
                  minlength=${(0,if_defined.J)(this.minlength)}
                  name=${(0,if_defined_or_string_empty.m)(this.name)}
                  placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
                  ?readonly=${this.readonly}
                  ?required=${this.required}
                  tabindex=${(0,if_defined.J)(this.tabIndex)}
                  spellcheck=${this.spellcheck}
                  step=${(0,if_defined.J)(this.step)}
                  wrap=${(0,if_defined_or_string_empty.m)(this.wrap)}
                  .value=${this.value}></textarea>
              `,()=>(0,lit.qy)`
                <input
                  ${(0,ref.K)(this.inputRef)}
                  data-testid="input"
                  part="input"
                  id=${this.uid}
                  class=${(0,class_map.H)({"typography-caption1":this.size==="small","typography-body":this.size!=="small"})}
                  aria-invalid=${this.error?true:false}
                  aria-describedby=${(0,if_defined_or_string_empty.m)(this.inputAriaDescribedBy)}
                  aria-label=${(0,if_defined_or_string_empty.m)(this.inputAriaLabel)}
                  @blur=${this.blurHandler}
                  @focus=${this.focusHandler}
                  @change=${e=>this.eventDispatcher(e,"change")}
                  @input=${e=>this.eventDispatcher(e,"input")}
                  @keyup=${e=>this.eventDispatcher(e,"keyup")}
                  @keydown=${e=>this.eventDispatcher(e,"keydown")}
                  autocapitalize=${this.autocapitalize}
                  autocomplete=${(0,if_defined_or_string_empty.m)(this.autocomplete)}
                  dirname=${(0,if_defined_or_string_empty.m)(this.dirname)}
                  ?disabled=${this.disabled}
                  list=${(0,if_defined_or_string_empty.m)(this.list)}
                  max=${(0,if_defined.J)(this.max)}
                  maxlength=${(0,if_defined.J)(this.maxlength)}
                  min=${(0,if_defined.J)(this.min)}
                  minlength=${(0,if_defined.J)(this.minlength)}
                  ?multiple=${this.multiple}
                  name=${(0,if_defined_or_string_empty.m)(this.name)}
                  pattern=${(0,if_defined_or_string_empty.m)(this.pattern)}
                  placeholder=${this.floatingLabel&&!this.hasFocus?"":this.placeholder}
                  ?readonly=${this.readonly}
                  ?required=${this.required}
                  step=${(0,if_defined.J)(this.step)}
                  tabindex=${(0,if_defined.J)(this.tabIndex)}
                  type=${(0,if_defined_or_string_empty.m)(this.type)}
                  .value=${this.value} />
              `)}
            <slot part="after-input" name="after-input">
              ${(0,when.z)(icon&&!rows,()=>(0,lit.qy)`
                  <vcdk-icon-button
                    part="icon"
                    tabindex="-1"
                    .buttonAriaLabel=${this.iconAriaLabel}
                    .icon=${icon}
                    ?disabled=${disabled}
                    @click=${this.clickButtonHandler}></vcdk-icon-button>
                `)}
            </slot>
          </div>
        </fieldset>

        <div class="container">
          ${(0,when.z)(helperText,()=>(0,lit.qy)`
              <p
                class="helper-text typography-caption2"
                id=${(0,if_defined_or_string_empty.m)(this.inputAriaDescribedBy)}>
                ${helperText}
              </p>
            `)}
          ${(0,when.z)(this.counterBelow,()=>characterCounter(this.value?.length,this.maxlength))}
        </div>
      </div>
    `}};TextField.styles=[textFieldStyles,typography_styles.IT.body,typography_styles.IT.caption1,typography_styles.IT.caption2,typography_styles.IT.subtitle1,typography_styles.IT.subtitle2];text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"size",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"error",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"floatingLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"helperText",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"icon",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"icon-aria-label"})],TextField.prototype,"iconAriaLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"label",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"rows",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"input-aria-describedby"})],TextField.prototype,"inputAriaDescribedBy",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,attribute:"input-aria-label"})],TextField.prototype,"inputAriaLabel",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"autocapitalize",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"autocomplete",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"dirname",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"disabled",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Object})],TextField.prototype,"list",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"max",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"maxlength",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"min",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"minlength",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"multiple",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],TextField.prototype,"name",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"pattern",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"placeholder",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"readonly",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"required",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean})],TextField.prototype,"spellcheck",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"step",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Number})],TextField.prototype,"tabIndex",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"type",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"value",void 0);text_field_component_decorate([(0,decorators.MZ)({attribute:false})],TextField.prototype,"defaultValue",void 0);text_field_component_decorate([(0,decorators.MZ)({type:String})],TextField.prototype,"wrap",void 0);text_field_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"character-counter"})],TextField.prototype,"characterCounter",void 0);text_field_component_decorate([(0,decorators.wk)()],TextField.prototype,"hasFocus",void 0);text_field_component_decorate([watch("value")],TextField.prototype,"onValueChanged",void 0);TextField=text_field_component_decorate([(0,custom_element.E)("vcdk-text-field")],TextField);var map=__webpack_require__(1926);var style_map=__webpack_require__(1145);const commonKeys={arrowLeft:"ArrowLeft",arrowRight:"ArrowRight",arrowUp:"ArrowUp",arrowDown:"ArrowDown",enterKey:"Enter",spaceBar:" ",escapeKey:"Escape",homeKey:"Home",endKey:"End",pageUpKey:"PageUp",pageDownKey:"PageDown",tabKey:"Tab",altKey:"Alt",ctrlKey:"Ctrl",metaKey:"Meta",shiftKey:"Shift"};const __modifiers=new Set([commonKeys.altKey,commonKeys.ctrlKey,commonKeys.metaKey,commonKeys.shiftKey].map(key=>key.toLowerCase()));const defaultOptions={skip:["input","textarea","select"]};function normalizeKeys(keys){return(Array.isArray(keys)?keys:[keys]).map(key=>key.toLowerCase())}function isModifier(key){return __modifiers.has(key)}function isKeydown(event){return event.type==="keydown"}function isKeyup(event){return event.type==="keyup"}function isKeydownTrigger(triggers){return triggers?triggers.includes("keydown")||isKeydownRepeatTrigger(triggers):false}function isKeyupTrigger(triggers){return triggers?triggers.includes("keyup"):false}function isKeydownRepeatTrigger(triggers){return triggers?triggers.includes("keydownRepeat"):false}function parseKeys(keys){const parsed=normalizeKeys(keys);return{keys:parsed.filter(key=>!isModifier(key)),modifiers:parsed.filter(key=>isModifier(key))}}function getEvent(event){return"key"in event?event:event.detail.nativeEvent}class KeyBindingController{get _element(){if(this._observedElement){return this._observedElement}return this._host}observeElement(element){element.addEventListener("keydown",this);element.addEventListener("keyup",this);this._observedElement=element;return{unsubscribe:()=>{this._observedElement?.removeEventListener("keydown",this);this._observedElement?.removeEventListener("keyup",this);this._observedElement=undefined}}}constructor(host,options){this.bindings=new Set;this.pressedKeys=new Set;this._host=host;this._options={...defaultOptions,...options};host.addController(this)}eventModifiersMatch(binding,event){if(binding.options?.preventDefault){event.preventDefault()}if(binding.options?.stopPropagation){event.stopPropagation()}}keysMatch(binding,event){const modifiers=binding.modifiers??[];return binding.keys.every(key=>this.pressedKeys.has(key))&&modifiers.every(mod=>!!event[`${mod}Key`])}bindingMatches(binding,event){const triggers=binding.options?.triggers??["keydown"];if(!this.keysMatch(binding,event)){return false}if(isKeydown(event)&&isKeydownTrigger(triggers)){return true}if(isKeyup(event)&&isKeyupTrigger(triggers)){return true}return false}handleEvent(customEvent){const event=getEvent(customEvent);const key=event.key.toLowerCase();const path=event.composedPath();if(!this._element||!path.includes(this._element)){return}if(isModifier(key)){this.pressedKeys.clear()}if(isKeydown(event)&&!isModifier(key)){this.pressedKeys.add(key)}for(const binding of this.bindings){if(this.bindingMatches(binding,event)){this.eventModifiersMatch(binding,event);binding.handler.call(this._host,event);if(isKeydownRepeatTrigger(binding.options?.triggers)){this.pressedKeys.delete(key)}}}if(isKeyup(event)&&!isModifier(key)){this.pressedKeys.delete(key)}}set(key,fn,options){this.bindings.add({...parseKeys(key),handler:fn,options:{...this._options?.bindingDefaults,...options}});return this}hostConnected(){this._host.addEventListener("keyup",this);this._host.addEventListener("keydown",this)}hostDisconnected(){this._host.removeEventListener("keyup",this);this._host.removeEventListener("keydown",this)}}function addKeybindings(element,options){return new KeyBindingController(element,options)}const dropdownContext=(0,context.q6)("vcdk-dropdown");class MultiDropdownChangeEvent extends CustomEvent{constructor(options,prefix=""){super(`${prefix}change`,{detail:options?.map(option=>({value:option.value,label:option.textContent?.trim()??""}))??[],bubbles:true,composed:true})}}const getDropdownOptionTextContent=option=>{if(option?.text)return option.text;return option?.getTextContent()};class DropdownChangeEvent extends CustomEvent{constructor(option,prefix=""){const text=getDropdownOptionTextContent(option);super(`${prefix}change`,{detail:{value:option?.value??text??"",label:text??""},bubbles:true,composed:true})}}class DropdownInputEvent extends CustomEvent{constructor(value){super("vcdk-dropdown-input",{detail:{value},bubbles:true,composed:true})}}const dropdownStyles=(0,lit.AH)`
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
  .popover {
    display: none;
    position: fixed;
    isolation: isolate;
    z-index: var(--vcdk-z-index-dropdown-popover);
  }

  .popover.open {
    display: block;
  }
`;var typography_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let Typography=class Typography extends vcdk_element.l{constructor(){super(...arguments);this.variant="body"}render(){return(0,lit.qy)`
      <slot
        class=${(0,class_map.H)({[`typography-${this.variant}`]:1})}
        part="slot"></slot>
    `}};Typography.styles=[...typography_styles.FB,typography_styles.gI];typography_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Typography.prototype,"variant",void 0);Typography=typography_component_decorate([(0,custom_element.E)("vcdk-typography")],Typography);var option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownOption=class DropdownOption extends vcdk_element.l{constructor(){super(...arguments);this.active=false;this.disabled=false;this.selected=false;this.hidden=false;this.checkbox=false;this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true})}get _contentSlotText(){return this._content.map(node=>this.text||node.textContent?.trim()).join("")}get value(){return this._value??this._contentSlotText}set value(value){const old=this._value;this._value=value;this.requestUpdate("value",old)}getTextContent(){return this._contentSlotText}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;const isSmallSize=size==="small";return(0,lit.qy)`
      <div
        role="option"
        part="option"
        class=${(0,class_map.H)({option:1,disabled:this.disabled,selected:this.selected,checkbox:this.checkbox,active:this.active,"typography-body":!isSmallSize,"typography-caption1":isSmallSize,hidden:this.hidden,[size]:true})}
        tabindex="0"
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}>
        ${(0,when.z)(this.checkbox,()=>(0,lit.qy)`
            <vcdk-checkbox
              label=""
              size=${isSmallSize?"small":"medium"}
              tabindex="-1"
              @change=${event=>event.stopPropagation()}
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
    `}};DropdownOption.styles=[typography_styles.IT.caption1,typography_styles.IT.body,optionStyles,optionButtonStyle];option_component_decorate([(0,decorators.gZ)({flatten:true,slot:""})],DropdownOption.prototype,"_content",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"active",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"disabled",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"selected",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownOption.prototype,"hidden",void 0);option_component_decorate([(0,decorators.MZ)({type:Boolean})],DropdownOption.prototype,"checkbox",void 0);option_component_decorate([(0,decorators.MZ)({type:String})],DropdownOption.prototype,"text",void 0);option_component_decorate([(0,decorators.MZ)()],DropdownOption.prototype,"value",null);DropdownOption=option_component_decorate([(0,custom_element.E)("vcdk-dropdown-option")],DropdownOption);var floating_ui_dom=__webpack_require__(7663);var vcdk_element_vcdk_element=__webpack_require__(2871);var debounce=__webpack_require__(1708);function isHidden($elem){return $elem.hasAttribute("hidden")||$elem.hasAttribute("aria-hidden")&&$elem.getAttribute("aria-hidden")!=="false"||$elem.style.display===`none`||$elem.style.opacity===`0`||$elem.style.visibility===`hidden`||$elem.style.visibility===`collapse`}function isDisabled($elem){return $elem.hasAttribute("disabled")||$elem.hasAttribute("aria-disabled")&&$elem.getAttribute("aria-disabled")!=="false"}function isFocusable($elem){if($elem.getAttribute("tabindex")==="-1"||isHidden($elem)||isDisabled($elem)){return false}return $elem.hasAttribute("tabindex")||($elem instanceof HTMLAnchorElement||$elem instanceof HTMLAreaElement)&&$elem.hasAttribute("href")||$elem instanceof HTMLButtonElement||$elem instanceof HTMLInputElement||$elem instanceof HTMLTextAreaElement||$elem instanceof HTMLSelectElement||$elem.tagName==="SUMMARY"||$elem instanceof HTMLIFrameElement}function queryShadowRoot(root,skipNode,isMatch,maxDepth=20,depth=0){const matches=[];if(depth>=maxDepth){return matches}const traverseSlot=$slot=>{const assignedNodes=$slot.assignedNodes().filter(node=>node.nodeType===1);if(assignedNodes.length>0){const $slotParent=assignedNodes[0].parentElement;return queryShadowRoot($slotParent,skipNode,isMatch,maxDepth,depth+1)}return[]};const children=Array.from(root.children||[]);for(const $child of children){if(skipNode($child)){continue}if(isMatch($child)){matches.push($child)}if($child.shadowRoot!=null){matches.push(...queryShadowRoot($child.shadowRoot,skipNode,isMatch,maxDepth,depth+1))}else if($child.tagName==="SLOT"){matches.push(...traverseSlot($child))}else{matches.push(...queryShadowRoot($child,skipNode,isMatch,maxDepth,depth+1))}}return matches}var focus_trap_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let FocusTrap=class FocusTrap extends vcdk_element_vcdk_element.l{getFocusableElements(){return queryShadowRoot(this,isHidden,isFocusable)}constructor(){super();this.focusedIndex=0;this.inactive=false;this.focused=false;this.enableDirectionalKeys=false;this.$backup=(0,ref._)();this.$start=(0,ref._)();this.$end=(0,ref._)();this.onKeyDown=event=>{const focusableElements=this.getFocusableElements();switch(event.key){case"ArrowUp":{event.preventDefault();const element=focusableElements[this.focusedIndex-1];if(element){element.focus()}else{this.focusLastElement()}break}case"ArrowDown":{event.preventDefault();const element=focusableElements[this.focusedIndex+1];if(element){element.focus()}else{this.focusFirstElement()}break}case"Home":event.preventDefault();this.focusFirstElement();break;case"End":event.preventDefault();this.focusLastElement();break}};this.focusFirstElement=()=>{this.trapFocus()};this.focusLastElement=()=>{this.trapFocus(true)};this.updateFocused=(0,debounce.A)(value=>{this.dispatchFocusedEvents(value);this.focused=value},0);this.onFocusIn=this.onFocusIn.bind(this);this.onFocusOut=this.onFocusOut.bind(this)}connectedCallback(){super.connectedCallback();this.addEventListener("focusin",this.onFocusIn);this.addEventListener("focusout",this.onFocusOut)}disconnectedCallback(){this.removeEventListener("focusin",this.onFocusIn);this.removeEventListener("focusout",this.onFocusOut);super.disconnectedCallback()}update(changedProperties){if(changedProperties.has("focused")&&this.enableDirectionalKeys){if(this.focused){document.addEventListener("keydown",this.onKeyDown)}else{document.removeEventListener("keydown",this.onKeyDown)}}else if(changedProperties.has("enableDirectionalKeys")&&!this.enableDirectionalKeys){document.removeEventListener("keydown",this.onKeyDown)}super.update(changedProperties)}trapFocus(trapToEnd){if(this.inactive)return;const focusableElements=this.getFocusableElements();if(focusableElements.length>0){if(trapToEnd){focusableElements[focusableElements.length-1].focus()}else{focusableElements[0].focus()}this.$backup.value?.setAttribute("tabindex","-1")}else{this.$backup.value?.setAttribute("tabindex","0");this.$backup.value?.focus()}}onFocusIn(event){const focusableElements=this.getFocusableElements();let target=event.target;if(target.shadowRoot){target=target.shadowRoot.activeElement}this.focusedIndex=focusableElements.indexOf(target);this.updateFocused(true)}onFocusOut(){this.updateFocused(false)}dispatchFocusedEvents(value){if(!this.focused&&value){this.dispatchEvent(new Event("vcdk-focusin",{bubbles:true,composed:true}))}if(this.focused&&!value){this.dispatchEvent(new Event("vcdk-focusout",{bubbles:true,composed:true}))}}render(){return(0,lit.qy)`
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
    `}};focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],FocusTrap.prototype,"inactive",void 0);focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],FocusTrap.prototype,"focused",void 0);focus_trap_component_decorate([(0,decorators.MZ)({type:Boolean,attribute:"enable-directional-keys"})],FocusTrap.prototype,"enableDirectionalKeys",void 0);FocusTrap=focus_trap_component_decorate([(0,custom_element.E)("vcdk-focus-trap")],FocusTrap);var popover_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let PopoverComponent=class PopoverComponent extends vcdk_element.l{constructor(){super(...arguments);this.open=false;this.setPositionStyle=async()=>{if(!this.open||!this.target){return}const{y,x,strategy}=await(0,floating_ui_dom.rD)(this.target,this.container,{placement:this.placement??"bottom-start",middleware:this.createMiddleware(),strategy:"fixed"});Object.assign(this.container.style,{position:strategy,top:`${y}px`,left:`${x}px`})};this.anchorSlotChange=async()=>{if(this.anchors.length<1)return;this.target=this.anchors[0];await this.updateState()}}async openChange(){await(this.open?this.updatePosition():this.hide())}connectedCallback(){super.connectedCallback();void this.updateComplete.then(()=>{if(this.open){this.updatePosition()}})}disconnectedCallback(){void this.hide().then(()=>{super.disconnectedCallback()})}updatePosition(){if(!this.target)return;this.dispose=(0,floating_ui_dom.ll)(this.target,this.container,this.setPositionStyle)}async hide(){return new Promise(resolve=>{if(this.dispose){this.dispose();this.dispose=undefined;resolve()}else{resolve()}})}createMiddleware(){const middleware=[];const styles=this.container.style;middleware.push((0,floating_ui_dom.BN)({limiter:(0,floating_ui_dom.ER)()}));if(!this.placement){middleware.push((0,floating_ui_dom.RK)({allowedPlacements:["top","bottom","top-start","bottom-start"]}))}middleware.push((0,floating_ui_dom.Ej)({apply:({rects})=>{Object.assign(styles,{width:`${rects.reference.width}px`})}}));return middleware}async updateState(){if(this.open){await this.hide();this.updatePosition()}}render(){return(0,lit.qy)`
      <slot name="anchor" @slotchange=${this.anchorSlotChange}></slot>
      <div
        id="container"
        class=${(0,class_map.H)({popover:1,open:this.open})}>
        <vcdk-focus-trap enable-directional-keys>
          <slot></slot>
        </vcdk-focus-trap>
      </div>
    `}};PopoverComponent.styles=[popoverStyles];popover_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],PopoverComponent.prototype,"open",void 0);popover_component_decorate([(0,decorators.MZ)({type:String})],PopoverComponent.prototype,"placement",void 0);popover_component_decorate([(0,decorators.P)("#container",true)],PopoverComponent.prototype,"container",void 0);popover_component_decorate([(0,decorators.KN)({slot:"anchor",flatten:true})],PopoverComponent.prototype,"anchors",void 0);popover_component_decorate([watch("open",{waitUntilFirstUpdate:true})],PopoverComponent.prototype,"openChange",null);PopoverComponent=popover_component_decorate([(0,custom_element.E)("vcdk-dropdown-popover")],PopoverComponent);const popover_component=null&&PopoverComponent;var dropdown_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const DROPDOWN_DEFAULT_SIZE="medium";function isOptionSelectable(item){return!item.hidden&&!item.disabled}let Dropdown=class Dropdown extends(FormControlMixin(vcdk_element.l)){connectedCallback(){super.connectedCallback();this.initializeValue();this.handleMultipleChange()}handleMultipleChange(){this.items.forEach(item=>item.checkbox=Boolean(this.multi))}constructor(){super();this.size=DROPDOWN_DEFAULT_SIZE;this.clearable=false;this.multi=false;this.open=false;this.singleChip=false;this.filterInput=false;this.selectedItems=[];this.activeItem=null;this.lastKeyTime=0;this.searchTerm=null;this.dropdownContext={size:this.size};this.wrapperRef=(0,ref._)();this.input=(0,ref._)();this.listboxRef=(0,ref._)();this.setSize=()=>{this.dropdownContext={size:this.size}};this.initializeValue=()=>{if(!this.items.length&&!this.selectedItems.length){return}this.handleMultipleChange();if(this.value!==null&&this.value!==undefined){const selectedOptionsBasedOnValue=this.findOptionsByValue(this.value);const selectedOptionsBasedOnLabel=this.findOptionLabels();this.setDropdownSelectedValues(selectedOptionsBasedOnValue.length?selectedOptionsBasedOnValue:selectedOptionsBasedOnLabel)}else{this.initializeFromSelectedOptions()}const isAnyVisible=this.items.some(item=>!item.hidden);this.emptyOptions.forEach(emptyOption=>{emptyOption.hidden=isAnyVisible});const formCompatibleValue=this.value??null;this.setValue(Array.isArray(formCompatibleValue)?formCompatibleValue.join(", "):formCompatibleValue)};this.initializeFromSelectedOptions=()=>{this.setDropdownSelectedValues(this.items.filter(option=>option.selected))};this.getInputRef=()=>this.textField??null;this.selectValue=optionsToSelect=>{if(optionsToSelect.length<=0){this.value=null;return}if(this.multi){this.value=optionsToSelect.map(({value})=>value).filter(value=>value!==undefined&&value!==null)}else{this.value=optionsToSelect.length>0?optionsToSelect[0].value:null}};this.onClickOutside=e=>{const path=e.composedPath();if(this.wrapperRef?.value&&!path.includes(this.wrapperRef.value)){this.closePopover()}};this.toggleOpen=event=>{const isFromListbox=this.listboxRef?.value&&event.composedPath().includes(this.listboxRef?.value);if(this.readonly||isFromListbox){return}if(!this.open){this.openDropdown();this.focus()}else{this.closePopover()}};this.handleOptionSelected=event=>{const isOption=event.target instanceof DropdownOption;const isAddOption=event.target instanceof DropdownAddOption;if(isAddOption){this.filterOptionsBasedOnSearch(null)}if(isOption&&!event.target.disabled){void this.selectOption(event.target)}if(!this.getDisableOnCloseValue()){this.closePopover();this.focus()}};this.clearActiveOptions=()=>{this.items.forEach(item=>{item.active=false});this.activeItem=null};this.publishChangeEvent=()=>{if(this.multi){this.dispatchEvent(new MultiDropdownChangeEvent(this.selectedItems));this.dispatchEvent(new MultiDropdownChangeEvent(this.selectedItems,"vcdk-dropdown-"))}else{this.dispatchEvent(new DropdownChangeEvent(this.selectedItems[0]));this.dispatchEvent(new DropdownChangeEvent(this.selectedItems[0],"vcdk-dropdown-"))}};this.unselectAllOptions=()=>{const notDisabledItems=this.items.filter(({disabled})=>!disabled);this.setDropdownSelectedValues([]);notDisabledItems.forEach(item=>{item.selected=false});this.dropdownOptionSelectAll.forEach(option=>{option.selected="unchecked"})};this.handleSingleChipClick=async event=>{event.preventDefault();event.stopPropagation();this.unselectAllOptions();if(!this.getDisableOnCloseValue()){this.closePopover();this.focus()}await this.updateComplete;this.publishChangeEvent()};this.handleSelectAllCLick=async()=>{const notDisabledItems=this.items.filter(({disabled})=>!disabled);if(this.selectedItems.length>=notDisabledItems.length){this.unselectAllOptions()}else{this.setDropdownSelectedValues(notDisabledItems);notDisabledItems.forEach(item=>{item.selected=true});this.dropdownOptionSelectAll.forEach(option=>{option.selected="checked"})}if(!this.getDisableOnCloseValue()){this.closePopover();this.focus()}this.popoverContainer.updatePosition();await this.updateComplete;this.publishChangeEvent()};this.preventDefaultKeyboardEvent=customEvent=>{const event=getEvent(customEvent);event.preventDefault()};this.openDropdown=()=>{const isAlreadyOpen=this.open;if(isAlreadyOpen){return}if(this.disabled){return}this.open=true;if(!this.activeItem&&this.selectedItems.length){this.activateItem(this.selectedItems[0])}this.popoverContainer.updatePosition()};this.onSpaceBarKey=customEvent=>{if(!this.open||!this.filterInput){this.preventDefaultKeyboardEvent(customEvent)}if(!this.open){this.openDropdown()}};this.activateItem=item=>{this.clearActiveOptions();if(this.open){item.scrollIntoView({behavior:"auto",block:"nearest"})}this.activeItem=item;this.activeItem.active=true};this.onAltUp=()=>{if(this.activeItem){void this.selectOption(this.activeItem)}this.closePopover();this.focus()};this.onAltDown=()=>{if(this.open){return}this.openDropdown();this.focus()};this.onEscapeKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(this.open){this.closePopover()}};this.setNextActiveElement=(startOption,type)=>{if(this.readonly){return}const firstSelectedOption=this.selectedItems[0]??null;const initialOptionToStartSearching=this.open?this.activeItem:firstSelectedOption;const isGotoStartOrEnd=startOption==="start"||startOption==="end";const item=getNextActiveItem(this.items,isGotoStartOrEnd?startOption:initialOptionToStartSearching,type);if(this.open){this.activateItem(item)}else{void this.selectOption(item)}};this.handleSearch=customEvent=>{if(this.filterInput||this.readonly||this.disabled){return}const event=getEvent(customEvent);if(!/^.$/u.test(event.key)){return}event.preventDefault();const now=Date.now();if(now-this.lastKeyTime>500){this.searchTerm=""}this.lastKeyTime=now;this.searchTerm+=event.key.toLocaleLowerCase();const item=this.items.find(item=>{if(this.searchTerm===null){return false}return item.textContent?.trim().toLocaleLowerCase().startsWith(this.searchTerm)});if(item){this.open?this.activateItem(item):void this.selectOption(item)}};this.onArrowDown=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement(this.activeItem,"forward")};this.onArrowUp=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement(this.activeItem,"backwards")};this.onHomeKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement("start","forward")};this.onEndKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);this.setNextActiveElement("end","backwards")};this.onEnterKey=customEvent=>{this.preventDefaultKeyboardEvent(customEvent);if(this.readonly){return}if(this.open){if(this.activeItem&&isOptionSelectable(this.activeItem)){void this.selectOption(this.activeItem);if(!this.getDisableOnCloseValue()){this.closePopover()}}else{if(this.filterInput&&this.searchTerm&&this.addOption?.length){this.addOption[0].click();this.filterOptionsBasedOnSearch(null);if(!this.getDisableOnCloseValue()){this.closePopover()}}}}else{this.openDropdown()}};this.getDisableOnCloseValue=()=>this.disableCloseOnSelect??this.multi;this.getTextContent=options=>{if(this.filterInput&&this.searchTerm!==null){return this.searchTerm}if(this.multi){return this.selectedItems.length>0?" ":""}const firstOption=options?.[0];return firstOption?getDropdownOptionTextContent(firstOption):""};this.handleSearchInputChange=event=>{if(this.disabled||this.readonly){return}const nativeEventData=!this.searchTerm?event.detail.nativeEvent.data??null:null;const value=nativeEventData??event.detail.value.trimStart();this.dispatchEvent(new DropdownInputEvent(value));this.filterOptionsBasedOnSearch(value);this.popoverContainer.updatePosition();this.openDropdown()};this.filterOptionsBasedOnSearch=value=>{this.searchTerm=value;const nullishValue=[null,undefined,""];let shouldShowEmptyOption=true;this.items.forEach(item=>{if(value===null||nullishValue.includes(value)){item.hidden=false;shouldShowEmptyOption=false;return}if(this.filterOptions){item.hidden=!this.filterOptions(item)}else{item.hidden=!item.textContent?.toLowerCase().includes(value.toLowerCase())}if(!item.hidden){shouldShowEmptyOption=false}});this.emptyOptions.forEach(emptyOption=>{emptyOption.hidden=!shouldShowEmptyOption});this.activeItem=this.activeItem&&isOptionSelectable(this.activeItem)?this.activeItem:this.items.find(item=>isOptionSelectable(item))??null;if(this.activeItem){this.activateItem(this.activeItem)}};addKeybindings(this,{skip:()=>!!this.disabled,bindingDefaults:{triggers:["keydownRepeat"]}}).set([commonKeys.altKey,commonKeys.arrowDown],this.onAltDown).set([commonKeys.altKey,commonKeys.arrowUp],this.onAltUp).set(commonKeys.arrowDown,this.onArrowDown).set(commonKeys.arrowUp,this.onArrowUp).set(commonKeys.escapeKey,this.onEscapeKey).set(commonKeys.homeKey,this.onHomeKey).set(commonKeys.endKey,this.onEndKey).set(commonKeys.spaceBar,this.onSpaceBarKey).set(commonKeys.enterKey,this.onEnterKey);this.addEventListener("keydown",this.handleSearch)}update(changedProperties){if(changedProperties.has("open")){if(this.open){document.addEventListener("mousedown",this.onClickOutside,{passive:true});this.eventCleanup=()=>document.removeEventListener("mousedown",this.onClickOutside)}else{this.eventCleanup?.();this.eventCleanup=undefined}}super.update(changedProperties)}disconnectedCallback(){super.disconnectedCallback();this.eventCleanup?.()}focus(){void this.updateComplete.then(()=>{this.getInputRef()?.focus()})}select(){this.getInputRef()?.select()}blur(){this.getInputRef()?.blur()}setDropdownSelectedValues(optionsToSelect){this.selectedItems=optionsToSelect;this.items.forEach(item=>item.selected=false);optionsToSelect.map(option=>option.selected=true);this.selectValue(optionsToSelect);this.syncSelectAllOptionCheckboxValue()}findOptionsByValue(value){return this.items.filter(item=>{if(this.multi){return value?.includes(item.value)}else{return item.value===value}})}findOptionLabels(){return this.items.filter(item=>{const label=getDropdownOptionTextContent(item);if(!label){return false}if(this.multi){return this.value?.includes(label)}else{return this.value===label}})}closePopover(){const shouldCloseDropdown=this.dispatchEvent(new CloseEvent(false));if(!shouldCloseDropdown){return}this.open=false;this.clearActiveOptions();this.searchTerm=null;if(this.filterInput){this.filterOptionsBasedOnSearch(null);if(this.input.value){this.input.value.value=this.getTextContent(this.selectedItems)??""}}}async selectOption(target){if(this.disabled){return}const isAlreadySelected=this.selectedItems.find(item=>item.value===target.value);if(this.multi){target.selected=!target.selected;this.setDropdownSelectedValues(isAlreadySelected?this.selectedItems.filter(item=>item.value!==target.value):[...this.selectedItems,target])}else{this.items.forEach(item=>item.selected=false);target.selected=true;if(this.clearable&&isAlreadySelected){this.setDropdownSelectedValues([])}else{this.setDropdownSelectedValues([target])}}this.popoverContainer.updatePosition();await this.updateComplete;this.publishChangeEvent()}syncSelectAllOptionCheckboxValue(){const allAvailableOptions=this.items.filter(item=>!item.disabled).length;const numberOfSelectedOptions=this.selectedItems.length;this.dropdownOptionSelectAll.forEach(option=>{option.selected=numberOfSelectedOptions===allAvailableOptions?"checked":numberOfSelectedOptions===0?"unchecked":"indeterminate"})}shouldFormValueUpdate(){return true}resetFormControl(){this.value=undefined;this.unselectAllOptions();this.setValue(null)}get cssVariables(){return{"--vcdk-dropdown-search-chars":`${this.searchTerm?.length||1}ch`}}renderInput(){const{label,disabled,required,placeholder,name,error,helperText,size,filterInput,readonly}=this;const value=this.getTextContent(this.selectedItems);const isMultiWithChips=this.multi;const hasSelectedItems=this.selectedItems.length>0;const placeholderText=isMultiWithChips&&hasSelectedItems?"":placeholder;return(0,lit.qy)`
      <vcdk-text-field
        ${(0,ref.K)(this.input)}
        exportparts=${exportparts}
        id="anchor"
        slot="anchor"
        autocomplete="off"
        role="combobox"
        aria-controls=${(0,if_defined.J)(this.open?"menu":undefined)}
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="true"
        aria-label=${(0,if_defined.J)(label)}
        .floatingLabel=${this.floatingLabel}
        .value=${value}
        .label=${label}
        .inputAriaLabel=${label}
        .disabled=${disabled}
        .required=${required}
        .placeholder=${placeholderText??""}
        .error=${error}
        .helperText=${helperText}
        .size=${size}
        .name=${name}
        ?readonly=${!filterInput||readonly}
        .icon=${this.open?"chevron-up":"chevron-down"}
        .iconAriaLabel=${this.open?"Close":"Open"}
        .tabIndex=${this.filterInput?0:-1}
        @input=${this.handleSearchInputChange}>
        ${(0,when.z)(isMultiWithChips,()=>(0,lit.qy)`
            <vcdk-chips slot="before-input">
              ${(0,when.z)(this.singleChip&&this.selectedItems.length>0,()=>(0,lit.qy)`
                  <vcdk-chip
                    size="small"
                    data-testid="selected-chips"
                    @click=${this.handleSingleChipClick}
                    iconEnd="close">
                    <slot name="single-chip-label">
                      ${this.selectedItems.length}
                    </slot>
                  </vcdk-chip>
                `,()=>(0,map.T)(this.selectedItems,item=>(0,lit.qy)`
                      <vcdk-chip
                        size="small"
                        data-testid="selected-chips"
                        .value=${item.value}
                        @click=${event=>{event.preventDefault();event.stopPropagation();void this.selectOption(item)}}
                        iconEnd="close">
                        ${item.getTextContent()}
                      </vcdk-chip>
                    `))}
            </vcdk-chips>
          `)}
      </vcdk-text-field>
    `}render(){const{open,placement}=this;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({dropdown:1,"helper-text":!!this.helperText,"filter-input":!!this.filterInput,[`size-${this.size}`]:this.size,multi:!!this.multi,disabled:!!this.disabled,readonly:!!this.readonly,open:!!this.open,"floating-label":!!this.floatingLabel,"has-selected-values":!!this.selectedItems.length,"single-chip":!!this.singleChip,error:!!this.error})}
        style=${(0,style_map.W)(this.cssVariables)}
        @click=${this.toggleOpen}
        tabindex="0"
        data-testid="dropdown"
        ${(0,ref.K)(this.wrapperRef)}>
        <vcdk-dropdown-popover ?open=${open} .placement=${placement}>
          ${this.renderInput()}

          <div>
            <div
              id="listbox"
              role="listbox"
              aria-expanded=${open?"true":"false"}
              aria-hidden=${open?"false":"true"}
              aria-multiselectable=${this.multi?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="option-container"
              tabindex="-1"
              ${(0,ref.K)(this.listboxRef)}
              @click=${this.handleOptionSelected}
              @dropdownselectalloption=${this.handleSelectAllCLick}>
              <slot @slotchange=${this.initializeValue}></slot>
            </div>
          </div>
        </vcdk-dropdown-popover>
      </div>
    `}};Dropdown.styles=[dropdownStyles];dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"floatingLabel",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"placement",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"size",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"disableCloseOnSelect",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"disabled",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"readonly",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"clearable",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"error",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"helperText",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"label",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Object})],Dropdown.prototype,"multi",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Dropdown.prototype,"name",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],Dropdown.prototype,"open",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String})],Dropdown.prototype,"placeholder",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"required",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"singleChip",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:Boolean})],Dropdown.prototype,"filterInput",void 0);dropdown_component_decorate([(0,decorators.MZ)({attribute:false})],Dropdown.prototype,"filterOptions",void 0);dropdown_component_decorate([(0,decorators.P)("vcdk-text-field")],Dropdown.prototype,"textField",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-add-option")],Dropdown.prototype,"addOption",void 0);dropdown_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],Dropdown.prototype,"value",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"selectedItems",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"activeItem",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"lastKeyTime",void 0);dropdown_component_decorate([(0,decorators.wk)()],Dropdown.prototype,"searchTerm",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-option")],Dropdown.prototype,"items",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-empty-option")],Dropdown.prototype,"emptyOptions",void 0);dropdown_component_decorate([querySlot(null,"vcdk-dropdown-select-all-option")],Dropdown.prototype,"dropdownOptionSelectAll",void 0);dropdown_component_decorate([(0,decorators.P)("vcdk-dropdown-popover")],Dropdown.prototype,"popoverContainer",void 0);dropdown_component_decorate([(0,context.Gt)({context:dropdownContext})],Dropdown.prototype,"dropdownContext",void 0);dropdown_component_decorate([watch("size")],Dropdown.prototype,"setSize",void 0);dropdown_component_decorate([watch("value")],Dropdown.prototype,"initializeValue",void 0);dropdown_component_decorate([watch("multi")],Dropdown.prototype,"handleMultipleChange",null);Dropdown=dropdown_component_decorate([(0,custom_element.E)("vcdk-dropdown")],Dropdown);function getStartIndex(items,from){if(!from){return-1}if(from==="start"){return 0}if(from==="end"){return items.length-1}return items.indexOf(from)}function getOptionsToIterate(from,direction,items,current){if(from==="start"){return items}if(from==="end"){return items}return direction==="forward"?items.slice(current+1):items.slice(0,current)}function getNextActiveItem(items,from,direction){const current=getStartIndex(items,from);const optionsToIterate=getOptionsToIterate(from,direction,items,current);const allOptions=direction==="forward"?optionsToIterate:optionsToIterate.reverse();return allOptions.find(option=>!option.disabled&&!option.hidden)??items[current]}var add_option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownAddOption=class DropdownAddOption extends vcdk_element.l{constructor(){super(...arguments);this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.click=()=>{this.dispatchEvent(new MouseEvent("click",{bubbles:true,composed:true}))}}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
      <div
        role="option"
        class=${(0,class_map.H)({option:true,[size]:true})}
        tabindex="0">
        <span part="content">
          <slot></slot>
        </span>
        <slot name="icon"></slot>
      </div>
    `}};DropdownAddOption.styles=[optionStyles];DropdownAddOption=add_option_component_decorate([(0,custom_element.E)("vcdk-dropdown-add-option")],DropdownAddOption);var divider_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownDivider=class DropdownDivider extends vcdk_element.l{firstUpdated(changed){super.firstUpdated(changed);this.setAttribute("role","separator")}render(){return(0,lit.qy)`
      <div class="divider" role="separator"></div>
    `}};DropdownDivider.styles=[dividerStyles];DropdownDivider=divider_component_decorate([(0,custom_element.E)("vcdk-dropdown-divider")],DropdownDivider);var empty_option_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownEmptyOption=class DropdownEmptyOption extends vcdk_element.l{constructor(){super(...arguments);this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true})}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
      <div
        class=${(0,class_map.H)({option:1,[`typography-body`]:1,hidden:this.hidden,[size]:true})}
        tabindex="-1">
        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};DropdownEmptyOption.styles=[optionStyles,typography_styles.IT.body];DropdownEmptyOption=empty_option_component_decorate([(0,custom_element.E)("vcdk-dropdown-empty-option")],DropdownEmptyOption);var select_all_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};let DropdownSelectAllOption=class DropdownSelectAllOption extends vcdk_element.l{constructor(){super(...arguments);this.active=false;this.disabled=false;this.selected="unchecked";this.dropdownContext=new context.G(this,{context:dropdownContext,subscribe:true});this.handleClick=()=>{if(this.disabled)return;this.dispatchEvent(new CustomEvent("dropdownselectalloption",{bubbles:true,composed:true}))};this.getCheckboxValue=()=>{if(this.selected==="checked"){return true}if(this.selected==="unchecked"){return false}return undefined}}render(){const size=this.dropdownContext?.value?.size||DROPDOWN_DEFAULT_SIZE;return(0,lit.qy)`
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
          .checked=${this.getCheckboxValue()}></vcdk-checkbox>

        <span part="content">
          <slot></slot>
        </span>
      </div>
    `}};DropdownSelectAllOption.styles=[optionStyles,typography_styles.IT.body];select_all_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownSelectAllOption.prototype,"active",void 0);select_all_component_decorate([(0,decorators.MZ)({type:Boolean,reflect:true})],DropdownSelectAllOption.prototype,"disabled",void 0);select_all_component_decorate([(0,decorators.MZ)({type:String,reflect:true})],DropdownSelectAllOption.prototype,"selected",void 0);DropdownSelectAllOption=select_all_component_decorate([(0,custom_element.E)("vcdk-dropdown-select-all-option")],DropdownSelectAllOption)},2932(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__){var task=__webpack_require__(582);const settings={rootUrl:"https://cdn.designsystem.volvogroup.com/1-2-1",domain:"https://cdn.designsystem.volvogroup.com"};var url_settings;function systemIconUrl({brand="volvo",type="filled",iconId}){return`${settings.rootUrl}/icons/${brand}/system/${type}/${iconId}.svg`}function logotypeUrl({logotype}){return`${url_settings.rootUrl}/logotypes/${logotype}.svg`}function typeFaceCssUrl({brand="volvo"}){return`${url_settings.rootUrl}/css/${brand}/typefaces.css`}var lit=__webpack_require__(2618);var decorators=__webpack_require__(352);var if_defined=__webpack_require__(31);var unsafe_svg=__webpack_require__(8776);var uniqueId=__webpack_require__(5664);var custom_element=__webpack_require__(6487);var typography_styles=__webpack_require__(1669);var responsive_value=__webpack_require__(6591);var breakpoints=__webpack_require__(8128);var isString=__webpack_require__(9703);var isArray=__webpack_require__(2049);const breakpointKeys=Object.keys(breakpoints.f);const suffixWithPxIfUnitless=value=>{if((0,isString.A)(value))return value;return`${value}px`};const toCssVariables=(name,values)=>{if(!values)return;if(!(0,isArray.A)(values)){return{[name]:suffixWithPxIfUnitless(values)}}return values.reduce((current,next,currentIndex)=>{const breakpointKey=breakpointKeys[currentIndex];return{...current,[`${name}-${breakpointKey}`]:suffixWithPxIfUnitless(next)}},{})};const breakpointEntries=Object.entries(breakpoints.f);const responsiveValueToCssVariable=(selector,variableName)=>{const primaryVariable=`\n  ${selector} {\n    ${variableName}: var(${variableName}-xs);\n  }`;const responsiveVariables=Object.entries(breakpoints.f).splice(1).map(([breakpointKey,breakpoint],index)=>{const nextBreakpoint=breakpointEntries[index+2];const fallback=nextBreakpoint?`, var(${variableName}-${nextBreakpoint[0]})`:``;return`\n    @media(min-width: ${breakpoint.from}px) {\n      ${selector} {\n        ${variableName}: var(${variableName}-${breakpointKey} ${fallback});\n      } \n    }`});return(0,lit.iz)([primaryVariable,responsiveVariables].join(""))};var when=__webpack_require__(302);var class_map=__webpack_require__(3720);var style_map=__webpack_require__(1145);var responsive=__webpack_require__(4135);var vcdk_element=__webpack_require__(6260);const skeletonStyles=(0,lit.AH)`
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
    `}};Skeleton.styles=[skeletonStyles,...typography_styles.FB];Skeleton.responsiveProperties={prefix:"vcdk-skeleton",props:["width","height","size","aspectRatio"]};__decorate([(0,decorators.MZ)({attribute:"aspect-ratio",converter:responsive_value.g})],Skeleton.prototype,"aspectRatio",void 0);__decorate([(0,decorators.MZ)({type:Boolean,attribute:"disable-animation"})],Skeleton.prototype,"disableAnimation",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"height",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"size",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"typography-variant"})],Skeleton.prototype,"typographyVariant",void 0);__decorate([(0,decorators.MZ)({converter:responsive_value.g})],Skeleton.prototype,"width",void 0);__decorate([(0,decorators.MZ)({type:String})],Skeleton.prototype,"variant",void 0);__decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-description"})],Skeleton.prototype,"elementAriaDescription",void 0);Skeleton=__decorate([(0,custom_element.E)("vcdk-skeleton")],Skeleton);const systemIconStyles=(0,lit.AH)`
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
`;var system_icon_component_decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};const templateCache={};let SystemIcon=class SystemIcon extends vcdk_element.l{constructor(){super(...arguments);this.elementRole="presentation";this.elementAriaHidden=null;this.assetsTask=new task.YZ(this,{task:async([icon,filled,brand])=>{if(!icon)return"";const url=systemIconUrl({type:filled?"filled":"lined",brand,iconId:icon});if(templateCache[url]===undefined){templateCache[url]=fetch(url).then(response=>{if(!response.ok){throw new Error(`Response from CDN returned a non ok status: ${response.status}`)}return response.text()}).then(response=>(0,unsafe_svg.T)(response)).catch(error=>{console.error(`Failed when loading icon id: "${icon}". ${error}`);throw error})}return await templateCache[url]},args:()=>[this.icon,this.filled,this.brandId]})}render(){return this.assetsTask.render({pending:()=>(0,lit.qy)`
        <vcdk-skeleton
          variant="rounded-rectangle"
          size=${(0,if_defined.J)(this.size)}></vcdk-skeleton>
      `,complete:markup=>markup,error:()=>(0,lit.qy)`
        <span style="width:${this.size}px;height:${this.size}px"></span>
      `})}updated(changedProperties){super.updated(changedProperties);this.setAttributes();this.extendSvg()}extendSvg(){if(!this.svgElement)return;if(this.elementTitle){this.elementAriaLabelledBy=this.elementAriaLabelledBy||(0,uniqueId.A)("svg-title-");this.svgElement.setAttribute("aria-labelledby",this.elementAriaLabelledBy);const titleSelector=this.svgElement.querySelector("title");if(!titleSelector){if(!document){console.warn("Document is not available, cannot create title element for SVG.");return}const title=document.createElement("title");title.id=this.elementAriaLabelledBy;title.textContent=this.elementTitle;this.svgElement.insertBefore(title,this.svgElement.firstChild)}else{titleSelector.id=this.elementAriaLabelledBy;titleSelector.textContent=this.elementTitle}}if(this.description){this.elementAriaDescribedBy=this.elementAriaDescribedBy||(0,uniqueId.A)("svg-description-");this.svgElement.setAttribute("aria-describedby",this.elementAriaDescribedBy);const descSelector=this.svgElement.querySelector("desc");if(!descSelector){const desc=document.createElementNS("http://www.w3.org/2000/svg","desc");desc.id=this.elementAriaDescribedBy;desc.textContent=this.description;this.svgElement.appendChild(desc);if(!this.elementTitle){this.svgElement.insertBefore(desc,this.svgElement.firstChild)}else{this.svgElement.querySelector("title")?.insertAdjacentElement("afterend",desc)}}else{descSelector.id=this.elementAriaDescribedBy;descSelector.textContent=this.description}}}setAttributes(){this.svgElement?.setAttribute("part","svg");this.svgElement?.setAttribute("focusable","false");if(typeof this.size==="number"){this.svgElement?.setAttribute("style",`--vcdk-system-icon-size: ${this.size}px;`)}this.elementRole?this.svgElement?.setAttribute("role",this.elementRole):lit.s6;this.elementAriaHidden?this.svgElement?.setAttribute("aria-hidden",this.elementAriaHidden):lit.s6}};SystemIcon.styles=[systemIconStyles];system_icon_component_decorate([(0,decorators.MZ)({type:Boolean})],SystemIcon.prototype,"filled",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String})],SystemIcon.prototype,"icon",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:Number})],SystemIcon.prototype,"size",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-labelledby"})],SystemIcon.prototype,"elementAriaLabelledBy",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-title"})],SystemIcon.prototype,"elementTitle",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-describedby"})],SystemIcon.prototype,"elementAriaDescribedBy",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String})],SystemIcon.prototype,"description",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-role"})],SystemIcon.prototype,"elementRole",void 0);system_icon_component_decorate([(0,decorators.MZ)({type:String,attribute:"element-aria-hidden"})],SystemIcon.prototype,"elementAriaHidden",void 0);system_icon_component_decorate([(0,decorators.P)("svg")],SystemIcon.prototype,"svgElement",void 0);system_icon_component_decorate([(0,decorators.wk)()],SystemIcon.prototype,"assetsTask",void 0);SystemIcon=system_icon_component_decorate([(0,custom_element.E)("vcdk-system-icon")],SystemIcon)},1669(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{FB:()=>allTypographyClasses,IT:()=>typographyClasses,UN:()=>getTypographyValues,gI:()=>typographyStyles,zQ:()=>typographyVariantStyles});var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8128);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2618);var lodash_es__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2326);const typographyStyles=(0,lit__WEBPACK_IMPORTED_MODULE_1__.AH)`
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
    `;return classes},{});const allTypographyClasses=Object.values(typographyClasses);const getTypographyValues=(variant,property)=>{const tokenProperty=property==="font-size"?"size":property;const kebabVariant=(0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.A)(variant);return[`var(--vcdk-typography-${kebabVariant}-${tokenProperty}-small-screens)`,`var(--vcdk-typography-${kebabVariant}-${tokenProperty}-large-screens)`]}},6591(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{g:()=>responsiveValueConverter});var breakpoints;var _volvo_vcdk_tokens_dist_web_global_breakpoints_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8128);var lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2618);const responsiveValueConverter={fromAttribute(value,type){if(!value){return null}if(value.startsWith("[")&&value.endsWith("]")){return JSON.parse(value)}if(typeof type==="undefined"){const number=Number(value);if(!Number.isNaN(number)){return number}}return lit__WEBPACK_IMPORTED_MODULE_1__.W3.fromAttribute?.(value,type)},toAttribute(value,type){if(Array.isArray(value)){return lit__WEBPACK_IMPORTED_MODULE_1__.W3.toAttribute?.(value,Array)}return lit__WEBPACK_IMPORTED_MODULE_1__.W3.toAttribute?.(value,type)}};const valueInBreakpoint=(value,breakpoint)=>{const values=Array.isArray(value)?value:[value];const breakpointIndex=Object.keys(breakpoints).indexOf(breakpoint);const currentValueIndex=Math.min(values.length-1,breakpointIndex);return values[currentValueIndex]}},6260(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>_vcdk_element_js__WEBPACK_IMPORTED_MODULE_0__.l});var _vcdk_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2871)},2871(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>VcdkElement});var context=__webpack_require__(767);const themes=null&&["volvo-light","volvo-dark","mack-light","mack-dark","renault-light","renault-dark"];const brands=["volvo","mack","renault"];const colorSchemes=null&&["light","dark"];function reverseTheme(themeId){if(themeId.includes("light")){return themeId.replace("light","dark")}return themeId.replace("dark","light")}function darkTheme(themeId){if(themeId.includes("dark")){return themeId}return reverseTheme(themeId)}var lit=__webpack_require__(2618);var decorators=__webpack_require__(352);var noop=__webpack_require__(2302);const themeContext=(0,context.q6)(Symbol("vcdk-theme"));if(typeof document!=="undefined"){const root=new context.aU;const attach=()=>root.attach(document.body);if(document.body){attach()}else{document.addEventListener("DOMContentLoaded",attach)}}const globalVariableStyles=(0,lit.AH)`
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
`;const normalize=(0,lit.AH)`
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
`;var __decorate=undefined&&undefined.__decorate||function(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r};class VcdkElement extends lit.WF{constructor(){super(...arguments);this.isThemeProvider=false;this.themeProvider=undefined;this.themeConsumer=new context.G(this,{context:themeContext,subscribe:true,callback:()=>{this.handleTheming()}})}static get defaultLocale(){if(typeof document!=="undefined"&&document.documentElement.lang){return document.documentElement.lang}if(typeof window!=="undefined"){return window.navigator.language}return"en-US"}get currentTheme(){let themeId=this.themeId??this.contextTheme??VcdkElement.defaultTheme;if(this.invertTheme){themeId=reverseTheme(themeId)}return themeId}get contextTheme(){return this.themeConsumer?.value?.themeId}get brandId(){return this.currentTheme?.split("-")[0]}get colorSchemeId(){return this.currentTheme?.split("-")[1]}themeChanged(){(0,noop.A)()}update(changedProperties){if(changedProperties.has("themeId")||changedProperties.has("invertTheme")){this.handleTheming()}super.update(changedProperties)}handleTheming(){if(this.currentTheme!==this.contextTheme){if(!this.isThemeProvider){this.isThemeProvider=true;this.themeProvider=new context.DT(this,{context:themeContext,initialValue:{themeId:this.currentTheme}})}else{this.themeProvider?.setValue({themeId:this.currentTheme})}this.setThemeCssClasses();this.themeChanged();return}if(this.isThemeProvider&&this.themeProvider){this.isThemeProvider=false;this.removeController(this.themeProvider);this.themeProvider=undefined;this.setThemeCssClasses();this.themeChanged()}}setThemeCssClasses(){const isDifferentTheme=this.currentTheme!==this.contextTheme;for(const brand of brands){this.classList.toggle(`vcdk-theme-${brand}`,isDifferentTheme&&this.brandId===brand)}this.classList.toggle("vcdk-mode-dark",isDifferentTheme&&this.colorSchemeId==="dark")}static finalizeStyles(styles){if(!styles){return lit.WF.finalizeStyles([globalVariableStyles,normalize])}if(Array.isArray(styles)){styles.unshift(globalVariableStyles,normalize);return lit.WF.finalizeStyles(styles)}return lit.WF.finalizeStyles([globalVariableStyles,normalize,styles])}}VcdkElement.version="9.16.0";VcdkElement.defaultTheme="volvo-light";__decorate([(0,decorators.MZ)({type:String,reflect:true})],VcdkElement.prototype,"themeId",void 0);__decorate([(0,decorators.MZ)({type:Boolean,attribute:"invert-theme",reflect:true})],VcdkElement.prototype,"invertTheme",void 0)}}]);
//# sourceMappingURL=vcdk.js.map