import { useFormatClassName } from 'hooks/useFormatClassName';
import React from 'react'
import { FieldError } from 'react-hook-form';
import Select, { SelectProps } from './Select';
import ValidationError from './ValidationError';

type SelectWithValidationProps = SelectProps & {
    error?: FieldError;
}

const SelectWithValidation = React.forwardRef<HTMLSelectElement, SelectWithValidationProps>((props, ref) => {
    let [classNameWrapper, { error, ...otherProps }] = useFormatClassName(props, `
        ${props.fullWidth ? 'w-full' : 'w-60'} 
    `, [props.fullWidth]);

    return (
        <div className={classNameWrapper}>
            <Select {...otherProps} ref={ref} />
            {props.error && <ValidationError error={props.error.message} />}
        </div>
    );
})


export default SelectWithValidation