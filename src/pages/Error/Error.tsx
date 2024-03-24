const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <div className="container mt-5">
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
      <p>
        This function maybe is going project, <br></br> Please try again later or
        contact "VO PHONG GIANG" via mail vophonggiang0205@gmail.com or phone
        (+84)834718218.
      </p>
    </div>
  );
};

export default ErrorPage;
