## Data models examples

### User model (user id)

```
{
  "username": "iamauser",
  "display_name": "I. A. User",
  "email": "user_email@flack.com",
  "trips": [
    "reference to trip document",
    "another reference to trip document",
    "yet another reference to a trip document"
  ],
  "favorites": [
    "reference to document in locations collection",
    "reference to document in locations collection"
  ],
  "premium": true,
  "friends": ["username1", "username2"]
}
```

### Trip Model (auto-generated trip id)

```
{
  name: "Example name",
  destinations: [
    "reference to destination",
    "reference to destination"
  ],
  "planner": "iamauser",
  "participants": [
    "username",
    "username",
    "username"
  ]
  "flight_info": "Flight Number fd;lkj",
  "lodging": "Hotel Address"
},
lists: {
  todo: [
    {
      item: "What to do",
      completed: false
    }
  ],
  packing: [
    {
      item: "Swim trunks",
      completed: true
    },
    {
      item: "baseball bat",
      completed: false
    }
  ]
}
```

### Destinations (auto-generated destination id)

```
{
  location_id: "String provided by map API",
  geo: {
    latitude: "Provided by Map API",
    longitude: "Provieded by Map API
  }
}
```

### Locations (auto-generated location id)

```
{
  place_id: "String provided by map API",
  display_name: "Name of place (if available)",
  formatted_address: "Formatted address",
  geo: {
    latitude: "map api lat",
    longitude: "map api long"
  }
}
```
