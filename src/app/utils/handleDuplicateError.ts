const handleDuplicateError = (err: any) => {
  const errorSource = [
    {
      path: err.keyValue,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: err.message,
    errorSource,
  };
};

export default handleDuplicateError;
