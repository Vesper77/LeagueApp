'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionRepository
 * @extends BaseRepository
 */
function ChampionRepository() {}
ChampionRepository.prototype = new BaseRepository('champion');

module.exports = ChampionRepository;
