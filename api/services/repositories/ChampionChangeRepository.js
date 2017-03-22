'use strict';

const BaseRepository = require('./base/BaseRepository');
const _ = require('lodash');

/**
 * Repository ChampionChangeRepository
 */

/**
 * @class ChampionChangeRepository
 * @extends BaseRepository
 */
function ChampionChangeRepository() {}
ChampionChangeRepository.prototype = new BaseRepository('championchange');

module.exports = ChampionChangeRepository;
