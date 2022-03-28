// types
import { Express } from 'express'
import path from 'path'

import { CLIENT_URL } from 'config/env'

// middlewares
import cors from 'cors'
import express from 'express'
//import cookieParser from 'cookie-parser'

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default (server: Express) => {
    server.use(express.json())
    server.use(cors())
		server.use('/static', express.static(path.join(__dirname, '.', '..', 'uploads')))
    //server.use(cookieParser())
}