interface FingerPrintProps {
  handleClick: () => void;
  data: {
    coordX: number;
    coordY: number;
    name: string;
  };
}

const FingerPrint = ({ handleClick, data }: FingerPrintProps): JSX.Element => {
  const { coordX, coordY, name } = data;

  return (
    <div
      onClick={handleClick}
      className={`border-full  cursor-pointer rounded-full bg-slate-700/30 p-1 ring-2 ring-slate-700/30 ring-offset-2  transition hover:opacity-60 active:translate-x-1`}
      style={{
        position: "absolute",
        top: `${coordY}%`,
        left: `${coordX}%`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="h-8 w-8  "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
        />
      </svg>
    </div>
  );
};

export default FingerPrint;
