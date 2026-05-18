"use client";
import Link from "next/link";
import Image from "next/image";
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
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md">

        

        {/* Image */}
        <div className="w-full aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          <Image
            width={400}
            height={400}
            className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
            src={product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Info */}
        <div className="p-2 sm:p-3 flex flex-col gap-1">

          {/* Product Name */}
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug">
            {product.name}
          </p>

          {/* Star Rating + Review Count */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <span>{rating.toFixed(1)}</span>
              <Star size={9} fill="white" stroke="none" />
            </div>
            {reviewCount > 0 && (
              <span className="text-[10px] sm:text-xs text-gray-400">
                ({reviewCount})
              </span>
            )}
          </div>

          
          {/* Pricing */}
<div className="flex flex-col gap-0.5 mt-0.5">
  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
    {currency}{product.price.toLocaleString("en-IN")}
  </span>
  <div className="flex items-center gap-1.5 flex-wrap">
    {product.mrp && product.mrp > product.price && (
      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
        {currency}{product.mrp.toLocaleString("en-IN")}
      </span>
    )}
    {discount && (
      <span className="text-[10px] sm:text-xs font-semibold text-green-500">
        {discount}% off
      </span>
    )}
  </div>
</div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;