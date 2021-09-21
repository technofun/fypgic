const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({

    subject1:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    },
    subject2:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    },
    subject3:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    },
    subject4:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    },
    subject5:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    },
    subject6:{
        subjectname:String,
        midterm:Number,
        sessional:Number,
        finals:Number,

    }
})
const SemesterSchema = new mongoose.Schema({
    semester1: {
        type: [SubjectsSchema]
    }
    , semester2: {
        type: [SubjectsSchema]
    },
    semester3: {
        type: Array,
        default: [SubjectsSchema]
    },
    semester4: {
        type: Array,
        default: []
    },
    semester5: {
        type: Array,
        default: []
    },
    semester6: {
        type: Array,
        default: []
    },
    semester7: {
        type: Array,
        default: []
    },
    semester8: {
        type: Array,
        default: []
    }
})

// })


const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
    },
    rollnumber: {
        type: Number,
        min: 3
    },
    registrationNumber: {
        type: String,
        require: true,
    },
    universityRollNumber: {
        type: Number,
        require: true,
    },
    session: {
        type: String
    },
    batch: {
        type: String
    },
    semester: {
        type: [SemesterSchema],
    },
    email: {
        type: String,
        max: 50,
        // unique: true
    },
    username: {
        type: String,
        require: true,
        min: 5
    },
    profilePicture: {
        type: String,
        default: ""
    },
    currentSemester: {
        type: String,
        default: 1
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true }
)

module.exports = mongoose.model('Student', StudentSchema)