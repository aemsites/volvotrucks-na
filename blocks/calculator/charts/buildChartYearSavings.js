import { calcValuesToPoints, buildReferences } from './chartHelper.js';

const colorGrey2 = getComputedStyle(document.documentElement).getPropertyValue('--c-grey-4');
const colorLeaf4 = getComputedStyle(document.documentElement).getPropertyValue('--c-leaf-4');
const colorArray = [colorGrey2, colorLeaf4];

const totalWidthChart = 800;
const totalHeightChart = totalWidthChart * 0.6;

const buildChartMPG = (data) => {
  const chartName = Object.keys(data);
  const valuesSets = Object.values(data);

  const chartKeys = Object.keys(valuesSets[0]);
  const chartArrays = Object.values(valuesSets[0]);

  const [perTrucks, totalSavings] = chartArrays;
  const chartValues = [].concat(...perTrucks.map((v, i) => [v, totalSavings[i]]));

  const yAxisStart = 300;
  const { valueToPoints, chartValueRange, bottomEdgeValue } = calcValuesToPoints(chartValues, yAxisStart, { bottomPadding: 0 });

  const chartHeight = Number(chartValueRange).toFixed(0);
  const divisions = 6;
  const sectionHeight = Number((chartHeight / divisions).toFixed(1));

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
    <g data-z-index="4" aria-hidden="false" role="region" opacity="1">
  ${chartValues.map((e, idx) => {
    const barHeight = valueToPoints(e);
    const barWidth = totalWidthChart / 20;
    const section = (totalWidthChart - 100) / 10;

    return `
    <rect
      x="${idx % 2 ? 75 + section * idx : 95 + section * idx}"
      y="${yAxisStart - barHeight}"
      width="${barWidth}"
      height="${barHeight}"
      fill="${idx % 2 ? colorArray[1] : colorArray[0]}"
      data-z-index="4">
    </rect>
    ${
      idx % 2
        ? `
      <text
        x="${60 + section * idx}"
        y="${330}"
        text-anchor="middle"
        data-z-index="4"
        aria-hidden="true"
        class="year-label"
      >
        Year ${0.5 + idx / 2}
      </text>`
        : ''
    }
    `;
  })}
  </g>

    <!-- LEFT VALUES AND LINES -->
    <g data-z-index="3" aria-hidden="true" class="side-labels">
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
        $${yValue}
      </text>
      <path
        fill="none"
        stroke="${colorArray[0]}"
        stroke-width="1"
        stroke-dasharray="none"
        data-z-index="-1"
        d="M ${85} ${yPosition} L ${totalWidthChart - 50} ${yPosition}"
        data-z-index="1"
        class="line">
      </path>`;
    return lineAndValue;
  })}
    </g>
  </svg>`;

  return svg;
};

export default buildChartMPG;
