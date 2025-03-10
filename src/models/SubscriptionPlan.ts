import mongoose, { Schema, model, models } from "mongoose";

const SubscriptionPlanSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  features: { type: [String], required: true },
  maxTutorSessions: { type: Number, required: true },
  maxFlashcards: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
});

export const SubscriptionPlan =
  models.SubscriptionPlan || model("SubscriptionPlan", SubscriptionPlanSchema);