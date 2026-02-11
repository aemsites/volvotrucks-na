import { readBlockConfig } from '../../scripts/aem.js';
import { createElement } from '../../scripts/common.js';
import { createEnginePerformanceChart } from './engine-chart.js';

const blockName = 'v3-performance-specifications';
const docRange = document.createRange();
let engineData;
let activeRatings;
const uuid = self.crypto.randomUUID();

// TODO get all these values from placeholders in next task since some might be still modified.
const LABELS = {
    power: 'POWER',
    torque: 'TORQUE',
    powerUnit: 'HP',
    torqueUnit: 'LB-FT',
    rpmUnit: 'RPM',
    peakPower: 'Peak Power',
    peakPowerRpm: 'Peak Power RPM',
    peakTorque: 'Peak Torque',
    peakTorqueRpm: 'Peak Torque RPM',
};

// TODO use Volvo design system for dropdowns
const renderDropdowns = (data) => {
    activeRatings = data[0].rating.split('-');

    const dropdowns = `
        <div data-uuid='hp-dropdown-${uuid}' class='${blockName}__dropdown'>
            <label for='horsepower'>${LABELS.power}</label>
            <select name='' id='horsepower'>
                <option value='405'>405 ${LABELS.powerUnit}</option>
                <option value='425'>425 ${LABELS.powerUnit}</option>
            </select>
        </div>         
        <div data-uuid='torque-dropdown-${uuid}' class='${blockName}__dropdown'>
            <label for='torque'>${LABELS.torque}</label>
            <select name='' id='torque'>
                <option value='1450'>1450 ${LABELS.torqueUnit}</option>
                <option value='1650'>1650 ${LABELS.torqueUnit}</option>
                <option value='1550'>1550 ${LABELS.torqueUnit}</option>
                <option value='1750'>1750 ${LABELS.torqueUnit}</option>
                <option value='1650'>1650 ${LABELS.torqueUnit}</option>
            </select>
        </div>`;

    return dropdowns;
};

/**
 * Matches selected dropdown values against the engine dataset.
 * * @param {string[]} ratings - An array of strings representing the selected 
 * values from the dropdowns (e.g., ['405', '1450']).
 * @returns {EngineRating} The matching engine data object, or the first 
 * entry in the dataset if no match is found.
 */
const getSpecificEngineData = (ratings) => {
    const searchRating = ratings.join('-');
    const selectedEngine = engineData.find((item) => item.rating === searchRating);

    if (!selectedEngine) {
        console.warn(`Performance Specifications: No match found for '${searchRating}'. Falling back to default.`);
        return engineData[0];
    }

    return selectedEngine;
};

/**
 * Renders the engine performance chart by initializing or updating the ECharts instance.
 * * @param {EngineRating} data - The specific engine data object (HP, Torque, RPM arrays).
 * @param {HTMLElement} container - The DOM element where the chart will be rendered.
 * @returns {Promise<Object>} A promise that resolves to the ECharts instance.
 */
const renderChart = async (data, container) => {
    const chart = await createEnginePerformanceChart(data, container, LABELS);
    return chart;
};

/**
 * Generates a document fragment containing the peak performance specifications.
 * * @param {EngineRating} data - The engine data object containing peak values and ratings.
 * @returns {DocumentFragment} A fragment containing the structured <ul> list 
 * of engine specifications (Peak Power, Torque, etc.).
 */
const getSpecs = (data) => {
    let peaks;
    let rpmPeaks;

    try {
        peaks = JSON.parse(data.peaks);
        rpmPeaks = JSON.parse(data.rpmPeaks);
    } catch (error) {
        console.error('Error parsing peak specifications:', error);
        return;
    }

    const powerPeak = `${peaks[0]} ${LABELS.powerUnit}`;
    const rpmPowerPeak = `${rpmPeaks[0]} - ${rpmPeaks[1]} ${LABELS.rpmUnit}`;
    
    const torquePeak = `${peaks[1]} ${LABELS.torqueUnit}`;
    const rpmTorquePeak = `${rpmPeaks[2]} - ${rpmPeaks[3]} ${LABELS.rpmUnit}`;

    const specsSection = docRange.createContextualFragment(`
        <div class='${blockName}__specs'>
            <ul>
                <li>
                    <p class='${blockName}__specs-key'>${LABELS.peakPower}</p>
                    <p class='${blockName}__specs-value'>${powerPeak}</p>
                </li>
                <li>
                    <p class='${blockName}__specs-key'>${LABELS.peakPowerRpm}</p>
                    <p class='${blockName}__specs-value'>${rpmPowerPeak}</p>
                </li>
                <li>
                    <p class='${blockName}__specs-key'>${LABELS.peakTorque}</p>
                    <p class='${blockName}__specs-value'>${torquePeak}</p>
                </li>
                <li>
                    <p class='${blockName}__specs-key'>${LABELS.peakTorqueRpm}</p>
                    <p class='${blockName}__specs-value'>${rpmTorquePeak}</p>
                </li>
            </ul>
        </div>`);

    return specsSection;
};

