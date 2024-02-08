import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToList: (state, action) => {
      const property = action.payload
      const index = state.cart.findIndex((item) => item.propertyId === property.propertyId)

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already added in Wishlist")
        return
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push(property)
      // Update the total quantity and price
      state.totalItems++
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      // show toast
      toast.success("Course added to cart")
    },
    removeFromList: (state, action) => {
      const propertyId = action.payload
      const index = state.cart.findIndex((item) => item.propertyId === propertyId)
      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course removed from Wishlist")
      }
    },
    resetList: (state) => {
      state.cart = []
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { addToList, removeFromList, resetList } = cartSlice.actions

export default cartSlice.reducer