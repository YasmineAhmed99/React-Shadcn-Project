
import { ChevronsUpDown } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function Collapse() {

    return (
      <>
      <Collapsible
        className="w-[650px] space-y-2 border-2 border-black mx-auto mt-12 h-10"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            Jenny Rosen
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
  </div>
     </CollapsibleContent>
      </Collapsible>

      </>
    )
  }
  
  export default Collapse;
  