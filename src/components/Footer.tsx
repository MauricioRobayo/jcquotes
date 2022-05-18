const Footer = () => {
  return (
    <div className="text-sm flex flex-col gap-4 items-center p-4">
      <p>
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/random`}>JSON API</a>
      </p>
      <p>
        This is an{" "}
        <a href="https://github.com/MauricioRobayo/jcquotes">open source</a>{" "}
        project.
      </p>
    </div>
  );
};

export default Footer;
