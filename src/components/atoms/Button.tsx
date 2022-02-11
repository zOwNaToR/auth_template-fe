import { useFormatClassName } from 'hooks/useFormatClassName';
import { ComponentProps, FC } from 'react';
import { FOCUS_CLASSNAMES } from 'utils/constants';

type ButtonProps = ComponentProps<'button'> & {
    color?: string;
    textColor?: string;
    noHorizontalPadding?: boolean;
    noVerticalPadding?: boolean;
}

const Button: FC<ButtonProps> = ({ color, textColor, noHorizontalPadding, noVerticalPadding, ...props }) => {
    let [className, otherProps] = useFormatClassName(props, `
        ${color} active:${color}/50 ${textColor}
        ${noHorizontalPadding ? '' : 'px-6'}
        ${noVerticalPadding ? '' : 'py-3'}
        ${FOCUS_CLASSNAMES}
        font-bold uppercase text-sm
        rounded-md shadow hover:shadow-lg outline-none focus:outline-none 
        ease-linear transition-all duration-150
    `, [props.className]);

    return (
        <button
            className={className}
            type='button'
            {...otherProps}
        >
            {props.children}
        </button>
    )
}

Button.defaultProps = {
    color: 'bg-primary',
    textColor: 'text-secondary',
}

export default Button