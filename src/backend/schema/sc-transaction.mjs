import mongoose from 'mongoose';
import ScTransactionType from './sc-transaction-state-enum.mjs';

/**
 * Smart Contract transaction for showing user's transaction history
 */
export const scTransactionSchema = mongoose.Schema(
  {
    ownerAddress: {
      type: String,
      required: true
    },
    transactionType: {
      type: String,
      enum: Object.values(ScTransactionType),
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    txHash: {
      type: String,
      required: true
    },
    additionalInfo: {}
  },
  {
    collection: 'scTransactions',
    timestamps: true
  }
);

const ScTransaction = mongoose.model('ScTransaction', scTransactionSchema, 'scTransactions');
export default ScTransaction;