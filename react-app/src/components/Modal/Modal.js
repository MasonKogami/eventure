export default function Modal({ children, closeModalFunc }) {
    
  return (
    <div className="modal-background" onMouseDown={closeModalFunc}>
      { children } 
    </div>
  );
};