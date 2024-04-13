import { type SqlLite } from "^/database/builder";

export const logs: SqlLite = {
  table: "logs",
  columns: [
    { name: "id", type: "INTEGER", index: "PRIMARY KEY", ai: true },
    { name: "type", type: "TEXT", notNull: true, default: "log" },
    { name: "created_at", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
    { name: "description", type: "TEXT", notNull: true },
  ],
  indexes: [
    { name: "logs_type_idx", columns: [{ name: "type" }] },
    { name: "logs_type_date_idx", columns: [{ name: "type" }, { name: "created_at" }] },
  ],
};

// export const event: SqlLite = {
//   table: "event",
//   columns: [
//     { name: "id", type: "INTEGER", index: "PRIMARY KEY", ai: true },
//     { name: "name", type: "TEXT", notNull: true },
//     { name: "address", type: "TEXT", notNull: true },
//     { name: "image", type: "TEXT", notNull: true },
//   ],
//   indexes: [],
// };

export const event: SqlLite = {
  table: "event",
  columns: [
    { name: "id", type: "INTEGER", index: "PRIMARY KEY", ai: true },
    { name: "event_name", type: "TEXT", notNull: true },
    // { name: "event_series", type: "TEXT", notNull: true },
    { name: "event_address", type: "TEXT", notNull: true },
    // { name: "event_address_id", type: "INTEGER", notNull: true },
    { name: "event_date", type: "INTEGER" },
    { name: "event_start_time", type: "INTEGER" },
    { name: "event_end_time", type: "INTEGER" },
    // How to handle 3 race distances for the event distance?
    // { name: "event_distance", type: "INTEGER", notNull: true },
    { name: "event_elevation_gain", type: "INTEGER" },
    { name: "event_total_tickets", type: "INTEGER" },
    // { name: "event_type_tla", type: "TEXT", notNull: true },
    // { name: "event_category_tla", type: "TEXT", notNull: true },
    // { name: "event_subcategory_tla", type: "TEXT", notNull: true },
    // { name: "event_organiser_id", type: "INTEGER", notNull: true },
    // { name: "event_town", type: "TEXT", notNull: true },
    // { name: "event_city", type: "TEXT", notNull: true },
    // { name: "event_country", type: "TEXT", notNull: true },
    { name: "event_image", type: "TEXT", notNull: true },

    { name: "event_details", type: "TEXT" },
    { name: "event_fees", type: "INTEGER" },
    { name: "event_entry_details", type: "TEXT" },
    { name: "event_race_day_information", type: "TEXT" },
    { name: "event_coordinates", type: "TEXT"},
    // { name: "event_created_by_user_id", type: "INTEGER", notNull: true },
    // { name: "event_primary_user", type: "INTEGER", notNull: true },
    // { name: "event_verified", type: "INT", notNull: true, default: "0" },
    { name: "created_date", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
    { name: "updated_date", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
  ],
  indexes: [],
};
