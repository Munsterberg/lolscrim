import bcrypt from 'bcryptjs';

const hash = (str) => {
  const salt = bcrypt.genSaltSync(10);
  const hashSalt = bcrypt.hashSync(str, salt);
  return hashSalt;
};

export default hash;
