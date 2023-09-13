import { useEffect, useRef, useState } from "react"



type PaginationProps = {
    totalPages: number;
    onPageChange: (pageNum: number) => void;
    size : "xs" | "sm" | "md" | "lg";
    activeBg:string;
    activeText:string;
    passiveBg:string;
    passiveText:string;
    boxBg:string;
    maxButtons:number;
    firstAndLast?:boolean;
  }


function PageSlider_Lite(props:PaginationProps) {


    const { totalPages, onPageChange, size, boxBg,
            activeBg, activeText, passiveBg, passiveText,
            maxButtons, firstAndLast = false } = props

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

    const [pageNum, setPageNum] = useState(1)

    const absTotalPages = Math.ceil(totalPages)
    const noOfButtons = absTotalPages <= maxButtons ? absTotalPages : maxButtons
    const pageButtonsList = Array.from({ length: noOfButtons }, (_, index) => 1 + index)
    const [pageButtons, setPageButtons] = useState(pageButtonsList)
    const parentRef = useRef<HTMLDivElement | null>(null)


    useEffect(()=>{
        toggleActivePassivePages()
        onPageChange(pageNum)
    },[pageNum])

// _________________________________________ PROPS CHANGE DETECTOR

    useEffect(()=>{
        reorderPagination(1)
    },[ totalPages, maxButtons ])

    useEffect(()=>{
        refreshButtonColors()
        toggleActivePassivePages()
    },[ activeBg, activeText, passiveBg, passiveText, size, boxBg ])

        
    function refreshButtonColors() {
        const children = parentRef.current?.children || []
        const childrenArray = Array.from(children)

        const leave = firstAndLast ? 1 : 0
        childrenArray.forEach ((child,index) => {
            if (index > leave && index < childrenArray.length-leave-1) {
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

// _________________________________________ PROPS CHANGE DETECTOR


    function reorderPagination(num:number) {

        if (num === pageButtons[pageButtons.length - 1] && num !== absTotalPages) {
            setPageButtons(pageButtons.map(number => number + 1))
        } else if (num === pageButtons[0] && num !== 1) {
            setPageButtons(pageButtons.map(number => number - 1))
        } else if (num === 1) {
            setPageButtons(pageButtonsList)
        } else if (num === absTotalPages) {
            const lastButtonsList = pageButtonsList.map(num => absTotalPages - noOfButtons + num)
            setPageButtons(lastButtonsList)
        }
        if (num >= 1 && num <= absTotalPages && num !== pageNum) {
            setPageNum(num)
        }
    }

    function toggleActivePassivePages() {
        const children = parentRef.current?.children

        if (children) { 
            const childrenArray = Array.from(children)
            const leave = firstAndLast ? 1 : 0

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
                } else if (index>0+leave && index<childrenArray.length-leave-1) {
                    child.classList.add(`${passiveBg}`)
                    if (activeBg !== passiveBg) {
                        child.classList.remove(`${activeBg}`)
                    }
                    child.classList.add(`${passiveText}`)
                    if (activeText !== passiveText) {
                        child.classList.remove(`${activeText}`)
                    }
                }
                 else if (!firstAndLast && index>0 && index<childrenArray.length-1) {
                }
            })
        }
    }

     
    const handlePageClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = (e.target as HTMLButtonElement)
        const clickedPageNo = target.getAttribute('data-page');
        if (clickedPageNo && pageNum !== +clickedPageNo) {
            reorderPagination(+clickedPageNo)
        }
    }
     
    return (
        <div className={`${boxBg} ${boxStyle[size]} flex font-bold`}
             ref={parentRef}>
            
            {   firstAndLast &&
                <button className={`${navBtnSizes[size]} ${activeBg} ${activeText} flex justify-center items-center`}
                        onClick={() => reorderPagination(1)}>
                    {`Start`}
                </button>
            }

            <button className={`${navBtnSizes[size]} ${pageNum !== 1 ? `${activeBg} ${activeText}`:`${passiveBg} ${passiveText} opacity-50` } flex justify-center items-center`}
                    onClick={() => reorderPagination(pageNum - 1)}
                    disabled={pageNum === 1}>
                {`< Prev`}
            </button>


            {
                pageButtons.map((number,index) => (
                    <button key={index}
                            className={`${btnSizes[size]} transition-colors duration-100 flex justify-center items-center`}
                            data-page={number}
                            onClick={handlePageClick}>
                    {number}
                    </button>
                ))
            }


            <button className={`${navBtnSizes[size]} ${ pageNum !== absTotalPages ? `${activeBg} ${activeText}`:`${passiveBg} ${passiveText} opacity-50` } flex justify-center items-center`}
                    onClick={() => reorderPagination(pageNum + 1)}
                    disabled={pageNum === absTotalPages}>
                {`Next >`}
            </button>

            {
                firstAndLast &&
                <button className={`${navBtnSizes[size]} ${activeBg} ${activeText} flex justify-center items-center`}
                        onClick={() => reorderPagination(absTotalPages)}>
                    {`End`}
                </button>
            }

        </div>

    )
}
 
export default PageSlider_Lite