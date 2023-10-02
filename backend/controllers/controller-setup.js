// this is used in the main.js to setup all the controllers.
// all the controllers can be setup here to keep it all well organized.
exports.setup = function() {
	const express = require('express')
	const bodyParser = require('body-parser')
	const app = express()
	const server = require('http').Server(app)
	const port = 3000

    app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept')
		next()
	})

	//pre-flight requests
	app.options('*', function(req, res) {
		res.send(200)
	})

	server.listen(port, (err) => {
		if (err) {
			throw err
		}
		/* eslint-disable no-console */
		console.log('Node Endpoints working')
	})

	module.exports = server

	// sets up the character controller and base endpoint.
  const characterController = require('./character-controller.js')
  app.use('/character', characterController)
  
	// sets up the stats controller and base endpoint.
  const statController = require('./stat-controller.js')
  app.use('/stat', statController)

	// sets up the stats controller and base endpoint.
	const equipmentController = require('./equipment-controller.js')
	app.use('/equipment', equipmentController)

	// sets up the stats controller and base endpoint.
	const abilityController = require('./ability-controller.js')
	app.use('/ability', abilityController)

	// sets up the stats controller and base endpoint.
	const settingsController = require('./settings-controller.js')
	app.use('/settings', settingsController)
}