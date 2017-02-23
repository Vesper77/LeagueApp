const BaseRepository = require('./base/BaseRepository');

/**
 * @class UserRepository
 * @extends BaseRepository
 */
class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

module.exports = UserRepository;
