type ToggleArrowProps = {
  onClick: () => void;
  toggle: boolean;
  className?: string;
};

const ToggleArrow = ({ onClick, toggle, className }: ToggleArrowProps) => {
  return (
    <button
      area-label="Open albums' gallery button"
      className={className}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={`cursor-pointer origin-center transition-transform ${
          toggle ? '-rotate-180' : ''
        }`}
      >
        <path d="M24 12l-12-12-12 12z" />
      </svg>
    </button>
  );
};

export default ToggleArrow;
