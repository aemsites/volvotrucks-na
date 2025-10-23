import { unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';

const variantClasses = ['double', 'heading-3-5', 'title-small'];

export default function decorate(block) {
  const blockName = 'v2-text';

  variantsClassesToBEM(block.classList, variantClasses, blockName);
  const textRows = block.querySelectorAll(':scope > div');

  textRows.forEach((row) => {
    row.classList.add(`${blockName}__row`);

    const headings = [...row.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    headings.forEach((heading, index) => {
      if (index === 0) {
        heading.classList.add(`${blockName}__title`);
        return;
      }
      heading.classList.add(`${blockName}__sub-title`);
    });

    const info = [...row.querySelectorAll('p')];
    info.forEach((heading) => heading.classList.add(`${blockName}__info`));

    unwrapDivs(row);
  });

  // From this point on it is just code for the POC and should be removed later:

  const button = document.createRange().createContextualFragment('<vcdk-button variant="marketing" size="medium">Button</vcdk-button>');
  block.appendChild(button);

  const testContent = [
    {
      title: 'one title',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting wwindustry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    {
      title: 'two title',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting wwindustry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
    {
      title: 'third title',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting wwindustry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    },
  ];

  const accordionContentFragmentMarckup = testContent.reduce((fragment, item) => {
    const itemMarkup = `<vcdk-accordion>
        <span slot="title">${item.title}</span>
        <p>${item.text}</p>
      </vcdk-accordion>`;
    return fragment + itemMarkup;
  }, '');

  block.appendChild(document.createRange().createContextualFragment(accordionContentFragmentMarckup));
  block.appendChild(
    document.createRange().createContextualFragment(`<vcdk-dropdown class="some-dropdown">
      
      
          <vcdk-dropdown-option value="en-CA">
            Canada
          </vcdk-dropdown-option>
        
          <vcdk-dropdown-option value="pl-PL" selected="">
            Poland
          </vcdk-dropdown-option>
        
          <vcdk-dropdown-option value="sv-SE">
            Sweden
          </vcdk-dropdown-option>
        
    </vcdk-dropdown>`),
  );

  initDropdown(block);
}

function initDropdown(block) {
  const dropdown = block.querySelector('.some-dropdown');

  console.log(dropdown);

  dropdown.addEventListener('vcdk-dropdown-change', (e) => {
    const selectedValue = e.target.value;
    console.log(`Selected value: ${selectedValue}`);
  });
}
