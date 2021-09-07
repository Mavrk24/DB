const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      default: "Username"
    },
    email: {
      type: String,
      required: true,
      default: "E-mail"
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    result: {
      type: Array,
      require: true
    },
    demographic: {
      type: Object,
      require: true,
      default: {}
    },
    ndi: {
      type: Array,
      require: true,
      default: [] 
    },
    workplace: {
      type: Array,
      require: true,
      default: 0
    },
    qtree: {
      type: Array,
      require: true,
      default: []
    },
    recommendation: {
      type: Array,
      require: true,
      dafault: []
    } // end here
  },

  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "user_data"
  }
  );

module.exports = User = mongoose.model("users", UserSchema);