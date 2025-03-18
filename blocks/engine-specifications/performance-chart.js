import { getTextLabel } from '../../scripts/common.js';

const TEXT = {
  bottom: getTextLabel('charts:bottom-label'),
  labelTQ: getTextLabel('charts:label-tq'),
  labelHP: getTextLabel('charts:label-hp'),
  unitTQ: getTextLabel('charts:unit-tq'),
  unitHP: getTextLabel('charts:unit-hp'),
};

const COLORS = {
  lineHP: '#78B833',
  lineTQ: '#004FBC',
  fillHP: '#C8E691',
  fillTQ: '#76BAFF',
  background: '#f7f7f7',
  lines: '#787A7D',
};

const STROKE = {
  width: 3,
  opacity: 1,
};

const FILL = {
  opacity: 0.5,
};

// MATH
let conversionFactor;
let verticalScaleFactor = 1;
const adjustHeight = 0.8;

// CHART SIZES
const totalWidthChart = 1200;
const totalHeightChart = totalWidthChart * 0.4; // 480

const chartMargins = [70, 1100];

const lineChartWidth = chartMargins[1] - chartMargins[0];
const lineChartHeight = 400;

// FUNCTIONS
/**
 * Makes round numbers with a set interval from 0 to the max.
 * This is used for the numbers on the sides and bottom of the chart.
 * For vertical labels there is one extra value that allows the values to go 3 intervals past the max.
 * @param {number} max - The max value of that array
 * @param {number} interval - Value that should be used as interval
 * @param {number} min - The min value of that array. Defaults to 0
 * @param {boolean} isVertical - Checks if the labels are vertical. Defaults to false
 * @returns {Array} result - Returns an array with the regular sequence
 */
const generateNumberSequence = (max, interval, min = 0, isVertical = false) => {
  const result = [];
  for (let i = min; i <= (isVertical ? max + interval * 3 : max); i += interval) {
    result.push(i);
  }
  return result;
};

/**
 * Calculates the proportional horizontal placement between the raw values recieved
 * and returns the correct position in the SVG
 * @param {Array} values - HTML element that represents
 * @returns {Array} proporionalPositions - Returns an array with the porpotional positions
 */
const getRealPositionsX = (values) => {
  const firstElement = values[0];
  const absoluteValues = values.map((num) => num - firstElement);
  const lastElement = absoluteValues[absoluteValues.length - 1];

  const factor = lineChartWidth / lastElement;

  const proporionalPositions = absoluteValues.map((num) => Math.round(num * factor + chartMargins[0]));

  return proporionalPositions;
};

/**
 * From the values given applies the proportional conversion rate and plots the lines.
 * @param {Array} valuesOnX - Values to plot the line
 * @param {Array} valuesOnY - Values to plot the line
 * @returns {string} The set of points to be used to plot the line
 */
const plotLine = (valuesOnX, valuesOnY) => {
  const plottedLine = valuesOnX.map((e, idx) => {
    const decimalCount = 2;

    const pureValueX = e;
    const pureValueY = Number(lineChartHeight - valuesOnY[idx] * verticalScaleFactor);

    const valueX = pureValueX.toFixed(decimalCount);
    const valueY = pureValueY.toFixed(decimalCount);

    return `${idx === 0 ? 'M' : 'C'} ${valueX} ${valueY} ${valueX} ${valueY} ${valueX} ${valueY}`;
  });

  return plottedLine.join(' ', 'z');
};

/**
 * Identifies the width of the device and returns values for the position of the peak points.
 * @returns {Object} An object with the positions and sizes needed for the peak labels.
 */
const getDevice = () => {
  const width = window.innerWidth;
  if (width < 480) {
    return { scale: 1.9, translate: [-50, -70], text1: [-55, 25], text2: [-55, -15], triangle: [50, 70] };
  }
  if (width < 768) {
    return { scale: 1.8, translate: [-40, -70], text1: [-55, 30], text2: [-55, -10], triangle: [50, 60] };
  }
  if (width < 1200) {
    return { scale: 1.5, translate: [-20, -40], text1: [-30, 40], text2: [-30, 10], triangle: [30, 35] };
  }
  return { scale: 1.3, translate: [-10, -25], text1: [-20, 45], text2: [-20, 20], triangle: [20, 20] };
};

