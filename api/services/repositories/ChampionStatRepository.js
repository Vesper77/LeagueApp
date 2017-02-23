'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionStatRepository
 * @extends BaseRepository
 */
function ChampionStatRepository() {}
ChampionStatRepository.prototype = new BaseRepository('championstat');

module.exports = ChampionStatRepository;
