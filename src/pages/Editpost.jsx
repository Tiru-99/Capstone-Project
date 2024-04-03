import React from 'react';
import {useEffect , useState} from 'react'
import appWriteService from '../appwrite/config';
import { useNavigate , useParams } from 'react-router-dom';
import {Container} from '../components';
import { PostForm } from '../components';

function Editpost(){

    const[post, setPost] = useState(null);
    const{slug} = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if(slug){
            appWriteService.getPost(slug)
            .then((post)=>{
                if(post){
                    setPost(post);
                }
            })
        } else{
            
            navigate('/')
        }
    },[slug , navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post = {post}></PostForm>
            </Container>
        </div>
    ) : null
}


export default Editpost; 