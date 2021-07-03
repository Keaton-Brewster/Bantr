import { CometChat } from "@cometchat-pro/chat";

const appID = "1900766a2045e95f";
const region = "us";
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

export default CometChat;
export const authKey = "9797b01a6199b41758a39d0db08d6d805e5f46a1";
