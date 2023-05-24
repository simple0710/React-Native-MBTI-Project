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
  // console.log(filePath);
  const input = filePath;
  // const pyPath = "pyfile/tensorScript_PC.py";
  const pyPath = "pyfile/tensorScript_Mobile.py";
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
        // console.log("출력값 : ", stdout);
        // console.log("타입 : ", typeof stdout);
        const dict = stdout;
        const dictObject = JSON.parse(dict); // JSON 형태로 변형
        // console.log(dictObject);
        // console.log(typeof dictObject);
        const MbtiData = [];
        // key : name
        // value : mbti data
        try {
          Object.entries(dictObject).forEach(([key, value]) => {
            // console.log(key, value);
            const data = [];
            const labels = [];
            // 작은 따옴표 -> 큰 따옴표, 대괄호 -> 괄호
            const lis = value
              .replace(/\(/g, "[")
              .replace(/\)/g, "]")
              .replace(/'/g, '"');
            const v = JSON.parse(lis);
            const showLabel = v.length; // 화면 출력 mbti 수
            for (let i = 0; i < showLabel; i++) {
              labels.push(v[i][0].toUpperCase());
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
          console.log(MbtiData);
          resolve(MbtiData);
        } catch {
          if (err) throw err;
        }
      }
    );
  });
}

const port = 3000;
const hostname = "0.0.0.0";

app.listen(3000, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { path, filename } = req.file;
  // console.log(path);
  console.log(filename);
  const filePath = "uploads/" + filename;
  try {
    console.log("start");
    // 파일
    fs.renameSync(path, filePath, (err) => {
      if (err) throw err;
    });
    // MBTI 스크립트 실행
    const data = await pyScript(filePath);

    // console.log(data);
    res.send(data);
  } catch {
    console.log("fail");
    try {
      // txt 파일이 존재하는 경우 삭제
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath, (err) => {
          if (err) throw err;
        });
      }
      res.send("fail");
    } catch {
      console.err(err);
      res.send("fail");
    }
  }
});
