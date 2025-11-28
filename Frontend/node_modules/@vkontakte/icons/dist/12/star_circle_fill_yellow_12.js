'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { SvgIconRootV2 } from "@vkontakte/icons-sprite";
export const Icon12StarCircleFillYellow = (props)=>{
    const reactId = React.useId();
    return /*#__PURE__*/ _jsxs(SvgIconRootV2, {
        viewBox: "0 0 12 12",
        width: 12,
        height: 12,
        vkuiIconId: "star_circle_fill_yellow_12",
        vkuiAttrs: {
            "fill": "none"
        },
        vkuiProps: props,
        children: [
            /*#__PURE__*/ _jsxs("g", {
                clipPath: `url(#star_circle_fill_yellow_12${reactId}a)`,
                children: [
                    /*#__PURE__*/ _jsx("circle", {
                        cx: "6",
                        cy: "6",
                        r: "6",
                        fill: `url(#star_circle_fill_yellow_12${reactId}b)`
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        fill: "#fff",
                        fillRule: "evenodd",
                        d: "M6.11 2.59a.25.25 0 0 0-.334.114l-.952 1.928-2.127.31a.25.25 0 0 0-.138.426l1.539 1.5-.364 2.119a.25.25 0 0 0 .363.263L6 8.25l1.903 1a.25.25 0 0 0 .363-.263l-.364-2.119 1.54-1.5a.25.25 0 0 0-.14-.427l-2.126-.309-.952-1.928a.25.25 0 0 0-.113-.113Z",
                        clipRule: "evenodd"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("defs", {
                children: [
                    /*#__PURE__*/ _jsxs("linearGradient", {
                        id: `star_circle_fill_yellow_12${reactId}b`,
                        x1: "-6",
                        x2: "6",
                        y1: "6",
                        y2: "18",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ _jsx("stop", {
                                stopColor: "#ffb73d"
                            }),
                            /*#__PURE__*/ _jsx("stop", {
                                offset: "1",
                                stopColor: "#ffa000"
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("clipPath", {
                        id: `star_circle_fill_yellow_12${reactId}a`,
                        children: /*#__PURE__*/ _jsx("path", {
                            fill: "#fff",
                            d: "M0 0h12v12H0z"
                        })
                    })
                ]
            })
        ]
    });
};
