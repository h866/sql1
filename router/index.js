var express = require('express')
var router= express.Router()

//mysql서버연결해서 가져와야함. 라이브러리 가져오면됨.
var mysql = require('mysql')

require('dotenv').config()

//json형태로 데이터베이스 연결
var db =mysql.createConnection({
    host: process.env.DB_HOST, //'localhost'
    user: process.env.DB_USER, //'root'
    password:process.env.DB_PW,//'1234'
    database : process.env.DB_NAME  //'o2'
})

router.get('/topic/add',(req,res)=>{
    var sql ='SELECT * FROM topic' //조회해서 데이터베이스 가져오는 쿼리문.
    db.query(sql,(err,result)=>{
        if(!err){//에러없으면
        console.log(result)
        res.render('add',{topics :result})
        }else
        console.log(err)

    
    }) //쿼리 날려잇 후 콜백함수로 데이터보내옴
    
})

router.post('/topic/add',(req,res)=>{
   console.log(req.body)

  var title= req.body.title
  var description= req.body.description
  var author= req.body.author

    var sql ='INSERT INTO topic (title, description, author) VALUES(?, ?, ? )'
    var params= [title,description,author]
    db.query(sql,params,(err,result)=>{
        if(!err){
        //console.log("성공")
        res.redirect('/topic/add')
        }else {
            console.log(err)
        }
    })
})
// /: 은 /이후 params로 인식됨. /topic/1 은 1이란 params값
router.get(['/topic','/topic/:id'],(req,res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql,(err,results)=>{
        var id = req.params.id
        if(id){
        var sql1 = 'SELECT * FROM topic WHERE id=?'
        db.query(sql1,[id],(err,result)=>{
            if(!err){
                res.render('view',{topics :results, topic :result[0]})
        }else{
        console.log(err)
        res.status(500).send("Internal Server Error") //연결지연
        }
    })   
        }else{
            res.render('view',{topics:results, topic:undefined})
        } 
       })
    
    })


//     console.log(req.params.id)
//     var id = req.params.id
    
//     db.query(sql,[id],(err,result)=>{
//         if(!err){
//         res.render('test',{topic:result})
//         }else
//         console.log(err)
//     })   
// })

// router.get('/topic/:id/edit',()=>{

// })

module.exports =router