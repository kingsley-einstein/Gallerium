import dotenv from 'dotenv';


dotenv.config();

const {env} = process;

const keys = {
  jwt_secret: env.JWT_SECRET,
  mongo_dev_uri: env.MONGO_DEV_URI,
  mongo_prod_uri: env.MONGO_PROD_URI,
  mongo_test_uri: env.MONGO_TEST_URI,
  port: {
    development: env.PORT_DEV,
    test: env.PORT_TEST
  },
  node_env: env.NODE_ENV,
  push_public_key: env.PUSH_PUBLIC_KEY,
  push_private_key: env.PUSH_PRIVATE_KEY,
  mailto: env.MAILTO
};

export default keys;
