import dynamic from "next/dynamic";

const Cart = dynamic(() => import("../components/Cart"), {
  ssr: false,
  loading: () => <div>Loading cart...</div>,
});

export default function CartPage() {
  return <Cart />;
}
