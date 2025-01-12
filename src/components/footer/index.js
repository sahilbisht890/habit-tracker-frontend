const Footer = () => {
  return (
    <>
     <div className="dark:bg-gray-900 p-4 bg-pink-200">
     <footer className="rounded-lg shadow dark:bg-gray-900">
        <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-2">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
            <img
              src="/images/logo.webp"
              className="h-16"
              alt="habiit tracker Logo"
            />
              <span className="self-center text-4xl  text-gray-800 whitespace-nowrap dark:text-white pacifico-regular">
                Tracko
              </span>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-800 sm:mb-0 dark:text-gray-200">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-pink-700 sm:mx-auto dark:border-white lg:my-8" />
          <span className="block text-gray-800 text-lg sm:text-center dark:text-gray-200">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Tracko™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
     </div>
    </>
  );
};

export default Footer;
