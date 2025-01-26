import React from 'react'
import { Textarea } from '@/components/ui/textarea'
function TextArea({item,handleInputChange, carInfo}) {
  return (
    <div>
      <Textarea /*required = {item.required} */
      onChange = {(e)=>handleInputChange(item.name,e.target.value)}
      defaultValue= {carInfo?.[item.name]}/>
    </div>
  )
}

export default TextArea