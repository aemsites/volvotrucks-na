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
const CONVERSION_FACTORS = {
  HP: 0.815,
  TQ: 0.22,
};

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
    rpm: [200, 150, 100, 50],
    horsepower: [20, 15, 10, 5],
    torque: [20, 30, 40, 50],
  };

  const modifier = modifiers[type] || [];
  const startingValues = modifier.map((mod) => firstValue - mod);
  const endingValues = modifier.map((mod) => lastValue + mod);

  return [...startingValues, ...values, ...endingValues];
};

const generatePositionsX = (start, iterations, space) => {
  return Array.from({ length: iterations }, (_, i) => start + space * i);
};

const plotLine = (valuesOnX, typeOfLine, conversionFactor, totalWidth, sectionWidth) => {
  const plottedLine = valuesOnX.map((e, idx) => {
    const decimalCount = 2;
    const pureValueX = e;
    const pureValueY = Number(400 - typeOfLine[idx] * conversionFactor);
    const nextValueY = Number(400 - typeOfLine[idx + 1] * conversionFactor);
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

const getPeakValue = (values, valuesX, conversionFactor, category, device) => {
  const peakValue = Math.max(...values);
  const indexPosition = values.indexOf(peakValue);
  const positionX = valuesX[indexPosition];
  const positionY = Number(400 - peakValue * conversionFactor);
  const peakLabel = category === 'HP' ? ['HP', 'Power', COLORS.lineHP] : ['lb-ft', 'Torque', COLORS.lineTQ];

  return `
    <rect x=${Math.round(positionX - 128 / 2)} y=${Math.round(positionY - 76 - 18)} width="${Math.round(128 * device.scale)}px" height="${Math.round(76 * device.scale)}px" rx="8" ry="8" data-z-index="5" opacity="1" stroke="none" class="peak-rectangle-${category.toLowerCase()}"></rect>
    <text x=${positionX - device.text1[0]} y=${positionY - device.text1[1]} text-anchor="middle" class="peak-value">${peakValue} ${peakLabel[0]}</text>
    <path fill="${peakLabel[2]}" d="M ${positionX} ${positionY - 6} L ${positionX + 14} ${positionY - 20} L ${positionX - 14} ${positionY - 20} L ${positionX} ${positionY - 6} Z" data-z-index="1" stroke="${peakLabel[2]}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round" opacity="1" style="transform: translate(${device.triangle[0]}px, ${device.triangle[1]}px)"></path>
    <text x=${positionX - device.text2[0]} y=${positionY - device.text2[1]} text-anchor="middle" class="peak-text">Peak ${peakLabel[1]}</text>
  `;
};

const getDisplayableLabels = (valuesX, rpm) => {
  const lowerLimit = rpm[5];
  const higherLimit = rpm[rpm.length - 6];

  return valuesX
    .map((e, idx) => {
      const withinLimits = rpm[idx] >= lowerLimit && rpm[idx] <= higherLimit;
      const isDisplayable = idx % 2 && (rpm[idx] / 20) % 2;
      return isDisplayable && withinLimits ? `<text x=${e} y="410" class="chart-label-numbers" text-anchor="middle">${rpm[idx]}</text>` : null;
    })
    .filter(Boolean)
    .join(' ');
};

const getPerformanceChart = (data) => {
  const valuesRPM = createFakeValues('rpm', JSON.parse(data.rpm));
  const valuesHP = createFakeValues('horsepower', JSON.parse(data.horsepower));
  const valuesTQ = createFakeValues('torque', JSON.parse(data.torque));

  const totalWidthChart = 1200;
  const sectionWidth = totalWidthChart / valuesRPM.length;
  const device = getDevice();
  const valuesOnAxisX = generatePositionsX(0, valuesRPM.length, sectionWidth);

  return `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${totalWidthChart}" height="${totalWidthChart * 0.4}" viewBox="0 0 ${totalWidthChart} ${totalWidthChart * 0.4}" aria-hidden="false" aria-label="Interactive chart" class="chart">
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
      <g data-z-index="3" aria-hidden="false">
        <g data-z-index="0.1" opacity="1" aria-hidden="true">
          <path fill="url(#gradientHP)" d="M ${valuesOnAxisX[0]} ${400 - valuesHP[0] * CONVERSION_FACTORS.HP} ${plotLine(valuesOnAxisX, valuesHP, CONVERSION_FACTORS.HP, totalWidthChart, sectionWidth)} L ${totalWidthChart} 400 L 0 400 Z" data-z-index="0" opacity="0.5"></path>
          <path fill="none" d="M ${valuesOnAxisX[0]} ${400 - valuesHP[0] * CONVERSION_FACTORS.HP} ${plotLine(valuesOnAxisX, valuesHP, CONVERSION_FACTORS.HP, totalWidthChart, sectionWidth)}" data-z-index="1" stroke="${COLORS.lineHP}" stroke-width="${STROKE_WIDTH}" stroke-linejoin="round" stroke-linecap="round" opacity="1"></path>
        </g>
        <g data-z-index="0.1" opacity="1" aria-hidden="true">
          <path fill="url(#gradientTQ)" d="M ${valuesOnAxisX[0]} ${400 - valuesTQ[0] * CONVERSION_FACTORS.TQ} ${plotLine(valuesOnAxisX, valuesTQ, CONVERSION_FACTORS.TQ, totalWidthChart, sectionWidth)} L ${totalWidthChart} 400 L 0 400 Z" data-z-index="0" opacity="0.5"></path>
          <path fill="none" d="M ${valuesOnAxisX[0]} ${400 - valuesTQ[0] * CONVERSION_FACTORS.TQ} ${plotLine(valuesOnAxisX, valuesTQ, CONVERSION_FACTORS.TQ, totalWidthChart, sectionWidth)}" data-z-index="1" stroke="${COLORS.lineTQ}" stroke-width="${STROKE_WIDTH}" stroke-linejoin="round" stroke-linecap="round" opacity="1"></path>
        </g>
      </g>
      <g data-z-index="7" aria-hidden="true" style="transform: translate(${device.translate[0]}px, ${device.translate[1]}px);">
        ${getPeakValue(valuesTQ, valuesOnAxisX, CONVERSION_FACTORS.TQ, 'TQ', device)}
        ${getPeakValue(valuesHP, valuesOnAxisX, CONVERSION_FACTORS.HP, 'HP', device)}
      </g>
      <g data-z-index="7" aria-hidden="true">
        ${getDisplayableLabels(valuesOnAxisX, valuesRPM)}
        <text x="${totalWidthChart / 2}" y="500" class="chart-label-text" text-anchor="middle">Engine Speed (RPM)</text>
      </g>
    </svg>
  `;
};

export default getPerformanceChart;
