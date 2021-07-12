const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: 'Username is required', 
        trim: true
    }, 

    email: {
        type: String, 
        required: 'Email address is required', 
        unique: true, 
        validate: [validateEmail, 'Please fill in a valid email address'], 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // 'thoughts' Array of _id values referencing the Thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }], 
    // 'friends' an array of _id values referencing the User model (self-reference)
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, 
{
    toJSON: {
        virtuals: true, 
        getters: true
    }, 
    id: false
}
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce((total, friend) => total + friends.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User; 