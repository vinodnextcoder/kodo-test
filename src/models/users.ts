import mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      text: true
    },
    description: {
      type: String,
    },
    image: {
      type: String
    },
    photoUrl: {
      type: String,
    },
    provider: {
      type: String
    },
    contactType: {
      type: String,
    },
    phone: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({name: 'text'});

module.exports = mongoose.model('User', UserSchema);
