const dotenv = require('dotenv');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('database connection sucsessfull');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required for a string'],
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    default: 4.5,
  },
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Ali rana barfi',
  price: 4822329,
  ratings: 4.9,
});

testTour.save().then((doc) => {
  console.log(doc);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port} `);
});
