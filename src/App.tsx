import { useState } from "react"
import { searchType, syncFetchProducts } from "./queryHook"
import RangeSlider from "./RangeSlider"
import PageSlider_Lite from "./PageSlider-Lite"



function App() {


  const [searchObject, setSearchObject] = useState<searchType>({
    pageNo:1,
    pageLength:5,
    price:[0,2500],
    category:null
  })

  const { data } = syncFetchProducts(searchObject)

  const  handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchObject({...searchObject,category:e.target.value, pageNo:1})
  }

  const  handlePage = (page:number) => {
      setSearchObject({...searchObject, pageNo:page})
  }
  
  const handlePrice = (value:number[]) => {
      setSearchObject({...searchObject, price:[value[0],value[1]], pageNo:1})
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
                  <div key={product.id} className={`m-4 text-center py-2 bg-gray-800`}>
                    {product.name} : {product.price}
                  </div>
                ))
              }
           </div>
        </div>


        <div className={`w-80 px-4 py-8 flex flex-col gap-y-6 bg-gray-800 rounded-md`}>

          <div className={`text-3xl font-bold text-gray-400 text-center py-3 border-b-2 border-b-gray-500`}>
            Filters
          </div>

          <div className={`flex`}>
           <select className="bg-black grow rounded-lg px-4 py-3 border-none"
                   onChange={ e => handleCategory(e) }>
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="clothes">Clothes</option>
           </select>
          </div>
            
          <div className={`bg-black flex justify-center items-center`}>
            <RangeSlider  defaultValue={[20,80]}
                          max={100} min={0} step={10}
                          onValueCommit={handlePrice} />
            </div>

          <div className={`bg-slate-950 rounded-lg flex justify-center`}>
            <PageSlider_Lite
                totalPages={ data ? data[0].total/searchObject.pageLength : 5 }
                onPageChange={handlePage}
                size="sm"
                activeBg="bg-gray-600"
                activeText="text-white"
                passiveBg="bg-gray-800"
                passiveText="text-gray-400"
                boxBg="bg-black"
                maxButtons={2}
                />
          </div>

        </div>
      </div>
  )
}

export default App



  