import { useFormatClassName } from "hooks/useFormatClassName"
import { VFC } from "react"
import { WithClassName } from "utils/types";
import './Spinner.css';

type SpinnerProps = WithClassName & {
    fullWidth?: boolean;
}

const Spinner: VFC<SpinnerProps> = ({ fullWidth, ...props }) => {
    const [classNameContainer] = useFormatClassName(props, `${fullWidth ? 'w-full' : ''}`, [fullWidth]);

    return (
        <div className={`${classNameContainer} flex justify-center items-center`}>
            <div className="sk-fading-circle w-10 h-10">
                <div className="sk-circle1 sk-circle"></div>
                <div className="sk-circle2 sk-circle"></div>
                <div className="sk-circle3 sk-circle"></div>
                <div className="sk-circle4 sk-circle"></div>
                <div className="sk-circle5 sk-circle"></div>
                <div className="sk-circle6 sk-circle"></div>
                <div className="sk-circle7 sk-circle"></div>
                <div className="sk-circle8 sk-circle"></div>
                <div className="sk-circle9 sk-circle"></div>
                <div className="sk-circle10 sk-circle"></div>
                <div className="sk-circle11 sk-circle"></div>
                <div className="sk-circle12 sk-circle"></div>
            </div>
        </div>
    )
}

export default Spinner