/**
 * Scans the dropdown section for select elements and updates the 
 * activeRatings state with their current values.
 * * @param {HTMLElement} block - The parent block element containing the dropdowns.
 * @returns {void}
 */
const updateRatingValues = (block) => {
    const dropdownSection = block.querySelector(`.${blockName}__dropdown-section`);

    if (!dropdownSection) {
        return;
    }
    const dropdowns = dropdownSection.querySelectorAll('select');
    const values = Array.from(dropdowns).map((dropdown) => dropdown.value);
    activeRatings = values;
};

/**
 * Orchestrates the update lifecycle for the block by reading current UI state,
 * fetching corresponding data, and refreshing both the chart and specifications.
 * * @param {HTMLElement} block - The parent block element containing the sections to be updated.
 * @returns {void}
 */
const updateChartAndSpecs = (block) => {
    const chartContainer = block.querySelector(`.${blockName}__chart-section`);
    const specsContainer = block.querySelector(`.${blockName}__specs-section`);

    updateRatingValues(block);
    
    const selectedEngine = getSpecificEngineData(activeRatings);
    
    renderChart(selectedEngine, chartContainer);

    const specs = getSpecs(selectedEngine);
    specsContainer.replaceChildren(specs);
};

/**
 * Fetches engine performance data from a given URL (usually a SharePoint/JSON link).
 * Converts the URL to a local pathname to handle cross-origin constraints in EDS.
 * * @param {string} url - The absolute or relative URL of the JSON data source.
 * @returns {Promise<EngineRating[]>} A promise that resolves to an array of engine data objects. 
 * Returns an empty array if the fetch fails.
 */
const getAllEngineData = async (url) => {
    try {
        const { pathname } = new URL(url, window.location.origin);
        const resp = await fetch(pathname);
        const json = await resp.json();
        return json.data;
    } catch (error) {
        console.error('Error fetching engine data:', error);
        return [];
    }
};

export default async function decorate(block) {
    const blockConfig = readBlockConfig(block);

    if (!blockConfig || Object.keys(blockConfig).length === 0) {
        console.warn('Block configuration is empty.');
        return;
    }

    const { title, link } = blockConfig;

    if (!title || !link) {
        console.error('Missing required fields: title or link');
        return;
    }

    engineData = await getAllEngineData(link);
    if (!engineData) {throw new Error('No data retrieved');}

    const specsWrapper = createElement('div', {
        classes: `${blockName}__chart-container`,
        props: { id: blockConfig.rating },
    });

    const specsFragment = docRange.createContextualFragment(`
    ${title ? `
        <div class='${blockName}__title-section'>
            <h4 class='${blockName}__title'>${title}</h4>
        </div>`
            : ''}   
      <div class='${blockName}__dropdown-section'>
          ${renderDropdowns(engineData)}
      </div>
    
      <div class='${blockName}__chart-and-specs-section'>
        <div class='${blockName}__chart-section'></div>
        <div class='${blockName}__specs-section'></div>
      </div>
    
    `);

    specsWrapper.append(...specsFragment.children);

    block.innerHTML = '';
    block.append(specsWrapper);

    block.querySelector(`[data-uuid='hp-dropdown-${uuid}']`).addEventListener('change', () => updateChartAndSpecs(block));
    block.querySelector(`[data-uuid='torque-dropdown-${uuid}']`).addEventListener('change', () => updateChartAndSpecs(block));

    updateChartAndSpecs(block);
}


