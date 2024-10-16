import React, { useState } from 'react'
import axios from 'axios'

function UrlShortener() {
  const[url,setUrl]=useState("")
  const[shortenUrl,setShortenUrl]=useState("")
  const accessToken=process.env.REACT_APP_ACCESS_TOKEN
  function handleClick(){
    axios.post('https://api.tinyurl.com/create',{
        "url": url
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
    })
    .then((response)=>{
        if(response.status===200){
            const shortenUrl=response.data.data.tiny_url
            setShortenUrl(shortenUrl)
        }
        else{
            throw new Error('Error:',response.status)
        }
    })
    .catch(error=>{
        console.log(error.message)
    })
  }

  async function writeTextToCLipBoard(){
    try{
        await navigator.clipboard.writeText(shortenUrl)
    }
    catch(error){
        console.log(error.message)
    }
  }
  return (
    <div className='url-shortener'>
      <div>
        <h1>Url Shortener</h1>
      </div>
      <input type='text' placeholder='Enter the url' value={url} onChange={(e)=>setUrl(e.target.value)}/>
      <button type='button' onClick={handleClick}>Shorten Url</button>
      {shortenUrl!==""?<p>Your Shortened Url is <span className='shorten-url'onClick={writeTextToCLipBoard}>{shortenUrl}</span></p>:null}
    </div>
  )
}

export default UrlShortener
