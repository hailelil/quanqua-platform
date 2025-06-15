//FASTAPI
quanqua-platform/services/dictionary-service 
uvicorn app.main:app --reload --port 8000

//Sumbit new words
quanqua-platform/services/submission-service
uvicorn app.main:app --reload --port 8001

//Admin control of sumbited words
quanqua-platform/services/admin-service
uvicorn app.main:app --reload --port 8002

//front end
quanqua-platform/frontend-web
npm run dev
