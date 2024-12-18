async function getConstantValues() {
  const url = '/constants.json';
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
