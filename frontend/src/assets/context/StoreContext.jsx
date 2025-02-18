import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({
  //     ...prev,
  //     [itemId]: (prev[itemId] || 0) + 1,
  //   }));
  // };
   const addToCart = async(itemId)=>{
    if (!cartItems[itemId]) {
      setCartItems((prev)=>({...prev,[itemId]:1})) 
      
    }
    else{
      setCartItems ((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if (token) {
      
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
   }

   const removeFromCart = async (itemId) => {
    const previousCartItems = { ...cartItems };
  
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });
  
    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
  
        if (!response.data.success) {
          setCartItems(previousCartItems);
          console.error(response.data.message);
        }
      } catch (error) {
        setCartItems(previousCartItems);
        console.error("Error updating cart:", error);
      }
    }
  };
  


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item 
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken)
      }
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
