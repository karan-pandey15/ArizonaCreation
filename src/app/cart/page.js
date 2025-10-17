"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPoints,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import axiosInstance from "@/app/helper/axiosInstance";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/footer/page";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const totalPoints = useSelector(selectTotalPoints);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCart, setShowCart] = useState(true);

  const handleCloseCart = () => {
    setShowCart(false);
    router.push("/");
  };

  const handleQtyChange = (id, qty) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty) }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckoutClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in before checkout");
      router.push("/components/signin");
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = async () => {
    const token = localStorage.getItem("token");
    setIsProcessing(true);

    try {
      const payload = {
        items: items.map((it) => ({
          userId: it.id,
          productName: it.name,
          quantity: it.quantity,
          points: it.points,
          description: it.description,
        })),
      };

      const res = await axiosInstance.post("/points/request", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.status === 200 || res?.status === 201) {
        toast.success("Checkout successful!");
        dispatch(clearCart());
        setShowCheckoutModal(false);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error("Checkout response: " + res.status);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelCheckout = () => {
    setShowCheckoutModal(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Cart Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
            showCart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={handleCloseCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {it.name}
                            </h3>
                            <button
                              onClick={() => handleRemove(it.id)}
                              className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Award className="w-3 h-3 mr-1" />
                            <span className="font-medium">₹{it.points}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() =>
                                  handleQtyChange(it.id, (it.quantity || 1) - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                disabled={it.quantity <= 1}
                              >
                                <Minus className="w-3 h-3 text-gray-700" />
                              </button>
                              <input
                                type="number"
                                value={it.quantity}
                                onChange={(e) =>
                                  handleQtyChange(
                                    it.id,
                                    parseInt(e.target.value || "1")
                                  )
                                }
                                className="w-10 h-8 text-center border-x border-gray-300 text-sm font-medium focus:outline-none"
                                min="1"
                              />
                              <button
                                onClick={() =>
                                  handleQtyChange(it.id, (it.quantity || 1) + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-3 h-3 text-gray-700" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* You May Also Like Section */}
              {items.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    You may also like
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=300"
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1">
                          Contrast Collar V-Neck Knit Fitted Top in Navy Blue
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-gray-900">
                            Rs. 599.00
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            Rs. 998.00
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <select className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-400">
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                          </select>
                          <button className="px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Checkout */}
            <div className="border-t border-gray-200 p-4">
              {items.length > 0 ? (
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-md font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>CHECK OUT</span>
                </button>
              ) : (
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-semibold text-sm transition-colors flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Go To Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={handleCloseCart}
          ></div>
        )}

        {/* Main Content - Hidden when cart is open */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* This content is hidden behind the overlay */}
        </div>
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Confirm Checkout
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to proceed with checkout 
              
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Rs:</span>
                <span className="font-bold text-black text-xl">
                  {totalPoints}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelCheckout}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleConfirmCheckout}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 bg-black hover:bg-[#036804] text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}