import Link from "next/link";

export function Header() {
  return (
    <header className="mt-14 mb-6 space-y-2 flex flex-col justify-center items-center text-center">
      <h1 className="uppercase font-bold text-lg flex gap-1 align-top tracking-widest">
        <Link href="/">
          James Clear{" "}
          <span className="text-sm font-normal tracking-normal">
            <span
              style={{ display: "inline-block", transform: "scale(-1, 1)" }}
            >
              Q
            </span>
            uotes
          </span>
        </Link>
      </h1>
      <p>
        from{" "}
        <a href="https://jamesclear.com/3-2-1" className="link font-bold">
          3-2-1 Thursday
        </a>
      </p>
    </header>
  );
}
