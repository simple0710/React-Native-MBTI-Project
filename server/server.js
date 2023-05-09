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

app.listen(8080, () => {
  console.log("listening on 8080");
});

// 확인
app.get("/test", (req, res) => {
  console.log("test ok");
  res.send("test ok");
});

// MBTI 모델 수행 후 결과 반환
app.post("/result", upload.single("file"), async (req, res) => {
  console.log("result ok");
  const fileContent = await fs.promises.readFile(req.file.path, "utf-8");
  // console.log(fileContent);
  const requestBody = req.body;
  // console.log(req.file);
  requestBody.fileContent = fileContent;
  // console.log(requestBody);
  res.send("File uploaded successfully");
});

app.post("/upload", upload.single("file"), (req, res) => {
  const { originalname, path } = req.file;
  const newPath = `uploads/${originalname}`;

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
  ];
  console.log(path);
  console.log(newPath);
  fs.rename(path, newPath, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log("File uploaded successfully");
      const filePath = "uploads/" + req.file.originalname;
      // 데이터 저장
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(data.toString());
          // 모델에 카톡 내용 추가 후 MBTI 결과 반환
          // JSON 형태로 전달
          res.send(MBTIData);
        }
      });
    }
  });
});
