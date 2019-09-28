import mongoose, {Schema} from 'mongoose';

const BlacklistSchema = new Schema({
  token: {
    type: String,
    required: {
      message: 'Token is required'
    }
  }
});

const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

Blacklist.findByToken = (token) => Blacklist.findOne({
  token
});

export default Blacklist;
