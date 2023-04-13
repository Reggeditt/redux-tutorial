import Navbar from "./components/Navbar";
import CartContainer from "./components/cartContainer";
import Modal from "./components/modal";
import { useSelector } from "react-redux";

function App() {
  const modalState = useSelector((store) => store.modal);
  console.log(modalState.modal);
  if (modalState.modal) return (
    <main>
      <Navbar />
      <Modal />
      <CartContainer />
    </main>
  );
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
