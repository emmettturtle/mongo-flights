const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    const tickets = await Ticket.find({ flight: flight._id });
    res.render('flights/show', { title: 'Flight Details', flight, tickets});
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights});
}

function newFlight(req,res) {
    res.render('flights/new', { title: 'Add Flight', errorMsg: '' });
}

async function create(req, res) {
    req.body.flightNo = req.body.flightNo.trim();
    // let dateArr;
    // if (req.body.departs) dateArr = req.body.departs.split(' ');
    // req.body.departs = new Date(dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3]);

    for (let key in req.body) {
        if (!req.body[key]) delete req.body[key];
    }
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}