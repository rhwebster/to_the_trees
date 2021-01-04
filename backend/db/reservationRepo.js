const { sequelize, Reservation, Listing } = require("./models");

async function list() {
    return await Reservation.findAll();
}

async function userList(id) {
    const reservations = await Reservation.findAll({
        where: {
            userId: id
        },
    })
    const listing = await Listing.findOne({
        id: reservations[0].dataValues.listingId,
        include: {
            all: true
        }
    }

    )
    return { reservations, listing }
}

async function getOne(id) {
    const reservation = await Reservation.findByPk(id);
    return reservation;
}

async function create(details) {
    const reservation = await Reservation.create(details)
    return reservation;
}

async function confirm(id) {
    const reservation = await Reservation.findByPk(id)
    await reservation.update({ status: 'confirmed' })
    await sequelize.close;
    return reservation;
};

async function edit(details) {
    const reservation = await Reservation.findByPk(details.reservationId)
    const updatedReservation = await reservation.update(
        details,
    );
    return reservation;
}

async function cancelReservation(id) {
    const reservation = await Reservation.findByPk(id)
    await reservation.update({ status: 'cancelled' })
    await sequelize.close;
    return reservation;
}

module.exports = {
    list,
    userList,
    getOne,
    create,
    confirm,
    edit,
    cancelReservation
}