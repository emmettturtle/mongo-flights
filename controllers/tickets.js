const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}

async function create(req, res) {
    req.body.flight = req.params.id;
    try {
        await Ticket.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/flights/${req.params.id}`);
}

async function newTicket (req, res) {
    const flight = await Flight.findById(req.params.flightId);
    res.render('tickets/new', { title: 'New Ticket', flight, errorMsg: ''});
}