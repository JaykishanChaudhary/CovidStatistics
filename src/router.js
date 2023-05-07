const router=require('express').Router();
const {connection }=require('./connector');


router.get('/totalRecovered',async(req,res)=>{
    try{
            const CovidData=await connection.find({});
            // console.log(CovidData)
            var totalRecovered=0;
            CovidData.forEach((data)=>{
                totalRecovered+=data.recovered
                // console.log(totalRecovered);
            })
            // console.log(totalRecovered);
            res.status(200).json( {data: {_id: "total", recovered:totalRecovered}})
    }catch(err){
        throw err
    }
})


router.get('/totalActive',async(req,res)=>{
    try{
            const CovidData=await connection.find({});
            // console.log(CovidData)
            var totalActive=0;
            CovidData.forEach((data)=>{
                totalActive+=data.infected
                // console.log(totalActive);
            })
            // console.log(totalActive);
            res.status(200).json( {data: {_id: "total", recovered:totalActive}})
    }catch(err){
        throw err
    }
})

router.get('/totalDeath',async(req,res)=>{
    try{
            const CovidData=await connection.find({});
            // console.log(CovidData)
            var totalDeath=0;
            CovidData.forEach((data)=>{
                totalDeath+=data.death
                // console.log(totalDeath);
            })
            // console.log(totalDeath);
            res.status(200).json( {data: {_id: "total", recovered:totalDeath}})
    }catch(err){
        throw err
    }
})

router.get('/hotspotStates',async(req,res)=>{
    try{
            const CovidData=await connection.collection.aggregate([
               { $project:{state:1,rate:{$round:[{$divide:[{$subtract:['$infected','$recovered']},'$recovered']},5]}}},
               {$match:{rate:{$gt:0.1}}}
            ]).toArray()
            // console.log(CovidData)
            // console.log(totalDeath);
            res.status(200).json( {data:CovidData});
    }catch(err){
        throw err
    }
})


router.get('/healthyStates',async(req,res)=>{
    try{
            const CovidData=await connection.collection.aggregate([
               { $project:{state:1,rate:{$round:[{$divide:['$death','$infected']},5]}}},
               {$match:{rate:{$lt:0.005}}}
            ]).toArray()
            // console.log(CovidData)
            // console.log(totalDeath);
            res.status(200).json( {data:CovidData});
    }catch(err){
        throw err
    }
})

module.exports=router