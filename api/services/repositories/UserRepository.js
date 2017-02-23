'use strict';

const BaseRepository = require('./base/BaseRepository');

/**
 * @class UserRepository
 * @extends BaseRepository
 */
function UserRepository() {}
UserRepository.prototype = new BaseRepository('user');

module.exports = UserRepository;