/**
 * Identifies the higher value and returns the label and its position on the chart.
 * Sets the first label (TQ) and for the second one, it checks that it does not overlap
 * @param {Array} valuesY - Vertical values
 * @param {Array} valuesX - Horizontal values
 * @param {string} valueType - What type of value is
 * @param {Object} deviceData - Information on the device beign used
 * @param {number} maxPeakValue - Displayable text to be used in label
 * @returns {string} The label as a string to be inserted in the SVG
 */
let isFirstLabel = null;
const buildPeakLabel = (valuesY, valuesX, valueType, deviceData, maxPeakValue) => {
  const peakValue = Math.max(...valuesY);
  const indexPosition = valuesY.indexOf(peakValue);

  const labelWidth = Math.round(128 * deviceData.scale);
  const labelHeight = Math.round(76 * deviceData.scale);

  let positionX = Math.round(valuesX[indexPosition]);

  if (isFirstLabel === null) {
    isFirstLabel = positionX;
  } else {
    const overlap = (positionX - isFirstLabel) / 2;
    if (overlap < labelWidth / 2) {
      positionX = positionX + (labelWidth - overlap);
    }
    isFirstLabel = null;
  }

  const positionY = Number(lineChartHeight - peakValue * verticalScaleFactor);
  const peakLabel =
    category === 'HP'
      ? [getTextLabel(TEXT.unitHP), getTextLabel(TEXT.labelHP), COLORS.lineHP]
      : [getTextLabel(TEXT.unitTQ), getTextLabel(TEXT.labelTQ), COLORS.lineTQ];

  return `
    <rect
      x=${Math.round(positionX - 128 / 2)}
      y=${Math.round(positionY - 76 - 18)}
      width="${labelWidth}px"
      height="${labelHeight}px"
      rx="8"
      ry="8"
      opacity="1"
      stroke="none"
      class="peak-rectangle-${valueType.toLowerCase()}"
    >
    </rect>

    <text
      x=${positionX - deviceData.text1[0]}
      y=${positionY - deviceData.text1[1]}
      text-anchor="middle"
      class="peak-value"
    >
      ${maxPeakValue} ${peakLabel[0]}
    </text>

    <path 
      fill="${peakLabel[2]}"
      d="
        M ${positionX} ${positionY - 6}
        L ${positionX + 14} ${positionY - 20}
        L ${positionX - 14} ${positionY - 20}
        L ${positionX} ${positionY - 6}
        Z
        "
      stroke="${peakLabel[2]}"
      stroke-width="8"
      opacity="1"
      style="transform: translate(${deviceData.triangle[0]}px, ${deviceData.triangle[1]}px)"
    ></path>

    <text
      x=${positionX - deviceData.text2[0]}
      y=${positionY - deviceData.text2[1]}
      text-anchor="middle"
      class="peak-text"
    >
      ${peakLabel[1]}
    </text>
  `;
};

/**
 * With a list of positions and values it builds the horizontal reference for RPM
 * @param {Array} positionsX - The proportional values needed to position the text in the SVG
 * @param {Array} valuesX - The values that will bee seen in these positions
 * @returns {string} The list of <text> elements to insert in the SVG element
 */
const getHorizontalLabels = (positionsX, valuesX) => {
  const labels = positionsX.map((e, idx) => {
    const label = `
      <text x=${e} y="440" class="chart-label-number horizontal" text-anchor="middle">
        ${valuesX[idx]}
      </text>`;
    return label;
  });
  return labels.join(' ');
};

