import { useState } from "react"
import { Slider } from "./components/ui/slider"


type sliderProps = {
    defaultValue    : [number,number];
    max             : number;
    min             : number;
    step            : number;
    onValueCommit   : (value:number[]) => void;
    onValueChange?  : (value:number[]) => void;
}

function RangeSlider(props:sliderProps) {

    const { defaultValue, min, max, step,
            onValueChange, onValueCommit} = props

    const [Range, setRange]
    = useState<number[]>([defaultValue[0],defaultValue[1]])


    const onChange = (value:number[]) => {
        setRange(value)
        if (onValueChange) {
            onValueChange(value)
        }
    }

    const onSubmit = (value:number[]) => {
        onValueCommit(value)
    }
     
    return (
        <div className={"w-full pt-4 pb-6 px-4 rounded-md bg-black flex font-bold text-xl flex-col gap-y-6"}>

            <div className={`py-6 bg-gray-800 rounded-md flex justify-around`}>
                <p>₹ {Range[0]}</p>
                <p> - </p>
                <p>₹ {Range[1]}</p>
            </div>
            <Slider defaultValue={defaultValue}
                    max={max}
                    min={min}
                    step={step}
                    className={"mx-2"}
                    trackStyle={`h-3 bg-gray-800`}
                    rangeStyle={`bg-gray-500`}
                    thumbStyle={`rounded-md focus:scale-125`}
                    onValueChange={value => onChange(value)}
                    onValueCommit={value => onSubmit(value)}
                    />
        </div>
    )
}
 
export default RangeSlider




// both Slider and RangeSlider when used, would have
// same amt of code of this component but still i made
// RangeSlider a separate rather than using Slider to
// avoid rerendering of component where it would be used
// so only RangeSlider would rerender and not its parent
// otherwise the  Slider if used and maintained state
// directly in parent component cause parent comp to
// rerender whenever the state ie "Range" changes
