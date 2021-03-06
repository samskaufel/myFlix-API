const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Mongoose schema for movie objects
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Born: Date,
    Died: Date
  },
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Mongoose schema for user objects
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * Hash password
 * @param {string} password 
 * @returns password hash
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates an entered password by comparing it to the stored password hash
 * @param {string} password 
 * @returns boolean
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

// Create models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// export models
module.exports.Movie = Movie;
module.exports.User = User;