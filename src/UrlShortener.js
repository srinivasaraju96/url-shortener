import React, { useState } from 'react'
import axios from 'axios'

function UrlShortener() {
  const[url,setUrl]=useState("")
  const[shortenUrl,setShortenUrl]=useState("")
  const[value,setValue]=useState("")
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
        setValue('copied to clipboard')
        setTimeout(()=>setValue(""),1000)
    }
    catch(error){
        console.log(error.message)
    }
  }
  return (
    <div className='url-shortener'>
      <h1>Url Shortener</h1>
      <input type='text' placeholder='Enter the url' value={url} onChange={(e)=>setUrl(e.target.value)}/>
      <button type='button' onClick={handleClick}>Shorten Url</button>
      {shortenUrl!==""?<p>Your Shortened Url is <span className='shorten-url'onClick={writeTextToCLipBoard}>{shortenUrl} <img src='copy-regular.svg' alt='copy' width='20px'/></span></p>:null}
      <span className='copied'>{value}</span>
    </div>
  )
}

export default UrlShortener
