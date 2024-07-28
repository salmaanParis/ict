const mongoose = require('mongoose')
const weeklySubmissionSchema = mongoose.Schema({
    s_id:String,
    week:String,
    links:String,
    files:String,
    comments:String,
})
const weeklySubmissionData = mongoose.model('weeklySubmission',weeklySubmissionSchema)
module.exports = weeklySubmissionData