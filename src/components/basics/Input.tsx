import { useFormatClassName } from 'hooks/useFormatClassName';
import { ComponentProps, useMemo, VFC } from 'react';

type InputProps = ComponentProps<'input'> & {
    hasError?: boolean;
}

const Input: VFC<InputProps> = (props) => {
    let [className, otherProps] = useFormatClassName(props, `
        ${props.readOnly ? "bg-transparent" : ''}
        ${props.hasError ? "bg-red-600" : ''}
        ${props.hasError ? "bg-red-600" : ''}
    `, [props.hasError, props.readOnly]);

    return <input
        className={`${className} rounded-md h-10 py-1 px-2.5 border border-gray-200 focus:outline-none active:outline-none`}
        {...otherProps}
    />
}

export default Input
