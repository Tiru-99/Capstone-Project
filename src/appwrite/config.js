import conf from '../conf/conf.js';
import {Client, ID, Databases, Storage , Query} from "appwrite";

// Code for services provided 


//Main class service 
export class Service{
    client = new Client(); 
    database; 
    bucket; 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    //Code for creating post in our blog website
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        }
        catch(error){
            console.log("error found:", error);
        }
    } 

    //Code for updating post for our blog website
    async updatePost(slug,{title,content, featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status, 

                }
            )
        }
        catch(error){
            console.log("Appwrite Service: update Post error :",error);
        }
    }

    //Code for delete post for our blog website
    async deletePost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
             return true;
        }
        catch(error){
            console.log("Error in delete Post :",error);
            return false; 
        }
    }

    //Code to get post 
    async getPost(slug){
        try{
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Get Post error:",error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries, 
            )

        }
        catch(error){
            console.log("Get Posts error:",error);
        }
    }

    //file upload services 
    async uploadFile(file){
        try{
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                
            )
        }
        catch(error){
            console.log("Appwrite:uploadFile:: ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true; 
        }
        catch(error){
            console.log("Appwrite::deleteFile Error:",error);
            return false; 
        }
    }

    async filePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

}