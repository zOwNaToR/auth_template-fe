import { useFormatClassName } from "hooks/useFormatClassName"
import { VFC } from "react"
import { WithClassName } from "utils/types";

type SpinnerProps = WithClassName & {
    fullWidth?: boolean;
    small?: boolean;
}

const Spinner: VFC<SpinnerProps> = ({ small, fullWidth, ...props }) => {
    const [classNameContainer, _] = useFormatClassName(props, `${fullWidth ? 'w-full' : ''}`, [fullWidth]);
    const [classNameWrapper, __] = useFormatClassName(props, `${small ? 'w-12 h-12' : 'w-24 h-24'}`, [small]);
    const [className, ___] = useFormatClassName(props, `${small ? 'w-10 h-10' : 'w-20 h-20'}`, [small]);

    return (
        <div className={`${classNameContainer} flex justify-center items-center`}>
            <div className={`${classNameWrapper} relative animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400`}>
                <div className={`${className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full border-2 border-white`}>
                </div>
            </div>
        </div>
    )
}

export default Spinner
