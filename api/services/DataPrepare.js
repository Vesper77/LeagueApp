module.exports = new DataProcess();

function DataProcess() {

  // Common functions
  function getFieldOfAttribute(model, attr, field) {

    if (!model._attributes[attr][field]) {

      return model._attributes[attr][field];

    }

    return null;

  }

  function userPrepare(data) {

    if (data.username && typeof data.username == 'string') {

      data.username = data.username.trim();

    }

    return data;

  }

  function userCheck(data) {

    let errors = [];

    if (typeof data.username === 'string') {

      let minLength = getFieldOfAttribute(User, 'username', 'minLength');
      let maxLength = getFieldOfAttribute(User, 'username', 'maxLength');

      if (data.username.length < minLength) {

        errors.push(__('err_username_min_length', {length: minLength}));

      }

      if (data.username.length > maxLength) {

        errors.push(__('err_username_max_length', {length: maxLength}));

      }

    } else {

      errors.push(__('err_bad_username'));

    }

    if (typeof data.password === 'string') {

      //Set MinLength because in db stored hashed version of password
      let minLength = 6;

      if (data.password.length < minLength) {

        errors.push(__('err_password_min_length', {length: minLength}));

      }


    } else {

      errors.push(__('err_bad_password'));

    }

    return errors;

  }

  return {

    user: {
      prepare: userPrepare,
      check: userCheck
    }

  };

}
