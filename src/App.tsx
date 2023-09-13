import { useEffect, useRef, useState } from "react"
import { searchType, syncFetchProducts } from "./queryHook"
import PageHopper from "./PageHopper"
import PageHopper_Lite from "./PageHopper-Lite"



// Remember to modify pageNo to 1 whenever
// anything other than pageNo itself, changes




function App() {


  const [totalPages, setTotalPages] = useState<null | number>(null)
  // const [totalPages, setTotalPages] = useState<null | number>(7)
  const [searchObject, setSearchObject] = useState<searchType>({
    pageNo:1,
    pageLength:2,
    price:[0,2500],
    category:null
  })

  const { data } = syncFetchProducts(searchObject)

  function handlePrice(e: React.ChangeEvent<HTMLSelectElement>) {
       setSearchObject({...searchObject,category:e.target.value, pageNo:1})
  }

  function handlePage(page:number) {
      setSearchObject({...searchObject, pageNo:page})
      console.log(page)
  }

  
  useEffect(()=>{
    if (data && data[0]) {
      const PageCount = Math.ceil(data[0].total/searchObject.pageLength)
      setTotalPages(PageCount)
    }
  },[data])

  
  return (
      <div className={`w-screen h-screen bg-black flex justify-center items-center gap-x-4`}>

        <div className={`w-80 bg-gray-800 rounded-md `}>
           <div className={`text-3xl font-bold text-gray-400 text-center py-3 border-b-2 border-b-gray-500`}>
              Products
           </div>
           <div className={`h-96 bg-gray-950 m-4 overflow-scroll`}>
              {
                data?.map((product:any) => (
                  <div key={product.id} className={`m-4 text-center py-2 bg-neutral-800`}>
                    {product.name} : {product.price}
                  </div>
                ))
              }
           </div>
        </div>

        <div className={`w-80 bg-gray-800 rounded-md`}>

          <div className={`text-3xl font-bold text-gray-400 text-center py-3 border-b-2 border-b-gray-500`}>
            Filters
          </div>

          <div className={`w-full p-4 flex`}>
           <select className="bg-black grow rounded-lg px-4 py-3 border-none"
                   onChange={ e => handlePrice(e) }>
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="clothes">Clothes</option>
           </select>
          </div>

          <div className={`bg-slate-950 mx-4 py-3 rounded-lg flex justify-center`}>
             sdf
          </div>

          <div className={`bg-slate-950 mt-4 mx-4 mb-4 py-3 rounded-lg flex justify-center`}>
             {/* <PageHopper_Lite
                totalPages={totalPages ? totalPages : 5 }
                onPageChange={handlePage || 5}
                size="xs"
                activeBg="bg-blue-200"
                activeText="text-black"
                passiveBg="bg-white"
                passiveText="text-black"
                boxBg="bg-white"
                maxPages={3}
                /> */}
            <PageHopper_Lite
                totalPages={ totalPages ? totalPages : 5 }
                onPageChange={handlePage}
                size="xs"
                activeBg="bg-orange-600"
                activeText="text-gray-200"
                passiveBg="bg-black"
                passiveText="text-gray-400"
                boxBg="bg-black"
                maxPages={4}
                firstAndLast ={true}
                />
          </div>


        </div>

      </div>
  )
}

export default App
