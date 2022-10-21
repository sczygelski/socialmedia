const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.subscribe((rewq,res)=>{
    res.status(404).send('<h1>Error!</h1>')
})

module.exports=router