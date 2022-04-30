const mongoose = require("mongoose");
const { Schema } = mongoose;

function generatePictureSeed() {
  let randomSet = []; // Array for a bunch of random, possible characters, that will then go on to be randomly chosen from for the final password
  let ensureSet = []; // Array for ensuring that at least one of each selected char-set will be included in the final password
  let seed = []; // Array for the final, randomly generated password.

  const range =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  randomSelector(range);
  charsetEnsure(range);

  function randomSelector(x) {
    for (let i = 0; i < 100; i++) {
      xChar = x.charAt(Math.floor(Math.random() * x.length));
      randomSet.push(xChar);
    }
  }

  function charsetEnsure(x) {
    xChar = x.charAt(Math.floor(Math.random() * x.length));
    ensureSet.push(xChar);
  }

  seed.push(ensureSet.join(""));

  for (let i = 0; i < 100 - ensureSet.length; i++) {
    var charPicked = randomSet[Math.floor(Math.random() * randomSet.length)];
    seed.push(charPicked);
  }

  return seed.join("").toString() + ".svg";
}

const userSchema = new Schema({
  uid: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  givenName: String,
  familyName: String,
  phoneNum: {
    type: String,
    unique: true,
  },
  photoURL: {
    type: String,
    default: generatePictureSeed(),
  },
  contacts: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  conversations: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
