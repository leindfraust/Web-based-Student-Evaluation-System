require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const path = require('path')

// cors options
const allowlist = ['http://localhost:8080']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// express usages
app.use(morgan('tiny'))
app.use(express.json())
app.use(history())
app.use(cors(corsOptionsDelegate))
app.use(express.static(path.join(__dirname, 'client/dist')))

// use sessions
const sess = {
  secret: 'studentrecords',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: MongoStore.create({
    mongoUrl: encodeURI(process.env.mongouri),
    crypto: {
      secret: 'studentrecords'
    }
  })
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))
const sessAccount = require('./sessions/accountSession')

app.use('/session', sessAccount)

// APIs

// routes
const subjectRecords = require('./routes/api/subjectRecords')
const studentRecords = require('./routes/api/studentRecords')
const dynamicAccounts = require('./routes/api/dynamicAccounts')
const logActivity = require('./routes/api/logActivity')

// API usages
app.use('/api/subject-records', subjectRecords)
app.use('/api/student-records', studentRecords)
app.use('/api/account', dynamicAccounts)
app.use('/api/logs', logActivity)

// connect to MongoDB
const dbConnect = async () => {
  mongoose.connect(process.env.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

dbConnect().then(() => console.log('MongoDB online')).catch((err) => console.log(err))

// listen server
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})

// serving for production
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})
