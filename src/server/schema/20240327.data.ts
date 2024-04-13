export interface Event {
  id: number;
  event_name: string;
  event_address: string;
  event_image: string;
  event_details: string;
}

export const event = {
  table: "event",
  columns: [
    "event_name",
    "event_address",
    "event_elevation_gain",
    "event_total_tickets",
    "event_image",
    "event_details",
    "event_fees",
    "event_entry_details",
    "event_race_day_information"
  ],
  data: [
    ["Long names are causing problems these days in the rockies", "Central Park, New York", 200, 500, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Join us for the annual Spring Marathon in Central Park. This event is open to all runners of all skill levels.", 50, "Register online before April 15th to secure your spot.", "Race day check-in starts at 6:30 AM. Please bring your photo ID and registration confirmation."],
    ["Mountain Trail Run", "Rocky Mountains, Colorado", 1000, 300, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Experience the challenge of the Rocky Mountain Trail Run. Runners will navigate through rugged terrain and breathtaking scenery.", 75, "Limited spots available. Early bird registration ends on April 20th.", "Participants must check-in at the base camp by 7:30 AM. Trail map will be provided."],
    ["City 10K", "Downtown Los Angeles, California", 50, 1000, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Join thousands of runners for a scenic 10K through the heart of downtown Los Angeles.", 40, "Registration includes a commemorative t-shirt and finisher medal.", "Packet pickup available the day before the race. Check event website for details."],
    ["Sunset Half Marathon", "Santa Monica Beach, California", 100, 800, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Experience the beauty of a sunset run along the iconic Santa Monica Beach. Half marathon distance.", 60, "Register before May 25th to save $10.", "Race expo and packet pickup available on the day before the race."],
    ["Forest 5K Fun Run", "Greenwood State Park, Oregon", 50, 400, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Enjoy a family-friendly 5K run through the lush forests of Greenwood State Park.", 30, "Kids under 12 run for free.", "Participants can pick up their race bibs on race day starting at 8:30 AM."],
    ["Urban Obstacle Race", "Downtown Chicago, Illinois", 200, 600, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Navigate through city streets and conquer challenging obstacles in this urban adventure race.", 70, "Teams of 4 receive a discount on registration fees.", "Participants must complete a waiver form prior to race day."],
    ["Coastal 15-Miler", "Big Sur, California", 1500, 300, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Run along the breathtaking coastline of Big Sur in this challenging 15-mile race.", 80, "Registration fee includes a post-race BBQ.", "Shuttle service provided from designated parking areas to the race start."],
    ["Riverfront 10-Mile Relay", "Mississippi River, New Orleans", 50, 500, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Gather your team and race along the scenic Mississippi River in this relay event.", 50, "Each team member receives a finisher medal.", "Teams must designate a team captain for registration and communication."],
    ["Desert Ultra Marathon", "Moab, Utah", 3000, 200, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Test your endurance in the rugged terrain of the Moab desert in this ultra marathon.", 100, "Solo and team relay options available.", "Participants are required to carry hydration packs and emergency supplies."],
    ["Winter Wonderland 5K", "Central Park, New York", 25, 1000, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Experience the magic of winter in Central Park with this festive 5K run.", 35, "Costume contest for best winter-themed attire.", "Race starts and finishes near the iconic Bethesda Terrace."],
    ["Haunted Halloween Hustle", "Salem, Massachusetts", 50, 500, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Run through the historic streets of Salem on Halloween night in this spooky 10K race.", 45, "Prizes for best costume and fastest finishers.", "Participants are encouraged to embrace the Halloween spirit with costumes."],
    ["Island Adventure 10-Mile Swim", "Maui, Hawaii", 0, 100, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Swim across the scenic waters surrounding Maui in this challenging 10-mile open water swim.", 120, "Participants must provide their own kayaker support.", "Safety briefing and course overview provided prior to race start."],
    ["Rainforest Relay", "Puerto Rico", 200, 400, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Gather your team for a relay race through the lush rainforests of Puerto Rico.", 60, "Scenic views and challenging terrain await.", "Teams must designate a team captain for registration and communication."],
    ["Ski Slope Slalom", "Aspen, Colorado", 500, 200, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Race down the slopes of Aspen in this exhilarating ski slalom competition.", 90, "Open to skiers of all ages and skill levels.", "Race bib pickup available at the base of the mountain."],
    ["Summer Solstice Cycling Challenge", "San Francisco, California", 2000, 300, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Celebrate the longest day of the year with a scenic cycling challenge around San Francisco.", 70, "Multiple route options available for varying skill levels.", "Participants are responsible for their own bikes and equipment."],
    ["Stadium Stair Climb", "Los Angeles, California", 100, 500, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Test your endurance by climbing the stairs of a professional stadium.", 40, "Registration fee includes a commemorative t-shirt and finisher medal.", "Participants will start in waves to ensure safety and fairness."],
    ["Autumn Foliage 10-Miler", "New England", 800, 400, "https://res.cloudinary.com/idemo/image/upload/balloons.webp", "Run through the vibrant colors of New England's autumn foliage in this scenic 10-mile race.", 55, "Registration includes a post-race feast.", "Participants must provide proof of vaccination or recent negative COVID"]
]};


 