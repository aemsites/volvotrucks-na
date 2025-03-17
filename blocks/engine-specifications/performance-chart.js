import { getTextLabel } from '../../scripts/common.js';

// TEXT
// TODO move to placeholder
const TEXT = {
  bottom: getTextLabel('charts:bottom-label'),
  labelTQ: getTextLabel('charts:label-tq'),
  labelHP: getTextLabel('charts:label-hp'),
  unitTQ: getTextLabel('charts:unit-tq'),
  unitHP: getTextLabel('charts:unit-hp'),
};

// STYLING
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

// CHART SIZES
const totalWidthChart = 1200;
const totalHeightChart = totalWidthChart * 0.4; // 480

const chartMargins = [70, 1100];

const lineChartWidth = chartMargins[1] - chartMargins[0];
const lineChartHeight = 400;

// FUNCTIONS

// Makes round numbers with a set interval from 0 to the max + interval.
// This is used for the numbers on the sides of the charts.
// for vertical labels there is one extra value
const generateNumberSequence = (max, interval, min = 0, isVertical = false) => {
  const result = [];
  for (let i = min; i <= (isVertical ? max + interval : max); i += interval) {
    result.push(i);
  }
  return result;
};

const getRegularValues = (values) => {
  const interval = values > 16 ? 200 : 100;
  const regularizedNumbers = generateNumberSequence(values[values.length - 1], interval, values[0]);
  return regularizedNumbers;
};

const getRealPositionsX = (values) => {
  const firstElement = values[0];
  const test = values.map((num) => num - firstElement);
  const lastElement = test[test.length - 1];

  const factor = lineChartWidth / lastElement;

  const test2 = test.map((num) => Math.round(num * factor + 70));

  return test2;
};

// From the values given applies the proportional conversion rate and plots the lines.
const plotLine = (valuesOnX, typeOfLine) => {
  const plottedLine = valuesOnX.map((e, idx) => {
    const decimalCount = 2;

    const pureValueX = e;
    const pureValueY = Number(lineChartHeight - typeOfLine[idx] * verticalScaleFactor);

    const valueX = pureValueX.toFixed(decimalCount);
    const valueY = pureValueY.toFixed(decimalCount);

    return `${idx === 0 ? 'M' : 'C'} ${valueX} ${valueY} ${valueX} ${valueY} ${valueX} ${valueY}`;
  });

  return plottedLine.join(' ', 'z');
};

// Identifies the width of the device and returns values for the position of the peak points.
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

