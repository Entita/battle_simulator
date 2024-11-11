const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

const allUnitTypes = ["Antitank/Antiarmor", "Infantry", "Motorized", "Air Defense", "Special Forces"]
const allUnitCallsigns = ["Alpha-1", "Bravo-2", "Charlie-3"]
const allUnitMoves = ["Move", "In-Action", "Waiting", "Defend", "Attack", "Patrol", "Hold Position", "Retreat"]
const allUnitConditions = ["Operational", "Damaged", "Heavily Damaged", "Destroyed"]
const allUnitAmmunitionTypes = ["Standard", "Armor Piercing", "High Explosive", "Incendiary", "Smoke"]

const getRandomLat = () => Math.random() * (65 - 60) + 60
const getRandomLon = () => Math.random() * (30 - 22) + 22
const getRandomSpeed = () => Math.floor(Math.random() * (150 - 50 + 1)) + 50
const getRandomNumber = max => Math.floor(Math.random() * max)
const getRandomElementFromArray = array => array[Math.floor(Math.random()*array.length)]
const generateRandomPath = (maxNumberOfPaths) => {
  const path = []
  const randomPathPoints = Math.floor(Math.random() * maxNumberOfPaths) + 1
  for(let i = 0; i < randomPathPoints; i++) {
    const newPath = { lon: getRandomLon(), lat: getRandomLat(), reached: false }
    path.push(newPath)
  }
  return path
}

// init variables
var logs = []
var timestamps = {
  value: [{ state: 'paused', timestamp: new Date().getTime() }],
  state: 'paused',
}
var markers = [...Array(100).keys()].map((id) => ({
  id: id + 1,
  type: getRandomElementFromArray(allUnitTypes),
  location: { lon: getRandomLon(), lat: getRandomLat() },
  path: generateRandomPath(3),
  speed: getRandomSpeed(),
}))
var units = markers.map((marker) => ({
  ...marker,
  callsign: getRandomElementFromArray(allUnitCallsigns),
  mission: getRandomElementFromArray(allUnitMoves),
  condition: getRandomElementFromArray(allUnitConditions),
  ammunition: { type: getRandomElementFromArray(allUnitAmmunitionTypes), quantity: getRandomNumber(100) },
}))

setInterval(() => {
  // main simulation state, when state playing, play the simulation (move units towards their target regards to their speed)
  if (timestamps.state === 'playing') {
    const getTargetLocation = (marker) => {
      return marker.path.find(path => !path.reached)
    }

    const moveTowardsTarget = (marker) => {
      const speedFactor = 0.0005  // Speed per second

      const currLocation = marker.location
      const targetLocation = getTargetLocation(marker)
      if (!targetLocation) return currLocation

      const deltaLon = targetLocation.lon - currLocation.lon
      const deltaLat = targetLocation.lat - currLocation.lat

      const distanceToTarget = Math.sqrt(deltaLon ** 2 + deltaLat ** 2)

      // Calculate the step as a proportion of speed factor to distance
      const stepLon = (deltaLon / distanceToTarget) * speedFactor * marker.speed
      const stepLat = (deltaLat / distanceToTarget) * speedFactor * marker.speed
      const stepDistance = Math.sqrt(stepLon ** 2 + stepLat ** 2)

      if (stepDistance >= distanceToTarget) {
        // if the unit would "over stepped" the target, place it on the target
        targetLocation.reached = true
        return { lon: targetLocation.lon, lat: targetLocation.lat }
      }

      return {
        lon: currLocation.lon + stepLon,
        lat: currLocation.lat + stepLat,
      }
    }

    markers.forEach((marker, markerIndex) => {
      const newlocation = moveTowardsTarget(marker)
      marker.location = newlocation
      units[markerIndex].location = newlocation
    })
  }
}, 1000)

io.on("connection", async (socket) => {
  // web socket connection
  const sendLogs = () => {
    socket.emit('logs_update', logs)
  }

  const resetLogs = () => {
    logs = []
    socket.emit('logs_update', logs)
  }

  const addNewLog = (newLog) => {
    logs.push(newLog)
    socket.emit('logs_update', logs)
  }

  const sendMarkersAndUnits = () => {
    socket.emit('simulation_init', { markers, units })
  }

  const sendTimestamps = () => {
    socket.emit('timestamps_update', timestamps)
  }

  const setNewTimestamps = (newTimestamps) => {
    timestamps = newTimestamps
    socket.emit('timestamps_update', timestamps)
  }

  const resetTimestamps = () => {
    timestamps = {
      value: [{ state: 'paused', timestamp: new Date().getTime() }],
      state: 'paused',
    }
    socket.emit('timestamps_update', timestamps)
  }

  sendTimestamps()
  sendLogs()
  sendMarkersAndUnits()
  setInterval(() => sendMarkersAndUnits(), 1000)

  socket.on('timestamps_get', sendTimestamps)
  socket.on('timestamps_update', setNewTimestamps)
  socket.on('timestamps_reset', resetTimestamps)
  socket.on('logs_update', addNewLog)
  socket.on('logs_reset', resetLogs)
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})