/**
 * With a list of values it builds the vertical references for TQ and HP
 * @param {Array} values - The whole list of values from where to extract the max value
 * @param {string} type - Used to identify what values are to be set.
 * @param {number} factor - In case the TQ values need to be adjusted to match the HP
 * @returns {string} The list of <text> elements to insert in the SVG element
 */
const getVerticalLabels = (values, type, factor = 1) => {
  const maxValue = Math.max(...values);
  const typeFixedValues = {
    tq: { interval: 200, position: 60, align: 'end' },
    hp: { interval: 50, position: 1120, align: 'start' },
  };

  const { interval, position, align } = typeFixedValues[type];

  const regularNumberSequence = generateNumberSequence(maxValue, interval, 0, true);
  const labels = regularNumberSequence.map((e) => {
    const label = `
      <text 
        x="${position}"
        y="${405 - e * factor * verticalScaleFactor}"
        class="chart-label-number vertical"
        text-anchor="${align}"
      >
        ${e}
      </text>`;
    return label;
  });
  return labels.join(' ');
};

const fillMissingValues = (rating, values, valuesOnAxisX, type) => {
  if (values.length < valuesOnAxisX.length) {
    console.warn(
      `The number of ${type} values for the chart is less than the number of RPM values. Filling the rest with 0s. For the rating:`,
      rating,
    );
    const diff = valuesOnAxisX.length - values.length;
    for (let i = 0; i < diff; i++) {
      values.push(0);
    }
  }
};

/**
 * From the regularized torque values, it creates a set of <path> elements to appear as lines in the chart
 * @param {Array} values - The whole list of values from where to extract the max value
 * @param {number} factor - Since the lines respond to the TQ values, this needs to be adjusted to match the HP proportions
 * @returns {string} The list of <path> elements to insert in the SVG element
 */
const plotHorizontalLines = (values, factor) => {
  const maxValue = Math.max(...values);
  const regularNumberSequence = generateNumberSequence(maxValue, 200, 0, true);

  const lines = regularNumberSequence.map((e) => {
    const verticalPosition = lineChartHeight - e * factor * verticalScaleFactor;

    const line = `
      <path d="M ${chartMargins[0]} ${verticalPosition} L ${chartMargins[1]} ${verticalPosition}"
        stroke="${COLORS.lines}"
        stroke-width="1"
        stroke-opacity: "0.5"
      />`;
    return line;
  });
  return lines.join(' ');
};

/**
 * Gets data from engine-specifications.js block and returns the SVG with all the charts.
 * @param {Object} data - The object that comes from the excell file.
 * @returns {string} The <svg> elements with all the charts plotted
 */
