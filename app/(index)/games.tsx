export type Game = {
  name: string;
  appToken: string;
  promoId: string;
  timing: number;
  attempts: number;
  number: number;
};

export type GameKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const games: Record<GameKey, Game> = {
  1: {
    name: "Fluff Crusade",
    appToken: "112887b0-a8af-4eb2-ac63-d82df78283d9",
    promoId: "112887b0-a8af-4eb2-ac63-d82df78283d9",
    timing: 30000,
    attempts: 25,
    number: 8,
  },
  2: {
    name: "Mow and Trim",
    appToken: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
    promoId: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
    timing: 20000,
    attempts: 20,
    number: 4,
  },

  3: {
    name: "Train Miner",
    appToken: "82647f43-3f87-402d-88dd-09a90025313f",
    promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954",
    timing: 30000,
    attempts: 15,
    number: 4,
  },
  4: {
    name: "Chain Cube",
    appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2",
    promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3",
    timing: 30000,
    attempts: 20,
    number: 4,
  },
  5: {
    name: "Merge Away",
    appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
    promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4",
    timing: 30000,
    attempts: 25,
    number: 4,
  },
  6: {
    name: "Zoopolis",
    appToken: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
    promoId: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
    timing: 20000,
    attempts: 20,
    number: 4,
  },
  7: {
    name: "Twerk Race 3D",
    appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c",
    promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c",
    timing: 30000,
    attempts: 20,
    number: 4,
  },

  8: {
    name: "Polysphere",
    appToken: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
    promoId: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
    timing: 20000,
    attempts: 20,
    number: 4,
  },
  // 9: {
  //   name: "My Clone Army",
  //   appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb",
  //   promoId: "fe693b26-b342-4159-8808-15e3ff7f8767",
  //   timing: 180000,
  //   attempts: 30,
  //   number: 4,
  // },

  // 10: {
  //   name: "Mud Racing",
  //   appToken: "8814a785-97fb-4177-9193-ca4180ff9da8",
  //   promoId: "8814a785-97fb-4177-9193-ca4180ff9da8",
  //   timing: 20000,
  //   attempts: 20,
  //   number: 4,
  // },
  // 11: {
  //   name: "Cafe Dash",
  //   appToken: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11",
  //   promoId: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11",
  //   timing: 20000,
  //   attempts: 20,
  //   number: 4,
  // },
};
export default games;
