const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const ESP_URL = 'http://94.14.0.166:301/';

/**
 * We need to initialize admin in order to connect
 * to the firestore database
 */
admin.initializeApp();

/**
 * When this route is triggered it requests measurements
 * from the ESP and stores received data in to firestore
 */
exports.garden = functions.https.onRequest((req, res) => {
  /**
   * Grab measurements from the ESP
   */
  request(ESP_URL, (err, response, body) => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {

      /**
       * Parse the request body in to JSON (it comes in as a string)
       */
      const measurements = JSON.parse(body);

      /**
       * Attach a date to the measurements before storing
       */
      measurements.date = new Date();

      /**
       * Store measurements received from the ESP to the firestore database
       */
      return admin.firestore().collection('measurements').add(measurements).then((writeResult) => {
        return res.json({result: `Measurement with ID: ${writeResult.id} added.`});
      });
    }
  });
});

/**
 * Forwards vent control to ESP
 */
exports.gardenVentUp = functions.https.onRequest((req, res) => {

  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/vent-up?power${req.query.power}`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});

exports.gardenVentDown = functions.https.onRequest((req, res) => {

  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/vent-down?power${req.query.power}`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});

exports.gardenPhUp = functions.https.onRequest((req, res) => {
  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/ph-up`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});
exports.gardenPhDown = functions.https.onRequest((req, res) => {
  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/ph-down`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});
exports.gardenLight = functions.https.onRequest((req, res) => {
  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/light${req.query.on ? '?on=true' : ''}`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});

exports.gardenHeater = functions.https.onRequest((req, res) => {
  /**
   * Forward request to ESP
   */
  request(`${ESP_URL}/light${req.query.on ? '?on=true' : ''}`, err => {

    /**
     * If we don't have any errors the request was successful
     */
    if (!err) {
      res.json({success: true})
    } else {
      res.status(500).send({success: false})
    }
  });
});
