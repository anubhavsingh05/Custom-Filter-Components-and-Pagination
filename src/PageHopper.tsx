import { useEffect, useRef, useState } from "react"
import useSideEffect from "./useSideEffect"

// What if Total Pages are 0 ??



type PaginationProps = {
    // firstButtons: number;
    // lastButtons: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
    size : "xs" | "sm" | "md" | "lg";
    activeBg:string;
    activeText:string;
    passiveBg:string;
    passiveText:string;
    navButtonsBg:string;
    navButtonsText:string;
    boxBg:string;
  }


function PageHopper(props:PaginationProps) {

    const { totalPages, onPageChange,
            size, activeBg, activeText, passiveBg, passiveText,
            navButtonsBg, navButtonsText, boxBg } = props

    const btnSizes = {
        xs : "w-7 h-7 text-xs rounded-sm",
        sm : "w-8 h-8 text-sm rounded-sm",
        md : "w-10 h-10 text-lg rounded-md",
        lg : "w-12 h-12 text-xl rounded-md",
    }

    const navBtnSizes = {
        xs : "w-14 h-7 text-xs rounded-sm",
        sm : "w-16 h-8 text-sm rounded-sm",
        md : "w-20 h-10 text-lg rounded-md",
        lg : "w-24 h-12 text-xl rounded-md",
    }

    const boxStyle = {
        xs : "gap-x-2 px-2 py-2 rounded-sm",
        sm : "gap-x-2 px-2 py-2 rounded-sm",
        md : "gap-x-2 px-2 py-2 rounded-md",
        lg : "gap-x-2 px-2 py-2 rounded-md",
    }

    const firstButtons = totalPages/2 <= 3 ? Math.ceil(totalPages/2) : 3
    const lastButtons = totalPages/2 <= 3 ? Math.floor(totalPages/2) : 2
                
    const [pageNum, setPageNum] = useState(1)
    const firstButtonList = Array.from({ length: firstButtons }, (_, index) => 1 + index)
    const [first, setFirst] = useState(firstButtonList)
    const lastButtonList = Array.from({ length: lastButtons }, (_, index) => totalPages - lastButtons + 1 + index)
    const [last, setLast] = useState(lastButtonList)
    const [trails, setTrails] = useState(true)
    const parentRef = useRef<HTMLDivElement | null>(null)

    if (firstButtons < 0 || lastButtons < 0) {
        throw new Error("Both firstButtons and lastButtons must be greater than 0.");
    } else if (firstButtons + lastButtons > totalPages) {
        throw new Error("Total Pages cant be greater than firstButtons + lastButtons.");
    }

    useSideEffect(()=>{
        toggleActivePassivePages();
        onPageChange(pageNum)
    },[pageNum])
    
// _________________________________________ PROPS CHANGE DETECTOR

// This part is only usefull if
//  1)  The props firstButtons, lastButtons & totalPages,
//      are dynamic (changing) and not static, 
//  2)  During development, you are constantly testing
//      different colors props and you want automatic
//      update (hot update) for it. Please note that this
//      2nd point is only usefull during development


    useEffect(()=>{
        refreshButtonColors()
        toggleActivePassivePages()
    },[ activeBg, activeText, passiveBg, passiveText,
        size,navButtonsBg, navButtonsText, boxBg ])

    useEffect(()=>{
        refreshButtonNumbers()
    },[ firstButtons, lastButtons, totalPages ])

    useEffect(()=>{
        toggleActivePassivePages()
    },[first, last])

    function refreshButtonNumbers() {
        const firstButtonList = Array.from({ length: firstButtons }, (_, index) => 1 + index)
        const lastButtonList = Array.from({ length: lastButtons }, (_, index) => totalPages - lastButtons + 1 + index)
        setFirst(firstButtonList)
        setLast(lastButtonList)
        setPageNum(1)
        if ( lastButtons === 0 || firstButtonList[firstButtonList.length-1] === lastButtonList[0] - 1 ) {
            setTrails(false)
        } else {
            setTrails(true)
        }
    }
     
    function refreshButtonColors() {
        const children = parentRef.current?.children
        if (children) { 
            const childrenArray = Array.from(children)
            childrenArray.forEach ((child,index) => {
                if (index>1 && index>1 && index<childrenArray.length-2) {
                    const classesArray = Array.from(child.classList);
                    classesArray.forEach(className => {
                        if (className.startsWith("bg") || className.startsWith("text")) {
                            if (!["text-sm", "text-lg", "text-xl"].includes(className)) {
                                child.classList.remove(className)
                            }
                        }
                    })
                }
            })
        }
    }

// _________________________________________ PROPS CHANGE DETECTOR


    function reorderPagination(num:number) {

        if (num === first[first.length - 1] && num !== last[0]-1) {
            setFirst(first.map(number => number + 1))
            if (num === last[0]-2) {
                setTrails(false)
            }
        } else if (num === first[0] && num !== 1) {
            setFirst(first.map(number => number - 1))
            setTrails(true)
        } else if (num === last[0] && num !== first[first.length-1] + 1) {
            setLast(last.map(number => number - 1))
            if (num === first[first.length-1] + 2) {
                setTrails(false)
            }
        } else if (num === last[last.length -1] && num !== totalPages) {
            setLast(last.map(num => num + 1))
            setTrails(true)
        }

        // This last if is needed just only for one specific case, as
        // we have set maximum limit of 2 cor lastButtons, if u set it
        // to 3, there would be no need of this
        else if (num === last[last.length -1] + 1) {
            setLast(last.map(num => num + 1))
            setTrails(true)
        }

        setPageNum(num)
    }

    function toggleActivePassivePages() {
        const children = parentRef.current?.children

        if (children) { 
            const childrenArray = Array.from(children)
            childrenArray.forEach((child, index) => {
                const childNum = child.getAttribute('data-page')
                if (childNum && +childNum === pageNum) {
                    child.classList.add(`${activeBg}`)
                    if (activeBg !== passiveBg) {
                        child.classList.remove(`${passiveBg}`)
                    }
                    child.classList.add(`${activeText}`)
                    if (activeText !== passiveText) {
                        child.classList.remove(`${passiveText}`)
                    }
                } else if (index>1 && index>1 && index<childrenArray.length-2) {
                    child.classList.add(`${passiveBg}`)
                    if (activeBg !== passiveBg) {
                        child.classList.remove(`${activeBg}`)
                    }
                    child.classList.add(`${passiveText}`)
                    if (activeText !== passiveText) {
                        child.classList.remove(`${activeText}`)
                    }
                }
            })
        }
    }
     

    function fwdArrow() {
         if (pageNum < totalPages) {
             reorderPagination(pageNum + 1)
         }
    }

    function bkwdArrow() {
         if (pageNum > 1) {
             reorderPagination(pageNum - 1)
         }
    }

    function firstArrow() {
        if (pageNum === 1) {
            return   
        }
        setFirst(firstButtonList)
        setPageNum(1)
        if (firstButtonList[firstButtonList.length-1] + 1 !== last[0]) {
            setTrails(true)
        }
    }

    function lastArrow() {
        if (pageNum === totalPages) {
            return   
        }
        setLast(lastButtonList)
        setPageNum(lastButtonList[lastButtonList.length-1])
        if (lastButtonList[0] !== first[first.length-1] + 1) {
            setTrails(true)
        }
    }
     
    function handlePageClick(e:React.MouseEvent<HTMLButtonElement>) {
        const clickedPage = (e.target as HTMLButtonElement).getAttribute('data-page');
        if (clickedPage && pageNum !== +clickedPage) {
            reorderPagination(+clickedPage)
        }
    }
     

    return (
        <div className={`${boxBg} ${boxStyle[size]} flex font-bold`}
             ref={parentRef}>
            
            <button className={`${navBtnSizes[size]} ${navButtonsBg} ${navButtonsText} flex justify-center items-center`}
                 onClick={firstArrow}>
                {`Start`}
            </button>
            <button className={`${navBtnSizes[size]} ${navButtonsBg} ${navButtonsText} flex justify-center items-center`}
                 onClick={bkwdArrow}>
                {`< Prev`}
            </button>

        {
            first.map((number,index) => (
                <button key={index}
                     className={`${btnSizes[size]} flex justify-center items-center`}
                     data-page={number}
                     onClick={handlePageClick}
                     >
                   {number}
                </button>
            ))
        }

        {
            trails
            ?   
                <button disabled className={`${btnSizes[size]} flex justify-center items-center`}>
                    ···
                </button>
                                
            :   null
        }

        {
            last.map((number,index) => (
                <button key={index}
                     className={`${btnSizes[size]} flex justify-center items-center`}
                     data-page={number}
                     onClick={handlePageClick}
                     >
                   {number}
                </button>
            ))
        }

            <button className={`${navBtnSizes[size]} ${navButtonsBg} ${navButtonsText} flex justify-center items-center`}
                onClick={fwdArrow}>
                {`Next >`}
            </button>
            <button className={`${navBtnSizes[size]} ${navButtonsBg} ${navButtonsText} flex justify-center items-center`}
                 onClick={lastArrow}>
                {`End`}
            </button>

        </div>

    )
}
 
export default PageHopper