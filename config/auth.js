const jwt = require('jsonwebtoken')  // ใช้งาน jwt module
const keys = require("../config/keys");
 
// สร้าง middleware ฟังก์ชั่นสำหรับ verification token
const authorization = ((req, res, next) => {
    const authorization = req.headers['token']  // ดึงข้อมูล authorization ใน header
    // ถ้าไม่มีการส่งค่ามา ส่ง ข้อความ json พร้อม status 401 Unauthorized
    if(authorization===undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized"
    })   
    // ถ้ามีการส่งค่ามา แยกเอาเฉพาะค่า token จากที่ส่งมา 'Bearer xxxx' เราเอาเฉพาะ xxxx
    // แยกข้อความด้วยช่องว่างได้ array สองค่า เอา array key ตัวที่สองคือ 1 
    // array key เริ่มต้นที่ 0 จะเได้ key เท่ากับ 1 คือค่า xxxx ที่เป้น token
    const token = JSON.parse(req.headers['token']).token
// แก้ token Authorization
    if(token===undefined) return res.status(401).json({ // หากไมมีค่า token
        "status": 401,
        "message": "Unauthorized"
    })   
    // ใช้ค่า privateKey เ็น buffer ค่าที่อ่านได้จากไฟล์ private.key ในโฟลเดอร์ config
    const privateKey = keys.secretOrKey
    // ทำการยืนยันความถูกต้องของ token
    jwt.verify(token, privateKey, function(error, decoded) {
        if(error) return res.status(401).json({ // หาก error ไม่ผ่าน
            "status": 401,
            "message": "Unauthorized"
        })   
        console.log(error)
        console.log(decoded)      
        // ถ้าทุกอย่างผ่าน ทุกเงื่อนไข ก็ไปทำ middleware ฟังก์ชั่นในลำดับถัดไป
        next()
    })
})
 
module.exports = authorization   // ส่ง middleware ฟังก์ชั่นไปใช้งาน