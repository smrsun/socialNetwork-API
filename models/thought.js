//const { match } = require('assert');
const { Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // get: (createdAtVal) => createdAtVal.toISOString() 
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now, set: v => v.Date.now() }
        },
        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    }, {
        toJSON: {
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = { Thought };