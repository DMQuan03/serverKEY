const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5555;  // Use environment variable for port

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://duongminhquan3005:Satthu123@cluster0.x9xrb0i.mongodb.net/shoptreem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Cập nhật Schema để thêm màu sắc
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: Number, required: true },
    color: { type: String, enum: ['white', 'yellow', 'blue', 'pink', 'black'], required: true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("products", productSchema);

// GET /products?page=1&limit=10&category=girl&search=áo&colors=white,pink&sort=price_asc
app.get("/products", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const category = req.query.category;
        const search = req.query.search || "";
        const colors = req.query.colors ? req.query.colors.split(',') : [];
        const sort = req.query.sort || 'price_asc';  // Mặc định sắp xếp theo giá tăng dần

        // Xử lý tham số sort
        let sortOptions = {};
        if (sort === 'desc') {
            sortOptions = { price: -1 };  // Sắp xếp giảm dần theo giá
        } else if (sort === 'asc') {
            sortOptions = { price: 1 };  // Sắp xếp tăng dần theo giá
        } else {
            sortOptions = { createdAt: -1 };  // Mặc định sắp xếp theo ngày tạo nếu không có sort rõ ràng
        }

        // Tạo filter cho tìm kiếm tên và lọc theo màu sắc
        const filter = {
            name: { $regex: search, $options: 'i' },  // Tìm kiếm tên sản phẩm
            ...(category && { category }),  // Lọc theo category nếu có
            ...(colors.length > 0 && { color: { $in: colors } })  // Lọc theo màu sắc nếu có
        };

        // Tìm các sản phẩm theo filter và sắp xếp
        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sortOptions);  // Sắp xếp theo các lựa chọn sort

        const total = await Product.countDocuments(filter);

        return res.status(200).json({
            s: true,
            e: 0,
            c: 200,
            m: '',
            d: {
                total,
                page,
                limit,
                products
            }
        });
    } catch (error) {
        next(error);
    }
});

// POST /products
app.post("/products", async (req, res, next) => {
    try {
        const { name, price, image, category, description, color } = req.body;

        // Kiểm tra nếu thiếu thông tin cần thiết
        if (!name || !price || !image || !category || !description || !color) {
            return res.status(400).json({
                s: false,
                e: 2,
                c: 400,
                m: 'Missing required fields',
                d: null
            });
        }

        // Tạo một sản phẩm mới
        const newProduct = new Product({
            name,
            price,
            image,
            category,
            description,
            color
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        await newProduct.save();

        return res.status(201).json({
            s: true,
            e: 0,
            c: 201,
            m: 'Product added successfully',
            d: newProduct
        });
    } catch (error) {
        next(error);
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({
        s: false,
        e: 1,
        c: 500,
        m: err.message,
        d: null
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
