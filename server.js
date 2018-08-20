const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const sgMail = require('@sendgrid/mail')
/* eslint-disable */
require('dotenv').config({path: __dirname + '/.env'})
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))
app.get('/', function (req, res) {
    res.send('Server OK')
})
app.post('/sendEmail', (req, res) => {
    let data = req.body
    sendEmail(data.email)
})
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})
const sendEmail = (email) => {
    console.log(`Send E-mail to ${email}`)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: process.env.EMAIL_SENDER,
      subject: 'Verify Token Naja',
      text: 'ยืนยันการสมัครเรียบร้อย นี่คือ key ของคุณ\n',
      html: '<strong>ยืนยันการสมัครเรียบร้อย นี่คือ key ของคุณ\n</strong>'
    }
    sgMail.send(msg)
    console.log('Send E-mail Complete')
  }