import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  potholes: defineTable({
    timestamp: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    severity: v.number(),
  }).index("by_timestamp", ["timestamp"]),
  
  deviceLocation: defineTable({
    timestamp: v.string(),
    latitude: v.number(),
    longitude: v.number(),
  }).index("by_timestamp", ["timestamp"]),
  
  roadMeshes: defineTable({
    timestamp: v.string(),
    storageUrl: v.string(),
  }).index("by_timestamp", ["timestamp"]),
});
