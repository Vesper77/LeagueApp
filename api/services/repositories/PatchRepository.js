'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class PatchRepository
 * @constructor
 */
function PatchRepository() {}
PatchRepository.prototype = new BaseRepository('patch');

module.exports = PatchRepository;
