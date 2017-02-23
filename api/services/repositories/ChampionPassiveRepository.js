'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class ChampionPassiveRepository
 * @extends BaseRepository
 */
function ChampionPassiveRepository() {}
ChampionPassiveRepository.prototype = new BaseRepository('championpassive');

module.exports = ChampionPassiveRepository;
