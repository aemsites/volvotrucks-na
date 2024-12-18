import { calcValuesToPoints, buildReferences } from './chartHelper.js';

const colorGrey2 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-4');
const colorLeaf4 = getComputedStyle(document.documentElement).getPropertyValue('--c-leaf-4');
const colorArray = [colorGrey2, colorLeaf4];

const totalWidthChart = 800;
const totalHeightChart = totalWidthChart * 0.6;

const buildChartFuelUsage = (data) => {
  const chartName = Object.keys(data);
  const valuesSets = Object.values(data);

  const chartKeys = Object.keys(valuesSets[0]);
  const chartValues = Object.values(valuesSets[0]);

  const yAxisStart = 300;

  const { valueToPoints, chartValueRange, bottomEdgeValue } = calcValuesToPoints(chartValues, yAxisStart);
  // BARS
  const barHeight1 = valueToPoints(chartValues[0]);
  const barHeight2 = valueToPoints(chartValues[1]);

  const barWidth = totalWidthChart / 4;

  const divisions = 6;
  const sectionHeight = Number((chartValueRange / divisions).toFixed(1));

  const labelValues = [];

  for (let i = 0; i < divisions; i += 1) {
    const position = sectionHeight * i + bottomEdgeValue;
    labelValues.push(position);
  }

  const svg = `
    <svg
      style="transform: translate(10px, 0px)"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="${totalWidthChart}"
      height="${totalHeightChart}"
      viewBox="0 155 ${totalWidthChart} 10"
      aria-hidden="false"
      aria-label="Interactive chart"
      class="calculator-results-chart"
    >

    <!-- TITLE -->
    <text
      x="${totalWidthChart * 0.5}"
      y="${-70}"
      text-anchor="middle"
      data-z-index="4"
      aria-hidden="true"
      class="chart-title"
    >
      ${chartName}
    </text>

    <!-- REFERENCES -->
    <g data-z-index="-1" aria-hidden="true">
      ${buildReferences(chartKeys, totalWidthChart, colorArray)}
    </g>

    <!-- COLOR BARS AND VALUES-->
    <g data-z-index="1" aria-hidden="false" role="region" class="chart-bars">
      <rect
        x="${totalWidthChart * 0.3 - barWidth / 2}"
        y="${yAxisStart - barHeight1}"
        width="${barWidth}"
        height="${barHeight1}"
        fill="${colorArray[0]}"
        class="bars" >
      </rect>
      <rect
        x="${totalWidthChart * 0.7 - barWidth / 2}"
        y="${yAxisStart - barHeight2}"
        width="${barWidth}"
        height="${barHeight2}"
        fill="${colorArray[1]}"
        class="bars" >
      </rect>

      <text
        x="${totalWidthChart * 0.3}"
        text-anchor="middle"
        y="${yAxisStart - barHeight1 * 0.5 + 5}"
        opacity="1"
        class="text"
      >
        ${chartValues[0]}
      </text>
      <text
        x="${totalWidthChart * 0.7}"
        text-anchor="middle"
        y="${yAxisStart - barHeight2 * 0.5 + 5}"
        opacity="1"
        class="text"
      >
        ${chartValues[1]}
      </text>
    </g>

    <!-- LEFT VALUES AND LINES -->
    <g data-z-index="1" aria-hidden="true" class="side-labels">
      ${labelValues.map((e) => {
        const roundedNumber = Math.round(e / 100) * 100;
        const yValue = roundedNumber.toFixed(0);
        const yPosition = yAxisStart - valueToPoints(e);

        const lineAndValue = `
      <text
        x="${80}"
        text-anchor="end"
        y="${yPosition + 5}"
        class="text"
      >
        ${yValue}
      </text>
      <path
        fill="none"
        stroke="${colorArray[0]}"
        stroke-width="1"
        stroke-dasharray="none"
        data-z-index="-1"
        d="M ${85} ${yPosition} L ${totalWidthChart - 50} ${yPosition}"
        class="line">
      </path>`;
        return lineAndValue;
      })}
    </g>

    <!-- SUBTITLE -->
    <text
      x="${totalWidthChart * 0.5}"
      y="${350}"
      text-anchor="middle"
      data-z-index="4"
      aria-hidden="true"
      class="chart-subtitle"
    >
      Gallons of Fuel
    </text>
  </svg>`;

  return svg;
};

export default buildChartFuelUsage;
