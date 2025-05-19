# Dockerイメージのビルド
docker build -t gcr.io/giqr20240704/qrcode-login-app-proto .

# 依存関係のインストール
npm install -g express express-session body-parser mssql bcryptjs jsonwebtoken qrcode dotenv

# DockerイメージのGoogle Container Registryへのプッシュ
docker push gcr.io/giqr20240704/qrcode-login-app-proto

# Google Cloud Runにデプロイ
gcloud run deploy qrcode-login-app-proto --image gcr.io/giqr20240704/qrcode-login-app-proto --platform managed --region us-central1  --project giqr20240704 --allow-unauthenticated