"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ProductCard = ({ product, currency = "₹" }) => {
  const rating = product.rating?.length
    ? product.rating.reduce((acc, r) => acc + r.rating, 0) / product.rating.length
    : 0;

  const reviewCount = product.rating?.length || 0;

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <Link href={`/product/${product.id}`} className="group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm hover:shadow-lg hover:shadow-indigo-200/30 dark:hover:shadow-indigo-500/10 overflow-hidden cursor-pointer transition-all duration-300

          {/* Mobile: horizontal row | Desktop: vertical card */}
          flex flex-row sm:flex-col
          p-3 sm:p-4
          gap-3 sm:gap-0
          w-full sm:w-48 md:w-56 lg:w-60 mx-auto
          sm:min-h-[320px]"
      >
        {/* Image */}
        <div className="
          flex items-center justify-center
          bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0
          w-28 h-28 sm:w-full sm:h-48 md:h-56">
          <Image
            width={400}
            height={400}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
            src={product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-2 flex-grow sm:pt-4 text-slate-800 dark:text-gray-100 min-w-0">

          {/* Name — 2 lines max */}
          <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {product.name}
          </p>

          {/* Rating pill + review count */}
          <div className="flex items-center gap-1.5">
  <div className="flex items-center gap-0.5 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
    <span>{rating > 0 ? rating.toFixed(1) : "0.0"}</span>
    <Star size={10} fill="white" stroke="none" />
  </div>

  {reviewCount > 0 && (
    <span className="text-xs text-gray-400">
      ({reviewCount.toLocaleString()})
    </span>
  )}
</div>

          {/* ↓Discount% + MRP + Sale Price — all one line */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {discount && (
              <span className="text-xs font-bold text-green-500">↓{discount}%</span>
            )}
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through whitespace-nowrap">
                {currency}{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            <span className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
              {currency}{product.price.toLocaleString("en-IN")}
            </span>
          </div>

        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-indigo-100/40 dark:from-indigo-500/10 to-transparent" />
      </motion.div>
    </Link>
  );
};

export default ProductCard;