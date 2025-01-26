import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


function DropdownField({item,handleInputChange,carInfo}) {
    return (
        <div>
            <Select 
                /*required= {item.required}*/ 
                onValueChange={(value)=>handleInputChange(item.name,value)}
                defaultValue={carInfo?.[item.name]}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={carInfo?.[item.name]}  />
            </SelectTrigger>
            <SelectContent>
                {item?.options?.map((option,index)=>(
                <SelectItem value={option}>{option}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
    )
    }

    export default DropdownField