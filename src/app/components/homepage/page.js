"use client";

const Banner1 = () => {
  return (
    <section
      className="mt-10 relative flex items-center justify-start h-screen w-full rounded-b-[30px] overflow-hidden"
    >
      {/* Background Images */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url(/images/bannerperfect.png)",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: "url(/images/bannerphone.png)",
        }}
      ></div>

      {/* Overlay (optional for better contrast) */}
      <div className="absolute inset-0 bg-black/30"></div>
 
    </section>
  );
};

export default Banner1;
