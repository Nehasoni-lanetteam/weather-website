const request=require('request')

const forecast=(address,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=d69a734e06c051b6c8f8e5beb04450c3&query="+address;
    request({url:url, json:true},(error,{body})=>{
        if(error)
        {
            callback("oops no Internet", undefined)
        }
        else if(body.error)
        {
            callback("Not found Location", undefined)
        }
        else{
          
            callback(undefined,"temperature"+ body.current.temperature +"\nWeather Description:"+body.current.weather_descriptions+"\n Humidity"+body.current.humidity)
        }
    })
}
module.exports=forecast