import { useMemo } from "react";
import { removeUnecessarySpaces } from "utils/strings";
import { WithClassName } from "utils/types";

export const useFormatClassName = <Type extends WithClassName>(
    props: Type,
    unformattedClassNames: string,
    deps: React.DependencyList | undefined
) => {
    let { className, ...otherProps } = props;

    className = useMemo(
        () => removeUnecessarySpaces(`${className ?? ''} ${unformattedClassNames}`),
        deps?.concat(props.className)
    );

    return [className, otherProps] as [string, Omit<Type, "className">];
}