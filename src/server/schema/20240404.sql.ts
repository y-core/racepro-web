import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, unique, index } from "drizzle-orm/sqlite-core";

export type Event = typeof event.$inferSelect;
export type InsertEvent = typeof event.$inferInsert;

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
}, (t) => ({
  unq: unique().on(t.id, t.name),
  nameIdx: index("name_idx").on(t.name),
})
);

export const event = sqliteTable('event', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  event_name: text('event_name').notNull().unique(),
  // event_details: text('event_details').notNull(),
  event_address: text('event_address').notNull(),
  event_date: integer('event_date'),
  // event_date: integer('event_date', { mode: 'timestamp' }),
  event_image: text('event_image').notNull(),
  created_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  // updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  authorId: integer("author_id").references(() => user.id),
});

// export const entries = sqliteTable(
//   'entries',
//   {
//     id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
//     title: text('title').notNull(),
//     date: integer('date', { mode: 'timestamp' }),
//     address: text('address').notNull(),
//     image: text('image').notNull(),
//     updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
//   },
//   (table) => {
//     return {
//       titleIdx: uniqueIndex(`${table.title.uniqueName}_idx`).on(table.title),
//       dateIdx: index(`${table.date.uniqueName}_idx`).on(table.date),
//     };
//   },
// );



// export const event: SqlLite = {
//   table: "event",
//   columns: [
//     { name: "id", type: "INTEGER", index: "PRIMARY KEY", ai: true },
//     { name: "event_name", type: "TEXT", notNull: true },
//     // { name: "event_series", type: "TEXT", notNull: true },
//     { name: "event_address", type: "TEXT", notNull: true },
//     // { name: "event_address_id", type: "INTEGER", notNull: true },
//     { name: "event_date", type: "INTEGER" },
//     { name: "event_start_time", type: "INTEGER" },
//     { name: "event_end_time", type: "INTEGER" },
//     // { name: "event_distance", type: "INTEGER", notNull: true },
//     { name: "event_elevation_gain", type: "INTEGER" },
//     { name: "event_total_tickets", type: "INTEGER" },
//     // { name: "event_type_tla", type: "TEXT", notNull: true },
//     // { name: "event_category_tla", type: "TEXT", notNull: true },
//     // { name: "event_subcategory_tla", type: "TEXT", notNull: true },
//     // { name: "event_organiser_id", type: "INTEGER", notNull: true },
//     // { name: "event_town", type: "TEXT", notNull: true },
//     // { name: "event_city", type: "TEXT", notNull: true },
//     // { name: "event_country", type: "TEXT", notNull: true },
//     { name: "event_image", type: "TEXT", notNull: true },

//     { name: "event_details", type: "TEXT" },
//     { name: "event_fees", type: "INTEGER" },
//     { name: "event_entry_details", type: "TEXT" },

//     { name: "event_comrades_qualifier", type: "INT" },
//     { name: "event_race_day_information", type: "TEXT" },
//     { name: "event_coordinates", type: "TEXT"},

//     // { name: "event_created_by_user_id", type: "INTEGER", notNull: true },
//     // { name: "event_primary_user", type: "INTEGER", notNull: true },
//     // { name: "event_verified", type: "INT", notNull: true, default: "0" },
//     { name: "created_date", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
//     { name: "updated_date", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
//   ],
//   indexes: [],
// };
