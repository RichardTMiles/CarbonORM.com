import classNames from "classnames";
import BootstrapStyle from "variables/bootstrap.module.scss"
import ApplicationStyle from "CarbonORM.module.scss"

export const getRootStyleValue = (property = '--dig_primary_color') : string => {

    return getComputedStyle(document.documentElement)
        .getPropertyValue(property).trim();

}

interface iStyle {
    [x: string]: any
}

function mergeStyles<iStyleA extends iStyle, iStyleB extends iStyle>(styleA : iStyleA, styleB: iStyleB) : iStyleA & iStyleB {

    let styles : iStyle = {};

    const mergedClassNames = Object.keys(styleA).concat(Object.keys(styleB))

    mergedClassNames.map(className => {
        styles[className] = classNames(styleA[className], styleB[className])
    })

    return styles as (iStyleA & iStyleB)

}

const compiledStyles = mergeStyles(BootstrapStyle, ApplicationStyle);

type tBootstrap = typeof BootstrapStyle

type tApplicationStyle = typeof ApplicationStyle

export default function getStyles<iCSS extends {}>(overrides: iCSS = {} as iCSS): tBootstrap & tApplicationStyle & iCSS {

    if (0 === Object.keys(overrides).length) {
        return compiledStyles as (typeof compiledStyles) & iCSS
    }

    return mergeStyles(compiledStyles, overrides)

}