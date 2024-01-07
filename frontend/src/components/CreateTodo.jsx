import { useState } from "preact/hooks";

export function CreateTodo(){

    const [title,setTitle] = useState("");
    const [description ,setDescription] = useState("")

    return (
        <div>
            <input style={{
                margin:10,
                padding:10
            }}type="text" placeholder="title" onChange={function(e){
                const title = e.target.value;
                setTitle(title);
            }} /> <br />
            <input style={{
                margin:10,
                padding:10
            }} type="text" placeholder="description" onChange={function(e){
                const description = e.target.value;
                setDescription(description)
            }}/> <br />

            <button style={{
                margin:10,
                padding:10
            }} onClick={()=>{
                const requestBody = JSON.stringify({
                    title: title,
                    description: description
                });

                const encoder = new TextEncoder();
                const bodyLength = encoder.encode(requestBody).length;

                fetch("http://localhost:3000/todo",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Content-Length": bodyLength.toString()

                    },
                    body:requestBody
                })
                .then(async function(res){
                    const json = await res.json();
                    alert(JSON.stringify(json))
                })

                .catch(error =>{
                    console.error('Error:',error);
                })
            }}>Add Todo</button>
        </div>
    )
}