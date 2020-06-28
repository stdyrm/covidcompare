import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

// Components
import { Line } from "./Line";

// Context
import { dataContext } from "../../../context/dataContext";

// Styles
import { makeStyles } from "@material-ui/core/styles";

const ChartCovidCompare = props => {
    const { wrapper, bounds, selectedYParam } = props;
    const { wrapperWidth, wrapperHeight, margin } = wrapper;
    const { width, height } = bounds;
    const { dataStates } = useContext(dataContext);

    const useStyles = makeStyles(theme => ({
        rootSVG: {
            display: "inline-block",
            position: "relative",
            width: "100%",
            verticalAlign: "middle",
            overflow: "hidden",
        },
        bounds: {
            width: width,
            height: height,
        },
        title: {
            fill: theme.palette.text.primary,
            fontSize: "1.2rem",
        },
        axes: {
            fill: theme.palette.text.primary,
        },
        axisLabel: {
            fill: theme.palette.text.primary,
            fontSize: ".8rem",
        },
        footnotes: {
            fill: theme.palette.text.primary,
            fontSize: ".6rem",
        },
    }));
    let classes = useStyles();

    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const svgRef = useRef(null);
    const boundsRef = useRef(null);

    const getFocus = () => {
        return d3
            .select(boundsRef.current)
            .append("g")
            .attr("class", "focus")
            .style("display", "none");
    };

    const focus = getFocus();

    const getOverlay = () => {
        return d3
            .select(boundsRef.current)
            .append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", "0")
            .on("mouseover", () => focus.style("display", null));
    };
    const overlay = getOverlay();

    useEffect(() => {
        // Scales
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d[selectedYParam]))
            .range([height, 0]);

        // Axes
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const xAxisGenerator = d3.axisBottom().scale(xScale);
        d3.select(xAxisRef.current).call(xAxisGenerator);
        d3.select(yAxisRef.current).call(yAxisGenerator);
    }, [dataStates, selectedYParam, height, width]);

    return (
        <>
            <svg
                id="line-app"
                height={wrapperHeight}
                width={wrapperWidth}
                ref={svgRef}
                className={classes.rootSVG}
                viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
            >
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${margin.left}, ${
                        height + margin.top + 60
                    })`}
                >
                    *Data from The New York Times, based on reports from state
                    and local health agencies.
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${margin.left}, ${
                        height + margin.top + 80
                    })`}
                >
                    ***2/27 is earliest possible 'Day 1,' since prior cases were
                    isolated and may skew insights of "community spread"
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${margin.left}, ${
                        height + margin.top + 100
                    })`}
                >
                    †Legend will display up to 24 states (alphabetical order)
                </text>
                <g
                    id="bounds"
                    transform={`translate(${margin.left}, ${margin.top})`}
                    ref={boundsRef}
                >
                    <text
                        className={classes.title}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        x={width / 2}
                        y={-margin.top * 0.5}
                    >
                        COVID-19 US State Comparison
                    </text>
                    <text
                        className={classes.axisLabel}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        x={width / 2}
                        y={height + 40}
                    >
                        Day of Outbreak
                    </text>
                    <text
                        className={classes.axisLabel}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        transform={`rotate(-90)`}
                        x={-height / 2}
                        y={-45}
                    >
                        {selectedYParam}
                    </text>
                    <g
                        ref={yAxisRef}
                        id="y-axis"
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                    />
                    <g
                        ref={xAxisRef}
                        id="x-axis"
                        transform={`translate(0,${height})`}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                    />
                    <Line focus={focus} overlay={overlay} {...props} />
                </g>
            </svg>
        </>
    );
};

ChartCovidCompare.propTypes = {
    wrapper: PropTypes.object,
    bounds: PropTypes.object,
};

export default ChartCovidCompare;
