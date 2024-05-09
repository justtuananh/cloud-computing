Cách cài đặt:
Bước 1. trong thư mục Backend tạo 1 thư mục "config" và trong thư mục config tạo 1 file .env. Bên trong .env cấu trúc
như bên dưới.


bên trong file .env
PORT = 4000
URL_MONGO = /*URL CỦA MONGODB*/
JWT_SECRET_KEY = ercommerce
JWT_EXPIRES = 6d 
COOKIE_EXPIRE = 5
SMPT_HOST = smpt.gmail.com
SMPT_PORT = 465
SMPT_SERVICE = gmail
SMPT_MAIL = /*gmail sau khi đăng ký mật khẩu ứng dụng*/
SMPT_PASSWORD = /*gmail sau khi đăng ký mật khẩu ứng dụng*/
CLOUDINARY_NAME = /*cloudinary project*/
CLOUDINARY_API_KEY = /*cloudinary project*/
CLOUDINARY_API_SECRET = /*cloudinary project*/
NODE_ENV = PRODUCTION
STRIPE_SECRET_KEY = /*STRIPE*/
STRIPE_API_KEY = /*STRIPE*/

B2. Sau khi tạo file .env, mở termiral: chạy lệnh "npm install" sau khi cài đặt thành công thì 
chạy tiếp "cd client" --> "npm install"

B3: chạy lệnh "npm start" bên backend và client
pakage.json:  // "proxy": "http://localhost:4000"