import { readBlockConfig } from '../../scripts/aem.js';
import { createElement, getTextLabel } from '../../scripts/common.js';
import { createEnginePerformanceChart } from './engine-chart.js';

const blockName = 'v3-performance-specifications';
const docRange = document.createRange();
let engineData;
let activeRatings;
const uuid = self.crypto.randomUUID();

const LABELS = {
    power: getTextLabel('v3_performance_specifications:power'),
    torque: getTextLabel('v3_performance_specifications:torque'),
    powerUnit: getTextLabel('v3_performance_specifications:power_unit'),
    torqueUnit: getTextLabel('v3_performance_specifications:torque_unit'),
    rpmUnit: getTextLabel('v3_performance_specifications:rpm_unit'),
    peakPower: getTextLabel('v3_performance_specifications:peak_power'),
    peakPowerRpm: getTextLabel('v3_performance_specifications:peak_power_rpm'),
    peakTorque: getTextLabel('v3_performance_specifications:peak_torque'),
    peakTorqueRpm: getTextLabel('v3_performance_specifications:peak_torque_rpm'),
};

/**
 * Transforms the raw engine data into a grouped structure by power rating.
 * Parses the "rating" string (format: "power-torque") and aggregates 
 * torque values into an array for each unique power value.
 *
 * @param {Array<Object>} data - The raw engine data array.
 * @param {string} data[].rating - The hyphen-separated rating (e.g., "405-1450").
 * @returns {Array<Object>} An array of grouped engine objects.
 */
const groupDataByPower = (data) => {
    const dataGroupedByPower = data.reduce((acc, item) => {
        // Split "405-1450" into [405, 1450]
        const [power, torque] = item.rating.split('-').map(Number);

        if (!acc[power]) {
            acc[power] = { power: power, torque: [] };
        }
        acc[power].torque.push(torque);

        return acc;
    }, {});

    return Object.values(dataGroupedByPower);
};

/**
 * Renders the HTML string for power and torque custom dropdown components.
 * Initializes the dropdowns based on the first record in the dataset and
 * sets up the initial visibility for torque options using a power-torque check.
 * @param {Array<Object>} data - The raw engine dataset.
 * @param {string} data[].rating - Hyphenated rating string (e.g. "405-1450").
 * @returns {string} The HTML template literal containing the vcdk-dropdown components.
 */
const renderDropdownPair = (data, initialValues) => {
    if (!data || data.length === 0) {
        console.warn('No engine data provided');
        return;
    }

    const groupedByPower = groupDataByPower(data);

    return `
        <vcdk-dropdown
            value='${initialValues[0]}'
            class='${blockName}__power-dropdown dropdown'
            label='${LABELS.power}'
            floatingLabel='true' 
        >
            ${groupedByPower.map((item, idx) => `
                <vcdk-dropdown-option
                    class='dropdown-option'
                    value='${item.power}' ${idx === 0 ? 'selected' : ''}
                >
                    ${item.power} ${LABELS.powerUnit}
                </vcdk-dropdown-option>
            `).join('')}
        </vcdk-dropdown>

        <vcdk-dropdown
            value='${initialValues[0]}-${initialValues[1]}'
            class='${blockName}__torque-dropdown dropdown'
            label='${LABELS.torque}'
            floatingLabel='true'
        >
            ${groupedByPower.flatMap(item =>
                item.torque.map((torque, i) => `
                    <vcdk-dropdown-option 
                        class='dropdown-option'
                        data-power="${item.power}"
                        ${item.power !== parseInt(initialValues[0]) ? 'hidden' : ''}
                        value='${item.power}-${torque}' ${i === 0 ? 'selected' : ''}
                    >
                        ${torque} ${LABELS.torqueUnit}
                    </vcdk-dropdown-option>`,
            ),
            ).join('')}
        </vcdk-dropdown>`;
};

