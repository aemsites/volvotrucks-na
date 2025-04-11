import Icons from './icons.js';

const oneApplicationFetch = async (apiOneApplicationUrl, apiOneApplicationKey) => {
  const headers = new Headers();
  headers.append('x-header-apikey', apiOneApplicationKey);
  headers.append('aws-cf-cd-onecx-cache', 'disabled');
  headers.append('x-header-appid', '2');

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };
  return fetch(apiOneApplicationUrl, requestOptions);
};

const oneProductFetch = async (apiOneProductUrl, apiOneProductKey, category) => {
  const headers = new Headers();
  headers.append('x-header-apikey', apiOneProductKey);
  headers.append('aws-cf-cd-onecx-cache', 'disabled');
  headers.append('x-header-appid', '6');

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const url = new URL(apiOneProductUrl);
  const params = new URLSearchParams({ category });
  url.search = params.toString();

  return fetch(url, requestOptions);
};

const fetchApiData = async (config) => {
  const {
    category,
    apioneapplicationurl: apiOneApplicationUrl,
    apioneapplicationkey: apiOneApplicationKey,
    apioneproducturl: apiOneProductUrl,
    apioneproductkey: apiOneProductKey,
  } = config;
  try {
    const [applicationData, productData] = await Promise.all([
      oneApplicationFetch(apiOneApplicationUrl, apiOneApplicationKey).then((response) => response.json()),
      oneProductFetch(apiOneProductUrl, apiOneProductKey, category).then((response) => response.json()),
    ]);
    return { applicationData, productData };
  } catch (error) {
    console.error('Error fetching API data:', error);
    return null;
  }
};

function getSectionKeyValuePairs(sections) {
  return sections.reduce((acc, section) => {
    acc[section.section_name] = section;
    return acc;
  }, {});
}

const getSectionLabel = (sections, section, field) => {
  return (sections[section]?.key_values && sections[section]?.key_values[field]) || '';
};

const getSpecSections = (sections, models) => {
  // All the spec item props are in a shared section called "specifications". They can be referenced by multiple trucks.
  const specItems = {};
  const trucks = models.map((model) => model.key).slice(0, 3);

  // First, we build the list of spec items.
  Object.entries(sections['specifications']?.key_values || {}).forEach(([key, value]) => {
    const lastUnderscore = key.lastIndexOf('_');
    const id = key.substring(0, lastUnderscore);
    const field = key.substring(lastUnderscore + 1);

    const item = specItems[id] || { label: '' };

    switch (field) {
      case 'value':
        item.value = value;
        break;
      case 'icon':
        if (Icons[value]) {
          item.icon = Icons[value]();
        }
        break;
      case 'label':
        item.label = value;
        break;
      case 'caption':
        item.caption = value;
        break;
      case 'sub':
        item.sub = value;
        break;
    }
    specItems[id] = item;
  });

  const noneItem = {
    label: '',
  };

  // Then, we simply save a list of spec item sections per truck.
  const truckSpecs = {};
  const hasOptional = [];

  trucks.forEach((truck, i) => {
    truckSpecs[truck] = [];

    let n = 0;
    let itemStr = getSectionLabel(sections, truck, `spec_section_${n + 1}_items`);

    while (itemStr) {
      hasOptional[n] = hasOptional[n] || false;
      const items = itemStr.split(',');
      truckSpecs[truck][n] = items.map((item) => {
        let id = item;
        let isOptional = false;
        if (id.endsWith('*')) {
          id = id.substring(0, id.length - 1);
          isOptional = true;
          hasOptional[n] = true;
        }
        if (!specItems[id]) {
          return noneItem;
        }

        if (isOptional) {
          const spec = { ...specItems[id] };
          spec.label += '*';
          return spec;
        }
        return specItems[id];
      });

      n++;
      itemStr = getSectionLabel(sections, truck, `spec_section_${n + 1}_items`);
    }
  });

  const maxSpecSections = Math.max(...trucks.map((t) => truckSpecs[t].length));

  const optionalText = getSectionLabel(sections, 'compare_truck_modal', 'optional_label');

  // This might not be needed:
  /*
  // Then, we convert it from a list per truck to a single list.
  const specSections = [];
  for (let s = 0; s < maxSpecSections; s++) {
    specSections[s] = {
      title: getSectionLabel(sections, 'compare_truck_modal', `spec_section_${s + 1}_title`),
      specs: [],
      optional: hasOptional[s] ? optionalText : undefined,
      gaps: !!Object.values(truckSpecs).find((l) => l[s]?.find((i) => !!i.icon || !!i.value)), // Use gaps if any item has an icon or value
    };
    const maxSpecs = Math.max(...trucks.map((t) => truckSpecs[t]?.[s]?.length || 0));

    for (let p = 0; p < maxSpecs; p++) {
      for (const t of trucks) {
        specSections[s]?.specs.push(truckSpecs[t]?.[s]?.[p] || noneItem);
      }
    }
  } */
  const organizedSpecs = {};

  for (let s = 0; s < maxSpecSections; s++) {
    const sectionTitle = getSectionLabel(sections, 'compare_truck_modal', `spec_section_${s + 1}_title`);
    const sectionOptional = hasOptional[s] ? optionalText : undefined;
    const sectionGaps = !!Object.values(truckSpecs).find((l) => l[s]?.find((i) => !!i.icon || !!i.value));

    for (const t of trucks) {
      if (!organizedSpecs[t]) {
        organizedSpecs[t] = [];
      }

      if (!organizedSpecs[t][s]) {
        organizedSpecs[t][s] = {
          title: sectionTitle,
          specs: [],
          optional: sectionOptional,
          gaps: sectionGaps,
        };
      }

      const maxSpecs = Math.max(...trucks.map((truck) => truckSpecs[truck]?.[s]?.length || 0));

      for (let p = 0; p < maxSpecs; p++) {
        organizedSpecs[t][s].specs.push(truckSpecs[t]?.[s]?.[p] || noneItem);
      }
    }
  }

  return organizedSpecs;
};

const getTruckLineupData = async (config) => {
  const apiData = await fetchApiData(config);
  if (apiData) {
    const { applicationData, productData } = apiData;
    // Process the API data as needed
    if (productData.success) {
      const sections = getSectionKeyValuePairs(applicationData.data.sections);
      const specSections = getSpecSections(sections, productData.data);

      console.log('specSections are all of the specs organized by truck and section', specSections);

      return productData.data.map((product) => {
        return {
          modelName: product.name,
          description: product.description,
          mobileImage: product?.assets?.mobile_ar[0]?.asset || '',
          desktopImage: product?.assets?.preview_image[0]?.asset || '',
          color: 'any',
        };
      });
    } else {
      console.error('Error fetching product data:', productData);
    }
  }
};

export { getTruckLineupData };
