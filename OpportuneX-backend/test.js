const User = require('./models/User'); // adjust path

async function deleteAllUsers() {
  try {
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
  } catch (err) {
    console.error('Error deleting users:', err);
  }
}

// Example usage
deleteAllUsers();