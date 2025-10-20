const { default: mongoose } = require('mongoose');

let dbUrl = 'mongodb+srv://devhabib2005:poiuuiop2005@cluster0.a7hq35j.mongodb.net/job-board?retryWrites=true&w=majority&appName=Cluster0'

console.log(process.env.MONGODB_URL);

exports.dbConnect = async () => {
  return await mongoose
    .connect(dbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB Connection Error:', error));
};

