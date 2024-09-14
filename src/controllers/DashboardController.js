
const User = require('../models/UserModel');

const index = async (req, res) => {
   try {
      const users = await User.find();
      res.render('dashboard', { data: users});
   } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
   }
}

const destroy = async (req, res) => {
   try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { index, destroy}