import { loadScript } from '../../scripts/aem.js';

// Centralized theme configuration
const getThemeFromCSS = (element) => {
    const styles = getComputedStyle(element);
    const getVar = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;

    return {
        colors: {
            power: getVar('--chart-power', '#2B8EDE'),
            torque: getVar('--chart-torque', '#323232'),
            background: 'transparent',
            gridLines: getVar('--chart-grid', '#E1DFDD'),
            axisLines: getVar('--chart-grid', '#E1DFDD'),
            text: getVar('--chart-text', '#53565A'),
            legendText: getVar('--chart-text', '#53565A'),
        },
        fonts: {
            family: getVar('--chart-font', 'VolvoNovum'),
            weightBold: 'bold',
            weightMedium: '500',
            sizeLegend: 14,
        },
        line: {
            width: 2,
            symbolSize: 10,
        },
    };
};

const chartScripts = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.2/echarts.min.js';

/**
 * Creates or updates a chart DOM element
 * @param {Object} rawData 
 * @param {HTMLElement} container - The container div provided by the caller
 * @param {Object} LABELS - The text content of the graph
 * @returns {Promise<HTMLElement>}
 */
export async function createEnginePerformanceChart(entry, container, LABELS) {
    if (!window.echarts) {
        await loadScript(chartScripts);
    }

    const theme = getThemeFromCSS(container);

    const { echarts } = window;
    let engineChart = echarts.getInstanceByDom(container);
    if (!engineChart) {
        engineChart = echarts.init(container);

        const resizeObserver = new ResizeObserver(() => {
            engineChart.resize();
        });
        resizeObserver.observe(container);
    }

    let rpm;
    let hp;
    let torque;
    
    try {
        if (!entry) {throw new Error('No data entry found');}

        rpm = JSON.parse(entry.rpm);
        hp = JSON.parse(entry.horsepower);
        torque = JSON.parse(entry.torque);

        if (!Array.isArray(rpm) || !Array.isArray(hp) || !Array.isArray(torque)) {
            throw new Error('Performance data must be provided as arrays');
        }

        if (rpm.length !== hp.length || rpm.length !== torque.length) {
            console.warn('Data arrays have mismatched lengths');
        }

    } catch (err) {
        console.error('Failed to parse chart data:', err);
        return;
    }

    const allSameLength = rpm?.length === hp?.length && rpm?.length === torque?.length;
    if (!allSameLength) {
        console.warn('Error: all data columns should have the same amount of values');
        return;
    }

    const maxTq = Math.max(...Object.values(torque));
    const maxHp = Math.max(...Object.values(hp));

    const intervals = {
        power: 50,
        torque: 200,
    };

    const option = {
        backgroundColor: theme.colors.background,
        textStyle: {
            fontFamily: theme.fonts.family,
        },
        tooltip: { show: false },
        legend: {
            data: [LABELS.power, LABELS.torque],
            bottom: 10,
            itemGap: 40,
            icon: 'circle',
            textStyle: {
                color: theme.colors.legendText,
                fontWeight: theme.fonts.weightBold,
                fontSize: theme.fonts.sizeLegend,
            },
        },
        grid: {
            top: '8%',
            left: '2%',
            right: '2%',
            bottom: '15%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            min: Math.min(...rpm),
            max: Math.max(...rpm),
            interval: 200,
            boundaryGap: false,
            axisLabel: {
                margin: 20,
                color: theme.colors.text,
                fontWeight: theme.fonts.weightMedium,
                formatter: (value) => Math.round(value),
                fontFamily: theme.fonts.family,
            },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                show: true,
                showMinLine: false,
                showMaxLine: false,
                lineStyle: { color: theme.colors.gridLines },
            },
        },
        yAxis: [
            {
                // Left Axis: Torque
                type: 'value',
                name: LABELS.torqueUnit,
                nameLocation: 'end',
                nameGap: 25,
                nameTextStyle: {
                    color: theme.colors.text,
                    fontWeight: theme.fonts.weightBold,
                    align: 'right',
                    padding: [0, 20, 0, 0],
                },
                position: 'left',
                min: 0,
                max: maxTq * 1.15,
                interval: intervals.torque,
                axisLabel: {
                    color: theme.colors.text,
                    margin: 20,
                    formatter: function (value) {
                        return (value % intervals.torque === 0) ? value : '';
                    },
                },
                splitLine: { show: false },
                axisLine: { show: true, lineStyle: { color: theme.colors.axisLines } },
                axisTick: { show: false },
            },
            {
                // Right Axis: Horsepower
                type: 'value',
                name: LABELS.powerUnit,
                nameLocation: 'end',
                nameGap: 25,
                nameTextStyle: {
                    color: theme.colors.text,
                    fontWeight: theme.fonts.weightBold,
                    align: 'left',
                    padding: [0, 0, 0, 20],
                },
                position: 'right',
                min: 0,
                max: maxHp * 1.15,
                interval: intervals.power,
                axisLabel: {
                    color: theme.colors.text,
                    margin: 20,
                    formatter: function (value) {
                        return (value % intervals.power === 0) ? value : '';
                    },
                },
                splitLine: { show: false },
                axisLine: { show: true, lineStyle: { color: theme.colors.axisLines } },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: LABELS.power,
                type: 'line',
                yAxisIndex: 1,
                data: rpm.map((r, i) => [r, hp[i]]),
                itemStyle: { color: theme.colors.power },
                lineStyle: { width: theme.line.width },
                symbol: 'circle',
                symbolSize: theme.line.symbolSize,
                silent: true,
            },
            {
                name: LABELS.torque,
                type: 'line',
                yAxisIndex: 0,
                data: rpm.map((r, i) => [r, torque[i]]),
                itemStyle: { color: theme.colors.torque },
                lineStyle: { width: theme.line.width },
                symbol: 'circle',
                symbolSize: theme.line.symbolSize,
                silent: true,
            },
        ],
    };

    engineChart.setOption(option);

    return container;
}
