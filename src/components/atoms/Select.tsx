import { useFormatClassName } from 'hooks/useFormatClassName';
import React, { ComponentProps } from 'react';
import { FOCUS_CLASSNAMES } from 'utils/constants';

export type SelectProps = ComponentProps<'select'> & {
    label?: string;
    hasError?: boolean;
    fullWidth?: boolean;
    readOnly?: boolean;
    options: ComponentProps<'option'>[];
    button?: JSX.Element;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    let [classNameWrapper, { fullWidth, options, button, ...otherProps }] = useFormatClassName(props, `
        flex flex-wrap
        ${props.readOnly ? "bg-transparent" : ''}
        ${props.hasError ? "bg-red-600" : ''}
        ${props.fullWidth ? 'w-full' : 'w-60'}
    `, [props.hasError, props.readOnly, props.fullWidth]);

    return (
        <div className={classNameWrapper}>
            {otherProps.label && <label htmlFor={otherProps.name} className='w-full inline-block text-gray-600'>{otherProps.label}</label>}

            <select
                ref={ref}
                className={`${button ? '' : 'w-full'} ${FOCUS_CLASSNAMES} grow rounded-md h-10 py-1 px-2.5 border border-gray-200`}
                {...otherProps}
            >
                {options.map((x, i) => (
                    <option key={i} value={x.value} disabled={x.disabled || otherProps.disabled}>{x.label}</option>
                ))}
            </select>
            {button}
        </div>
    );
});

export default Select