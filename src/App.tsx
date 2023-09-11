import { useState } from "react"
import { searchType, syncFetchProducts } from "./queryHook"
import PageHopper from "./usePaginate"



function App() {

  const [searchObject, setSearchObject] = useState<searchType>({
    pageNo:1,
    pageLength:2,
    price:[0,250],
    category:null
})

  const { data } = syncFetchProducts(searchObject)

  function handlePrice(e: React.ChangeEvent<HTMLSelectElement>) {
       setSearchObject({...searchObject,category:e.target.value})
  }

  // function handlePages({selected}) {
  //      setSearchObject({...searchObject, pageNo:selected})
  // }
  //  console.log(searchObject.pageNo)
  //  const arr = Array.from({ length: 4 }, (_, index) => 7 + index);
  //  console.log(arr)
  function handleForNow(page:number) {
       console.log("_______here___")
       console.log(page)
  }
   
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
                    {product.category}     -     {product.name}
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
              <option value="furniture">Furniture</option>
              <option value="watches">Watches</option>
           </select>
          </div>

          <div className={`bg-slate-950 mx-4 py-3 rounded-lg flex justify-center`}>
             sdf
          </div>

          <div className={`bg-slate-950 mt-4 mx-4 mb-4 py-3 rounded-lg flex justify-center `}>
             <PageHopper
                firstButtons={3}
                lastButtons={2}
                totalPages={10}
                onPageChange={handleForNow}
                />
          </div>

        </div>

      </div>
  )
}

export default App
