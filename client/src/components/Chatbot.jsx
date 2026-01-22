import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { MdOutlineAccountCircle } from "react-icons/md";
import './chatbot.css'

function Chatbot() {

    const [message,setmessage] = useState([]);
    const [input,setinput] = useState("");
    const [loading,setloading]= useState(false)
    // logic for going at the bottom of the chat window useeffect
    const messageEndRef = useRef(null);
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])


    const handleFunction= async()=>{
         
        try {
           
            if(!input.trim()){return}
            setloading(true)
            const res= await axios.post("https://spoofybotserver.onrender.com/bot/v1/message",{
                text:input
            })
            
            if(res.status===200){
                setmessage([...message,{text:res.data.userMessg,sender:"user"},{text:res.data.botMessg,sender:"bot"}])
            }
            
            setinput("");
            
            
    
        } catch (error) {
            console.log("error",error)
        }
        setloading(false)

    }


  return (
    <div className='flex flex-col min-h-screen m-auto overflow-auto bg-slate-950 text-white'>

        
        {/*creating navbar with tailwind css */}
        <div className=' flex p-4 top-0  border-b border-gray-400 text-white text-center font-bold text-xl'>
            <div className='ml-5'>spoofyBot</div>
            <div className='absolute mr-5 top-4 right-4'><MdOutlineAccountCircle size={30} /></div>
        </div>


        <div className='chat-window h-[360px] m-15 p-4 overflow-y-auto justify-center  flex-col gap-10'>
            {message.length===0?(<div className='text-center m-auto justify-center text-gray-500 mt-20'><h2 className='font-bold text-center m-auto justify-center tracking-wide mt-30  text-white'>Hi,I am spoofyBot</h2></div>):(
                message.map((msg,index)=>(
                    <div key={index} className={msg.sender==="user"?"text-right":"text-left"}>
                        <div className={msg.sender==="user"?"inline-block bg-blue-500 mt-7 text-white p-2 rounded-lg":"inline-block bg-gray-200 mt-7 text-black p-2 rounded-lg"}>
                            {msg.text}
                        </div>
                    </div>
                ))
            )}

            {loading&&(<div className='text-left'>
                <div className='inline-block bg-gray-200 mt-10 text-black p-2 rounded-lg'>
                   Bot is Typing...
                </div>
            </div>
            )}
           < div ref={messageEndRef} />
        </div>



       <footer className='fixed bottom-0 left-0 right-0 w-full bg-slate-950'>
         <div className='flex m-4 gap-4 fixed bottom-1 left-0 right-0 p-4'>
            <input type="text" placeholder='Ask to spoofyBot' className=' bg-gray-800 p-2 rounded-lg w-full' value={input} onChange={(e)=>setinput(e.target.value)} />
            <button className='bg-neutral-900 hover:bg-slate-700 right-3 text-white p-2 rounded-lg' onClick={handleFunction} disabled={loading}>
                {
                    loading?"Sending...":"Send"
                }
            </button>
        </div>
       </footer>
       




    </div>
  )
}

export default Chatbot
