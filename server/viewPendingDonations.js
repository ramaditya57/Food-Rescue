const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Donation = require('./models/Donation'); // adjust if your model path is different

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to DB ✅');

  const pending = await Donation.find({ status: 'Pending' });
  console.log('Pending Donations:', pending);

  mongoose.disconnect();
}).catch(err => {
  console.error('MongoDB error:', err);
});