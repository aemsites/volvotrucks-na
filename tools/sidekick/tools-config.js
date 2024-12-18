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
    /* eslint-disable-next-line */
    values.forEach(({ name, value }) => obj[name] = value);
  } else {
    console.error('Error with constants file', values);
  }
  return obj;
};

const { tools } = await getConstantValues();

const TOOLS_VALUES = formatValues(tools?.data);
export default TOOLS_VALUES;
