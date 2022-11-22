import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInAnonymously} from "firebase/auth";
import { auth } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


export const Google = async() => {     
    
    const googleRes = await signInWithPopup(auth, googleProvider)
    .then((res) => {
      return null
    })
    .catch(err => console.log(err));
        
}
    
export const Github = async() => {
    
    const githubRes = await signInWithPopup(auth, githubProvider)
    .then((res) => {
      return null 
    })
    .catch(err => console.log(err));

}

export const  Anonymous = async() => {

    signInAnonymously(auth)
      .then((res) => {
        return null
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       
      });
}

