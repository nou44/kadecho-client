
import gamingDesk from "../../assets/images/products/gaming-desk.png";
import modernDoor from "../../assets/images/products/modern-door.png";
import staircase from "../../assets/images/products/staircase.png";
import pergola from "../../assets/images/products/pegoola.png";
import tvUnit from "../../assets/images/products/tv-unit.png";
import decoration from "../../assets/images/products/decoration.png";

const createProduct = ({
  _id,
  title,
  slug,
  description,
  price,
  category,
  image,
  inStock = true,
  featured = false,
  rating,
  reviews,
  material,
  color,
  dimensions,
}) => ({
  _id,
  name: title,
  title,
  slug,
  description,
  price,
  category,
  image,
  images: [image],
  inStock,
  featured,
  rating,
  reviews,
  material,
  color,
  dimensions,
});

export const products = [
  createProduct({
    _id: "1",
    title: "Modern Gaming Desk",
    slug: "modern-gaming-desk",
    description:
      "Premium custom metal gaming desk with modern finish.",
    price: 499,
    category: "Gaming Desks",
    image: gamingDesk,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 28,
    material: "Steel",
    color: "Black",
    dimensions: "180 × 70 × 75 cm",
  }),

  createProduct({
    _id: "2",
    title: "Luxury Metal Door",
    slug: "luxury-metal-door",
    description:
      "Elegant custom metal entrance door.",
    price: 899,
    category: "Doors",
    image: modernDoor,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 15,
    material: "Steel",
    color: "Black",
    dimensions: "220 × 120 cm",
  }),

  createProduct({
    _id: "3",
    title: "Floating Staircase",
    slug: "floating-staircase",
    description:
      "Minimalist staircase with premium steel structure.",
    price: 1499,
    category: "Staircases",
    image: staircase,
    inStock: true,
    featured: true,
    rating: 5,
    reviews: 19,
    material: "Steel + Wood",
    color: "Walnut",
    dimensions: "Custom",
  }),

  createProduct({
    _id: "4",
    title: "Modern Pergola",
    slug: "modern-pergola",
    description:
      "Outdoor pergola with durable metal construction.",
    price: 1299,
    category: "Pergolas",
    image: pergola,
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 12,
    material: "Aluminum",
    color: "Black",
    dimensions: "Custom",
  }),

  createProduct({
    _id: "5",
    title: "Luxury TV Unit",
    slug: "luxury-tv-unit",
    description:
      "Modern TV wall unit crafted from steel and wood.",
    price: 699,
    category: "TV Units",
    image: tvUnit,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 17,
    material: "Steel + Wood",
    color: "Oak",
    dimensions: "250 × 40 × 180 cm",
  }),

  createProduct({
    _id: "6",
    title: "Metal Wall Decoration",
    slug: "metal-wall-decoration",
    description:
      "Unique decorative metal artwork for interiors.",
    price: 249,
    category: "Decoration",
    image: decoration,
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 24,
    material: "Steel",
    color: "Black",
    dimensions: "100 × 80 cm",
  }),
];

export default products;
