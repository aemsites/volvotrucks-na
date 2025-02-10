// STYLING
const COLORS = {
  lineHP: '#78B833',
  lineTQ: '#004FBC',
  fillHP: '#C8E691',
  fillTQ: '#76BAFF',
  background: '#f7f7f7',
};

const STROKE_WIDTH = 3;

// MATH
let conversionFactor;
let verticalScaleFactor = 1;

// These are used to get 2 points in between each value to make the line curve.
const BEZIER_FACTORS = {
  factor1: 0.3,
  factor2: 0.6,
};

// FUNCTIONS

// From the array of values, this extrapolates 4 on each side to use as fading border.
const createFakeValues = (type, values) => {
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const modifiers = {
    rpm: {
      start: [200, 150, 100, 50],
      end: [-50, -100, -150, -200],
    },
    horsepower: {
      start: [20, 15, 10, 5],
      end: [5, 10, 15, 20],
    },
    torque: {
      start: [20, 15, 10, 5],
      end: [5, 10, 15, 20],
    },
  };

  const modifier = modifiers[type] || [];

  const startingValues = [
    firstValue - modifier.start[0],
    firstValue - modifier.start[1],
    firstValue - modifier.start[2],
    firstValue - modifier.start[3],
  ];
  const endingValues = [lastValue - modifier.end[0], lastValue - modifier.end[1], lastValue - modifier.end[2], lastValue - modifier.end[3]];

  return [...startingValues, ...values, ...endingValues];
};

// Gets the total width of the chart and divides it into the correct number of sections.
const generatePositionsX = (start, iterations, space) => {
  return Array.from({ length: iterations }, (_, i) => start + space * i);
};

