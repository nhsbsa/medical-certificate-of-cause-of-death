function loadParticipant(req) {
    let pd = process.env['P_DATA']
    let pdRead = JSON.parse(pd)
    req.session.data['pd'] = pdRead
    console.log(pd)
}

module.exports = { loadParticipant }