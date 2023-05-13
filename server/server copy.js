const express = require("express");

const app = express();

// 파일 가져오기
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// 파일 읽기
const fs = require("fs");

app.use(express.json());
var cors = require("cors");
app.use(cors());

const path = require("path");

// 파이썬 스크립트
const { exec } = require("child_process");

async function testpy(text) {
  console.log(text);
  const input = text;
  const pyPath = "pyfile/test.py";
  exec(
    `python ${pyPath} ${input}`,
    { decoding: "utf-8" },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      const dict = stdout;
      const dictObject = JSON.parse(dict); // JSON 형태로 변형
      return dictObject;
      // console.log(dictObject["김찬민"]);
      // console.log(typeof dictObject);
    }
  );
}

app.listen(8080, () => {
  console.log("listening on 8080");
});

// 확인
app.get("/test", (req, res) => {
  console.log("test ok");
  // 파일 위치 파악
  // fs.readdir("./", (err, files) => {
  //   if (err) {
  //     console.error("Error reading directory:", err);
  //     return;
  //   }

  //   files.forEach((file) => {
  //     console.log(file);
  //   });
  // });
  res.send("test ok");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("upload success");
  const { originalname, path } = req.file;
  const newPath = `pyfile/uploads/${originalname}`;
  const MBTIData = [
    {
      name: "김찬민",
      labels: ["INFP", "ISFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
      datasets: [
        {
          data: [70, 10, 5, 5, 5, 4, 1],
        },
      ],
    },
    {
      name: "김찬민 2",
      labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
      datasets: [
        {
          data: [60, 10, 5, 5, 5, 4, 1],
        },
      ],
    },
    {
      name: "김찬민 3",
      labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
      datasets: [
        {
          data: [50, 10, 5, 5, 5, 4, 1],
        },
      ],
    },
    {
      name: "김찬민 4",
      labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
      datasets: [
        {
          data: [50, 40, 5, 5, 5, 4, 1],
        },
      ],
    },
  ];
  // console.log("path : ", path);
  // console.log("newPath : ", newPath);
  // console.log(__dirname);
  fs.renameSync(path, newPath, async (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  console.log("File uploaded successfully");
  const filePath = "pyfile/uploads/" + req.file.originalname;
  // 데이터 저장
  fs.readFileSync(filePath, "utf-8", async (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log("File read successfully");
      // console.log(data.toString());
      // 모델에 카톡 내용 추가 후 MBTI 결과 반환
      // JSON 형태로 전달
      const Data = await testpy(filePath); // 전처리 및 모델 가져오기
      if (Data) {
        console.log("끝!");
      } else {
        console.log("실패");
      }
      // fs.unlink(filePath, (err) => {
      //   if (err) {
      //     console.log(err);
      //     res.sendStatus(500);
      //   } else {
      //     // loadModel();
      //     res.send(MBTIData);
      //   }
      // });
    }
  });
});
