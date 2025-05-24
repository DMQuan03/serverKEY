const express = require("express");
const cors = require("cors");
const axios = require('axios');
const querystring = require('querystring');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5555;  // Use environment variable for port

// Middleware
app.use(cors());
app.use(express.json());


const DID = "7506797301241120274";
let VIDEO = "7477537590149713170";

async function view(video) {
    try {
        const version = [247, 312, 322, 357, 358, 415, 422, 444, 466][Math.floor(Math.random() * 9)];
        const device = ["SM-G9900", "sm-g950f", "SM-A136U1", "SM-M225FV", "SM-E426B", "SM-M526BR", "SM-M326B", "SM-A528B", "SM-F711B", "SM-F926B", "SM-A037G", "SM-A225F", "SM-M325FV", "SM-A226B", "SM-M426B", "SM-A525F"][Math.floor(Math.random() * 16)];
        const host = ["api16.tiktokv.com", "api.tiktokv.com", "api19.tiktokv.com", "api21.tiktokv.com"][Math.floor(Math.random() * 4)];

        const params = querystring.stringify({
            app_language: "fr",
            iid: "",
            device_id: DID,
            channel: "googleplay",
            device_type: device,
            ac: "wifi",
            os_version: Math.floor(Math.random() * (11 - 5 + 1)) + 5, // Random từ 5-11
            version_code: version,
            app_name: "trill",
            device_brand: "samsung",
            ssmix: "a",
            device_platform: "android",
            aid: 1180,
            as: "a1iosdfgh", // creds to @auut for params bypass
            cp: "androide1",
        });

        const data = `&manifest_version_code=${version}&update_version_code=${version}0&play_delta=1&item_id=${video}&version_code=${version}&aweme_type=0`;

        const response = await axios.post(
            `https://api21.tiktokv.com/aweme/v1/aweme/stats?app_language=fr&iid=&device_id=7506797301241120274&channel=googleplay&device_type=SM-F711B&ac=wifi&os_version=7&version_code=357&app_name=trill&device_brand=samsung&ssmix=a&device_platform=android&aid=1180&as=a1iosdfgh&cp=androide1`,
            data,
            {
                headers: {
                    "host": "api21.tiktokv.com",
                    "connection": "keep-alive",
                    "accept-encoding": "gzip",
                    "x-ss-req-ticket": Math.floor(Date.now() / 1000).toString(),
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": `com.ss.android.ugc.trill/${version} (Linux; U; Android 11; fr_FR; ${device}; Build/RP1A.200720.012; Cronet/58.0.2991.0)`
                },
            }
        );

        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        console.log(
            `${`[${timestamp}]`} ` +
            `${'[VIEW]'} ` +
            `${`==> send +1 view to ${VIDEO}`}`
        );
    } catch (error) {
        console.log(error)
        // Bỏ qua lỗi, tương tự Python
    }
}

function startViewing() {
    let activeRequests = 0;
    const maxConcurrent = 100; // Giới hạn số yêu cầu đồng thời

    setInterval(() => {
        if (activeRequests < maxConcurrent) {
            activeRequests++;
            view(VIDEO).finally(() => {
                activeRequests--;
            });
        }
    }, 1); // Gửi yêu cầu mới mỗi 10ms nếu chưa đạt giới hạn
}

// Yêu cầu người dùng nhập VIDEO ID
startViewing();

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
