'use strict';

const BaseRepository = require('./base/BaseRepository');
const _ = require('lodash');

/**
 * @class ChampionChangeRepository
 * @extends BaseRepository
 */
function ChampionChangeRepository() {}
ChampionChangeRepository.prototype = new BaseRepository('championchange');

module.exports = ChampionChangeRepository;
