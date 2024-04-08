export interface Event {
  id: number;
  event_name: string;
  event_address: string;
  event_image: string;
  event_details: string;
}

export const event = {
  table: "event",
  columns: ["event_name", "event_address", "event_image"],
  data: [
  ["Luigi Pizza", "123 Main St New York", "https://res.cloudinary.com/idemo/image/upload/balloons.webp"],
  ["Burger Town", "987 Food St New Yersey", "https://res.cloudinary.com/idemo/image/upload/balloons.webp"],
]};
