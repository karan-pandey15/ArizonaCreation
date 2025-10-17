"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Navbar from "@/app/components/navbar/page";
import axiosInstance from "@/app/helper/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/app/components/footer/page";

const BACKEND_URL = "https://api.digiente.com";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL"];

  // Fetch single product by ID
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/sunmica");
      const foundProduct = res.data.find((p) => p._id === productId);
      setProduct(foundProduct);
      setSelectedImage(
        foundProduct?.images?.[0]
          ? `${BACKEND_URL}/${foundProduct.images[0].replace(/\\/g, "/")}`
          : ""
      );
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const handleBack = () => router.back();

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setLoading(true);

      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          description: product.description,
          image: `${BACKEND_URL}/${product.images?.[0].replace(/\\/g, "/")}`,
          points: product.points,
          quantity: parseInt(quantity) || 1,
          category: product.category,
          size: selectedSize,
        })
      );

      toast.success(`Added to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#047F05] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#047F05] transition-colors group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, index) => {
                const imgUrl = `${BACKEND_URL}/${img.replace(/\\/g, "/")}`;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl
                        ? "border-[#047F05] ring-2 ring-green-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price and Rating */}
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-gray-900">
                ₹ {product.points || 699}.00
              </div>
              <div className="flex items-center gap-1 text-sm">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="font-medium">4.4</span>
                <span className="text-gray-500">(61)</span>
              </div>
            </div>

            {/* SKU & Shipping */}
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">SKU:</span> {product._id?.slice(-6).toUpperCase() || "WC1206"}
              </p>
              <p className="text-gray-600">Inclusive of all taxes</p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600 font-medium">
                  Claim free shipping on prepaid orders over ₹2,000/-
                </span>
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-900">SIZE</label>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-sm text-gray-600 hover:text-[#047F05] underline"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 border rounded-md font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-green-50 text-green-700 font-medium rounded">
                Fast Delivery
              </span>
              <span className="text-gray-600">Dispatch in 1 day</span>
            </div>

            {/* More Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="font-semibold text-gray-900">MORE COLORS</label>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      className="w-12 h-12 rounded-md border-2 border-gray-300 hover:border-[#047F05] transition overflow-hidden"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="font-semibold text-gray-900">QUANTITY</label>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full text-center border-x border-gray-300 py-2 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-1">
              <p className="font-semibold text-green-800">EASY RETURNS</p>
              <p className="text-sm text-green-700">
                Eligible for exchange/return under 7-day return policy
              </p>
              <p className="text-sm text-green-700">
                Avail store credits on returns
              </p>
              <p className="text-xs text-green-600">T&C Applied*</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-md font-semibold text-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "ADD TO CART"
              )}
            </button>

            {/* Product Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Size Chart</h2>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Chest (inches)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Length (inches)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Shoulder (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">XS</td>
                    <td className="border border-gray-300 px-4 py-2">34-36</td>
                    <td className="border border-gray-300 px-4 py-2">25-26</td>
                    <td className="border border-gray-300 px-4 py-2">14-15</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">S</td>
                    <td className="border border-gray-300 px-4 py-2">36-38</td>
                    <td className="border border-gray-300 px-4 py-2">26-27</td>
                    <td className="border border-gray-300 px-4 py-2">15-16</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">M</td>
                    <td className="border border-gray-300 px-4 py-2">38-40</td>
                    <td className="border border-gray-300 px-4 py-2">27-28</td>
                    <td className="border border-gray-300 px-4 py-2">16-17</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">L</td>
                    <td className="border border-gray-300 px-4 py-2">40-42</td>
                    <td className="border border-gray-300 px-4 py-2">28-29</td>
                    <td className="border border-gray-300 px-4 py-2">17-18</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">XL</td>
                    <td className="border border-gray-300 px-4 py-2">42-44</td>
                    <td className="border border-gray-300 px-4 py-2">29-30</td>
                    <td className="border border-gray-300 px-4 py-2">18-19</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

        <Footer />
    </div>
  );
};

export default ProductDetail;