// Identifies the higher value and returns the label and its position on the chart.
let isFirstLabel = null;
const buildPeakLabel = (values, valuesX, category, device, maxPeak) => {
  const peakValue = Math.max(...values);
  const indexPosition = values.indexOf(peakValue);

  const labelWidth = Math.round(128 * device.scale);
  const labelHeight = Math.round(76 * device.scale);

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

  const peakLabel = category === 'HP' ? [TEXT.unitHP, TEXT.labelHP, COLORS.lineHP] : [TEXT.unitTQ, TEXT.labelTQ, COLORS.lineTQ];

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
      class="peak-rectangle-${category.toLowerCase()}"
    >
    </rect>

    <text
      x=${positionX - device.text1[0]}
      y=${positionY - device.text1[1]}
      text-anchor="middle"
      class="peak-value"
    >
      ${maxPeak} ${peakLabel[0]}
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
      style="transform: translate(${device.triangle[0]}px, ${device.triangle[1]}px)"
    ></path>

    <text
      x=${positionX - device.text2[0]}
      y=${positionY - device.text2[1]}
      text-anchor="middle"
      class="peak-text"
    >
      ${peakLabel[1]}
    </text>
  `;
};

// Selects the middle values that should be displayed as rpm references.
const getHorizontalLabels = (positionsX, valuesX) => {
  const labels = positionsX.map((e, idx) => {
    const label = `
      <text x=${e} y="440" class="chart-label-numbers horizontal" text-anchor="middle">
        ${valuesX[idx]}
      </text>`;
    return label;
  });
  return labels.join(' ');
};

// Selects the middle values that should be displayed as rpm references.
const getVerticalLabels = (values, type, factor = 1) => {
  const maxValue = Math.max(...values);
  const interval = type === 'tq' ? 200 : 50;
  const side = type === 'tq' ? 30 : 1135;

  const regularNumberSequence = generateNumberSequence(maxValue, interval, 0, true);
  const labels = regularNumberSequence.map((e) => {
    const label = `
      <text x="${side}" y="${405 - e * factor * verticalScaleFactor}" class="chart-label-numbers vertical" text-anchor="middle">
        ${e}
      </text>`;
    return label;
  });
  return labels.join(' ');
};

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

// delete this after
const plotVerticalLines = (arr, arr2) => {
  const lines = arr.map((e, i) => {
    const line = `
      <path d="M ${e} ${380} L ${e} ${-70}"
        stroke="${COLORS.lines}"
        stroke-width="1"
        stroke-opacity: "0.5"
      />
      <text x=${e} y="400" text-anchor="middle">
        ${arr2[i]}
      </text>`;
    return line;
  });
  return lines.join(' ');
};

// Gets data from engine-specifications.js block renders the SVG with all the values.
const getPerformanceChart = (data) => {
  if (data.scale) {
    verticalScaleFactor = JSON.parse(data.scale) / 100;
  }

  let maxPeaks = [];

  try {
    maxPeaks = JSON.parse(data.peaks);
  } catch (e) {
    console.error('Error parsing peaks', e);
  }

  const hpPeak = maxPeaks[0];
  const torquePeak = maxPeaks[1];
  const valuesRPM = JSON.parse(data.rpm);
  const valuesHP = JSON.parse(data.horsepower);
  const valuesTQ = JSON.parse(data.torque);

  conversionFactor = Number((Math.max(...valuesHP) / Math.max(...valuesTQ)).toFixed(5));

  const adjustedTQValues = valuesTQ.map((value) => parseInt(value * conversionFactor));

  const device = getDevice();

  const regularValuesOnAxisX = getRegularValues(valuesRPM);

  const realPositionsOnAxisX = getRealPositionsX(valuesRPM);
  const regularPositionsOnAxisX = getRealPositionsX(regularValuesOnAxisX);

  const svg = `
    <svg 
      version="1.1" 
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

    <!-- VERTICAL LINES - RPM -->
    <!-- // delete this after -->
    <!-- 
    <g aria-hidden="true" class="horizontal-lines">
    ${plotVerticalLines(realPositionsOnAxisX, valuesRPM)}
    </g>
    -->

      <!-- HORSEPOWER -->
      <g aria-hidden="false">
        <g opacity="1"
          aria-hidden="true"
        >

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
      <g opacity="1"
          aria-hidden="true"
        >
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
    <g aria-hidden="true" class="${valuesRPM.length > 26 ? 'display-less-values' : 'display-more-values'}">
      ${getHorizontalLabels(regularPositionsOnAxisX, regularValuesOnAxisX)}
      <text 
        x="${totalWidthChart / 2}"
        y="${totalHeightChart}"
        class="chart-label-text"
        text-anchor="middle"
      >
        ${TEXT.bottom}
      </text>
    </g>

    <!-- VERTICAL VALUES - TQ -->
    <g aria-hidden="true">
      ${getVerticalLabels(valuesTQ, 'tq', conversionFactor)}
      <text 
        x="${10}"
        y="-100"
        class="chart-label-text"
        text-anchor="left"
      >
        ${TEXT.unitTQ}
      </text>
    </g>

    <!-- VERTICAL VALUES - HP -->
    <g aria-hidden="true">
      ${getVerticalLabels(valuesHP, 'hp')}
      <text 
        x="${totalWidthChart - 80}"
        y="-100"
        class="chart-label-text"
        text-anchor="right"
      >
      ${TEXT.unitHP}
      </text>
    </g>

  </svg>
`;
  return svg;
};

export default getPerformanceChart;
