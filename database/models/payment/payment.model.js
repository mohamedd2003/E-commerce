import mongoose, { Types } from 'mongoose';

// Setup schema for whatever data you want to store from the callback

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    order_id: {
        type: Number,
       
    },
    merchant:{
        type:Number
    },
    created_at:{
        type:String
    },
    
    user: {
        type:Types.ObjectId,
        ref:'User',
        required: true
     },
     Transaction_id: {
        type: Number,
    
    },
    currency: {
        type: String,
    },
    // error_occured: {
    //     type: Boolean,
    //     required: true
    // },
    // has_parent_transaction: {
    //     type: Boolean,
    //     required: true
    // },
  
    // integration_id: {
    //     type: Number,
    //     required: true
    // },
    // is_3d_secure: {
    //     type: Boolean,
    //     required: true
    // },
    // is_auth: {
    //     type: Boolean,
    //     required: true
    // },
    // is_capture: {
    //     type: Boolean,
    //     required: true
    // },
    // is_refunded: {
    //     type: Boolean,
    //     required: true
    // },
    // is_standalone_payment: {
    //     type: Boolean,
    //     required: true
    // },
    // is_voided: {
    //     type: Boolean,
    //     required: true
    // },
  
    // pending: {
    //     type: Boolean,
    //     required: true
    // },
    // source_data_pan: {
    //     type: String,
    //     required: true
    // },
    // source_data_sub_type: {
    //     type: String,
    //     required: true
    // },
    // source_data_type: {
    //     type: String,
    //     required: true
    // },
    // success: {
    //     type: Boolean,
    //     required: true
    // }
});

const Payment = mongoose.model('Payment', schema);

export default Payment;