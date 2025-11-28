'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { SvgIconRootV2 } from "@vkontakte/icons-sprite";
export const Icon16StarCircleFillYellow = (props)=>{
    const reactId = React.useId();
    return /*#__PURE__*/ _jsxs(SvgIconRootV2, {
        viewBox: "0 0 16 16",
        width: 16,
        height: 16,
        vkuiIconId: "star_circle_fill_yellow_16",
        vkuiAttrs: {
            "fill": "none"
        },
        vkuiProps: props,
        children: [
            /*#__PURE__*/ _jsxs("g", {
                clipPath: `url(#star_circle_fill_yellow_16${reactId}a)`,
                children: [
                    /*#__PURE__*/ _jsx("circle", {
                        cx: "8",
                        cy: "8",
                        r: "8",
                        fill: `url(#star_circle_fill_yellow_16${reactId}b)`
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        fill: "#fff",
                        d: "M8.148 3.454a.333.333 0 0 0-.447.152l-1.268 2.57-2.837.412a.333.333 0 0 0-.185.569l2.053 2-.485 2.825a.334.334 0 0 0 .484.352L8 11l2.537 1.334a.333.333 0 0 0 .484-.352l-.485-2.825 2.053-2a.334.334 0 0 0-.185-.569l-2.837-.412L8.3 3.606a.33.33 0 0 0-.151-.152Z"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("defs", {
                children: [
                    /*#__PURE__*/ _jsxs("linearGradient", {
                        id: `star_circle_fill_yellow_16${reactId}b`,
                        x1: "-8",
                        x2: "8",
                        y1: "8",
                        y2: "24",
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
                        id: `star_circle_fill_yellow_16${reactId}a`,
                        children: /*#__PURE__*/ _jsx("path", {
                            fill: "#fff",
                            d: "M0 0h16v16H0z"
                        })
                    })
                ]
            })
        ]
    });
};
