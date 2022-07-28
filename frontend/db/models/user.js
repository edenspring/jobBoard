'use strict';
const bcrypt = require('bcryptjs')
const {
  Model,
  Validator,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    //helper function to validate provided password against user's hashed password
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    //function to log user in with provided password and either email address or username
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //function to create new users given provided information
    static async signup({ username, email, firstName, lastName, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName, 
        lastName,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });
  return User;
};