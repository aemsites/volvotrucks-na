function getOrigin() {
  return window.location.href === 'about:srcdoc' ? window.parent.location.origin : window.location.origin;
}

function getLanguagePath() {
  const { pathname } = new URL(window.location.href);
  const langCodeMatch = pathname.match('^(/[a-z]{2}(-[a-z]{2})?/).*');
  return langCodeMatch ? langCodeMatch[1] : '/';
}

async function getConstantValues() {
  const url = new URL(`${getLanguagePath()}constants.json`, getOrigin());
  let constants;
  try {
    const response = await fetch(url).then((resp) => resp.json());
    if (!response.ok) {
      constants = response;
    }
  } catch (error) {
    console.error('Error with constants file', error);
  }
  return constants;
}

const formatValues = (values) => {
  const obj = {};
  if (values) {
    values.forEach(({ name, value }) => (obj[name] = value));
  } else {
    console.error('Error with constants file', values);
  }
  return obj;
};

const { newsFeedConfig } = await getConstantValues();

const NEWS_FEED_CONFIGS = formatValues(newsFeedConfig?.data);
export default NEWS_FEED_CONFIGS;
