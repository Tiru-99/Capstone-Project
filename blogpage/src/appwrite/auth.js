import config from '../conf/conf.js'

import {Client , Account, Id } from 'appwrite';


export class AuthService {
    client = new Client(); 
    account;

   //Code to create an account through appwrite backend 

    constructor() {
      this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
      this.account = new Account(this.client);

    }
    
    //Code for user registration and sign up 
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create
            (Id.unique(), email, password,name);

            if(userAccount){
                //add another function
                return this.login({email,password});
            }

            else{
                return userAccount; 
            }
        }
        catch(e){
            throw error; 
        }
    }

    //Code for user login 
    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }

        catch(e){
            throw error; 
        }
    }

    //Code for checking user status i.e if user is logged in or not 
    async getCurrentUserStatus(){
        try{
           return await this.account.get();
        }

        catch (error){
            console.log("Appwrite error :: getCurrentUserStatus Error Detected", error); 
        }

        return null; 
    }


    //Code for logging out user 
    async logout(){
        try{
            await this.account.deleteSessions();
        }

        catch(error){
            console.log("Error while logging out of the system :" , error);
        }
    }


}


export default AuthService; 