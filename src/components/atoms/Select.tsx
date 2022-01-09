import { useFormatClassName } from 'hooks/useFormatClassName';
import React, { ComponentProps } from 'react';

export type SelectProps = ComponentProps<'select'> & {
    label?: string;
    hasError?: boolean;
    fullWidth?: boolean;
    readOnly?: boolean;
    options: ComponentProps<'option'>[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    let [classNameWrapper, { fullWidth, options, ...otherProps }] = useFormatClassName(props, `
        ${props.readOnly ? "bg-transparent" : ''}
        ${props.hasError ? "bg-red-600" : ''}
        ${props.fullWidth ? 'w-full' : 'w-56'}
    `, [props.hasError, props.readOnly, props.fullWidth]);

    return (
        <div className={classNameWrapper}>
            {otherProps.label && <label htmlFor={otherProps.name} className='block text-gray-600'>{otherProps.label}</label>}

            <select
                ref={ref}
                className={`w-full rounded-md h-10 py-1 px-2.5 border border-gray-200 focus:outline-none active:outline-none`}
                {...otherProps}
            >
                {options.map((x, i) => (
                    <option key={i} value={x.value} disabled={x.disabled || otherProps.disabled}>{x.label}</option>
                ))}
            </select>
        </div>
    );
});

export default Select