const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
    airport: {
        type: String,
        default: 'SFO',
        enum: ['AUS', 'SFO', 'DFW', 'JFK', 'DEN', 'LAX']
    },
    arrival: {
        type: Date,
        default: function() {
            let date = new Date();
            date.setFullYear(date.getFullYear()+1);
            return date;
        }
    }
}, {
    timestamps: true
});

const flightSchema = new Schema ({
    airline: {
        type: String, 
        enum: ['American', 'United', 'Southwest', 'Air Lingus']
    },
    airport: {
        type: String,
        default: 'SFO',
        enum: ['AUS', 'SFO', 'DFW', 'JFK', 'DEN', 'LAX']
    },
    flightNo: {
        type: Number,
        required: true, 
        min: 10,
        max: 9999
    }, 
    departs: {
        type: Date,
        default: function() {
            let date = new Date();
            date.setFullYear(date.getFullYear()+1);
            return date;
        }
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);