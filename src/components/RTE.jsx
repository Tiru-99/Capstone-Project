import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";
//Controller hamne isiliye liya hai taki agar koi jagah pe ye component use kar rahe hai to , waha pe iske data ka access le sake 

function RTE ({name, control, label , defaultValue }){
    return(
        <div>
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller
                name = { name || "content"}
                control = {control}
                render = {({field : {onChange}}) => (

                    <Editor
                    apiKey="gqd1q4jsxdfcdb2kij3ic9a5szraxp1f4ngbil31shweerz4"
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                    />

                )}

            />
        </div>
    )
}

export default RTE;