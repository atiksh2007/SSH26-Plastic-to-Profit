export const mockListings = [
  {
    id: 1,
    type: "PET Bottles",
    quantity: 500,
    price: 20,
    location: "Bhopal, Madhya Pradesh",
    seller: "ABC Waste Co.",
    description: "Clean, sorted PET bottles from beverage collection",
    date: "2026-02-20",
    quality: "High",
    image: "🔄"
  },
  {
    id: 2,
    type: "HDPE Containers",
    quantity: 750,
    price: 25,
    location: "Mumbai, Maharashtra",
    seller: "GreenCycle Industries",
    description: "Mixed HDPE containers from household collection",
    date: "2026-02-19",
    quality: "Medium",
    image: "📦"
  },
  {
    id: 3,
    type: "PVC Pipes",
    quantity: 300,
    price: 15,
    location: "Delhi NCR",
    seller: "BuildCycle Recyclers",
    description: "Construction waste PVC pipes and fittings",
    date: "2026-02-18",
    quality: "High",
    image: "🔧"
  },
  {
    id: 4,
    type: "LDPE Films",
    quantity: 1000,
    price: 18,
    location: "Bangalore, Karnataka",
    seller: "EcoWaste Solutions",
    description: "Industrial LDPE films and packaging materials",
    date: "2026-02-17",
    quality: "High",
    image: "📄"
  },
  {
    id: 5,
    type: "PP Packaging",
    quantity: 600,
    price: 22,
    location: "Chennai, Tamil Nadu",
    seller: "Southern Recyclers",
    description: "Polypropylene packaging and containers",
    date: "2026-02-16",
    quality: "Medium",
    image: "📦"
  },
  {
    id: 6,
    type: "PS Foam",
    quantity: 200,
    price: 12,
    location: "Pune, Maharashtra",
    seller: "FoamCycle Pvt Ltd",
    description: "Expanded polystyrene foam packaging",
    date: "2026-02-15",
    quality: "Medium",
    image: "🎯"
  },
  {
    id: 7,
    type: "PET Bottles",
    quantity: 850,
    price: 21,
    location: "Hyderabad, Telangana",
    seller: "Metro Waste Management",
    description: "Sorted PET bottles from retail collection points",
    date: "2026-02-14",
    quality: "High",
    image: "🔄"
  },
  {
    id: 8,
    type: "HDPE Containers",
    quantity: 450,
    price: 24,
    location: "Ahmedabad, Gujarat",
    seller: "Gujarat Green Ltd",
    description: "Industrial HDPE containers and drums",
    date: "2026-02-13",
    quality: "High",
    image: "📦"
  },
  {
    id: 9,
    type: "PP Packaging",
    quantity: 550,
    price: 23,
    location: "Kolkata, West Bengal",
    seller: "East Recycle Co",
    description: "PP packaging from food industry",
    date: "2026-02-12",
    quality: "Medium",
    image: "📦"
  },
  {
    id: 10,
    type: "LDPE Films",
    quantity: 900,
    price: 19,
    location: "Jaipur, Rajasthan",
    seller: "Desert Recyclers",
    description: "Agricultural LDPE films and sheets",
    date: "2026-02-11",
    quality: "Medium",
    image: "📄"
  },
  {
    id: 11,
    type: "PVC Pipes",
    quantity: 400,
    price: 16,
    location: "Lucknow, Uttar Pradesh",
    seller: "UP Construction Recyclers",
    description: "Residential construction PVC waste",
    date: "2026-02-10",
    quality: "High",
    image: "🔧"
  },
  {
    id: 12,
    type: "PET Bottles",
    quantity: 650,
    price: 20,
    location: "Indore, Madhya Pradesh",
    seller: "Central Waste Solutions",
    description: "Mixed PET bottles from municipal collection",
    date: "2026-02-09",
    quality: "Medium",
    image: "🔄"
  }
];

export const plasticTypes = [
  { value: "all", label: "All Types" ,quantity:"50"},
  { value: "PET", label: "PET Bottles" ,quantity:"50"},
  { value: "HDPE", label: "HDPE Containers" ,quantity:"50"},
  { value: "PVC", label: "PVC Pipes" ,quantity:"50"},
  { value: "LDPE", label: "LDPE Films",quantity:"50" },
  { value: "PP", label: "PP Packaging", quantity:"50" },
  { value: "PS", label: "PS Foam"  ,quantity:"50"}
];

export const mockStats = {
  totalListed: 1000,
  activeListings: 12,
  totalUsers: 1000,
  completedTransactions: 150,
  totalWeight: "10000 kg",
  co2Saved: "10000kg"
};

export const mockOffers = [
  {
    id: 1,
    listingId: 1,
    buyerName: "RecycleTech Industries",
    offerPrice: 22,
    status: "pending",
    date: "2026-02-21",
    
  },
  {
    id: 2,
    listingId: 2,
    buyerName: "Green Solutions Ltd",
    offerPrice: 26,
    status: "accepted",
    date: "2026-02-20"
  },
  {
    id: 3,
    listingId: 4,
    buyerName: "EcoPlast Manufacturing",
    offerPrice: 19,
    status: "pending",
    date: "2026-02-19"
  }
];


export const plasticDetails = {
  PET: {
    description: "Polyethylene Terephthalate is commonly used for water and beverage bottles.",
    recyclability: "Highly recyclable",
    commonUses: "Water bottles, soft drink bottles, food containers",
    quantity:"50"
  },
  HDPE: {
    description: "High-Density Polyethylene is strong and durable plastic.",
    recyclability: "Widely recyclable",
    commonUses: "Milk jugs, detergent bottles, pipes",
    quantity:"50"
  },
  PVC: {
    description: "Polyvinyl Chloride is used in construction and piping.",
    recyclability: "Limited recyclability",
    commonUses: "Pipes, cables, flooring",
    quantity:"50"
  },
  LDPE: {
    description: "Low-Density Polyethylene is flexible plastic.",
    recyclability: "Moderate recyclability",
    commonUses: "Plastic bags, films, wraps",
    quantity:"50"
  },
  PP: {
    description: "Polypropylene is heat-resistant plastic.",
    recyclability: "Recyclable",
    commonUses: "Food containers, packaging, caps",
    quantity:"50"
  },
  PS: {
    description: "Polystyrene is lightweight plastic foam.",
    recyclability: "Difficult to recycle",
    commonUses: "Foam cups, packaging materials",
    quantity:"50"
  }
};