const getPerformanceChart = (data) => {
  if (data.scale) {
    verticalScaleFactor = (JSON.parse(data.scale) / 100) * adjustHeight;
  }

  let maxPeaks = [];

  try {
    maxPeaks = JSON.parse(data.peaks);
  } catch (e) {
    console.error('Error parsing peaks', e);
  }

  const [hpPeak, torquePeak] = maxPeaks;

  const valuesRPM = JSON.parse(data.rpm);
  const valuesHP = JSON.parse(data.horsepower);
  const valuesTQ = JSON.parse(data.torque);

  conversionFactor = Number((Math.max(...valuesHP) / Math.max(...valuesTQ)).toFixed(5));
  const adjustedTQValues = valuesTQ.map((value) => parseInt(value * conversionFactor));

  const device = getDevice();

  const regularValuesOnAxisX = generateNumberSequence(valuesRPM[valuesRPM.length - 1], 100, valuesRPM[0]);

  const realPositionsOnAxisX = getRealPositionsX(valuesRPM);
  const regularPositionsOnAxisX = getRealPositionsX(regularValuesOnAxisX);

  fillMissingValues(data.rating, valuesHP, valuesOnAxisX, 'HP');
  fillMissingValues(data.rating, adjustedTQValues, valuesOnAxisX, 'Torque');

  const svg = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${totalWidthChart}"
      height="${totalHeightChart}"
      viewBox="0 0 ${totalWidthChart} ${totalHeightChart}"
      aria-hidden="false" 
      aria-label="Interactive chart"
      class="chart"
    >
      <!-- GRADIENTS -->
      <defs>
        <linearGradient id="gradientHP" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${COLORS.fillHP}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${COLORS.background}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="gradientTQ" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${COLORS.fillTQ}" />
          <stop offset="100%" stop-color="${COLORS.background}" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- HORIZONTAL LINES - TQ -->
      <g aria-hidden="true" class="horizontal-lines">
        ${plotHorizontalLines(valuesTQ, conversionFactor)}
      </g>

      <!-- HORSEPOWER -->
      <g aria-hidden="true">
        <g aria-hidden="true">

        <!-- FILL -->
        <path
          fill="url(#gradientHP)"
          d="
            ${plotLine(realPositionsOnAxisX, valuesHP)}
            L ${realPositionsOnAxisX[realPositionsOnAxisX.length - 1]} ${lineChartHeight}
            L ${chartMargins[0]} ${lineChartHeight}
            Z
          "
          opacity="${FILL.opacity}"
        >
        </path>

        <!-- STROKE -->
        <path fill="none"
          d="
            ${plotLine(realPositionsOnAxisX, valuesHP)}
          "
          stroke="${COLORS.lineHP}"
          stroke-width="${STROKE.width}"
          opacity="${STROKE.opacity}"
        >
        </path>
      </g>

      <!-- TORQUE -->
      <g aria-hidden="true">
      
        <!-- FILL -->
        <path
          fill="url(#gradientTQ)"
          d="
            ${plotLine(realPositionsOnAxisX, adjustedTQValues)}
            L ${realPositionsOnAxisX[realPositionsOnAxisX.length - 1]} ${lineChartHeight}
            L ${chartMargins[0]} ${lineChartHeight}
            Z
          "
          opacity="${FILL.opacity}"
        >
        </path>

        <!-- STROKE -->
        <path
            fill="none"
            d="
              ${plotLine(realPositionsOnAxisX, adjustedTQValues)}
            "
            stroke="${COLORS.lineTQ}"
            stroke-width="${STROKE.width}"
            opacity="${STROKE.opacity}"
          >
        </path>
      </g>
    </g>

    <!-- PEAK LABELS -->
    <g
      aria-hidden="true"
      style="transform: translate(${device.translate[0]}px, ${device.translate[1]}px);)"
    >
      ${buildPeakLabel(adjustedTQValues, realPositionsOnAxisX, 'TQ', device, torquePeak)}
      ${buildPeakLabel(valuesHP, realPositionsOnAxisX, 'HP', device, hpPeak)}
    </g>

    <!-- HORIZONTAL VALUES - RPM -->
    <g
      aria-hidden="true"
      class="chart-label-numbers ${valuesRPM.length > 20 ? 'display-less-values' : ''}"
    >
      ${getHorizontalLabels(regularPositionsOnAxisX, regularValuesOnAxisX)}
      <text 
        x="${totalWidthChart / 2}"
        y="${totalHeightChart}"
        class="chart-label-text"
        text-anchor="middle"
      >
        ${getTextLabel(TEXT_KEYS.bottom)}
      </text>
    </g>

    <!-- VERTICAL VALUES - TQ -->
    <g aria-hidden="true">
      ${getVerticalLabels(valuesTQ, 'tq', conversionFactor)}
      <text 
        x="${25}"
        y="-15%"
        class="chart-label-text"
        text-anchor="start"
      >
        ${TEXT.unitTQ}
      </text>
    </g>

    <!-- VERTICAL VALUES - HP -->
    <g aria-hidden="true">
      ${getVerticalLabels(valuesHP, 'hp')}
      <text 
        x="${totalWidthChart - 55}"
        y="-15%"
        class="chart-label-text"
        text-anchor="end"
      >
        ${TEXT.unitHP}
      </text>
    </g>
  </svg>
`;
  return svg;
};

export default getPerformanceChart;
