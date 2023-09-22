import { useState } from "react"
import { Slider } from "../components/ui/slider"


type sliderProps = {
    defaultValue    : [number,number];
    max             : number;
    min             : number;
    step            : number;
    onValueCommit   : (value:number[]) => void;
    onValueChange?  : (value:number[]) => void;
}

function RangeSlider_Dark(props:sliderProps) {

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
        <div className={"w-full xs:pt-4 xs:pb-6 xs:px-4 rounded-md bg-slate-600 flex font-bold text-xl flex-col gap-y-6"}>

            <div className={`py-4 bg-slate-700 text-slate-100 rounded-md flex justify-around text-sm xs:text-base`}>
                <p>₹ {Range[0]}</p>
                <p> - </p>
                <p>₹ {Range[1]}</p>
            </div>
            <Slider defaultValue={defaultValue}
                    max={max}
                    min={min}
                    step={step}
                    className={"mx-2"}
                    trackStyle={`h-3 bg-slate-700`}
                    rangeStyle={`bg-slate-400`}
                    thumbStyle={`rounded-md focus:scale-125 h-4 w-4 ring-2 ring-slate-600`}
                    onValueChange={value => onChange(value)}
                    onValueCommit={value => onSubmit(value)}
                    />
        </div>
    )
}
 
export default RangeSlider_Dark




// both Slider and RangeSlider_Dark when used, would have
// same amt of code of this component but still i made
// RangeSlider_Dark a separate rather than using Slider to
// avoid rerendering of component where it would be used
// so only RangeSlider_Dark would rerender and not its parent
// otherwise the  Slider if used and maintained state
// directly in parent component cause parent comp to
// rerender whenever the state ie "Range" changes
