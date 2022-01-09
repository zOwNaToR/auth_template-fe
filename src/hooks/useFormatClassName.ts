import { useMemo } from "react";
import { removeUnecessarySpaces } from "utils/strings";
import { WithClassName } from "utils/types";

export const useFormatClassName = <Type extends WithClassName>(
    props: Type,
    unformattedClassNames: string,
    deps: React.DependencyList | undefined
) => {
    const { className, ...otherProps } = props;

    let newClassName = useMemo(
        () => removeUnecessarySpaces(`${className ?? ''} ${unformattedClassNames}`),
        deps?.concat(className)
    );

    return [newClassName, otherProps] as [string, Omit<Type, "className">];
}