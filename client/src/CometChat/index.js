import { CometChat } from "@cometchat-pro/chat";

const appID = "1900766a2045e95f";
const region = "us";
const authKey = process.env.REACT_APP_COMET_AUTHKEY;
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  (error) => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

function createCometUser(id, name) {
  const user = new CometChat.User(id);
  user.setName(name);

  CometChat.createUser(user, authKey).then(
    (user) => {
      console.log("user created", user);
    },
    (error) => {
      console.log("error", error);
    }
  );
}

export { CometChat as default, authKey, createCometUser };
