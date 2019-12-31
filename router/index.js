var express = require('express')
var router= express.Router()

//mysql서버연결해서 가져와야함. 라이브러리 가져오면됨.
var mysql = require('mysql')

require('dotenv').config()

//json형태로 데이터베이스 연결
var db =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PW,
    database : process.env.DB_NAME  
})




module.exports =router