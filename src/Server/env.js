import dotenv from 'dotenv';


dotenv.config();

const {env} = process;

const keys = {
  jwt_secret: env.JWT_SECRET,
  mongo_dev_uri: env.MONGO_DEV_URI,
  mongo_prod_uri: env.MONGO_PROD_URI,
  mongo_test_uri: env.MONGO_TEST_URI,
  port: env.PORT,
  node_env: env.NODE_ENV
};

export default keys;