// From the values given applies the proportional conversion rate and plots the lines.
const plotLine = (valuesOnX, typeOfLine, totalWidth, sectionWidth) => {
  const plottedLine = valuesOnX.map((e, idx) => {
    const decimalCount = 2;

    const pureValueX = e;
    const pureValueY = Number(400 - typeOfLine[idx] * verticalScaleFactor);
    const nextValueY = Number(400 - typeOfLine[idx + 1] * verticalScaleFactor);
    const difference = nextValueY - pureValueY;

    const bezierPointX1 = (pureValueX + sectionWidth * BEZIER_FACTORS.factor1).toFixed(decimalCount);
    const bezierPointX2 = (pureValueX + sectionWidth * BEZIER_FACTORS.factor2).toFixed(decimalCount);
    const bezierPointY1 = (pureValueY + difference * BEZIER_FACTORS.factor1).toFixed(decimalCount);
    const bezierPointY2 = (pureValueY + difference * BEZIER_FACTORS.factor2).toFixed(decimalCount);

    const valueX = pureValueX.toFixed(decimalCount);
    const valueY = pureValueY.toFixed(decimalCount);

    return Number.isNaN(nextValueY)
      ? `C ${valueX} ${valueY} ${valueX} ${valueY} ${valueX} ${valueY}`
      : `C ${valueX} ${valueY} ${bezierPointX1} ${bezierPointY1} ${bezierPointX2} ${bezierPointY2}`;
  });

  const point = plottedLine.pop();
  const lastValueY = point.split(' ').pop();
  const lastPoint = `C ${totalWidth} ${lastValueY} ${totalWidth} ${lastValueY} ${totalWidth} ${lastValueY}`;
  plottedLine.push(lastPoint);

  return plottedLine.join(' ');
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
const buildPeakLabel = (values, valuesX, category, device) => {
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

  const positionY = Number(400 - peakValue * verticalScaleFactor);

  const peakLabel = category === 'HP' ? ['HP', 'Power', COLORS.lineHP] : ['lb-ft', 'Torque', COLORS.lineTQ];

  return `
    <rect
      x=${Math.round(positionX - 128 / 2)}
      y=${Math.round(positionY - 76 - 18)}
      width="${labelWidth}px"
      height="${labelHeight}px"
      rx="8"
      ry="8"
      data-z-index="5"
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
      ${parseInt(peakValue / (category === 'HP' ? 1 : conversionFactor))} ${peakLabel[0]}
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
      data-z-index="1"
      stroke="${peakLabel[2]}"
      stroke-width="8"
      stroke-linejoin="round"
      stroke-linecap="round"
      opacity="1"
      style="transform: translate(${device.triangle[0]}px, ${device.triangle[1]}px)"
    ></path>

    <text
      x=${positionX - device.text2[0]}
      y=${positionY - device.text2[1]}
      text-anchor="middle"
      class="peak-text"
    >
      Peak ${peakLabel[1]}
    </text>
  `;
};
// Selects the middle values that should be displayed as rpm references.
const getDisplayableLabels = (valuesX, rpm) => {
  const rpmReversed = [...rpm].reverse();
  const lowerLimit = rpm[5];
  const higherLimit = rpmReversed[5];

  const labels = valuesX.map((e, idx) => {
    const withinLimits = rpm[idx] >= lowerLimit && rpm[idx] <= higherLimit;
    const label = `
      <text x=${e} y="410" class="chart-label-numbers" text-anchor="middle">
        ${rpm[idx]}
      </text>`;
    return withinLimits ? label : null;
  });
  return labels.join(' ');
};
// Gets data from engine-specifications.js block renders the SVG with all the values.
const getPerformanceChart = (data) => {
  const scale = data.scale ?? JSON.parse(data.scale);
  const jasonDataRPM = JSON.parse(data.rpm);
  const jasonDataTQ = JSON.parse(data.torque);
  const jasonDataHP = JSON.parse(data.horsepower);

  // Extrapolating and adding 4 fake values to beginning and end of chart to simulate fade
  const valuesRPM = createFakeValues('rpm', jasonDataRPM);
  const valuesHP = createFakeValues('horsepower', jasonDataHP);
  const valuesTQ = createFakeValues('torque', jasonDataTQ);

  conversionFactor = Number((Math.max(...valuesHP) / Math.max(...valuesTQ)).toFixed(5));

  if (scale) {
    verticalScaleFactor = scale / 100;
  }

  const adjustedTQValues = valuesTQ.map((value) => parseInt(value * conversionFactor));

  const totalWidthChart = 1200;
  const sectionWidth = totalWidthChart / valuesRPM.length;

  const device = getDevice();

  const valuesOnAxisX = generatePositionsX(0, valuesRPM.length, sectionWidth);

  const svg = `
    <svg 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      width="${totalWidthChart}"
      height="${totalWidthChart * 0.4}"
      viewBox="0 0 ${totalWidthChart} ${totalWidthChart * 0.4}"
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

      <!-- HORSEPOWER -->
      <g data-z-index="3" aria-hidden="false">
        <g data-z-index="0.1" opacity="1"
          aria-hidden="true"
        >

        <!-- FILL -->
        <path
          fill="url(#gradientHP)"
          d="
            M ${valuesOnAxisX[0]} ${400 - valuesHP[0]}
            ${plotLine(valuesOnAxisX, valuesHP, totalWidthChart, sectionWidth)}
            L ${totalWidthChart} 400
            L 0 400
            Z
          "
          data-z-index="0"
          opacity="0.5"
        >
        </path>

        <!-- STROKE -->
        <path fill="none"
          d="
            M ${valuesOnAxisX[0]} ${400 - valuesHP[0]} 
            ${plotLine(valuesOnAxisX, valuesHP, totalWidthChart, sectionWidth)}
          "
          data-z-index="1"
          stroke="${COLORS.lineHP}"
          stroke-width="${STROKE_WIDTH}"
          stroke-linejoin="round"
          stroke-linecap="round"
          opacity="1"
        >
        </path>
      </g>

      <!-- TORQUE -->
      <g data-z-index="0.1" opacity="1"
          aria-hidden="true"
        >
        <!-- FILL -->
        <path
          fill="url(#gradientTQ)"
          d="
            M ${valuesOnAxisX[0]} ${400 - adjustedTQValues[0]}
            ${plotLine(valuesOnAxisX, adjustedTQValues, totalWidthChart, sectionWidth)}
            L ${totalWidthChart} 400
            L 0 400
            Z
          "
          data-z-index="0"
          opacity="0.5"
        >
        </path>

        <!-- STROKE -->
        <path fill="none"
          d="
            M ${valuesOnAxisX[0]} ${400 - adjustedTQValues[0]}
            ${plotLine(valuesOnAxisX, adjustedTQValues, totalWidthChart, sectionWidth)}
          "
          data-z-index="1" stroke="${COLORS.lineTQ}" stroke-width="${STROKE_WIDTH}" stroke-linejoin="round" stroke-linecap="round" opacity="1">
        </path>
      </g>
    </g>

    <!-- PEAK LABELS -->
    <g 
      data-z-index="7"
      aria-hidden="true"
      style="transform: translate(${device.translate[0]}px, ${device.translate[1]}px);)"
    >
      ${buildPeakLabel(adjustedTQValues, valuesOnAxisX, 'TQ', device)}
      ${buildPeakLabel(valuesHP, valuesOnAxisX, 'HP', device)}
    </g>

    <!-- HORIZONTAL VALUES - RPM -->
    <g data-z-index="7" aria-hidden="true">
      ${getDisplayableLabels(valuesOnAxisX, valuesRPM)}
      <text 
        x="${totalWidthChart / 2}"
        y="500"
        class="chart-label-text"
        text-anchor="middle"
      >
        Engine Speed (RPM)
      </text>
    </g>
  </svg>
`;
  return svg;
};

export default getPerformanceChart;
