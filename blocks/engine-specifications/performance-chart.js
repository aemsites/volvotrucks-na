// STYLING

const colorLineHP = '#78B833';
const colorLineTQ = '#004FBC';

const colorFillHP = '#C8E691';
const colorFillTQ = '#76BAFF';

const colorBackground = '#f7f7f7';

const strokeWidth = 3;

// MATH

// These are to be used as a way to translate the values to chart positions.
const conversionFactorHP = 0.815;
const conversionFactorTQ = 0.15;
// These are used to get 2 points in between each value to make the line curve.
const bezierFactor1 = 0.3;
const bezierFactor2 = 0.6;

// FUNCTIONS

// From the array of values, this extrapolates 4 on each side to use as fading border.
const createFakeValues = (type, values) => {
  const firstValue = values[0];
  const lastValue = [...values].pop();

  let modifier = {};
  const rpm = {
    start: [200, 150, 100, 50],
    end: [-50, -100, -150, -200],
  };
  const horsepower = {
    start: [20, 15, 10, 5],
    end: [5, 10, 15, 20],
  };
  const torque = {
    start: [20, 30, 40, 50],
    end: [20, 30, 40, 50],
  };

  if (type === 'rpm') {
    modifier = rpm;
  }
  if (type === 'horsepower') {
    modifier = horsepower;
  }
  if (type === 'torque') {
    modifier = torque;
  }

  const startingValues = [
    firstValue - modifier.start[0],
    firstValue - modifier.start[1],
    firstValue - modifier.start[2],
    firstValue - modifier.start[3],
  ];
  const endingValues = [lastValue - modifier.end[0], lastValue - modifier.end[1], lastValue - modifier.end[2], lastValue - modifier.end[3]];

  const completedValues = [...startingValues, ...values, ...endingValues];
  return completedValues;
};
// Gets the total width of the chart and divides it into the correct number of sections.
const generatePositionsX = (start, iterations, space) => {
  const array = [];
  for (let i = 0; i < iterations; i += 1) {
    const section = start + space * i;
    array.push(section);
  }
  return array;
};
// From the values given applies the proportional conversion rate and plots the lines.
const plotLine = (valuesOnX, typeOfLine, conversionFactor, totalWidth, sectionWidth) => {
  const plottedLine = valuesOnX.map((e, idx) => {
    const decimalCount = 2;

    const pureValueX = e;
    const pureValueY = Number(400 - typeOfLine[idx] * conversionFactor);
    const nextValueY = Number(400 - typeOfLine[idx + 1] * conversionFactor);
    const difference = nextValueY - pureValueY;

    const bezierPointX1 = (pureValueX + sectionWidth * 0.3).toFixed(decimalCount);
    const bezierPointX2 = (pureValueX + sectionWidth * 0.6).toFixed(decimalCount);

    const bezierPointY1 = (pureValueY + difference * bezierFactor1).toFixed(decimalCount);
    const bezierPointY2 = (pureValueY + difference * bezierFactor2).toFixed(decimalCount);

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
  let device = {};

  if (width < 480) {
    device = {
      name: 'mobile',
      scale: 1.9,
      translate: [-50, -70],
      text1: [-55, 25],
      text2: [-55, -15],
      triangle: [50, 70],
    };
  }
  if (width >= 480 && width < 768) {
    device = {
      name: 'tablet',
      scale: 1.8,
      translate: [-40, -70],
      text1: [-55, 30],
      text2: [-55, -10],
      triangle: [50, 60],
    };
  }
  if (width >= 768 && width < 1200) {
    device = {
      name: 'desktop',
      scale: 1.5,
      translate: [-20, -40],
      text1: [-30, 40],
      text2: [-30, 10],
      triangle: [30, 35],
    };
  }
  if (width >= 1200) {
    device = {
      name: 'desktop-l',
      scale: 1.3,
      translate: [-10, -25],
      text1: [-20, 45],
      text2: [-20, 20],
      triangle: [20, 20],
    };
  }
  return device;
};
// Identifies the higher value and returns the label and its position on the chart.
const getPeakValue = (values, valuesX, conversionFactor, category, device) => {
  const peakValue = Math.max(...values);
  const indexPosition = values.indexOf(peakValue);

  const positionX = valuesX[indexPosition];
  const positionY = Number(400 - peakValue * conversionFactor);

  const peakLabel = category === 'HP' ? ['HP', 'Power', colorLineHP] : ['lb-ft', 'Torque', colorLineTQ];

  return `
    <rect
      x=${Math.round(positionX - 128 / 2)}
      y=${Math.round(positionY - 76 - 18)}
      width="${Math.round(128 * device.scale)}px"
      height="${Math.round(76 * device.scale)}px"
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
      ${peakValue} ${peakLabel[0]}
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
  const rpmRevered = [...rpm].reverse();
  const lowerLimit = rpm[5];
  const higherLimit = rpmRevered[5];

  const labels = valuesX.map((e, idx) => {
    const withinLimits = rpm[idx] >= lowerLimit && rpm[idx] <= higherLimit;
    const isDisplayable = idx % 2 && (rpm[idx] / 20) % 2;
    const label = `
      <text
        x=${e}
        y="410"
        class="chart-label-numbers"
        text-anchor="middle"
      >
        ${rpm[idx]}
      </text>`;
    return isDisplayable && withinLimits ? label : null;
  });
  return labels.join(' ');
};
// Gets data from engine-specifications.js block renders the SVG with all the values.
const getPerformanceChart = (data) => {
  const jasonDataRPM = JSON.parse(data.rpm);
  const jasonDataTQ = JSON.parse(data.torque);
  const jasonDataHP = JSON.parse(data.horsepower);

  // Extrapolating and adding 4 fake values to beginning and end of chart to simulate fade
  const valuesRPM = createFakeValues('rpm', jasonDataRPM);
  const valuesHP = createFakeValues('horsepower', jasonDataHP);
  const valuesTQ = createFakeValues('torque', jasonDataTQ);

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
          <stop offset="0%" stop-color="${colorFillHP}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${colorBackground}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="gradientTQ" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorFillTQ}" />
          <stop offset="100%" stop-color="${colorBackground}" stop-opacity="0" />
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
            M ${valuesOnAxisX[0]} ${400 - valuesHP[0] * conversionFactorHP}
            ${plotLine(valuesOnAxisX, valuesHP, conversionFactorHP, totalWidthChart, sectionWidth)}
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
            M ${valuesOnAxisX[0]} ${400 - valuesHP[0] * conversionFactorHP} 
            ${plotLine(valuesOnAxisX, valuesHP, conversionFactorHP, totalWidthChart, sectionWidth)}
          "
          data-z-index="1"
          stroke="${colorLineHP}"
          stroke-width="${strokeWidth}"
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
            M ${valuesOnAxisX[0]} ${400 - valuesTQ[0] * conversionFactorTQ}
            ${plotLine(valuesOnAxisX, valuesTQ, conversionFactorTQ, totalWidthChart, sectionWidth)}
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
            M ${valuesOnAxisX[0]} ${400 - valuesTQ[0] * conversionFactorTQ}
            ${plotLine(valuesOnAxisX, valuesTQ, conversionFactorTQ, totalWidthChart, sectionWidth)}
          "
          data-z-index="1" stroke="${colorLineTQ}" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round" opacity="1">
        </path>
      </g>
    </g>

    <!-- PEAK LABELS -->
    <g 
      data-z-index="7"
      aria-hidden="true"
      style="transform: translate(${device.translate[0]}px, ${device.translate[1]}px);)"
    >
      ${getPeakValue(valuesTQ, valuesOnAxisX, conversionFactorTQ, 'TQ', device)}
      ${getPeakValue(valuesHP, valuesOnAxisX, conversionFactorHP, 'HP', device)}
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
