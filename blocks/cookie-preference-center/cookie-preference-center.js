export default function decorate(block) {
  const button = document.createElement('a');
  button.classList.add('cta');
  button.textContent = block.textContent;
  
  // Only execute onclick if OneTrust exists
  button.addEventListener('click', (e) => {
    if (window.OneTrust) {
      window.OneTrust.ToggleInfoDisplay();
    } else {
      console.warn('OneTrust not found');
    }
  });

  block.textContent = '';
  block.append(button);
}