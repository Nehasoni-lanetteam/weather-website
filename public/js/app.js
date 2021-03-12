console.log('client side ')

const weatherform =document.querySelector('form')

const search=document.querySelector('input')
const messageone=document.querySelector("#message1")
const messagetwo=document.querySelector('#message2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()   
    const location=search.value
    messageone.textContent='loading'
    messagetwo.textContent=''
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent=data.error
                console.log(data.error)
            }
            else
          {  messageone.textContent=data.location
             messagetwo.textContent="temperatue"+data.forecast.temperature
            console.log(data)}
    
        })
        
    })
    .catch((e)=>console.log("bhai Errror h ", e))
    
    

    
   
})




