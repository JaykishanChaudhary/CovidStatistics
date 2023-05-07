const { Schema, mongo ,model} = require('mongoose');

const tallySchema = new Schema({
    state: Schema.Types.String,
    infected: Schema.Types.Number,
    recovered: Schema.Types.Number,
    death: Schema.Types.Number,
})

// const TallyModel=model('covidtallies',tallySchema)

exports.tallySchema = tallySchema;
// module.exports=TallyModel;
