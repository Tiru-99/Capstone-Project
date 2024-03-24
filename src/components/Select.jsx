import React from "react";
import { useId } from "react";


function Select({
    options, 
    label, 
    classname = "",
    ...props 
} ,  ref ){
    const id = useId(); 
    return(
        <>
            <div className="w-full">
                {label && <label htmlFor={id} className=""></label>}
                <select
                {...props}
                id={id}
                ref={ref}
                className="">
                {/* yaha pe normal syntax nahi likhna options ka, pehle idhar apan check kar rahe ki option exist karte ki nahi , 
                kyuki normal syntax direct use kiya to error aata hai */}
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )

}


export default React.forwardRef(Select); 