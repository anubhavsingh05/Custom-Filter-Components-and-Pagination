# FilterBox - Custom Filter Components & Pagination



This project consists of 3 separate custom components namely: PageSlider-Lite, RangeSlider & BadgePicker.
Also, The project along with React + TypeScript, is built with Tailwind and thus, some components also
expects some styles based on Tailwind CSS

![customFilterComponents](https://github.com/anubhavsingh05/Custom-Filter-Components-and-Pagination/assets/132212797/71bddfb1-63db-4ca8-8c13-99587f75e93b)


## PageSlider-Lite:

- An optimized pagination component
- Its a lighter version of my original PageHopper component

```js
   <PageSlider_Lite   totalPages={ 10 }
                      onPageChange={handlePage}
                      size="lg"
                      activeBgColor="bg-gray-600"
                      activeTextColor="text-white"   
                      passiveBgColor="bg-gray-800"
                      passiveTextColor="text-gray-400"
                      boxBgColor="bg-black"
                      maxButtons={4}
                      firstAndLast
                    />
```

- `totalPages`       :  Total number of pages you want to paginate
- `onPageChange`     :  Function that you want to call on page change
- `size`             :  "xs","sm", "md" and "lg"
- `activeBgColor`    :  Color applied to active page button's background
- `passiveBgColor`   :  Color applied to passive page button's background
- `activeTextColor`  :  Color applied to active page button's text
- `passiveTextColor` :  Color applied to passive page button's text
- `boxBgColor`       :  Color applied to container of the component
- `maxButtons`       :  No. of maximum buttons you want to show
- `firstAndLast`     :  (Optional) set it to true to show start & end buttons



## RangeSlider:

   - A double range selector with display board
   - Built on top of shadCn/Radix UI
     
```js
    <RangeSlider  defaultValue={[200,800]}
                  max={1000} min={0} step={10}
                  onValueCommit={handleFinalValue}
                  onValueChange={handleChangeInValue}
                />
```

- `defaultValue`   :  Default values on which the two sliders rest initially
- `max`            :  Maximum value you want the slider can reach
- `min`            :  Minimum value you want the slider can reach
- `step`           :  How many steps you want the slider to jump while draging
- `onValueCommit`  :  What function you want to call when user stops sliding
- `onValueChange`  :  (optional), Function you want to call on every change



## BadgePicker:

   - A badge picker component which can be used as any options,tags,category etc selector.
   - Supports single and multiple selections

```js
      const {token, setToken} = useState<boolean>()
      
      <BadgePicker badges={["phone","laptop","clothes"]}
                   onSelect={handleCategory}
                   activeBgColor="bg-gray-900"
                   passiveBgColor="bg-black"
                   activeTextColor="text-white"
                   passiveTextColor="text-gray-400"
                   containerLayout="flex flex-col overflow-hidden rounded-md"
                   badgeLayout="py-2 flex justify-center items-center"
                   selectMultiple
                   customBadgeStrings = {["select phone", "select laptop", "select clothes"]}
                   resetBadgeToken = {token}
                 />
```

- `badges`              :  A string of texts you want to make badges out of
- `onSelect`            :  What function you want to call when user selects a badge
- `containerLayout`     :  Layout of the container (consider it as a div containing badges)
- `badgeLayout`         :  Layout of the badges
- `selectMultiple`      :  (Optional), Set it to true to use multi badge select feature
- `customBadgeStrings`  :  (Optional), This would be shown to the user as badges while the value of each badge would be taken from `badges` (if not provided, the `badges` would be shown by default )  
- `resetBadgeToken?`    :  (Optional), A boolean value which would reset badges if toggeled
- All the other properties are similar to properties of RangeSlider component

### Getting Started

Clone the Repo

```bash
git clone https://github.com/anubhavsinghofficials/FilterBox.git
```

Install Packages

```bash
npm install
```
Run the development server:

```bash
npm run dev
```

The server will run on [http://localhost:3000](http://localhost:3000)
