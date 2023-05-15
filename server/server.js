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

async function pyScript(filePath) {
  console.log(filePath);
  const showLabel = 7; // 화면 출력 MBTI 개수
  const input = filePath;
  const pyPath = "pyfile/tensorScript.py";
  return new Promise((resolve, reject) => {
    exec(
      `python ${pyPath} ${input}`,
      { decoding: "utf-8" },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          reject(error);
          return;
        }
        // console.log(stdout)
        const dict = stdout;
        const dictObject = JSON.parse(dict); // JSON 형태로 변형
        // console.log(dictObject)
        // console.log(typeof dictObject);
        const MbtiData = [];
        Object.entries(dictObject).forEach(([key, value]) => {
          const data = [];
          const labels = [];
          // 작은 따옴표 -> 큰 따옴표, 대괄호 -> 괄호
          const lis = value
            .replace(/\(/g, "[")
            .replace(/\)/g, "]")
            .replace(/'/g, '"');
          const v = JSON.parse(lis);

          for (let i = 0; i < showLabel; i++) {
            labels.push(v[i][0]);
            data.push(parseInt(v[i][1] * 100));
          }
          const onePeople = {
            name: key,
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          };
          MbtiData.push(onePeople);
        });
        // console.log(MbtiData);
        resolve(MbtiData);
      }
    );
  });
}

app.listen(8080, () => {
  console.log("listening on 8080");
});

// 확인
app.get("/test", (req, res) => {
  console.log("test ok");
  // 파일 위치 파악
  fs.readdir("./uploads/", (err, files) => {
    console.log(files);
    if (files.includes("KakaoTalk_20230503_1908_03_261_.txt")) {
      console.log(1);
    }
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
  });
  res.send("test ok");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  console.log("upload success");
  // console.log(path);
  const newPath = `uploads/${originalname}`;
  const filePath = "uploads/" + originalname;
  console.log(originalname);

  // fs.readdirSync("./uploads/", (err, files) => {
  //   console.log(1111111);
  //   console.log("files :: ", files);
  //   if (err) throw err;
  //   if (files.includes(originalname)) {
  //     console.log(1);
  //     fs.unlinkSync("uploads/", (err) => {
  //       console.log("err");
  //       return err;
  //     });
  //   }
  // });
  try {
    fs.renameSync(path, newPath, (err, data) => {
      if (err) throw err;
    });
    const data = await pyScript(filePath);

    // txt 파일 삭제
    fs.unlinkSync(filePath, (err) => {
      if (err) throw err;
    });

    // console.log(data);
    res.send(data);
  } catch {
    console.log("fail");
    fs.readdirSync("./uploads/", (err, files) => {
      console.log(files);
      if (files.includes(originalname)) {
        console.log(1);
      }
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
    });
    res.send("fail");
  }
});
