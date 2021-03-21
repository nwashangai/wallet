export default () => {
  const nameRegex = /\b([a-zA-ZÀ-ÿ][-,a-z.A-Z ']+[ ]*)+/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;

  const isValidEmail = (value) => (!value ? false : emailRegex.test(value));
  const isValidName = (value) => (!value ? false : nameRegex.test(value));
  const isValidPhone = (value) => (!value ? false : phoneRegex.test(value));
  const isValidPassword = (value) => (!value ? false : value.length > 5);
  const isValidCountry = (value) => (!value ? false : value.length > 3);

  return Object.freeze({
    isValidEmail,
    isValidName,
    isValidPhone,
    isValidPassword,
    isValidCountry,
  });
};
