import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input({ label, 
    type = "text",
    className = "",
    ...props 
    }, ref) {

    const id = useId(); 

    return (
        <div className='w-full'>
           {label && <label
           htmlFor={id}>
                {label}
           </label>
           }

           <input
           type={type}
           className={`${className}`}
           ref = {ref}
           >
            
           </input>
        </div>
    );
});

export default Input;
