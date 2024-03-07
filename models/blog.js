const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title:{
    type: String,
    reqired: true
  },
  body:{
    type: String,
    reqired: true
  },
  coverImageUrl:{
    type:String,
    required: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
}, { timestamps: true });

const Blog = model('blog', blogSchema);

module.exports = Blog;





