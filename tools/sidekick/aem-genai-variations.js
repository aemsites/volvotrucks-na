(function AemGenAiVariationsloadScript() {
  let isAEMGenAIVariationsAppLoaded = false;

  function loadAEMGenAIVariationsApp() {
    const script = document.createElement('script');
    script.src =
      'https://experience.adobe.com/solutions/aem-sites-genai-aem-genai-variations-mfe/static-assets/resources/sidekick/client.js?source=plugin';
    script.onload = function loadAEMGenAIVariationsAppOnLoad() {
      isAEMGenAIVariationsAppLoaded = true;
    };
    script.onerror = function loadAEMGenAIVariationsAppOnError() {
      console.error('Error loading AEMGenAIVariationsApp.');
    };
    document.head.appendChild(script);
  }

  function handlePluginButtonClick() {
    if (!isAEMGenAIVariationsAppLoaded) {
      loadAEMGenAIVariationsApp();
    }
  }

  // The code snippet for the Sidekick V1 extension, https://chromewebstore.google.com/detail/aem-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo?hl=en
  let sidekick = document.querySelector('helix-sidekick');
  if (sidekick) {
    // sidekick already loaded
    sidekick.addEventListener('custom:aem-genai-variations-sidekick', handlePluginButtonClick);
  } else {
    // wait for sidekick to be loaded
    document.addEventListener(
      'sidekick-ready',
      () => {
        sidekick = document.querySelector('helix-sidekick');
        if (sidekick) {
          sidekick.addEventListener('custom:aem-genai-variations-sidekick', handlePluginButtonClick);
        }
      },
      { once: true },
    );
  }

  // The code snippet for the Sidekick V2 extension, https://chromewebstore.google.com/detail/aem-sidekick/igkmdomcgoebiipaifhmpfjhbjccggml?hl=en
  let sidekickV2 = document.querySelector('aem-sidekick');
  if (sidekickV2) {
    // sidekick already loaded
    sidekickV2.addEventListener('custom:aem-genai-variations-sidekick', handlePluginButtonClick);
  } else {
    // wait for sidekick to be loaded
    document.addEventListener(
      'sidekick-ready',
      () => {
        sidekickV2 = document.querySelector('aem-sidekick');
        if (sidekickV2) {
          sidekickV2.addEventListener('custom:aem-genai-variations-sidekick', handlePluginButtonClick);
        }
      },
      { once: true },
    );
  }
})();
