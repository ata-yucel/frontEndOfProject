import { createSlice } from "@reduxjs/toolkit";






const initialState = {
  cartNumber: 0,
  products: []
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.cartNumber += 1
      let product = state.products.find(item => item._id === action.payload._id)
      if (product) {
        //Aynı ürüne ikinci defa tıklanmış
        let newProducts = state.products.map((item) => {
          if(action.payload._id === item._id) {
            return {...item, cartQuantity : item.cartQuantity + 1}
          }
          return item
        })
        state.products = newProducts
      } else {
        //Ürüne ilk defa tıklanmış
        state.products.push(action.payload)
      }
    },
    clearCart: (state) => {
      //state = initialState
      state.products = []
      state.cartNumber = 0
    },
    removeItem: (state, action) => {
      let newProduct = state.products.filter(product => product._id !== action.payload)
      let totalQuantity = 0
      newProduct.forEach(element => {
        totalQuantity += element.cartQuantity
      });
      state.products = newProduct
      state.cartNumber = totalQuantity
      
    },
    addOneProduct : (state,action) => {
      let newProducts = state.products.map((item) => {
        if(action.payload._id === item._id) {
          return {...item, cartQuantity : item.cartQuantity + 1}
        }
        return item
      })
      state.cartNumber += 1
      state.products = newProducts
    },
    removeOneProduct : (state,action) => {
      let newProducts = state.products.map((item) => {
        if(action.payload._id === item._id) {
          return {...item, cartQuantity : item.cartQuantity - 1}
        }
        return item
      })
      state.cartNumber -= 1
      state.products = newProducts
    }
  }
})

export const { increment, clearCart, removeItem, addOneProduct, removeOneProduct } = counterSlice.actions
export default counterSlice.reducer