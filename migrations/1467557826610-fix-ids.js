'use strict'

const getDatabase = require('../database');
const flatten = require('lodash').flatten;

function isThoughtsCollection(collection) {
  return collection.s.name.startsWith('thoughts-');
}

function fixId(id) {
  return id.toString().replace(/\./, '');
}

/*
 * Fetches all thoughts, updates their IDs by converting them into strings and removing dots
 */

function updateThoughtIds(collection) {
  return collection.find().toArray().then((thoughts) => {

    const updatePromises = thoughts.map((thought) => {
      const newData = Object.assign({}, thought, {
        id: fixId(thought.id)
      });

      return collection.update({ id: thought.id }, newData);
    });

    return Promise.all(updatePromises);
  });
}

function updateThoughtCollections() {

  return getDatabase().then((database) =>
    database.collections()
  )
  .then((collections) => {
    const thoughtUpdatePromises = collections
      .filter(isThoughtsCollection)
      .map(updateThoughtIds);

    return Promise.all(thoughtUpdatePromises);
  });
}

exports.up = function(next) {
  updateThoughtCollections()
    .then(() => next())
    .catch(next)
};

exports.down = function(next) {
  next();
};
