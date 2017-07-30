'use strict';
require('./array_includes_polyfill')();

const filtered = (raw, required) => Object.keys(raw)
    .filter(key => required.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});

const isScalar = (v) => {
  return typeof v !== 'object' && !Array.isArray(v);
}

module.exports = function (req, res, next) {
  let original = res.json;

  function json_hook(json) {
    res.json = original;
    if (res.headersSent)
      return res;
    // If no returned value from fn, then assume json has been mucked with.
    if (json === undefined)
      json = original;
    // If null, then 204 No Content
    if (json === null)
      return res.status(204).end();
    // If scalar value, then text/plain
    if (isScalar(json)) {

      res.set('content-type', 'text/plain');

      return res.send(json);
    }

    if (req.query.pluck !== undefined) {

      try {
        //getting object keys from pluck params
        let keys = req.query.pluck.split(',').filter((i) => {
          return i.trim().length !== 0
        });
        if (keys.length === 0) {
          return res;
        }
        //if response is in array format mutate objects inside the array
        if (json instanceof Array) {

          json = json.map((object) => {

            if (object instanceof Object) {

              object = filtered(object, keys)

            }
            return object

          })

        } else if (json instanceof Object) {
          //if response is in object format mutate objects inside the array

          json = filtered(json, keys)

        }
      } catch (err) {

        console.error(err);

      }
    }
    return original.call(this, json);
  }

  res.json = json_hook;

  next && next();
}
