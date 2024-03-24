const ErrorPage = ({
  errorCode,
  errorMessage,
}: {
  errorCode: number;
  errorMessage: string;
}) => {
  return (
    <section className="text-center">
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
      <p>
        This function maybe is going project, <br></br> Please try again later
        or contact "VO PHONG GIANG" via mail vophonggiang0205@gmail.com or phone
        (+84)834718218.
      </p>
    </section>
  );
};

export default ErrorPage;
