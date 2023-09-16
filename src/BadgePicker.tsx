

import { useEffect, useRef, useState } from "react";

type BadgeProps = {
    badges              : string[];
    onSelect            : (badge:string[]) => void
    activeBgColor       : string;
    passiveBgColor      : string;
    activeTextColor     : string;
    passiveTextColor    : string;
    badgeLayout         : string;
    containerLayout     : string;
    selectMultiple?     : boolean;
}



function BadgePicker(props:BadgeProps) {

    const ContainerRef = useRef<HTMLDivElement|null>(null)
    const [BadgesArray, setBadgesArray] = useState<string[]>([])    
    const { badges, onSelect, selectMultiple = false,
            activeBgColor, passiveBgColor, activeTextColor,
            passiveTextColor, badgeLayout, containerLayout } = props

    try { if (badgeLayout.includes("text")) {
            throw new Error("Can not use classes that start with text in the badgeLayout, if you want to give the text colors, use activeTextColor/passiveTextColor and if you want to do layouting use flexbox/grid instead")
        }} catch (error) { console.error(error) }


    useEffect(() => {
        refreshBadgeColors()
    }, [badges, selectMultiple, activeBgColor, passiveBgColor,
        activeTextColor, passiveTextColor, badgeLayout, containerLayout])
    

    function refreshBadgeColors() {
        const labels = ContainerRef.current?.children || []
        const labelsArray = Array.from(labels)
        labelsArray.forEach( label => {
            const classesArray = Array.from(label.classList);
            classesArray.forEach(className => {
                if (className.startsWith("bg") || className.startsWith("text")) {
                    if (!["text-sm", "text-lg", "text-xl"].includes(className)) {
                        label.classList.remove(className)
                    }
                }
            })

            const currentLabel = label.getAttribute('data-badge-name')
            if ( currentLabel && BadgesArray.includes(currentLabel)) {
                label?.classList.add(activeBgColor)
                label?.classList.add(activeTextColor)
            } else {
                label.classList.add(passiveBgColor)
                label.classList.add(passiveTextColor)
            }
        })
    }


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (selectMultiple) {
            const ParentLabel = e.target.parentElement

            if (e.target.checked) {
                ParentLabel?.classList.remove(passiveBgColor)
                ParentLabel?.classList.add(activeBgColor)
                ParentLabel?.classList.remove(passiveTextColor)
                ParentLabel?.classList.add(activeTextColor)

                setBadgesArray([...BadgesArray, e.target.name])
                onSelect([...BadgesArray, e.target.name])

            } else {
                ParentLabel?.classList.remove(activeBgColor)
                ParentLabel?.classList.add(passiveBgColor)
                ParentLabel?.classList.remove(activeTextColor)
                ParentLabel?.classList.add(passiveTextColor)

                const checkedArray = BadgesArray.filter(badge => badge !== e.target.name)
                setBadgesArray(checkedArray)
                onSelect(checkedArray)
            }
        } else {
            const labels = ContainerRef.current?.children || []
            const labelsArray = Array.from(labels)
            labelsArray.forEach( label => {
                const badgeName = e.target.name
                const currentBadgeName = label.getAttribute('data-badge-name')
                if (badgeName === currentBadgeName) {
                    if (e.target.checked) {
                        label.classList.remove(`${passiveBgColor}`)
                        label.classList.add(`${activeBgColor}`)
                        label.classList.remove(`${passiveTextColor}`)
                        label.classList.add(`${activeTextColor}`)

                        setBadgesArray([e.target.name])
                        onSelect([e.target.name])        
                    } else {
                        label.classList.remove(`${activeBgColor}`)
                        label.classList.add(`${passiveBgColor}`)
                        label.classList.remove(`${activeTextColor}`)
                        label.classList.add(`${passiveTextColor}`)

                        const checkedArray = BadgesArray.filter(badge => badge !== e.target.name)
                        setBadgesArray(checkedArray)
                        onSelect(checkedArray)
                    }
                } else {
                    label.classList.remove(`${activeBgColor}`)
                    label.classList.add(`${passiveBgColor}`)
                    label.classList.remove(`${activeTextColor}`)
                    label.classList.add(`${passiveTextColor}`)
                    
                    const childInputElement = Array.from(label.children)[0] as HTMLInputElement
                    childInputElement.checked = false
                }
            })
        }
    }

    return (
             <div className={containerLayout} ref={ContainerRef}>
                {
                    badges.map( badge => (
                        <label  htmlFor={badge}
                                key={badge}
                                data-badge-name = {badge}
                                className={`transition-colors duration-100 ${badgeLayout}`}>
                            {badge}
                            <input  type="checkbox"
                                    className="appearance-none"
                                    name={badge}
                                    onChange={handleChange}
                                    id={badge}
                                    value={badge}/>
                        </label>
                    ))
                }
             </div>
    )
}
 
export default BadgePicker