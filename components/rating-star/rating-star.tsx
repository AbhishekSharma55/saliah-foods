import Image from "next/image";

const RatingStar = ({ rating = 0, onClick }: { onClick?: () => void , rating?:number }) => {
  return (
    <>
      <div className="flex">
        {Array.from({ length: rating })?.map((value, index) => {
          return (
            <Image
              src={"/svg/Star.svg"}
              alt="star"
              width={18}
              height={18}
              key={index}
              onClick={onClick}
            />
          );
        })}
      </div>
    </>
  );
};
export default RatingStar;
const starCollection = [
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
  {
    imgUrl: "/svg/Star.svg",
  },
];
