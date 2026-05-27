import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaHome, FaShoppingCart, FaTimes, FaSearch, FaChartBar } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useCart(); 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNavLoading, setIsNavLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const itemCount = cart
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => setIsNavLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setIsSearching(false);
      return;
    }

    const fetchFilteredProducts = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `${API_BASE}/products?search=${encodeURIComponent(query.trim())}`
        );
        if (!response.ok) throw new Error('Server error');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Database connection error:', err);
        setProducts([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchFilteredProducts();
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      navigate("/");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (isNavLoading) {
    return (
      <div className="flex sm:flex-row flex-col justify-between items-center px-6 py-3 sm:py-0 bg-[#1f1c2c] sm:h-[62px] h-[110px] gap-2 box-border w-full">
        <div className="w-full sm:w-20 h-6 bg-[linear-gradient(90deg,#2c2541_25%,#3d3559_50%,#2c2541_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] rounded-full"></div>
        <div className="w-full sm:w-[65%] h-[38px] bg-[linear-gradient(90deg,#2c2541_25%,#3d3559_50%,#2c2541_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] rounded-full"></div>
        <style>{`
          @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes cardShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <nav className="fixed top-0 left-0 z-[999] flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 sm:py-0 sm:h-[62px] gap-3 sm:gap-4 bg-[linear-gradient(135deg,#1f1c2c_0%,#928dab_100%)] text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] animate-[fadeIn_0.5s_ease-out_forwards] opacity-0 box-border w-full">
        <div className="flex justify-between items-center w-full sm:w-auto gap-4">
          <div className="flex gap-5 items-center shrink-0">
            <Link
              to="/"
              className="text-[#e0e0e0] no-underline transition-all duration-200 inline-flex items-center h-[38px] text-xl relative cursor-pointer hover:text-white hover:-translate-y-px"
              aria-label="Home"
            >
              <FaHome className="text-xl sm:text-2xl" />
            </Link>
            <Link
              to="/reports"
              className="text-[#e0e0e0] no-underline transition-all duration-200 inline-flex items-center h-[38px] text-xl relative cursor-pointer hover:text-white hover:-translate-y-px"
              aria-label="Order Reports"
            >
              <FaChartBar className="text-xl sm:text-2xl" />
            </Link>
            <Link
              to="/cart"
              className="text-[#e0e0e0] no-underline transition-all duration-200 inline-flex items-center h-[38px] text-xl relative cursor-pointer hover:text-white hover:-translate-y-px"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="text-xl sm:text-2xl" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-2.5 bg-[#ff416c] text-white text-[0.65rem] sm:text-[0.7rem] font-bold rounded-full px-1.5 py-0.5 min-w-[12px] text-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex gap-1 sm:gap-3 items-center shrink-0 sm:hidden">
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-[34px] px-3 text-xs font-semibold rounded-full bg-transparent text-[#e0e0e0] hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-[34px] px-3 text-xs font-semibold rounded-full bg-white/20 border border-solid border-white/40 hover:bg-white hover:text-[#1f1c2c] transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full sm:w-auto sm:grow sm:justify-end gap-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full px-4 sm:px-0 sm:grow sm:max-w-[450px] transition-all duration-300 h-[38px] focus-within:scale-[1.01]"
          >
            <div className="flex w-full relative shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-full focus-within:shadow-[0_4px_20px_rgba(255,65,108,0.3)]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-9 pr-10 rounded-full sm:rounded-r-none border-none outline-none bg-white/15 text-white backdrop-blur-[5px] transition-colors duration-300 text-sm h-full placeholder:text-white/55 focus:bg-white/25"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-[110px] sm:right-[90px] md:right-[100px] lg:right-[105px] max-sm:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-sm cursor-pointer transition-colors p-1"
                >
                  <FaTimes />
                </button>
              )}
              <button
                type="submit"
                className="hidden sm:inline-flex items-center justify-center h-[38px] px-5 text-sm font-semibold rounded-r-full border-none cursor-pointer whitespace-nowrap bg-[linear-gradient(to_right,#ff4b2b,#ff416c)] text-white hover:opacity-95 transition-all duration-200"
              >
                Search
              </button>
            </div>
          </form>

          <div className="hidden sm:flex gap-3 items-center shrink-0">
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-[38px] px-4 text-sm font-semibold rounded-full bg-transparent text-[#e0e0e0] hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-[38px] px-4 text-sm font-semibold rounded-full bg-white/20 border border-solid border-white/40 hover:bg-white hover:text-[#1f1c2c] transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {query.trim() && (
        <div className="pt-[140px] sm:pt-[85px] min-h-screen bg-[#1f1c2c] text-white px-6 pb-12 transition-all duration-300">
          <h1 className="text-xl font-medium mb-6 text-gray-300">
            Results for:{" "}
            <span className="text-[#ff416c] font-bold">"{query}"</span>
          </h1>

          {isSearching ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-[fadeIn_0.3s_ease-out]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col gap-3"
                >
                  <div className="w-full h-40 bg-[linear-gradient(90deg,#2c2541_25%,#3d3559_50%,#2c2541_75%)] bg-[length:200%_100%] animate-[cardShimmer_1.5s_infinite_linear] rounded-xl"></div>
                  <div className="w-3/4 h-5 bg-[linear-gradient(90deg,#2c2541_25%,#3d3559_50%,#2c2541_75%)] bg-[length:200%_100%] animate-[cardShimmer_1.5s_infinite_linear] rounded-full"></div>
                  <div className="w-1/2 h-4 bg-[linear-gradient(90deg,#2c2541_25%,#3d3559_50%,#2c2541_75%)] bg-[length:200%_100%] animate-[cardShimmer_1.5s_infinite_linear] rounded-full"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => {
                const stockCount =
                  product.countInStock ??
                  product.stock ??
                  product.quantity ??
                  0;
                const isInStock = stockCount > 0;
                return (
                  <div
                    key={product.id || product._id}
                    className={`bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col justify-between transition-all duration-200 group ${
                      isInStock
                        ? "hover:scale-[1.02] hover:bg-white/15"
                        : "opacity-50 select-none"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/300?text=No+Image"
                        }
                        alt={product.name}
                        className={`w-full h-40 object-cover rounded-xl transition-transform duration-300 ${
                          isInStock && "group-hover:scale-105"
                        }`}
                      />
                      {!isInStock && (
                        <span className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mt-2">
                      {product.name}
                    </h3>
                    <p className="text-[#ff416c] font-bold">${product.price}</p>
                    <span
                      className={`text-[0.7rem] font-bold tracking-wide uppercase px-2 py-0.5 rounded self-start mt-2 ${
                        isInStock
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {isInStock ? "Available" : "Unavailable"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-xl text-gray-400">Products not found</p>
              <p className="text-gray-500 mt-2">
                We couldn't find matches. Try adjusting your spellings or query
                keywords.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}