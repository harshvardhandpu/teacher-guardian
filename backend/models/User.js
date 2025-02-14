const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    phone: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
});
module.exports = mongoose.model('User', UserSchema);
