import Logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <div className="flex items-center">
      <div className="w-1/3">
        <img src={Logo} alt="Logo" className="h-12" />
      </div>
      <div className="w-1/3 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        <h1>Filmy OMDb</h1>
      </div>
      <div className="w-1/3" />
    </div>
  )
}