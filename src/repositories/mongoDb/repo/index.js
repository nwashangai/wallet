import UserRepository from './UserRepository.repository';
import VerificationRepository from './Verification.repository';
// import makeDb from './db';

// export default {
//   users: userCollection,
//   verification: verificationCollection,
// };

export default ({ makeDb }) => {
  const userCollection = new UserRepository(makeDb).build();
  const verificationCollection = new VerificationRepository(makeDb).build();

  return {
    users: userCollection,
    verification: verificationCollection,
  };
};