/**
 * Matches selected dropdown values against the engine dataset.
 * @param {string[]} ratings - An array of strings representing the selected 
 * values from the dropdowns (e.g., ['405', '405-1450']).
 * @param {string} ratings[1] - The value from the torque dropdown (e.g. "405-1450").
 * @returns {EngineRating} The matching engine data object, or the first 
 * entry in the dataset if no match is found.
 */
const getSpecificEngineData = (ratings) => {
    const engineRating = ratings[1];
    const selectedEngine = engineData.find((item) => item.rating === engineRating);

    if (!selectedEngine) {
        console.warn(`Performance Specifications: No match found for '${engineRating}'. Falling back to default.`);
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
 * Scans the dropdown section for dropdown elements and updates the 
 * activeRatings state with their current values.
 * * @param {HTMLElement} block - The parent block element containing the dropdowns.
 * @returns {void}
 */
const updateActiveRatings = (block) => {
    const dropdownSection = block.querySelector(`.${blockName}__dropdown-section`);
    if (!dropdownSection) {
        return;
    }

    const dropdowns = dropdownSection.querySelectorAll('.dropdown');
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

    updateActiveRatings(block);

    const selectedEngine = getSpecificEngineData(activeRatings);

    renderChart(selectedEngine, chartContainer);

    const specs = getSpecs(selectedEngine);
    specsContainer.replaceChildren(specs);
};

/**
 * Updates the visibility of torque options based on the selected power value.
 * Filters options by comparing the prefix of the option value with the powerValue,
 * and resets the dropdown selection to the first visible option.
 * * @param {HTMLElement} dropdown - The torque dropdown element containing the options.
 * @param {string} powerValue - The power rating string used to filter the torque options (e.g., "405").
 * @returns {void}
 */
const updateTorqueOptions = (dropdown, powerValue) => {
    const validOptions = [];
    const options = dropdown.querySelectorAll('.dropdown-option');
    
    options.forEach(option => {
        const relatedPower = option.dataset.power;
        
        if (relatedPower === powerValue) {
            validOptions.push(option.value);
            option.removeAttribute('hidden');
        } else {
            option.setAttribute('hidden', '');
        }
    });

    // Sets the dropdown state to the first matching entry
    if (validOptions.length > 0) {
        dropdown.value = validOptions[0];
    }
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

    // Fetch and prepare engine data
    engineData = await getAllEngineData(link);
    if (!engineData) { throw new Error('No data retrieved'); }

    activeRatings = engineData[0].rating.split('-');

    const specsWrapper = createElement('div', {
        classes: `${blockName}__chart-container`,
        props: { id: blockConfig.rating },
    });

    const specsFragment = docRange.createContextualFragment(`
    ${title ? `
        <div class='${blockName}__title-section'>
            <h2 class='${blockName}__title'>${title}</h2>
        </div>`
            : ''}   
      <div data-uuid='dropdown-${uuid}' class='${blockName}__dropdown-section'>
          ${renderDropdownPair(engineData, activeRatings)}
      </div>
    
      <div class='${blockName}__chart-and-specs-section'>
        <div class='${blockName}__chart-section'></div>
        <div class='${blockName}__specs-section'></div>
      </div>
    
    `);

    specsWrapper.append(...specsFragment.children);

    // Empty block and append new content structure
    block.innerHTML = '';
    block.append(specsWrapper);

    // Event listeners for dropdown changes
    const powerDropdown = block.querySelector(`[data-uuid='dropdown-${uuid}'] .${blockName}__power-dropdown`);
    const torqueDropdown = block.querySelector(`[data-uuid='dropdown-${uuid}'] .${blockName}__torque-dropdown`);

    // Torque dropdown just updates the chart/specs based on the current selection
    torqueDropdown.addEventListener('change', () => updateChartAndSpecs(block));
    // Power dropdown updates the active ratings, filters torque options, and then updates the chart/specs
    powerDropdown.addEventListener('change', (e) => {
        e.preventDefault();
        const powerValue = e.target.value;
        updateTorqueOptions(torqueDropdown, powerValue);
        updateChartAndSpecs(block);
    });

    // Initial render of chart and specs based on the default dropdown values
    updateChartAndSpecs(block);
}
