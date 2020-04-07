import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve) => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [
    {
      id: uuid(),
      name: "Geral",
      externalMeetUrl: "https://meet.google.com/vrx-phky-zch",
    },
    {
      id: uuid(),
      name: "Dev",
      externalMeetUrl: "https://meet.google.com/qpt-pmji-ums",
    },
    {
      id: uuid(),
      name: "Adm",
      externalMeetUrl: "https://meet.google.com/tie-yetg-ngf",
    },
    {
      id: uuid(),
      name: "Design",
      externalMeetUrl: "https://meet.google.com/uyg-zyrd-rsw",
    },
    {
      id: uuid(),
      name: "Outros",
      externalMeetUrl: "https://meet.google.com/csh-atho-mao",
    },
  ];

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve) => resolve(roomsDetail));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
