const request=require('request')


const geocoding=(address, callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibmVoYXNvbmkxMCIsImEiOiJja20waGgyNm8ybW5kMndwM3FzenAxM3MxIn0.y2e8qiwx8sDhj_4JqjA41Q"
   
    request({url:url,json:true},(error,{body})=>{
        if(error){
                   callback("oops something went wrong",undefined)
                }
                else if(body.features.length===0)
                {
                    callback('not found Location',undefined)
                }
                else
                { callback(undefined,{
                   
                longitude:body.features[0].center[0],
                latititude:body.features[0].center[1],
                location:body.features[0].place_name

                })}
                    
        
    })

}
module.exports=geocoding;