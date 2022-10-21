const express=require('express')
const mongoose= require('mongoose')

const app = express()
const PORT=process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || '', {
    useNewUrlParse: true,
    useUnifiedTopology: true
})

mongoose.set('debug', true)
app.use(requre('./routes'))
app.listen(PORT, () => console.log(`connected on localhost:${PORT}`))