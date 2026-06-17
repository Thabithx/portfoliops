import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    format: { type: String, required: true },
    concept: { type: String, default: 'N/A' },
    referenceLink: { type: String, default: 'N/A' },
    email: { type: String, trim: true, lowercase: true, default: 'N/A' },
    phone: { type: String, required: true, trim: true },
    features: { type: [String], default: [] },
    assets: { type: Number, default: 0 },
    invoiceUSD: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    invoiceDisplay: { type: String, required: true },
    timelineWeeks: { type: Number, default: 0 },
    status: { type: String, default: 'Lead' },
    statusCode: { type: String, default: 'lead' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
