import { useState } from "react"
import { searchType, syncFetchProducts } from "./queryHook"
import RangeSlider from "./RangeSlider"
import PageSlider_Lite from "./PageSlider-Lite"
import BadgePicker from "./BadgePicker"



function App() {

  const [searchObject, setSearchObject] = useState<searchType>({
    pageNo:1,
    pageLength:5,
    price:[0,2500],
    category:null
  })

  const { data, isFetching } = syncFetchProducts(searchObject)

  // const  handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSearchObject({...searchObject,category:e.target.value, pageNo:1})
  // }

  const  handleCategory = (category:string[]) => {
    setSearchObject({...searchObject,category:category[0], pageNo:1})
  }

  const  handlePage = (page:number) => {
      setSearchObject({...searchObject, pageNo:page})
  }
  
  const handlePrice = (value:number[]) => {
      setSearchObject({...searchObject, price:[value[0],value[1]], pageNo:1})
  }
  
  
  return (
      <div className={`w-screen h-screen bg-black flex justify-center items-center gap-x-4 ${isFetching ? "pointer-events-none" : "pointer-events-auto"}`}>

        <div className={`w-80 bg-gray-800 rounded-md`}>
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

          <div className={`text-3xl font-bold text-gray-400 text-center py-3 border-b-2 border-b-gray-500`}>Filters</div>

          <BadgePicker badges={["phone","laptop","clothes"]}
                      onSelect={handleCategory}
                      activeBgColor="bg-gray-900"
                      passiveBgColor="bg-black"
                      activeTextColor="text-white"
                      passiveTextColor="text-gray-400"
                      containerLayout="flex flex-col overflow-hidden rounded-md"
                      badgeLayout="py-2 flex justify-center items-center"
                      />
            
          <div className={`flex justify-center items-center`}>
            <RangeSlider  defaultValue={[200,800]}
                          max={1000} min={0} step={10}
                          onValueCommit={handlePrice}/>
            </div>

          <div className={`bg-slate-950 rounded-lg flex justify-center`}>
            <PageSlider_Lite
                totalPages={ data?.[0] ? data[0].total/searchObject.pageLength : 1 }
                onPageChange={handlePage}
                size="xs"
                activeBgColor="bg-gray-600"
                activeTextColor="text-white"
                passiveBgColor="bg-gray-800"
                passiveTextColor="text-gray-400"
                boxBgColor="bg-black"
                maxButtons={4}
                firstAndLast
                />
          </div>

        </div>
      </div>
  )
}

export default App



  