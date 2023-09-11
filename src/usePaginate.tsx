import { useState } from "react"
import useSideEffect from "./useSideEffect"


type PaginationProps = {
    firstButtons: number;
    lastButtons: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
  }



function PageHopper(props:PaginationProps) {

    const {firstButtons, lastButtons, totalPages, onPageChange} = props

    const [pageNum, setPageNum] = useState(1)
    const [first, setFirst] = useState(Array.from({ length: firstButtons }, (_, index) => 1 + index))
    const [last, setLast] = useState(Array.from({ length: lastButtons }, (_, index) => totalPages - lastButtons + 1 + index))
    const [trails, setTrails] = useState(true)

    if (firstButtons<=0 || lastButtons<=0) {
        throw new Error("Both firstButtons and lastButtons must be greater than 0.");
    } else if (firstButtons + lastButtons > totalPages) {
        throw new Error("Total Pages cant be greater than firstButtons + lastButtons.");
    } else if (firstButtons + lastButtons === totalPages) {
        setTrails(false)
    }

    useSideEffect(()=>{
        onPageChange(pageNum)
    },[pageNum])


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

         setPageNum(num)
    }

    function toggleActive() {
         
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
     
    function handlePageClick(e:React.MouseEvent<HTMLButtonElement>) {
        const pageNumber = (e.target as HTMLButtonElement).getAttribute('data-page');
         reorderPagination(Number(pageNumber))
    }
     

    return (
        <div className={`flex w-full text-2xl font-bold`}>
            
            <button className={`bg-red-700 grow hover:bg-red-900 transition-colors duration-100`}
                 onClick={bkwdArrow}>
                {`<`}
            </button>

        {
            first.map((number,index) => (
                <button key={index}
                     className={`bg-red-700 grow hover:bg-red-900 transition-colors duration-100`}
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
                <div className={`grow text-center`}>
                    ···
                </div>
                                
            :   null
        }

        {
            last.map((number,index) => (
                <button key={index}
                     className={`bg-red-700 grow hover:bg-red-900 transition-colors duration-100`}
                     data-page={number}
                     onClick={handlePageClick}
                     >
                   {number}
                </button>
            ))
        }

            <button className={`bg-red-700 grow hover:bg-red-900 transition-colors duration-100`}
                onClick={fwdArrow}>
                {`>`}
            </button>

        </div>

    )
}
 
export default PageHopper