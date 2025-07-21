import {QueryClient, QueryClientProvider, useQueries, useQuery, useQueryClient} from "@tanstack/react-query"
const queryClient=new QueryClient();
  async function getter(){
    const res=await fetch("https://jsonplaceholder.typicode.com/posts");
    const json=await res.json();
    return json
  }

function App() {
  
    return(
    <QueryClientProvider client={queryClient}>
      <Post/>
    </QueryClientProvider>
    )
  
}
function Post(){
  const queryClient=useQueryClient();
  const {data,isLoading,error}=useQuery({queryKey:['posts'],queryFn:getter , refetchInterval:10*1000});
  if(error){
      return <div>Error while Loading...</div>
  }
  if(isLoading){
    return "Loading...";
  }
  return <div>
    {data.map((items)=>(<div key={items.id} className="bg-blue-700 mb-[3rem]">
      {items.title}
      {items.body}
    </div>))}
  </div>
}

export default App
