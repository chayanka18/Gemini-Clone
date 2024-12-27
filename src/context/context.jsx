import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setinput] = useState("");
    const [recentprompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult]= useState(false);
    const [loading,setLoading] = useState(false);
    const[resultData,setResultData] = useState("");

    const delayPara = (index,nextword)=>{
        setTimeout(function(){
        setResultData(prev=>prev+nextword);
    },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("");//Remove previous response from statevariable
        setLoading(true);//animation
        setShowResult(true);
        let response;
        if(prompt !== undefined)
        {
            response =await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])// spread operator
            setRecentPrompt(input)
            response = await run(input)
            
        }
        
        let responseArray = response.split("**");
        let newResponse="";

        for(let i=0;i<responseArray.length;i++)
        {
            if(i===0 || i%2 !==1)
            {
                newResponse +=responseArray[i];
            }

            else{
                newResponse +="<b>"+responseArray[i]+"</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br");
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++)
        {
            const nextword = newResponseArray[i];
            delayPara(i,nextword+" ");
        }
        setLoading(false);
        setinput("");

    }

    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentprompt,
        showResult,
        loading,
        resultData,
        input,
        setinput,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

