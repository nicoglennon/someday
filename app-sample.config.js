export default ({ config }) => {
  return {
    ...config,
    extra: {
      MAILCHIMP_API_KEY: "",
      MAILCHIMP_SERVER_PREFIX: "",
      MAILCHIMP_LIST_ID: "",
    },
  };
};
