import Image from "next/image";
import Logo from "@/assets/Logo-Space-Name.png";

export default function ComingSoon() {
  return (
    <div
      className="bg-nse-black/50 h-full w-full flex absolute z-20 items-center justify-center"
    >
      <div className="space-y-8 relative z-20">
        <Image
          src={Logo}
          alt="Logo with name, Alexandra Smith"
          className="max-w-xs md:max-w-3xl"
        />
        <p className="text-light-gold text-center font-bamq font-black text-xl md:text-4xl">
          Coming Soon
        </p>
      </div>
    </div>
  )
}
