const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors")

app.use(cors({
    origin: "*"
}))

// Đảm bảo body-parser có thể xử lý dữ liệu nhị phân
const bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '50mb' }));

// Tạo thư mục lưu trữ file upload nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Route upload file
app.post('/upload', (req, res) => {
    // Đọc dữ liệu byte từ request body
    const videoData = req.body;

    // Tạo tên file duy nhất dựa trên thời gian
    const fileName = Date.now() + '.mp4';
    const filePath = path.join(uploadDir, fileName);

    // Ghi dữ liệu byte vào file MP4 trên server
    fs.writeFile(filePath, videoData, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).send('Có lỗi xảy ra khi lưu video.');
        }

        // Trả về URL của video vừa upload
        res.status(200).send(`File đã được tải lên thành công. URL: /videos/${fileName}`);
    });
});

// Route để hiển thị video
app.get('/videos/:filename', (req, res) => {
    const videoPath = path.join(uploadDir, req.params.filename);

    // Kiểm tra xem video có tồn tại không
    fs.stat(videoPath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send('Video không tồn tại');
        }

        // Gửi video với đúng Content-Type
        res.setHeader('Content-Type', 'video/mp4');
        res.sendFile(videoPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Có lỗi xảy ra khi gửi video.');
            }
        });
    });
});

// Khởi động server
const port = 3000;
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
