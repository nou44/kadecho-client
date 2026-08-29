import gamingDesk from "../../assets/images/products/gaming-desk.png";
import modernDoor from "../../assets/images/products/modern-door.png";
import staircase from "../../assets/images/products/staircase.png";
import pergola from "../../assets/images/products/pegoola.png";
import tvUnit from "../../assets/images/products/tv-unit.png";
import decoration from "../../assets/images/products/decoration.png";

export const products = [
  {
    _id: "1",

    title: "Modern Gaming Desk",

    slug: "modern-gaming-desk",

    description:
      "Premium custom metal gaming desk with modern finish.",

    price: 499,

    category: "Gaming Desks",

    image: gamingDesk,

    images: [
      gamingDesk,
      gamingDesk,
      gamingDesk,
    ],

    inStock: true,

    featured: true,

    rating: 4.9,

    reviews: 28,

    material: "Steel",

    color: "Black",

    dimensions: "180 × 70 × 75 cm",
  },

  {
    _id: "2",

    slug: "luxury-metal-door",

    title: "Luxury Metal Door",

    description:
      "Elegant custom metal entrance door.",

    price: 899,

    category: "Doors",

    image: modernDoor,

    images: [
      modernDoor,
      modernDoor,
      modernDoor,
    ],

    inStock: true,

    featured: false,

    rating: 4.8,

    reviews: 15,

    material: "Steel",

    color: "Black",

    dimensions: "220 × 120 cm",
  },

  {
    _id: "3",

    slug: "floating-staircase",

    title: "Floating Staircase",

    description:
      "Minimalist staircase with premium steel structure.",

    price: 1499,

    category: "Staircases",

    image: staircase,

    images: [
      staircase,
      staircase,
      staircase,
    ],

    inStock: true,

    featured: true,

    rating: 5,

    reviews: 19,

    material: "Steel + Wood",

    color: "Walnut",

    dimensions: "Custom",
  },

  {
    _id: "4",

    slug: "modern-pergola",

    title: "Modern Pergola",

    description:
      "Outdoor pergola with durable metal construction.",

    price: 1299,

    category: "Pergolas",

    image: pergola,

    images: [
      pergola,
      pergola,
      pergola,
    ],

    inStock: true,

    featured: false,

    rating: 4.9,

    reviews: 12,

    material: "Aluminum",

    color: "Black",

    dimensions: "Custom",
  },

  {
    _id: "5",

    slug: "luxury-tv-unit",

    title: "Luxury TV Unit",

    description:
      "Modern TV wall unit crafted from steel and wood.",

    price: 699,

    category: "TV Units",

    image: tvUnit,

    images: [
      tvUnit,
      tvUnit,
      tvUnit,
    ],

    inStock: true,

    featured: true,

    rating: 4.7,

    reviews: 17,

    material: "Steel + Wood",

    color: "Oak",

    dimensions: "250 × 40 × 180 cm",
  },

  {
    _id: "6",

    slug: "metal-wall-decoration",

    title: "Metal Wall Decoration",

    description:
      "Unique decorative metal artwork for interiors.",

    price: 249,

    category: "Decoration",

    image: decoration,

    images: [
      decoration,
      decoration,
      decoration,
    ],

    inStock: true,

    featured: false,

    rating: 4.8,

    reviews: 24,

    material: "Steel",

    color: "Black",

    dimensions: "100 × 80 cm",
  },
];