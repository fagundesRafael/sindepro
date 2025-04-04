//components/SocialBar.js
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import NewsEvents from "./NewsEvents";

export default function SocialBar() {
  return (
    <div className="bg-red-700 text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-sm flex-grow overflow-hidden">
          <NewsEvents />
        </div>
        <div className="flex space-x-3 ml-4">
          <Link href="https://www.facebook.com/profile.php?id=100008384590495" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </Link>
          <Link href="https://www.instagram.com/sindeprooficial/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Link>
          <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </Link>
        </div>
      </div>
    </div>
  );
} 