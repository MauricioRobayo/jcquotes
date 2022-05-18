const Header = () => {
  return (
    <>
      <header className="mt-14 mb-6 space-y-2 flex flex-col justify-center items-center text-center">
        <h1 className="uppercase font-bold text-lg flex gap-2 align-top">
          James Clear <span className="text-sm font-normal">Quotes</span>
        </h1>
        <p>
          from{" "}
          <a href="https://jamesclear.com/3-2-1" className="link font-bold">
            3-2-1 Thursday
          </a>
        </p>
      </header>
    </>
  );
};

export default Header;
