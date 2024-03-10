import { Link } from "@/src/components/Link";
import { Status } from "./Status";

function Footer() {
  return (
    <div className="text-sm flex flex-col gap-2 items-center p-8">
      <p>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/random`}>JSON API</Link>
      </p>
      <Status />
      <p>
        This is an{" "}
        <Link href="https://github.com/MauricioRobayo/jcquotes">
          open source
        </Link>{" "}
        project.
      </p>
    </div>
  );
}

export default Footer;
