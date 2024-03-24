import React from "react";
import appWriteService from '../appwrite/config.js';
import {Link} from 'react-router-dom';


function Postcard({$id, title, featuredImage}){

    return(
        <>
            <Link to={`/post/${$id}`}>
                <div className="">
                    <div className="">
                        <img src={appWriteService.getFilePreview(featuredImage)}
                        alt="title"
                        className=""></img>
                    </div>

                    <h2
                    className=""
                    >{title}</h2>

                </div>
            </Link>
        </>
    )
}

export default Postcard; 
