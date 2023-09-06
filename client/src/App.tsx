import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { fetchProducts } from "./features/getProducts";
import { useAppDispatch, useAppSelector } from "./types/storeType";
import Cart from "./components/Cart";
import ConditionalRoute from "./components/ConditionalRoute";
import ProfileScreen from "./components/Profile";
import { Toaster } from "react-hot-toast";
import { getUserCart, syncCartItem } from "./features/cartSlice";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import { CombinedProvider } from "./hooks/combinedContext";

const App = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.Products);
  const { userInfo } = useAppSelector((state) => state.Authentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
    async function fetchUserCart() {
      if (userInfo) {
        let localCart = localStorage.getItem("cart");
        let cartItems = localCart && JSON.parse(localCart);
        localCart &&
          (await dispatch(syncCartItem({ userId: userInfo?._id, cartItems })));
        dispatch(getUserCart(userInfo?._id));
        localStorage.removeItem("cart");
      }
    }
    fetchUserCart();
  }, [userInfo]);

  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  return (
    <CombinedProvider>
      <div
        className={`${
          isCartPage ? "pl-0" : "pl-40 max-[578px]:pl-0"
        } pt-16 min-h-screen dark:bg-gray-700`}
      >
        <Header />
        {!isCartPage && <Sidebar />}
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="" element={<ConditionalRoute isProtected={true} />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route
            path="/*"
            element={
              <h1 className="fixed inset-0 bg-black z-50 text-white grid place-content-center text-3xl font-semibold top-16">
                Not Found - {window.location.pathname}{" "}
                <button
                  onClick={() => navigate("/", { replace: true })}
                  className="text-xl font-medium text-blue-500"
                >
                  Go to Homepage
                </button>
              </h1>
            }
          />
        </Routes>
      </div>
    </CombinedProvider>
  );
};

export default App;
